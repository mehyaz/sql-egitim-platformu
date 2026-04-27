// ========== SCHEMA EXPLORER ==========
const SchemaExplorer = (function () {
    function render(dbName) {
        const container = document.getElementById('schema-content');
        if (!container) return;
        const schema = DatabaseEngine.getSchema(dbName);
        if (schema.length === 0) {
            container.innerHTML = '<p style="padding:1rem;color:var(--text-muted);font-size:0.8rem;">Tablo bulunamadı.</p>';
            return;
        }
        container.innerHTML = schema.map(table => `
            <div class="schema-table" data-table="${table.name}">
                <button class="schema-table-btn" onclick="SchemaExplorer.toggle('${table.name}')">
                    <span class="tbl-icon">📋</span>
                    ${table.name}
                    <span style="margin-left:auto;font-size:0.65rem;color:var(--text-muted)">${table.columns.length} sütun</span>
                </button>
                <div class="schema-columns">
                    ${table.columns.map(col => `
                        <div class="schema-col">
                            <span class="schema-col-name">
                                ${col.pk ? '🔑 ' : ''}${col.name}
                                ${col.fk ? '<span class="schema-col-key">FK ' + col.fk + '</span>' : ''}
                            </span>
                            <span class="schema-col-type">${col.type}${col.notNull ? ' NOT NULL' : ''}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }

    function toggle(tableName) {
        const el = document.querySelector(`.schema-table[data-table="${tableName}"]`);
        if (el) el.classList.toggle('expanded');
    }

    return { render, toggle };
})();
