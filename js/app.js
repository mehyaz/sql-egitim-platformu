// ========== MAIN APP CONTROLLER ==========
const App = (function () {
    let currentTab = 'lessons';

    async function init() {
        try {
            // Initialize database engine
            await DatabaseEngine.init();

            // Initialize lessons
            LessonsModule.init();

            // Initialize Auth and Teacher modules
            if (typeof AuthModule !== 'undefined') AuthModule.init();
            if (typeof TeacherModule !== 'undefined') TeacherModule.init();

            // Build sidebar navigation
            buildNavigation();

            // Initialize playground
            PlaygroundModule.init();

            // Bind events
            bindEvents();

            // Update progress display
            updateProgress();

            // Hide loading, show app
            document.getElementById('loading-screen').classList.add('hidden');
            document.getElementById('app').classList.remove('hidden');
        } catch (e) {
            console.error('Initialization error:', e);
            document.querySelector('.loading-text').textContent = 'Hata: ' + e.message;
            document.querySelector('.loading-bar-fill').style.background = 'var(--error)';
        }
    }

    function buildNavigation() {
        const nav = document.getElementById('curriculum-nav');
        const levels = [
            { key: 'beginner', label: 'Başlangıç', icon: '🟢', lessons: BeginnerLessons },
            { key: 'intermediate', label: 'Orta', icon: '🟡', lessons: IntermediateLessons },
            { key: 'advanced', label: 'İleri', icon: '🔴', lessons: AdvancedLessons }
        ];

        nav.innerHTML = levels.map(level => {
            // Group lessons by topic
            const topics = [];
            let currentTopic = null;
            level.lessons.forEach(lesson => {
                if (!currentTopic || currentTopic.topicId !== lesson.topicId) {
                    currentTopic = { topicId: lesson.topicId, title: lesson.topicTitle, lessons: [] };
                    topics.push(currentTopic);
                }
                currentTopic.lessons.push(lesson);
            });

            const pct = ProgressTracker.getLevelPercentage(LessonsModule.getAllLessons(), level.key);

            return `<div class="nav-level${level.key === 'beginner' ? ' expanded' : ''}" data-level="${level.key}">
                <button class="nav-level-btn${level.key === 'beginner' ? ' expanded' : ''}" onclick="App.toggleLevel('${level.key}')">
                    <span>${level.icon} ${level.label}</span>
                    <span class="level-indicator">${pct}%</span>
                    <span class="chevron">›</span>
                </button>
                <div class="nav-topics">
                    ${topics.map(topic => topic.lessons.map(lesson => {
                        const completed = ProgressTracker.isCompleted(lesson.id);
                        const assisted = ProgressTracker.isAssisted(lesson.id);
                        let statusClass = '';
                        if (completed && assisted) statusClass = ' assisted';
                        else if (completed) statusClass = ' completed';
                        
                        return `<button class="nav-topic-btn${statusClass}" data-lesson="${lesson.id}" onclick="App.openLesson('${lesson.id}')">
                            <span class="topic-check">${completed ? '✓' : ''}</span>
                            <span>${lesson.id} ${lesson.title}</span>
                        </button>`;
                    }).join('')).join('')}
                </div>
            </div>`;
        }).join('');
    }

    function bindEvents() {
        // Tab switching
        document.getElementById('tab-lessons').addEventListener('click', () => switchTab('lessons'));
        document.getElementById('tab-playground').addEventListener('click', () => switchTab('playground'));

        // Lesson buttons
        document.getElementById('btn-run-query').addEventListener('click', () => LessonsModule.runQuery());
        document.getElementById('btn-check-answer').addEventListener('click', () => LessonsModule.checkAnswer());
        document.getElementById('btn-hint').addEventListener('click', () => LessonsModule.showHint());
        document.getElementById('btn-solution').addEventListener('click', () => LessonsModule.showSolution());
        document.getElementById('btn-prev-lesson').addEventListener('click', () => LessonsModule.prevLesson());
        document.getElementById('btn-next-lesson').addEventListener('click', () => LessonsModule.nextLesson());

        // Playground buttons
        document.getElementById('btn-playground-run').addEventListener('click', () => PlaygroundModule.runQuery());
        document.getElementById('btn-playground-clear').addEventListener('click', () => PlaygroundModule.clearEditor());
        document.getElementById('btn-reset-db').addEventListener('click', () => PlaygroundModule.resetDatabase());
        document.getElementById('btn-clear-history').addEventListener('click', () => PlaygroundModule.clearHistory());

        // DB selector
        document.getElementById('playground-db-select').addEventListener('change', function () {
            PlaygroundModule.changeDatabase(this.value);
        });

        // Start learning button
        document.getElementById('start-learning-btn').addEventListener('click', () => {
            openLesson(LessonsModule.getAllLessons()[0].id);
        });

        // Sidebar toggle (mobile)
        document.getElementById('sidebar-toggle').addEventListener('click', toggleSidebar);
        document.getElementById('sidebar-overlay').addEventListener('click', closeSidebar);

        // Ctrl+Enter global handler
        document.addEventListener('editor-run', function (e) {
            if (e.detail.id === 'lesson-editor') LessonsModule.runQuery();
            else if (e.detail.id === 'playground-editor') PlaygroundModule.runQuery();
        });
    }

    function switchTab(tab) {
        currentTab = tab;
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelector(`[data-tab="${tab}"]`).classList.add('active');

        document.querySelectorAll('.view').forEach(v => v.classList.remove('active-view'));
        document.getElementById(`${tab}-view`).classList.add('active-view');

        // Show/hide sidebar
        const sidebar = document.getElementById('sidebar');
        if (tab === 'playground') {
            sidebar.style.display = 'none';
        } else {
            sidebar.style.display = '';
        }
    }

    function openLesson(lessonId) {
        if (currentTab !== 'lessons') switchTab('lessons');
        LessonsModule.loadLesson(lessonId);
        closeSidebar();
    }

    function toggleLevel(levelKey) {
        const el = document.querySelector(`.nav-level[data-level="${levelKey}"]`);
        const btn = el.querySelector('.nav-level-btn');
        el.classList.toggle('expanded');
        btn.classList.toggle('expanded');
    }

    function toggleSidebar() {
        document.getElementById('sidebar').classList.toggle('open');
    }

    function closeSidebar() {
        document.getElementById('sidebar').classList.remove('open');
    }

    function updateProgress() {
        const allLessons = LessonsModule.getAllLessons();
        const pct = ProgressTracker.getPercentage(allLessons);
        document.getElementById('progress-text').textContent = pct + '%';
        document.getElementById('progress-fill-mini').style.width = pct + '%';

        // Update level indicators
        ['beginner', 'intermediate', 'advanced'].forEach(level => {
            const levelEl = document.querySelector(`.nav-level[data-level="${level}"] .level-indicator`);
            if (levelEl) {
                levelEl.textContent = ProgressTracker.getLevelPercentage(allLessons, level) + '%';
            }
        });

        // Update nav topic buttons
        document.querySelectorAll('.nav-topic-btn').forEach(btn => {
            const lessonId = btn.getAttribute('data-lesson');
            if (lessonId) {
                const isCompleted = ProgressTracker.isCompleted(lessonId);
                const isAssisted = ProgressTracker.isAssisted(lessonId);
                
                btn.classList.remove('completed', 'assisted');
                
                if (isCompleted && isAssisted) btn.classList.add('assisted');
                else if (isCompleted) btn.classList.add('completed');
                
                const check = btn.querySelector('.topic-check');
                if (check) check.textContent = isCompleted ? '✓' : '';
            }
        });
    }

    return { init, openLesson, toggleLevel, updateProgress, switchTab };
})();

// Start the app
document.addEventListener('DOMContentLoaded', () => App.init());
