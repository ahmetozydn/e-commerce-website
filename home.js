
document.addEventListener('DOMContentLoaded', fetchData);

fetch('navigation.html')
    .then(response => response.text())
    .then(data => {
        // Insert the navigation code into the placeholder div
        document.getElementById('navigation-placeholder').innerHTML = data;
        const parentContainer = document.getElementById('navigation-placeholder');
        parentContainer.addEventListener('click', function (event) {
            // Check if the clicked element matches the desired selector
            if (event.target.matches('.button__badge')) {
                // Handle the event for the dynamically created element
                window.location.href = './cart.html'
            }
        });
        const jsonArray = JSON.parse(localStorage.getItem('IDs'));

        $('.button__badge').text(jsonArray.length)
        console.log("navigation here.....  " + jsonArray.lenght)

        $('.website-name').click(function () {
            window.location.href = "./home.html";
        })
        $('#openCart').click(function () {
            window.location.href = "./cart.html"
        })

        $('#search-button').on('click', function () {

            if ($('#search-input').val()) {
            window.location.href = "./search.html?search="+$('#search-input').val();

               /*  console.log($('#search-input').val());
                searchTerm = $('#search-input').val();
                const results = jsonData.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.size.toLowerCase().includes(searchTerm.toLowerCase()) || item.color.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.camera.toLowerCase().includes(searchTerm.toLowerCase()) || item.Description.toLowerCase().includes(searchTerm.toLowerCase())
                ); */
            }
        });
    });
    let jsonData;
    async function fetchData() {
        const apiUrl = 'http://localhost:5050/api';

        try {
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }

            jsonData = await response.json();
            displayData(jsonData);

            console.log(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    }

function displayData(jsonData) {
    const mainCardContainer = document.getElementById('main-card-container');
    jsonData.forEach(element => {
        const content = `
<p>this is a paraghraph ${element.name}</p>
`
        const innerContent = `
<div id="card-container" class="card" style="width: 250px; height: 400px; margin: 10px;">
  <div class="card-content">
    
      <img src="${element.productImage}"; width : 250px; height : 250px; />
    <p>${element.name}</p>
    <p>$${element.price}</p>

  </div>
  <div>
  </div>
  `
        mainCardContainer.innerHTML += innerContent;
    });


}


$('.prev-button').on('click',function(){
    content.scrollBy({
        left: -100, // Adjust this value to control the scroll amount
        behavior: "smooth", // For smooth scrolling
      });
})
$('.next-button').on('click',function(){
    content.scrollBy({
        left: -100, // Adjust this value to control the scroll amount
        behavior: "smooth", // For smooth scrolling
      });
})
  

const mainCardContainer = document.getElementById('main-card-container');

const prefersDarkMode = localStorage.getItem('dark-mode-preference');
if (prefersDarkMode === 'dark') {
    document.body.classList.toggle('dark-mode');
    mainCardContainer.classList.toggle('dark-mode');
    $('*').css('color', 'white');
    $('*').css('background-color', 'black');
    //header.classList.toggle('dark-mode');
}

$("#refresh-page").on('click', function () {
    //location.reload();
    window.location.href = './home.html';
});
//const container = document.getElementById('json-container');
/* fetch('./data/products.json')
   .then(response => response.json())
   .then(data => {
     // Get the container element


     //const eachJSON = JSON.parse(data);
     //let x = JSON.stringify(eachJSON,null,2)

     // Loop through the attributes of the JSON object

     for (let key in data) {

       console.log(data[key].name);
       //document.getElementById('name').textContent = data[key].name;
       //document.getElementById('description').textContent = data[key].price;
       //container.appendChild(document.getElementById("name"));
       //container.appendChild(document.getElementById("description"));
       const content = `
<p>this is a paraghraph ${data[key].name}</p>
`

       // Get the paragraph element by ID

       const innerContent = `
<div id="card-container" class="card" style="width: 180px; height: 300px; background-color: beige;">
 <div class="card-content">
   <p>${data[key].name}</p>
   <img src="${data[key].productImage}" />
 </div>
 <div>
   <p>${data[key].price}</p>
   <p></p>
 </div>
 `
       mainCardContainer.innerHTML += innerContent;

       //container.innerHTML += content;
     }

   })
   .catch(error => {
     console.log('Error:', error);
   });
*/

let isMouseDown = false;
let startX;
let scrollLeft;

const cardContainer = document.querySelector('#main-card-container');

cardContainer.addEventListener('mousedown', (event) => {
    isMouseDown = true;
    startX = event.pageX - cardContainer.offsetLeft;
    scrollLeft = cardContainer.scrollLeft;
});

cardContainer.addEventListener('mouseleave', () => {
    isMouseDown = false;
});

cardContainer.addEventListener('mouseup', () => {
    isMouseDown = false;
});

cardContainer.addEventListener('mousemove', (event) => {
    if (!isMouseDown) return;
    event.preventDefault();
    const x = event.pageX - cardContainer.offsetLeft;
    const walk = (x - startX) * 1.5;
    cardContainer.scrollLeft = scrollLeft - walk;
});
/* fetch('./data/products.json')
.then(response => response.json())
.then(data => {
// Display the JSON data in the UI
const jsonOutput = document.getElementById('json-output');
jsonOutput.textContent = JSON.stringify(data, null, 2);
})
.catch(error => {
console.log('Error:', error);
}); */

let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) { slides[i].style.display = "none"; } slideIndex++; if (slideIndex > slides.length) { slideIndex = 1 }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 2000); // Change image every 2 seconds
}
fetch('./footer.html')
    .then(response => response.text())
    .then(data => {
        // Insert the navigation code into the placeholder div
        document.getElementById('footer-placeholder').innerHTML = data;
    });

function onClickProduct() {

}




var eachCard = document.getElementById('main-card-container');
eachCard.addEventListener('click', function () {
    //console.log('Div clicked!');


    var clickedElement = event.target;
    const card = clickedElement.closest('#card-container');
    const productName = card.querySelector('p').textContent;
    console.log(productName);
    var url = 'productDetails.html?name=' + encodeURIComponent(productName);
    window.location.href = url;


    var title = clickedElement.querySelector('p').innerText;

    var cards = document.querySelectorAll("#main-card-container");
    for (var i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', function (e) {

            //console.log("clickable card!")
            //console.log(i);
        }, false);

    }

});

function changeTheme(icon) {
    const body = document.body;
    //mainCardContainer.classList.toggle('dark-mode');
    //body.classList.toggle('dark-mode');
    icon.classList.toggle("fa-moon");
    $('*').css('color', 'white');
    $('*').css('background-color', 'rgba(35,37,47,255)');

    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('dark-mode-preference', 'dark');
        //body.classList.remove('dark-mode');
        console.log("dark mode");
    } else {
        //body.classList.add('dark-mode');
        localStorage.setItem('dark-mode-preference', 'light');
        console.log("light mode");
    }
}
