'use strict';

const editorView = document.getElementById('editor-view');

document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key.toLowerCase() === 'e') {
        e.preventDefault();
        const currentView = document.getElementById('editor-view');
        if (currentView) {
            const textarea = document.createElement('textarea');
            textarea.className = 'editor__textarea';
            textarea.id = 'editor-textarea';
            textarea.value = currentView.innerText;
            
            currentView.replaceWith(textarea);
            textarea.focus();
        }
    }
    
    if (e.ctrlKey && e.key.toLowerCase() === 's') {
        e.preventDefault();
        const textarea = document.getElementById('editor-textarea');
        if (textarea) {
            editorView.innerText = textarea.value;
            textarea.replaceWith(editorView);
        }
    }
});

const table = document.getElementById('sortable-table');
const headers = table.querySelectorAll('.table__header');
const tbody = document.getElementById('table-body');
let sortDirection = true;
let lastSortedColumn = -1;

headers.forEach((header, index) => {
    header.addEventListener('click', () => {
        const rows = Array.from(tbody.querySelectorAll('.table__row'));

        if (lastSortedColumn === index) {
            sortDirection = !sortDirection;
        } else {
            sortDirection = true;
            lastSortedColumn = index;
        }

        headers.forEach(h => h.classList.remove('table__header--asc', 'table__header--desc'));
        header.classList.add(sortDirection ? 'table__header--asc' : 'table__header--desc');

        rows.sort((rowA, rowB) => {
            const cellsA = rowA.querySelectorAll('.table__cell');
            const cellsB = rowB.querySelectorAll('.table__cell');
            const cellA = cellsA[index].innerText;
            const cellB = cellsB[index].innerText;

            const valA = isNaN(cellA) ? cellA.toLowerCase() : parseFloat(cellA);
            const valB = isNaN(cellB) ? cellB.toLowerCase() : parseFloat(cellB);

            if (typeof valA === 'number' && typeof valB === 'number') {
                return sortDirection ? valA - valB : valB - valA;
            }

            return sortDirection 
                ? valA.toString().localeCompare(valB.toString())
                : valB.toString().localeCompare(valA.toString());
        });

        rows.forEach(row => tbody.appendChild(row));
    });
});

const box = document.getElementById('resizable-box');
const handle = document.getElementById('resize-handle');
let isResizing = false;

handle.addEventListener('mousedown', (e) => {
    e.preventDefault();
    isResizing = true;
    box.classList.add('resizable--resizing');
});

document.addEventListener('mousemove', (e) => {
    if (!isResizing) return;

    const rect = box.getBoundingClientRect();
    const newWidth = e.clientX - rect.left;
    const newHeight = e.clientY - rect.top;

    box.style.width = Math.max(150, newWidth) + 'px';
    box.style.height = Math.max(100, newHeight) + 'px';
});

document.addEventListener('mouseup', () => {
    if (isResizing) {
        isResizing = false;
        box.classList.remove('resizable--resizing');
    }
});
