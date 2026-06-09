class User {
    constructor(name, role, password) {
        if (!name || typeof name !== 'string' || name.trim() === '') {
            alert('Incorrect field entered: name');
            throw new Error('Incorrect field entered: name');
        }
        if (role !== 'admin' && role !== 'user') {
            alert('Incorrect field entered: role');
            throw new Error('Incorrect field entered: role');
        }
        if (!password || typeof password !== 'string' || password.trim() === '') {
            alert('Incorrect field entered: password');
            throw new Error('Incorrect field entered: password');
        }

        this.name = name.trim();
        this.role = role;

        Object.defineProperty(this, 'password', {
            value: password,
            writable: true,
            enumerable: false,
            configurable: true
        });

        Object.defineProperty(this, 'isLoggedIn', {
            value: false,
            writable: true,
            enumerable: false,
            configurable: true
        });
    }

    getName() {
        return this.name;
    }

    getRole() {
        return this.role;
    }

    login(password) {
        if (this.password === password) {
            this.isLoggedIn = true;
            return true;
        }
        alert('Incorrect field entered: password');
        return false;
    }

    logout() {
        this.isLoggedIn = false;
    }

    changeName(newName) {
        if (!newName || typeof newName !== 'string' || newName.trim() === '') {
            alert('Incorrect field entered: name');
            return false;
        }
        this.name = newName.trim();
        return true;
    }

    changePassword(oldPassword, newPassword) {
        if (this.password !== oldPassword) {
            alert('Incorrect field entered: password (old password does not match)');
            return false;
        }
        if (!newPassword || typeof newPassword !== 'string' || newPassword.trim() === '') {
            alert('Incorrect field entered: password');
            return false;
        }
        this.password = newPassword;
        return true;
    }
}

class Admin extends User {
    constructor(name, password) {
        super(name, 'admin', password);

        Object.defineProperty(this, 'users', {
            value: [],
            writable: true,
            enumerable: false,
            configurable: true
        });
    }

    addUser(user) {
        if (!(user instanceof User)) {
            alert('Incorrect field entered: user');
            return;
        }
        if (this.users.some(u => u.name.toLowerCase() === user.name.toLowerCase())) {
            alert('User with this name already exists');
            return;
        }
        this.users.push(user);
    }

    removeUser(username) {
        const index = this.users.findIndex(u => u.name === username);
        if (index !== -1) {
            this.users[index].logout();
            this.users.splice(index, 1);
            return true;
        }
        alert('User not found');
        return false;
    }

    changeUserRole(username, newRole) {
        const user = this.users.find(u => u.name === username);
        if (user) {
            if (newRole !== 'admin' && newRole !== 'user') {
                alert('Incorrect field entered: role');
                return false;
            }
            user.role = newRole;
            return true;
        }
        alert('User not found');
        return false;
    }

    getAllUsers() {
        return this.users;
    }

    removeAllUsers() {
        this.users.forEach(u => u.logout());
        this.users = [];
    }
}

class WorldClock {
    constructor(timezoneName, offsetHours) {
        this.timezoneName = timezoneName;
        this.offsetHours = parseFloat(offsetHours) || 0;
        this.id = 'clock-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
        this.element = null;
    }

    getCurrentTime() {
        const now = new Date();
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const targetDate = new Date(utc + (3600000 * this.offsetHours));

        let hours = targetDate.getHours().toString().padStart(2, '0');
        let minutes = targetDate.getMinutes().toString().padStart(2, '0');
        let seconds = targetDate.getSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    }

