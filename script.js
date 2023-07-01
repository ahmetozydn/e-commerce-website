const modeToggle = document.getElementById("mode-toggle");
const changeModeIcon = document.getElementById("change-mode")
const modeIcon = document.getElementById("change-mode-icon")
const body = document.body;
const firstIcon = document.getElementById("m");
const favIcon = document.getElementById('fav');
favIcon.innerHTML = 'star';
firstIcon.addEventListener('click', function () {
  firstIcon.classList.remove('fa-address-book');
  firstIcon.classList.add('fa-shopping-cart');
});

function change(t) {
  t.innerHTML = "star";
}

console.log("this is the first consolo message");

modeToggle.addEventListener("click", function () {
  body.classList.toggle("dark-mode");
  console.log('Icon clicked!');
});

/*changeModeIcon.addEventListener('click',function(){

  if(modeIcon.innerHTML === 'light_mode'){
    modeIcon.innerHTML = dark_mode;
    body.classList.toggle("dark-mode");
  }else{
    modeIcon.innerHTML= light_mode;
    body.classList.toggle("light-mode");

  }
});*/

let changeIcon = function (x) {
  x.innerHTML = dark_mode;
}

const icon = document.getElementById('myIcon');

icon.addEventListener('click', function () {
  // Perform your desired action here
  console.log('Icon clicked!');
});

function myFunction() {
  console.log("messages");
}

const button = document.getElementById('myButton');
const icon1 = document.getElementById('myIcon');

button.addEventListener('click', function () {
  button.classList.add('button-clicked');
  btn.style.backgroundColor = 'salmon';
  btn.style.color = 'white';
  // Toggle the icon between favorite and favorite_border
  if (icon1.innerHTML === 'favorite') {
    icon1.innerHTML = 'light_mode';
  } else {
    icon1.innerHTML = 'favorite';
  }
});

const button1 = document.getElementById('myButton');
const innerIcon = document.getElementById('innerIcon');

button1.addEventListener('click', function() {
  // Your click event handling code here
  innerIcon.innerHTML = 'star';
});

const span = document.getElementById('mySpan');

span.addEventListener('click', function() {
  // Your click event handling code here
  console.log('Span clicked!');
}); 

const iconAr = document.getElementById("iconArrow");

iconAr.addEventListener('click', function(){
 if(iconAr.innerHTML === "play_arrow"){
  iconAr.innerHTML = "home";
 }else{
  iconAr.innerHTML = "star";
 }
  }
  );

  function handleClick(){
    iconAr.classList.toggle("home");
    iconAr.textContent = "";
    iconAr.textContent = 'star';
    iconAr.innerHTML = 'star';
    console.log("everything is ok.!")
    iconAr.className = 'material-icons';

  }

  function changeIt(r){
    r.classList.add("fa-brightness");
    body.classList.toggle(dark-mode);
  }

function changeContent(icon){
  icon.classList.toggle("fa-moon");
  if (body.classList.contains('dark-mode')) {
    body.classList.remove('dark-mode');
  } else {
    body.classList.add('dark-mode');
  }


  /*icon.classList.remove("fa-sun");
  icon.classList.add("fa-moon");
  var name = icon.className;
  if(name == "fa-regular fa-sun"){
    body.classList.toggle(dark_mode);
    console.log(name); */
  }
