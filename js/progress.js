// ========== PROGRESS TRACKER ==========
const ProgressTracker = (function () {
    const STORAGE_KEY = 'sql_egitim_progress';

    function getCompleted() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        } catch { return []; }
    }

    function markComplete(lessonId) {
        const completed = getCompleted();
        if (!completed.includes(lessonId)) {
            completed.push(lessonId);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
            // Buluta kaydet
            if (typeof AuthModule !== 'undefined') {
                AuthModule.saveProgressToCloud(completed);
            }
        }
        updateUI();
    }

    function isCompleted(lessonId) {
        return getCompleted().includes(lessonId);
    }

    function getPercentage(allLessons) {
        const completed = getCompleted();
        if (!allLessons || allLessons.length === 0) return 0;
        return Math.round((completed.length / allLessons.length) * 100);
    }

    function getLevelPercentage(allLessons, level) {
        const completed = getCompleted();
        const levelLessons = allLessons.filter(l => l.level === level);
        if (levelLessons.length === 0) return 0;
        const done = levelLessons.filter(l => completed.includes(l.id)).length;
        return Math.round((done / levelLessons.length) * 100);
    }

    function reset() {
        localStorage.removeItem(STORAGE_KEY);
        if (typeof AuthModule !== 'undefined') {
            AuthModule.saveProgressToCloud([]); // Bulutta da sıfırla
        }
        updateUI();
    }
    
    function resetUIOnly() {
        // Yalnızca arayüzü günceller (Buluttan veri çekildiğinde kullanılır)
        updateUI();
    }

    function updateUI() {
        // Will be called by app.js after curriculum is loaded
        if (typeof App !== 'undefined' && App.updateProgress) {
            App.updateProgress();
        }
    }

    return { getCompleted, markComplete, isCompleted, getPercentage, getLevelPercentage, reset, resetUIOnly };
})();
