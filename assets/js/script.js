// navbar toggling
const navbarShowBtn = document.querySelector('.navbar-show-btn');
const navbarCollapseDiv = document.querySelector('.navbar-collapse');
const navbarHideBtn = document.querySelector('.navbar-hide-btn');

navbarShowBtn.addEventListener('click', function(){
    navbarCollapseDiv.classList.add('navbar-show');
});
navbarHideBtn.addEventListener('click', function(){
    navbarCollapseDiv.classList.remove('navbar-show');
});


// stopping all animation and transition
let resizeTimer;
window.addEventListener('resize', () =>{
    document.body.classList.add('resize-animation-stopper');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove('resize-animation-stopper');
    }, 400);
});


document.getElementById('scrollToContact').addEventListener('click', function(e) {
    e.preventDefault(); // Impede o comportamento padrão do link
    document.getElementById('footer').scrollIntoView({
        behavior: 'smooth', // Para rolar suavemente
        block: 'start' // Para alinhar o topo da seção
    });
});


document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("scrollToAbout").addEventListener("click", function(e) {
        e.preventDefault();
        document.getElementById("about").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});

