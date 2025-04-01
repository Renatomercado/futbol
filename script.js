let isDescending = true; // Controla si el ordenamiento es descendente o ascendente

function sortTable() {
    const table = document.getElementById("partidosTable");
    const rows = Array.from(table.rows).slice(1); // Ignorar encabezado
    const select = document.getElementById("orderBySelect");
    const columnIndex = select.value;

    // Función para comparar las filas
    rows.sort((a, b) => {
        const cellA = a.cells[columnIndex].innerText;
        const cellB = b.cells[columnIndex].innerText;

        // Comparar como números o cadenas
        if (!isNaN(cellA) && !isNaN(cellB)) {
            return (parseFloat(cellA) - parseFloat(cellB)) * (isDescending ? -1 : 1);
        } else {
            return cellA.localeCompare(cellB) * (isDescending ? -1 : 1);
        }
    });

    // Reinsertar las filas ordenadas en la tabla
    rows.forEach(row => table.appendChild(row));

    // Recalcular la columna "NO."
    recalculateRowNumbers();
}

function recalculateRowNumbers() {
    const table = document.getElementById("partidosTable");
    const rows = table.rows;
    for (let i = 1; i < rows.length; i++) {
        rows[i].cells[0].innerText = i; // Coloca el número en la primera columna (NO.)
    }
}

function toggleSortOrder() {
    isDescending = !isDescending; // Cambia el orden de los datos al presionar el combobox
    sortTable(); // Vuelve a ordenar la tabla con el nuevo orden
}

// Llamamos a la función toggleSortOrder cuando el combobox cambia
document.getElementById("orderBySelect").addEventListener('change', () => {
    toggleSortOrder();
});

