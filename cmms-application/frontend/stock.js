document.addEventListener('DOMContentLoaded', function() {
    const stockList = document.getElementById('stock-list');

    // Fetch stock data
    fetch('/stock')
        .then(response => response.json())
        .then(data => {
            data.forEach(stock => {
                const div = document.createElement('div');
                div.textContent = `ID: ${stock.id}, Part Name: ${stock.part_name}, Quantity: ${stock.quantity}`;
                stockList.appendChild(div);
            });
        });

    // Add new stock item
    const addStock = (part_name, quantity) => {
        fetch('/stock', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ part_name, quantity })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            location.reload(); // Reload to see the new stock item
        });
    };

    // Example of adding stock (this can be replaced with form input)
    addStock('New Part', 10);
});
