document.addEventListener('DOMContentLoaded', function() {
    const equipmentList = document.getElementById('equipment-list');

    // Fetch equipment data
    fetch('/equipment')
        .then(response => response.json())
        .then(data => {
            data.forEach(equipment => {
                const div = document.createElement('div');
                div.textContent = `ID: ${equipment.id}, Name: ${equipment.name}, Description: ${equipment.description}`;
                equipmentList.appendChild(div);
            });
        });

    // Add new equipment
    const addEquipment = (name, description) => {
        fetch('/equipment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, description })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            location.reload(); // Reload to see the new equipment
        });
    };

    // Example of adding equipment (this can be replaced with form input)
    addEquipment('New Equipment', 'Description of new equipment');
});
