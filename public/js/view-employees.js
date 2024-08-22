document.addEventListener('DOMContentLoaded', function () {
    // Fetch and display the list of employees
    fetch('/admin/employees')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const employeeList = document.getElementById('employee-list');
            if (data.employees && data.employees.length > 0) {
                data.employees.forEach(employee => {
                    const listItem = document.createElement('li');
                    listItem.textContent = `${employee.name} - ${employee.email} - ${employee.department} - ${employee.role}`;
                    employeeList.appendChild(listItem);
                });
            } else {
                employeeList.innerHTML = '<li>No employees found.</li>';
            }
        })
        .catch(error => {
            // Log the error to the console for debugging purposes
            console.error('Error fetching employees:', error);
            // Optionally, you could add some UI feedback here
            // Example: Display a message on the page
            const employeeList = document.getElementById('employee-list');
            employeeList.innerHTML = '<li>Failed to load employees. Please try again later.</li>';
        });
});
