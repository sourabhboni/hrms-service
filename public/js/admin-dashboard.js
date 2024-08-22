document.addEventListener('DOMContentLoaded', function () {
    // Example of handling clicks on the dashboard
    const createEmployeeButton = document.getElementById('create-employee-btn');
    const viewEmployeesButton = document.getElementById('view-employees-btn');
    const logoutButton = document.getElementById('logout-btn');

    if (createEmployeeButton) {
        createEmployeeButton.addEventListener('click', function () {
            window.location.href = '/admin/create-employee';
        });
    }

    if (viewEmployeesButton) {
        viewEmployeesButton.addEventListener('click', function () {
            window.location.href = '/admin/employees';
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', function (event) {
            event.preventDefault();
            fetch('/admin/logout', { method: 'GET' })
                .then(() => {
                    window.location.href = '/admin/login';
                })
                .catch(error => {
                    console.error('Logout failed:', error);
                });
        });
    }

    // You can add more event listeners here based on the functionality required on the admin dashboard
});
