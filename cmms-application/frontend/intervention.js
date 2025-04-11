document.addEventListener('DOMContentLoaded', function() {
    const interventionList = document.getElementById('intervention-list');

    // Fetch intervention data
    fetch('/interventions')
        .then(response => response.json())
        .then(data => {
            data.forEach(intervention => {
                const div = document.createElement('div');
                div.textContent = `ID: ${intervention.id}, Equipment ID: ${intervention.equipment_id}, Description: ${intervention.description}`;
                interventionList.appendChild(div);
            });
        });

    // Add new intervention
    const addIntervention = (equipment_id, description) => {
        fetch('/interventions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ equipment_id, description })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            location.reload(); // Reload to see the new intervention
        });
    };

    // Example of adding intervention (this can be replaced with form input)
    addIntervention(1, 'New intervention for equipment 1');
});
