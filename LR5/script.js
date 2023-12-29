document.addEventListener("DOMContentLoaded", function () {
    var shoppingCartIcon = document.getElementById("shoppingCart");
    var cartItemCount = document.getElementById("cartItemCount");

    var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    updateCartItemCount();

    shoppingCartIcon.addEventListener("click", function () {
        if (cartItems.length === 0) {
            alert("Корзина пуста");
        } else {
            window.location.href = "cart/index.html";
        }
    });

    document.querySelectorAll(".avl").forEach(function (button) {
        button.addEventListener("click", function (event) {
            event.preventDefault();

            var panel = button.closest('.panel');
            var productName = panel.querySelector('.prod.bold').textContent;
            var productLink = panel.querySelector('.prod.bold a') ? panel.querySelector('.prod.bold a').href : '';
            var productPrice = getPrice(panel.querySelector('.costs.bold .price'));

            var quantity = prompt("Вкажіть кількість товару:");
            if (quantity !== null && quantity !== "") {
                if (!isNaN(quantity) && parseInt(quantity) > 0) {
                    addToCart(productLink, quantity, productName, productPrice);
                    alert("Товар додано");
                    updateCartItemCount();
                } else {
                    alert("Будь ласка, введіть дійсне число більше 0.");
                }
            }
        });
    });

    function updateCartItemCount() {
        cartItemCount.innerText = getUniqueItemCount();
    }

    function addToCart(productLink, quantity, productName, productPrice) {
        var item = {
            link: productLink,
            quantity: parseInt(quantity),
            name: productName,
            price: productPrice
        };
        cartItems.push(item);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }

    function getUniqueItemCount() {
        var uniqueItems = [];
        cartItems.forEach(function (item) {
            if (!uniqueItems.some(function (uniqueItem) {
                return uniqueItem.link === item.link;
            })) {
                uniqueItems.push(item);
            }
        });
        return uniqueItems.length;
    }

    function getPrice(element) {
        var priceString = element.innerText.trim().replace("грн", "");
        return parseFloat(priceString);
    }
});
