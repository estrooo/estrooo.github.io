var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

document.addEventListener("DOMContentLoaded", function () {
    displayCartItems();
});

function displayCartItems() {
    var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    var cartTableBody = document.getElementById("cartTableBody");
    var totalAmountElement = document.getElementById("totalAmount");

    cartTableBody.innerHTML = "";
    
    var totalAmount = 0;

    cartItems.forEach(function (item, index) {
        var row = document.createElement("tr");
        var productName = item.name;
        var productLink = item.link;
        var productPrice = item.price;
        var total = item.quantity * productPrice;

        row.innerHTML = "<td>" + (index + 1) + "</td><td><a href='" + productLink + "'>" + productName + "</a></td><td>" + productPrice + " грн</td><td><input type='number' value='" + item.quantity + "' min='1' onchange='updateQuantity(" + index + ", this.value)'></td><td>" + total + " грн</td><td><button class='delete-btn' onclick='deleteItem(" + index + ")'>Видалити</button></td>";
        cartTableBody.appendChild(row);

        totalAmount += total;
    });

    totalAmountElement.innerText = "Загальна сума: " + totalAmount + " грн";
}

function updateQuantity(index, newQuantity) {
    if (newQuantity > 0) {
        cartItems[index].quantity = parseInt(newQuantity);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        displayCartItems(); // Оновити відображення товарів у корзині
    }
}

function checkout() {
    alert("Оплата успішно виконана!");

    localStorage.removeItem("cartItems");
    displayCartItems(); // Оновити відображення товарів у корзині
}

function deleteItem(index) {
    cartItems.splice(index, 1);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    displayCartItems(); // Оновити відображення товарів у корзині
}
