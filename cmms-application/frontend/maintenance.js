document.addEventListener('DOMContentLoaded', function() {
    const maintenanceList = document.getElementById('maintenance-list');

    // Fetch maintenance data
    fetch('/maintenance')
        .then(response => response.json())
        .then(data => {
            data.forEach(maintenance => {
                const div = document.createElement('div');
                div.textContent = `ID: ${maintenance.id}, Equipment ID: ${maintenance.equipment_id}, Schedule Date: ${maintenance.schedule_date}`;
                maintenanceList.appendChild(div);
            });
        });

    // Add new maintenance
    const addMaintenance = (equipment_id, schedule_date) => {
        fetch('/maintenance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ equipment_id, schedule_date })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            location.reload(); // Reload to see the new maintenance
        });
    };

    // Example of adding maintenance (this can be replaced with form input)
    addMaintenance(1, '2023-12-01T10:00:00');
});
