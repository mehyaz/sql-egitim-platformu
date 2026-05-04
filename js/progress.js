// ========== PROGRESS TRACKER ==========
const ProgressTracker = (function () {
    const STORAGE_KEY = 'sql_egitim_progress';
    const ASSISTED_KEY = 'sql_egitim_assisted';

    function getCompleted() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        } catch { return []; }
    }

    function getAssisted() {
        try {
            return JSON.parse(localStorage.getItem(ASSISTED_KEY)) || [];
        } catch { return []; }
    }

    function markComplete(lessonId, isAssisted = false) {
        const completed = getCompleted();
        const assisted = getAssisted();
        let changed = false;

        if (!completed.includes(lessonId)) {
            completed.push(lessonId);
            changed = true;
        }

        if (isAssisted && !assisted.includes(lessonId)) {
            assisted.push(lessonId);
            changed = true;
        } else if (!isAssisted && assisted.includes(lessonId)) {
            // Kendi başına çözdüyse yardımlılardan çıkar
            assisted.splice(assisted.indexOf(lessonId), 1);
            changed = true;
        }

        if (changed) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
            localStorage.setItem(ASSISTED_KEY, JSON.stringify(assisted));
            // Buluta kaydet
            if (typeof AuthModule !== 'undefined') {
                AuthModule.saveProgressToCloud(completed, assisted);
            }
        }
        updateUI();
    }

    function isCompleted(lessonId) {
        return getCompleted().includes(lessonId);
    }

    function isAssisted(lessonId) {
        return getAssisted().includes(lessonId);
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
        localStorage.removeItem(ASSISTED_KEY);
        if (typeof AuthModule !== 'undefined') {
            AuthModule.saveProgressToCloud([], []); // Bulutta da sıfırla
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

    return { getCompleted, getAssisted, markComplete, isCompleted, isAssisted, getPercentage, getLevelPercentage, reset, resetUIOnly };
})();
