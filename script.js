// A simple array to store items and their costs (optional, but useful for management)
let items = [];
const listElement = document.getElementById('shoppingList');
const totalCostElement = document.getElementById('totalCost');

function addItem() {
    const input = document.getElementById('newItemInput');
    const itemName = input.value.trim();

    if (itemName === '') return;

    const newItem = {
        name: itemName,
        cost: 0,
        isCompleted: false
    };
    items.push(newItem);
    renderList();
    input.value = ''; // Clear input field
}

function renderList() {
    // Clear the current list displayed in HTML
    listElement.innerHTML = '';
    let total = 0;

    items.forEach((item, index) => {
        const li = document.createElement('li');
        
        // Add CSS class if completed
        if (item.isCompleted) {
            li.classList.add('completed');
            total += item.cost; // Only add completed items to final bill (adjust logic as needed)
        }

        // Display the item name
        li.innerHTML = `
            ${item.name} 
            (Cost: ₹<input type="number" step="0.01" value="${item.cost.toFixed(2)}" onchange="updateCost(${index}, this.value)">)
            <button onclick="toggleDone(${index})">${item.isCompleted ? 'Undo' : 'Mark Done'}</button>
        `;

        listElement.appendChild(li);
    });

    totalCostElement.textContent = total.toFixed(2);
}

function updateCost(index, newCost) {
    // Update the cost in the JS data structure
    items[index].cost = parseFloat(newCost) || 0;
    // Re-render to update total if the item is already marked done
    renderList(); 
}

function toggleDone(index) {
    // Toggle the completion status
    items[index].isCompleted = !items[index].isCompleted;
    // Re-render the list to update appearance and total cost
    renderList();
}
function calculateTotal() {
    // Get input values and convert them to floating-point numbers
    const electricity = parseFloat(document.getElementById('electricity').value) || 0;
    const gas = parseFloat(document.getElementById('gas').value) || 0;
    const food = parseFloat(document.getElementById('food').value) || 0;
    const internet = parseFloat(document.getElementById('internet').value) || 0;

    // Calculate the total sum
    const total = electricity + gas + food + internet;

    // Display the result in the 'totalCost' paragraph
    document.getElementById('totalCost').textContent = `₹ ${total.toFixed(2)}`;
}