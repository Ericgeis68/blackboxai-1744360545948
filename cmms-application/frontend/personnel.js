document.addEventListener('DOMContentLoaded', function() {
    const personnelList = document.getElementById('personnel-list');

    // Fetch personnel data
    fetch('/personnel')
        .then(response => response.json())
        .then(data => {
            data.forEach(personnel => {
                const div = document.createElement('div');
                div.textContent = `ID: ${personnel.id}, Name: ${personnel.name}, Certifications: ${personnel.certifications}`;
                personnelList.appendChild(div);
            });
        });

    // Add new personnel
    const addPersonnel = (name, certifications) => {
        fetch('/personnel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, certifications })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            location.reload(); // Reload to see the new personnel
        });
    };

    // Example of adding personnel (this can be replaced with form input)
    addPersonnel('New Personnel', 'Certification A');
});
