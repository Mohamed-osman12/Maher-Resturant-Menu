document.addEventListener("DOMContentLoaded", function() {
    let allData = [];

    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            allData = data;
            displayCategory('m'); // عرض البيانات الخاصة بالتصنيف "main" عند التحميل الأول
        })
        .catch(error => console.error('Error loading JSON:', error));

    document.querySelectorAll('.category-btn').forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            displayCategory(category);
        });
    });

    function displayCategory(category) {
        const billContainer = document.getElementById('bill');
        billContainer.innerHTML = ''; // مسح المحتوى السابق

        const filteredData = allData.filter(item => item.category === category);

        filteredData.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('item');

            const itemContent = `
                <img src="${item.image}" alt="${item.name}">
                <span class="name">${item.name}</span>
                <span class="price">${item.price.toFixed(2)} ج.م</span>
            `;

            itemElement.innerHTML = itemContent;
            billContainer.appendChild(itemElement);
        });
    }
});