    getCurrentDate() {
        const now = new Date();
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const targetDate = new Date(utc + (3600000 * this.offsetHours));

        return targetDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    getCurrentDateTime() {
        const now = new Date();
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const targetDate = new Date(utc + (3600000 * this.offsetHours));

        return targetDate.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
    }

    deleteClock(onDeleteCallback) {
        if (this.element) {
            this.element.remove();
        }
        if (onDeleteCallback) {
            onDeleteCallback(this.id);
        }
    }
}

$(document).ready(function () {
    const systemAdmin = new Admin('SystemAdmin', 'admin123');

    systemAdmin.addUser(new User('Petro', 'admin', 'petro123'));
    systemAdmin.addUser(new User('Liliia', 'user', 'liliia123'));
    systemAdmin.addUser(new User('Ivan', 'user', 'ivan123'));

    function renderUserTable() {
        const users = systemAdmin.getAllUsers();
        if (users.length === 0) {
            $('#users-table-container').html('<div class="classes__table-empty">No users registered in the directory.</div>');
            return;
        }

        const rows = users.map(user => {
            const roleBadge = user.getRole() === 'admin' 
                ? '<span class="classes__badge classes__badge--admin">Admin</span>' 
                : '<span class="classes__badge classes__badge--user">User</span>';
            
            const statusBadge = user.isLoggedIn 
                ? '<span class="classes__badge classes__badge--online">Online</span>' 
                : '<span class="classes__badge classes__badge--offline">Offline</span>';

            const authBtnText = user.isLoggedIn ? 'Logout' : 'Login';
            const authBtnClass = user.isLoggedIn ? 'classes__btn--secondary' : '';

            return `
                <tr data-username="${user.getName()}">
                    <td><strong>${user.getName()}</strong></td>
                    <td>${roleBadge}</td>
                    <td>${statusBadge}</td>
                    <td>
                        <div class="classes__table-actions">
                            <button class="classes__btn classes__btn--small ${authBtnClass} btn-user-auth">${authBtnText}</button>
                            <button class="classes__btn classes__btn--small classes__btn--secondary btn-user-name">Name</button>
                            <button class="classes__btn classes__btn--small classes__btn--secondary btn-user-pass">Password</button>
                            <button class="classes__btn classes__btn--small classes__btn--secondary btn-user-role">Role</button>
                            <button class="classes__btn classes__btn--small classes__btn--danger btn-user-remove">Remove</button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');

        $('#users-table-container').html(`
            <table class="classes__table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows}
                </tbody>
            </table>
        `);
    }

    $('#user-form').on('submit', function (e) {
        e.preventDefault();
        const name = $('#user-name').val();
        const role = $('#user-role').val();
        const password = $('#user-password').val();

        try {
            const newUser = new User(name, role, password);
            systemAdmin.addUser(newUser);
            renderUserTable();
            $('#user-form')[0].reset();
        } catch (err) {
            console.error('Failed to create user:', err);
        }
    });

    $('#users-table-container').on('click', '.btn-user-auth', function () {
        const username = $(this).closest('tr').data('username');
        const user = systemAdmin.getAllUsers().find(u => u.getName() === username);

        if (user) {
            if (user.isLoggedIn) {
                user.logout();
                renderUserTable();
            } else {
                const pass = prompt(`Enter password for ${user.getName()}:`);
                if (pass !== null) {
                    if (user.login(pass)) {
                        renderUserTable();
                    }
                }
            }
        }
    });

    $('#users-table-container').on('click', '.btn-user-name', function () {
        const username = $(this).closest('tr').data('username');
        const user = systemAdmin.getAllUsers().find(u => u.getName() === username);

        if (user) {
            const newName = prompt(`Enter new username for ${user.getName()}:`, user.getName());
            if (newName !== null) {
                if (user.changeName(newName)) {
                    renderUserTable();
                }
            }
        }
    });

    $('#users-table-container').on('click', '.btn-user-pass', function () {
        const username = $(this).closest('tr').data('username');
        const user = systemAdmin.getAllUsers().find(u => u.getName() === username);

        if (user) {
            const oldPass = prompt('Enter current password:');
            if (oldPass !== null) {
                const newPass = prompt('Enter new password:');
                if (newPass !== null) {
                    if (user.changePassword(oldPass, newPass)) {
                        alert('Password changed successfully!');
                        renderUserTable();
                    }
                }
            }
        }
    });

    $('#users-table-container').on('click', '.btn-user-role', function () {
        const username = $(this).closest('tr').data('username');
        const user = systemAdmin.getAllUsers().find(u => u.getName() === username);

        if (user) {
            const currentRole = user.getRole();
            const newRole = currentRole === 'admin' ? 'user' : 'admin';
            if (confirm(`Change role of ${user.getName()} from ${currentRole} to ${newRole}?`)) {
                if (systemAdmin.changeUserRole(username, newRole)) {
                    renderUserTable();
                }
            }
        }
    });

    $('#users-table-container').on('click', '.btn-user-remove', function () {
        const username = $(this).closest('tr').data('username');
        if (confirm(`Are you sure you want to remove user ${username}?`)) {
            if (systemAdmin.removeUser(username)) {
                renderUserTable();
            }
        }
    });

    $('#btn-remove-all').on('click', function () {
        if (confirm('Are you sure you want to delete all users from the directory?')) {
            systemAdmin.removeAllUsers();
            renderUserTable();
        }
    });

    renderUserTable();

    let clockList = [];

    $('#clock-timezone').on('change', function () {
        if ($(this).val() === 'custom') {
            $('#custom-offset-group').slideDown(200);
        } else {
            $('#custom-offset-group').slideUp(200);
        }
    });

    function createClockCard(clock) {
        const formattedOffset = clock.offsetHours >= 0 ? `UTC+${clock.offsetHours}` : `UTC${clock.offsetHours}`;
        
        const cardHtml = `
            <div class="classes__card classes__card--clock" id="${clock.id}">
                <div class="classes__clock-header">
                    <h4 class="classes__clock-title">${clock.timezoneName}</h4>
                    <span class="classes__clock-offset">${formattedOffset}</span>
                </div>
                <div class="classes__clock-display">
                    <div class="classes__clock-time" id="time-${clock.id}">${clock.getCurrentTime()}</div>
                </div>
                 <div class="classes__clock-output classes__clock-hidden" id="output-${clock.id}">&nbsp;</div>
                <div class="classes__btn-row">
                    <button class="classes__btn classes__btn--small btn-clock-time">Time</button>
                    <button class="classes__btn classes__btn--small btn-clock-date">Date/time</button>
                </div>
                <button class="classes__btn classes__btn--danger classes__btn--small btn-clock-delete" style="width: 100%; margin-top: 5px;">Delete clock</button>
            </div>
        `;

        const $card = $(cardHtml);

        $card.find('.btn-clock-time').on('click', function () {
            const timeStr = clock.getCurrentTime();
            $(`#output-${clock.id}`).html(`<strong>Formatted time:</strong><br>${timeStr}`).removeClass('classes__clock-hidden');
        });

        $card.find('.btn-clock-date').on('click', function () {
            const dateTimeStr = clock.getCurrentDateTime();
            $(`#output-${clock.id}`).html(`<strong>Current date and time:</strong><br>${dateTimeStr}`).removeClass('classes__clock-hidden');
        });

        $card.find('.btn-clock-delete').on('click', function () {
            clock.deleteClock(function (id) {
                clockList = clockList.filter(c => c.id !== id);
            });
        });

        clock.element = $card[0];
        $('#clock-wall').append($card);
    }

    $('#clock-form').on('submit', function (e) {
        e.preventDefault();
        const city = $('#clock-city').val().trim();
        const presetVal = $('#clock-timezone').val();
        
        let offset = 0;
        if (presetVal === 'custom') {
            offset = parseFloat($('#clock-offset').val()) || 0;
        } else {
            offset = parseFloat(presetVal);
        }

        if (city) {
            const clock = new WorldClock(city, offset);
            clockList.push(clock);
            createClockCard(clock);
            $('#clock-form')[0].reset();
            $('#custom-offset-group').hide();
        }
    });

    const initialClocksData = [
        { name: 'Kyiv', offset: 3 },
        { name: 'London', offset: 0 },
        { name: 'New York', offset: -4 },
        { name: 'Tokyo', offset: 9 }
    ];

    initialClocksData.forEach(data => {
        const clock = new WorldClock(data.name, data.offset);
        clockList.push(clock);
        createClockCard(clock);
    });

    setInterval(function () {
        clockList.forEach(clock => {
            $(`#time-${clock.id}`).text(clock.getCurrentTime());
        });
    }, 1000);
});
