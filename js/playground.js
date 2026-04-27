// ========== PLAYGROUND MODULE ==========
const PlaygroundModule = (function () {
    let currentDb = 'okul';
    let queryHistory = [];

    function init() {
        SQLEditor.create('playground-editor', '-- İstediğiniz SQL sorgusunu yazın...\n-- Örnek: SELECT * FROM ogrenciler;');
        SchemaExplorer.render(currentDb);
    }

    function changeDatabase(dbName) {
        currentDb = dbName;
        SchemaExplorer.render(dbName);
        document.getElementById('playground-result').classList.add('hidden');
        document.getElementById('playground-feedback').classList.add('hidden');
    }

    function runQuery() {
        const sql = SQLEditor.getValue('playground-editor');
        if (!sql) {
            showPlaygroundFeedback('warning', '⚠️ Uyarı', 'Lütfen bir SQL sorgusu yazın.');
            return;
        }

        const result = DatabaseEngine.executeQuery(currentDb, sql);
        const container = document.getElementById('playground-result');
        const tableContainer = document.getElementById('playground-table-container');
        const info = document.getElementById('playground-result-info');

        if (result.error) {
            container.classList.remove('hidden');
            tableContainer.innerHTML = `<div style="padding:1rem;color:var(--error);font-size:0.88rem;">${result.error}</div>`;
            info.textContent = '';
            hidePlaygroundFeedback();
        } else if (result.message && (!result.columns.length || result.columns[0] === 'Etkilenen Satır')) {
            container.classList.remove('hidden');
            tableContainer.innerHTML = `<div style="padding:1rem;color:var(--success);font-size:0.88rem;">✅ ${result.message}</div>`;
            if (result.values && result.values.length) {
                tableContainer.innerHTML += renderTable(result.columns, result.values);
            }
            info.textContent = '';
            hidePlaygroundFeedback();
            // Refresh schema after modifications
            SchemaExplorer.render(currentDb);
        } else {
            container.classList.remove('hidden');
            tableContainer.innerHTML = renderTable(result.columns, result.values);
            info.textContent = `${result.values.length} satır`;
            hidePlaygroundFeedback();
        }

        // Add to history
        addToHistory(sql);
    }

    function resetDatabase() {
        DatabaseEngine.resetDatabase(currentDb);
        SchemaExplorer.render(currentDb);
        document.getElementById('playground-result').classList.add('hidden');
        showPlaygroundFeedback('success', '✅ Sıfırlandı', `${currentDb} veritabanı orijinal haline sıfırlandı.`);
    }

    function clearEditor() {
        SQLEditor.clear('playground-editor');
        document.getElementById('playground-result').classList.add('hidden');
        hidePlaygroundFeedback();
    }

    function addToHistory(sql) {
        queryHistory.unshift(sql);
        if (queryHistory.length > 20) queryHistory.pop();
        renderHistory();
    }

    function renderHistory() {
        const container = document.getElementById('query-history');
        const list = document.getElementById('history-list');
        if (queryHistory.length === 0) {
            container.classList.add('hidden');
            return;
        }
        container.classList.remove('hidden');
        list.innerHTML = queryHistory.map((q, i) =>
            `<div class="history-item" onclick="PlaygroundModule.loadFromHistory(${i})" title="${q}">${q}</div>`
        ).join('');
    }

    function loadFromHistory(index) {
        if (queryHistory[index]) {
            SQLEditor.setValue('playground-editor', queryHistory[index]);
        }
    }

    function clearHistory() {
        queryHistory = [];
        renderHistory();
    }

    function showPlaygroundFeedback(type, title, text) {
        const area = document.getElementById('playground-feedback');
        area.className = `feedback-area feedback-${type}`;
        area.innerHTML = `<div class="feedback-title">${title}</div><div class="feedback-text">${text}</div>`;
        area.classList.remove('hidden');
    }

    function hidePlaygroundFeedback() {
        document.getElementById('playground-feedback').classList.add('hidden');
    }

    return { init, changeDatabase, runQuery, resetDatabase, clearEditor, loadFromHistory, clearHistory };
})();
