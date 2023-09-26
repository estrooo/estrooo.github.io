const btn = document.querySelector('.nav_menu-mobile-button');
const menu = document.querySelector('.nav_menu-wrapper');
btn.addEventListener('click', openMenu);
function openMenu() {
    menu.classList.toggle('w--open');
    btn.classList.toggle('menu__btn_active');
}