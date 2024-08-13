// script.js
document.addEventListener("DOMContentLoaded", function() {
    const calendarBody = document.getElementById("calendar-body");
    const daysInMonth = 31; // Например, календарь для августа
    const firstDay = 4; // Начнем с 1-го числа, которое выпадает на четверг (например, 1 августа 2024 г.)

    // Укажите дни, которые нужно выделить
    const highlightedDays = [5, 12, 19, 25];

    let date = 1;

    for (let i = 0; i < 6; i++) {
        // Создаем строки для недель
        const row = document.createElement("tr");

        for (let j = 0; j < 7; j++) {
            // Создаем ячейки для каждого дня
            const cell = document.createElement("td");

            if (i === 0 && j < firstDay) {
                // Пустые ячейки до первого дня
                cell.innerHTML = "";
            } else if (date > daysInMonth) {
                // Пустые ячейки после последнего дня
                cell.innerHTML = "";
            } else {
                // Создаем круг для каждого дня
                const dayCircle = document.createElement("div");
                dayCircle.className = "day-circle";
                dayCircle.innerHTML = date;

                // Проверка на выделенные дни
                if (highlightedDays.includes(date)) {
                    dayCircle.classList.add("highlighted");
                }

                cell.appendChild(dayCircle);
                date++;
            }

            row.appendChild(cell);
        }

        calendarBody.appendChild(row);
    }
});
