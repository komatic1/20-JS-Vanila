const menuItem = document.querySelectorAll('.menu_item');

console.log(menuItem);

menuItem.addEventListener('click', (el) => {
    console.log(el.target);
})