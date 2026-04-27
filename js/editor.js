// ========== SQL EDITOR (Textarea-based with syntax-friendly styling) ==========
const SQLEditor = (function () {
    const editors = {};

    function create(containerId, placeholder) {
        const container = document.getElementById(containerId);
        if (!container) return null;
        container.innerHTML = '';
        const textarea = document.createElement('textarea');
        textarea.spellcheck = false;
        textarea.autocomplete = 'off';
        textarea.autocapitalize = 'off';
        textarea.placeholder = placeholder || '-- SQL sorgunuzu buraya yazın...\nSELECT * FROM tablo_adi;';
        textarea.addEventListener('keydown', function (e) {
            // Tab support
            if (e.key === 'Tab') {
                e.preventDefault();
                const start = this.selectionStart;
                const end = this.selectionEnd;
                this.value = this.value.substring(0, start) + '  ' + this.value.substring(end);
                this.selectionStart = this.selectionEnd = start + 2;
            }
            // Ctrl+Enter to run
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                const runEvent = new CustomEvent('editor-run', { detail: { id: containerId } });
                document.dispatchEvent(runEvent);
            }
        });
        container.appendChild(textarea);
        editors[containerId] = textarea;
        return textarea;
    }

    function getValue(containerId) {
        return editors[containerId] ? editors[containerId].value.trim() : '';
    }

    function setValue(containerId, value) {
        if (editors[containerId]) editors[containerId].value = value;
    }

    function clear(containerId) {
        if (editors[containerId]) editors[containerId].value = '';
    }

    function focus(containerId) {
        if (editors[containerId]) editors[containerId].focus();
    }

    return { create, getValue, setValue, clear, focus };
})();
