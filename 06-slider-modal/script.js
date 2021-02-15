const toggle = document.querySelector('#toggle');
const close = document.querySelector('#close');
const open = document.querySelector('#open');
const modal = document.querySelector('#modal');

// toggle navigation
toggle.addEventListener('click', () => document.body.classList.toggle('show-nav'));

// show modal
open.addEventListener('click', () => modal.classList.add('show-modal'));

// hide modal
close.addEventListener('click', () => modal.classList.remove('show-modal'));

// hide modal outside click
window.addEventListener('click', e => e.target == modal ? modal.classList.remove('show-modal') : false);