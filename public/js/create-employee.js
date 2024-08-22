document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            department: formData.get('department'),
            email: formData.get('email'),
            password: formData.get('password'),
            role: formData.get('role')
        };

        fetch('/admin/create-employee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert(data.message);
                form.reset();
            } else {
                alert('Error creating employee: ' + (data.error || 'Unknown error'));
            }
        })
        .catch(error => {
            console.error('Error creating employee:', error);
            alert('Failed to create employee. Please try again later.');
        });
    });
});
