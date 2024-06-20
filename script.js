let cartItems = [];
let cartTotal = 0;

const cartBtn = document.getElementById('cart-btn');
const cart = document.getElementById('cart');
const cartItemsList = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');

function updateCartTotal() {
  cartTotal = 0;
  cartItems.forEach(item => {
    cartTotal += item.price * item.quantity;
  });
  cartTotalElement.textContent = `المجموع: ${cartTotal.toFixed(2)} ريال`;
}

function addToCart(item) {
  const existingItem = cartItems.find(i => i.id === item.id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartItems.push({ ...item, quantity: 1 });
  }
  updateCartTotal();
  displayCartItems();
}

function displayCartItems() {
  cartItemsList.innerHTML = '';
  cartItems.forEach(item => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span class="item-name">${item.name}</span>
      <span class="item-quantity">x ${item.quantity}</span>
      <span class="item-price">${item.price.toFixed(2)} ريال</span>
    `;
    cartItemsList.appendChild(listItem);
  });
}

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
        <button class="add-to-cart" data-item-id="${item.id}">إضافة</button>
      `;

      itemElement.innerHTML = itemContent;
      billContainer.appendChild(itemElement);
    });
  }

  // Add event listener for "Add to Cart" buttons
  document.querySelectorAll('.add-to-cart').forEach(addToCartBtn => {
    addToCartBtn.addEventListener('click', () => {
      const itemId = addToCartBtn.dataset.itemId;
      const itemData = allData.find(item => item.id === itemId);
      if (itemData) {
        addToCart(itemData);
      } else {
        console.error("Couldn't find item data for ID:", itemId);
      }
    });
  });
});
