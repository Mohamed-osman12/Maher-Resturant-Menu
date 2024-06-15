document.addEventListener("DOMContentLoaded", function() {
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            const billContainer = document.getElementById('bill');
            let totalPrice = 0;

            data.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('item');

                const itemContent = `
                    <img src="${item.image}" alt="${item.name}">
                    <span>${item.name}</span>
                    <span>$${item.price.toFixed(2)}</span>
                `;

                itemElement.innerHTML = itemContent;
                billContainer.appendChild(itemElement);

                totalPrice += item.price;
            });

            document.getElementById('total-price').textContent = `$${totalPrice.toFixed(2)}`;
        })
        .catch(error => console.error('Error loading JSON:', error));
});
