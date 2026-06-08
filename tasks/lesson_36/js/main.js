class Circle {
    constructor(radius) {
        this._radius = Math.max(0, parseFloat(radius) || 0);
    }

    get radius() {
        return this._radius;
    }

    set radius(value) {
        this._radius = Math.max(0, parseFloat(value) || 0);
    }

    get diameter() {
        return this._radius * 2;
    }

    area() {
        return Math.PI * this._radius * this._radius;
    }

    circumference() {
        return 2 * Math.PI * this._radius;
    }
}

class Marker {
    constructor(color, ink = 100) {
        this.color = color;
        this.ink = Math.max(0, Math.min(100, parseFloat(ink) || 0));
    }

    print(text) {
        let resultHtml = '';
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            if (char === ' ') {
                resultHtml += ' ';
            } else if (this.ink > 0) {
                const opacity = Math.max(0.1, this.ink / 100);
                resultHtml += `<span style="color: ${this.color}; opacity: ${opacity};">${char}</span>`;
                this.ink = Math.max(0, this.ink - 0.5);
            } else {
                break;
            }
        }
        return resultHtml;
    }
}

class RefillableMarker extends Marker {
    refill() {
        this.ink = 100;
    }
}

class Employee {
    constructor(name, position, department, salary) {
        this.name = name;
        this.position = position;
        this.department = department;
        this.salary = parseFloat(salary) || 0;
    }
}

class EmpTable {
    constructor(employees) {
        this.employees = employees;
    }

    getHtml() {
        if (!this.employees || this.employees.length === 0) {
            return '<div class="classes__table-empty">No employees in directory.</div>';
        }

        const rows = this.employees.map(emp => `
            <tr>
                <td>${emp.name}</td>
                <td>${emp.position}</td>
                <td>${emp.department}</td>
                <td>${emp.salary.toLocaleString()}</td>
            </tr>
        `).join('');

        return `
            <table class="classes__table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Department</th>
                        <th>Salary ($)</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows}
                </tbody>
            </table>
        `;
    }
}

$(document).ready(function () {
    const circle = new Circle(50);

    function updateCircleDemo() {
        const radiusVal = parseFloat($('#circle-radius').val()) || 0;
        circle.radius = radiusVal;

        $('#circle-diameter').text(circle.diameter.toFixed(2));
        $('#circle-area').text(circle.area().toFixed(2));
        $('#circle-circumference').text(circle.circumference().toFixed(2));

        const displaySize = Math.min(280, circle.radius * 2);
        $('#circle-visual').css({
            width: displaySize + 'px',
            height: displaySize + 'px'
        });
    }

    $('#circle-radius').on('input', updateCircleDemo);
    updateCircleDemo();

    let marker = new RefillableMarker('#2979ff', 100);

    function updateInkDisplay() {
        $('#ink-bar').css('width', marker.ink + '%');
        $('#ink-percent').text(Math.round(marker.ink) + '%');
    }

    $('#btn-print').on('click', function () {
        const text = $('#marker-text').val();
        const color = $('#marker-color').val();

        if (marker.color !== color) {
            marker.color = color;
        }

        if (text) {
            const printedHtml = marker.print(text);
            if (printedHtml) {
                $('#marker-paper').append(`<div>${printedHtml}</div>`);
                const paper = $('#marker-paper')[0];
                paper.scrollTop = paper.scrollHeight;
            }
            updateInkDisplay();
        }
    });

    $('#btn-refill').on('click', function () {
        marker.refill();
        updateInkDisplay();
    });

    updateInkDisplay();

    const employees = [
        new Employee('Alice Smith', 'Chief executive officer', 'Management', 15000),
        new Employee('Bob Jones', 'Lead developer', 'IT', 8000),
        new Employee('Charlie Brown', 'Branch manager', 'Retail banking', 5000),
        new Employee('Diana Prince', 'Security auditor', 'Compliance', 6000)
    ];

    function renderEmployeeTable() {
        const tableGen = new EmpTable(employees);
        $('#employee-table-container').html(tableGen.getHtml());
    }

    $('#employee-form').on('submit', function (e) {
        e.preventDefault();
        const name = $('#emp-name').val().trim();
        const position = $('#emp-position').val().trim();
        const dept = $('#emp-dept').val().trim();
        const salary = parseFloat($('#emp-salary').val()) || 0;

        if (name && position && dept && salary > 0) {
            employees.push(new Employee(name, position, dept, salary));
            renderEmployeeTable();
            $('#employee-form')[0].reset();
        }
    });

    renderEmployeeTable();
});
