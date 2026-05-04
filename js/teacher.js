// ========== TEACHER PANEL MODULE ==========
const TeacherModule = (function () {
    let unsubscribe = null;

    function init() {
        const btnTeacherPanel = document.getElementById('btn-teacher-panel');
        const teacherModal = document.getElementById('teacher-modal');
        const btnCloseTeacher = document.getElementById('btn-close-teacher');

        btnTeacherPanel.addEventListener('click', () => {
            teacherModal.classList.remove('hidden');
            loadStudentsData();
        });

        btnCloseTeacher.addEventListener('click', () => {
            teacherModal.classList.add('hidden');
            if (unsubscribe) {
                unsubscribe(); // Stop listening when modal is closed
                unsubscribe = null;
            }
        });
    }

    function loadStudentsData() {
        const tbody = document.getElementById('teacher-students-body');
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">Veriler yükleniyor...</td></tr>';

        const db = firebase.firestore();
        
        // Sadece öğretmenler görebileceği için (Firebase rule ile kısıtlanabilir), basit bir snapshot listener ekliyoruz.
        // Gerçek zamanlı olarak verileri çeker.
        unsubscribe = db.collection('users').orderBy('name').onSnapshot(snapshot => {
            if (snapshot.empty) {
                tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">Henüz kayıtlı öğrenci yok.</td></tr>';
                return;
            }

            let html = '';
            
            // Tüm müfredatı al (Yüzde hesaplaması için)
            let allLessons = [];
            if (typeof LessonsModule !== 'undefined' && LessonsModule.getAllLessons) {
                allLessons = LessonsModule.getAllLessons();
            }

            snapshot.forEach(doc => {
                const data = doc.data();
                const completed = data.completedLessons || [];
                const totalCompleted = completed.length;
                
                // Seviyelere göre yüzdeler
                let begPercent = 0, intPercent = 0, advPercent = 0;
                
                if (allLessons.length > 0) {
                    const begLessons = allLessons.filter(l => l.level === 'beginner');
                    const intLessons = allLessons.filter(l => l.level === 'intermediate');
                    const advLessons = allLessons.filter(l => l.level === 'advanced');

                    const begDone = begLessons.filter(l => completed.includes(l.id)).length;
                    const intDone = intLessons.filter(l => completed.includes(l.id)).length;
                    const advDone = advLessons.filter(l => completed.includes(l.id)).length;

                    begPercent = begLessons.length > 0 ? Math.round((begDone / begLessons.length) * 100) : 0;
                    intPercent = intLessons.length > 0 ? Math.round((intDone / intLessons.length) * 100) : 0;
                    advPercent = advLessons.length > 0 ? Math.round((advDone / advLessons.length) * 100) : 0;
                }

                html += `
                    <tr>
                        <td style="font-weight: 500;">${data.name || 'İsimsiz'}</td>
                        <td style="font-size: 0.85rem; color: var(--text-muted);">${data.email || ''}</td>
                        <td style="text-align: center;"><span class="badge ${totalCompleted > 0 ? 'badge-primary' : ''}">${totalCompleted}</span></td>
                        <td style="text-align: center;">
                            <div class="progress-bar-mini" style="margin-top: 5px;" title="%${begPercent}">
                                <div class="progress-fill-mini" style="width: ${begPercent}%; background-color: var(--success);"></div>
                            </div>
                        </td>
                        <td style="text-align: center;">
                            <div class="progress-bar-mini" style="margin-top: 5px;" title="%${intPercent}">
                                <div class="progress-fill-mini" style="width: ${intPercent}%; background-color: var(--warning);"></div>
                            </div>
                        </td>
                        <td style="text-align: center;">
                            <div class="progress-bar-mini" style="margin-top: 5px;" title="%${advPercent}">
                                <div class="progress-fill-mini" style="width: ${advPercent}%; background-color: var(--danger);"></div>
                            </div>
                        </td>
                    </tr>
                `;
            });
            
            tbody.innerHTML = html;
        }, error => {
            console.error("Öğrenci verileri alınamadı:", error);
            tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color: var(--error);">Veriler alınırken hata oluştu: ${error.message}</td></tr>`;
        });
    }

    return { init };
})();
