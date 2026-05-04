// ========== LESSONS MODULE ==========
const LessonsModule = (function () {
    let allLessons = [];
    let currentLesson = null;
    let hintIndex = 0;

    function init() {
        allLessons = [...BeginnerLessons, ...IntermediateLessons, ...AdvancedLessons];
    }

    function getAllLessons() { return allLessons; }

    function getLessonById(id) { return allLessons.find(l => l.id === id); }

    function loadLesson(lessonId) {
        const lesson = getLessonById(lessonId);
        if (!lesson) return;
        currentLesson = lesson;
        hintIndex = 0;

        // Her adımda veritabanını sıfırlayarak bir önceki adımın yan etkilerini (örn: oluşturulan tabloları) temizle
        if (lesson.database) {
            DatabaseEngine.resetDatabase(lesson.database);
        }

        // Hide welcome, show lesson
        document.getElementById('welcome-screen').classList.add('hidden');
        document.getElementById('active-lesson').classList.remove('hidden');

        // Header
        const levelBadge = document.getElementById('lesson-level-badge');
        levelBadge.textContent = lesson.level === 'beginner' ? 'Başlangıç' : lesson.level === 'intermediate' ? 'Orta' : 'İleri';
        levelBadge.className = 'level-badge ' + lesson.level;

        document.getElementById('lesson-topic-name').textContent = lesson.topicTitle;
        document.getElementById('lesson-title').textContent = lesson.title;
        document.getElementById('lesson-description').innerHTML = lesson.description;
        document.getElementById('lesson-task').innerHTML = lesson.task;

        // Sample tables
        const sampleSection = document.getElementById('lesson-sample-tables');
        const sampleContent = document.getElementById('sample-tables-content');
        if (lesson.database) {
            sampleSection.classList.remove('hidden');
            const schema = DatabaseEngine.getSchema(lesson.database);
            
            // Akıllı Filtreleme: Beklenen sorgu, başlangıç kodu veya hedef tablodan tablo adlarını çıkar
            let sqlTexts = [
                lesson.expectedQuery || "",
                lesson.initialCode || "",
                lesson.checkQuery || ""
            ].join(" ");
            
            let explicitTables = [];
            if (lesson.checkTable) explicitTables.push(lesson.checkTable.toLowerCase());

            // SQL içindeki FROM, JOIN, INTO, UPDATE, TABLE kelimelerinden sonraki kelimeyi yakala
            const regex = /(?:FROM|JOIN|INTO|UPDATE|TABLE)\s+([a-zA-Z0-9_]+)/gi;
            let match;
            while ((match = regex.exec(sqlTexts)) !== null) {
                if (match[1]) explicitTables.push(match[1].toLowerCase());
            }

            let mainTables = schema.filter(t => explicitTables.includes(t.name.toLowerCase()));
            
            if (mainTables.length === 0) {
                // Eğer SQL sorgularından tablo adı bulunamadıysa metin içinde (soruda) geçip geçmediğine bak
                const searchContext = (lesson.task + " " + lesson.description).toLowerCase();
                mainTables = schema.filter(t => {
                    const wordRegex = new RegExp("\\b" + t.name.toLowerCase() + "\\b", "i");
                    return wordRegex.test(searchContext);
                });
            }
            
            if (mainTables.length === 0) {
                mainTables = schema.slice(0, 1); // Hiçbir şekilde bulunamazsa en azından 1 tablo göster
            } else {
                mainTables = mainTables.slice(0, 3); // En fazla 3 tablo göster (ekran dolmasın diye)
            }

            sampleContent.innerHTML = mainTables.map(t => {
                const preview = DatabaseEngine.executeQuery(lesson.database, `SELECT * FROM ${t.name} LIMIT 3;`);
                if (preview.error || !preview.columns.length) return '';
                return `<div class="sample-table-wrapper">
                    <div class="sample-table-name">📋 ${t.name}</div>
                    ${renderTable(preview.columns, preview.values)}
                    <div style="font-size:0.7rem;color:var(--text-muted);margin-top:4px;">İlk 3 kayıt gösteriliyor...</div>
                </div>`;
            }).join('');
        } else {
            sampleSection.classList.add('hidden');
        }

        // Editor
        SQLEditor.create('lesson-editor', '-- SQL sorgunuzu buraya yazın...');
        if (lesson.initialCode) {
            SQLEditor.setValue('lesson-editor', lesson.initialCode);
        }

        // Clear results and feedback
        hideFeedback();
        document.getElementById('query-result').classList.add('hidden');
        document.getElementById('expected-result').classList.add('hidden');

        // Show expected result for result-check lessons
        if (lesson.expectedQuery && lesson.checkType === 'result') {
            showExpectedResult(lesson);
        }

        // Nav buttons
        const idx = allLessons.indexOf(lesson);
        document.getElementById('btn-prev-lesson').disabled = idx === 0;
        document.getElementById('btn-next-lesson').disabled = idx === allLessons.length - 1;

        // Mark active in sidebar
        document.querySelectorAll('.nav-topic-btn').forEach(b => b.classList.remove('active'));
        const navBtn = document.querySelector(`.nav-topic-btn[data-lesson="${lessonId}"]`);
        if (navBtn) {
            navBtn.classList.add('active');
            // Expand parent level
            const parentLevel = navBtn.closest('.nav-level');
            if (parentLevel) parentLevel.classList.add('expanded');
        }

        // Scroll to top
        document.getElementById('main-content').scrollTo(0, 0);
    }

    function showExpectedResult(lesson) {
        const result = DatabaseEngine.executeQuery(lesson.database, lesson.expectedQuery);
        if (result.error || !result.columns.length) return;
        const container = document.getElementById('expected-result');
        const tableContainer = document.getElementById('expected-table-container');
        tableContainer.innerHTML = renderTable(result.columns, result.values);
        container.classList.remove('hidden');
    }

    function runQuery() {
        if (!currentLesson) return;
        const sql = SQLEditor.getValue('lesson-editor');
        if (!sql) { showFeedback('warning', '⚠️ Uyarı', 'Lütfen bir SQL sorgusu yazın.'); return; }
        const result = DatabaseEngine.executeQuery(currentLesson.database, sql);
        showQueryResult(result, 'query-result', 'result-table-container', 'result-info');
    }

    function checkAnswer() {
        if (!currentLesson) return;
        const sql = SQLEditor.getValue('lesson-editor');
        if (!sql) { showFeedback('warning', '⚠️ Uyarı', 'Lütfen bir SQL sorgusu yazın.'); return; }

        const lesson = currentLesson;

        // ÖNEMLİ DÜZELTME: Öğrenci önceden "Sorguyu Çalıştır" dediyse (INSERT, UPDATE vb. yaptıysa), 
        // veritabanı o haliyle kalmış olabilir. 
        // Cevabı kontrol etmeden önce veritabanını sıfırlayalım ki temiz bir sayfada test edelim.
        if (lesson.database) {
            DatabaseEngine.resetDatabase(lesson.database);
        }

        // First run the student's query
        const studentResult = DatabaseEngine.executeQuery(lesson.database, sql);

        if (studentResult.error) {
            showFeedback('error', '❌ Hata', studentResult.error + '<br><br>Sorgunuzu kontrol edip tekrar deneyin.');
            showQueryResult(studentResult, 'query-result', 'result-table-container', 'result-info');
            return;
        }

        let correct = false;

        switch (lesson.checkType) {
            case 'run-only':
                correct = true;
                break;

            case 'result':
                if (lesson.expectedQuery) {
                    const expected = DatabaseEngine.executeQuery(lesson.database, lesson.expectedQuery);
                    correct = compareResults(studentResult, expected);
                } else {
                    correct = !studentResult.error;
                }
                break;

            case 'contains-value':
                if (lesson.checkQuery) {
                    const checkResult = DatabaseEngine.executeQuery(lesson.database, lesson.checkQuery);
                    correct = checkResult.values && checkResult.values.some(row =>
                        row.some(v => String(v).includes(lesson.checkValue))
                    );
                } else {
                    correct = studentResult.values && studentResult.values.some(row =>
                        row.some(v => String(v).includes(lesson.checkValue))
                    );
                }
                break;

            case 'structure':
                const tableInfo = DatabaseEngine.executeQuery(lesson.database, `PRAGMA table_info('${lesson.checkTable}');`);
                if (tableInfo.values) {
                    const colNames = tableInfo.values.map(r => r[1].toLowerCase());
                    correct = lesson.checkColumns.every(c => colNames.includes(c.toLowerCase()));
                }
                break;

            case 'structure-contains':
                const tInfo = DatabaseEngine.executeQuery(lesson.database, `PRAGMA table_info('${lesson.checkTable}');`);
                if (tInfo.values) {
                    const cols = tInfo.values.map(r => r[1].toLowerCase());
                    correct = lesson.checkColumns.every(c => cols.includes(c.toLowerCase()));
                }
                break;

            case 'run-check':
                const check = DatabaseEngine.executeQuery(lesson.database, lesson.checkQuery);
                correct = check.values && check.values.some(row =>
                    row.some(v => String(v) === String(lesson.checkValue))
                );
                break;

            default:
                correct = !studentResult.error;
        }

        showQueryResult(studentResult, 'query-result', 'result-table-container', 'result-info');

        if (correct) {
            showFeedback('success', '✅ Doğru!', 'Tebrikler! Bu alıştırmayı başarıyla tamamladınız. Sonraki derse geçebilirsiniz.');
            ProgressTracker.markComplete(lesson.id);
            updateNavCompletion(lesson.id);
        } else {
            showFeedback('error', '❌ Tam Doğru Değil', 'Sonucunuz beklenen sonuçla eşleşmiyor. İpucu alarak tekrar deneyin!');
        }
    }

    function showHint() {
        if (!currentLesson || !currentLesson.hints) return;
        if (hintIndex < currentLesson.hints.length) {
            showFeedback('info', `💡 İpucu ${hintIndex + 1}/${currentLesson.hints.length}`, currentLesson.hints[hintIndex]);
            hintIndex++;
        } else {
            showFeedback('info', '💡 İpucu', 'Tüm ipuçlarını gördünüz. Çözümü görmek için "Çözümü Göster" butonunu kullanabilirsiniz.');
        }
    }

    function showSolution() {
        if (!currentLesson) return;
        SQLEditor.setValue('lesson-editor', currentLesson.solution);
        showFeedback('warning', '👁 Çözüm Gösterildi', 'Çözüm editöre yerleştirildi. Kendiniz yazarak öğrenmeniz daha faydalı olacaktır!');
    }

    function prevLesson() {
        if (!currentLesson) return;
        const idx = allLessons.indexOf(currentLesson);
        if (idx > 0) loadLesson(allLessons[idx - 1].id);
    }

    function nextLesson() {
        if (!currentLesson) return;
        const idx = allLessons.indexOf(currentLesson);
        if (idx < allLessons.length - 1) loadLesson(allLessons[idx + 1].id);
    }

    function compareResults(a, b) {
        if (!a.columns || !b.columns) return false;
        if (a.columns.length !== b.columns.length) return false;
        if (!a.values || !b.values) return false;
        if (a.values.length !== b.values.length) return false;
        // Sort rows for comparison
        const sortRows = rows => rows.map(r => r.map(String).join('|')).sort();
        const aRows = sortRows(a.values);
        const bRows = sortRows(b.values);
        return aRows.every((r, i) => r === bRows[i]);
    }

    function showQueryResult(result, containerId, tableId, infoId) {
        const container = document.getElementById(containerId);
        const tableContainer = document.getElementById(tableId);
        const info = document.getElementById(infoId);

        if (result.error) {
            container.classList.remove('hidden');
            tableContainer.innerHTML = `<div style="padding:1rem;color:var(--error);font-size:0.88rem;">${result.error}</div>`;
            if (info) info.textContent = '';
            return;
        }

        if (result.message && (!result.columns.length || (result.columns[0] === 'Etkilenen Satır'))) {
            container.classList.remove('hidden');
            tableContainer.innerHTML = `<div style="padding:1rem;color:var(--success);font-size:0.88rem;">✅ ${result.message}</div>`;
            if (result.values && result.values.length) {
                tableContainer.innerHTML += renderTable(result.columns, result.values);
            }
            if (info) info.textContent = '';
            return;
        }

        container.classList.remove('hidden');
        tableContainer.innerHTML = renderTable(result.columns, result.values);
        if (info) info.textContent = `${result.values.length} satır`;
    }

    function updateNavCompletion(lessonId) {
        const btn = document.querySelector(`.nav-topic-btn[data-lesson="${lessonId}"]`);
        if (btn) {
            btn.classList.add('completed');
            const check = btn.querySelector('.topic-check');
            if (check) check.textContent = '✓';
        }
    }

    return {
        init, getAllLessons, getLessonById, loadLesson,
        runQuery, checkAnswer, showHint, showSolution,
        prevLesson, nextLesson, showQueryResult
    };
})();

// ---- Helper functions ----
function renderTable(columns, values) {
    if (!columns || columns.length === 0) return '<p style="padding:0.5rem;color:var(--text-muted);font-size:0.82rem;">Sonuç yok.</p>';
    let html = '<table class="result-table"><thead><tr>';
    columns.forEach(c => { html += `<th>${c}</th>`; });
    html += '</tr></thead><tbody>';
    (values || []).forEach(row => {
        html += '<tr>';
        row.forEach(v => { html += `<td>${v === null ? '<em style="color:var(--text-muted)">NULL</em>' : v}</td>`; });
        html += '</tr>';
    });
    html += '</tbody></table>';
    return html;
}

function showFeedback(type, title, text) {
    const area = document.getElementById('feedback-area');
    area.className = `feedback-area feedback-${type}`;
    area.innerHTML = `<div class="feedback-title">${title}</div><div class="feedback-text">${text}</div>`;
    area.classList.remove('hidden');
}

function hideFeedback() {
    document.getElementById('feedback-area').classList.add('hidden');
}
