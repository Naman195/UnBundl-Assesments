const chocolateOptions = [
    { name: 'Dark Chocolate', price: 50 },
    { name: 'Milk Chocolate', price: 30 },
    { name: 'White Chocolate', price: 35 },
    { name: 'Oreo', price: 60 },
    { name: 'Kitkat', price: 55 },
    { name: 'BlueLagoon Chocolate', price: 88 },
    { name: 'WhiteLagoon Chocolate', price: 50 },
    { name: 'Light Dark', price: 15 },
    { name: 'Snakkers', price: 20 }
];

const selectedChocolates = [];
let totalPrice = 0;

document.addEventListener('DOMContentLoaded', function () {
    renderChocolateOptions();
});

function renderChocolateOptions() {
    const optionsContainer = document.getElementById('chocolate-options');
    chocolateOptions.forEach(chocolate => {
        const wrapper = document.createElement('div');

        const label = document.createElement('label');
        label.textContent = `${chocolate.name} - RS ${chocolate.price.toFixed(2)}`;

        const addButton = document.createElement('button');
        addButton.textContent = 'Add';
        addButton.addEventListener('click', () => handleAddClick(chocolate));

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => handleRemoveClick(chocolate));
       

        wrapper.appendChild(label);
        wrapper.appendChild(addButton);
        wrapper.appendChild(removeButton);
        optionsContainer.appendChild(wrapper);
    });
}




function handleAddClick(chocolate) {
    if (selectedChocolates.length < 8) {
        selectedChocolates.push({ ...chocolate, quantity: 1 });
        totalPrice += chocolate.price;
        renderSelectedChocolates();
    } else {
        // Display the modal
        const modal = document.getElementById('myModal');
        modal.style.display = 'block';

        
        const span = document.querySelector('.close');
        span.onclick = closeModal;

        
        window.onclick = function (event) {
            if (event.target === modal) {
                closeModal();
            }
        };
    }
}

function closeModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
}








function handleRemoveClick(chocolate) {
    const index = selectedChocolates.findIndex(choco => choco.name === chocolate.name);

    if (index !== -1) {
        selectedChocolates.splice(index, 1);
        totalPrice -= chocolate.price;
        renderSelectedChocolates();
    }
}

function renderSelectedChocolates() {
    const selectedList = document.getElementById('selected-list');
    selectedList.innerHTML = '';

    selectedChocolates.forEach(chocolate => {
        const listItem = document.createElement('li');
        listItem.textContent = `${chocolate.name} - RS ${chocolate.price.toFixed(2)}`;
        selectedList.appendChild(listItem);
    });

    const totalPriceElement = document.getElementById('total-price');
    totalPriceElement.textContent = totalPrice.toFixed(2);
}
