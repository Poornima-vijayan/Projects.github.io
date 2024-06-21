const nav = document.querySelector("nav");
const togglebtn = document.querySelector('.toggle-btn');
togglebtn.addEventListener("click", ()=>{
    nav.classList.toggle('open');
});

