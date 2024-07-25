// toggle class active untuk hamburger menu
const navbarNav = document.querySelector(".navbar-nav");
// ketika hamburger menu di klik
document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");  
};

// toggle class active untuk search form 
  const searchform = document.querySelector('.search-form');
  const searchbox = document.querySelector('#search-box');

  document.querySelector("#search-button").onclick = (e) => {
    e.preventDefault(); // Mencegah aksi default
    searchform.classList.toggle("active");
    searchbox.focus();
};

// klik diluar sidebar untuk menghilangkan nav
const hamburger = document.querySelector('#hamburger-menu');

document.addEventListener('click', function(e){
  if(!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove('active'); 
  }
});

