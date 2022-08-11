const toggle = document.getElementById('toggle')
const a = document.getElementById('a')
const b = document.getElementById('b')
const c = document.getElementById('c')
const d = document.getElementById('d')
const nav = document.getElementById('nav')

function openAis(){
    window.location.href = ("../SecretViewPlay/SecretViewPlay.html");
}

toggle.addEventListener('click', ()=>  {
    nav.classList.toggle('active');
    setTimeout(close,1200);
})

a.addEventListener('click', ()=>  {
    nav.classList.toggle('active');
    setTimeout(openAis,1200);
})

b.addEventListener('click', ()=>  nav.classList.toggle('active'))
c.addEventListener('click', ()=>  nav.classList.toggle('active'))
