
document.addEventListener('DOMContentLoaded', fetchData);

fetch('navigation.html') // get header from the file and append it to the element
    .then(response => response.text())
    .then(data => {
        document.getElementById('navigation-placeholder').innerHTML = data;




        const parentContainer = document.getElementById('navigation-placeholder');
        parentContainer.addEventListener('click', function (event) {
            if (event.target.matches('.button__badge')) {
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
                window.location.href = "./search.html?search=" + $('#search-input').val();
            }
        });
        const container = $("#box");
        const scrollStep = 500; // Adjust the scroll amount as needed
        $('.prev-button').on('click', function () {
            console.log("the button is clicked")
            container.animate({
                scrollLeft: container.scrollLeft() - scrollStep
            }, 500);
        })
        $('.next-button').on('click', function () {
            console.log("the button is clicked")
            container.animate({
                scrollLeft: container.scrollLeft() + scrollStep
            }, 500);

        })
    });

let jsonData;
async function fetchData() {
    const apiUrl = 'https://ahmetozydn.github.io/api/products.json'; // url to fetch data

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        console.log(response);
        jsonData = await response.json(); // JSON data is pulled
        displayData(jsonData); // render the data in the ui and make it meaningful
    } catch (error) {
        console.error('Error fetching data:', error.message); // an error occured while fetching the data
    }
}




function displayData(jsonData) { // takes jsonData as parametre
    jsonData.forEach(element => { // for each JSON component inside the data
        //id = "card-container"
        const innerContent = `
<div id="${element.id}" class="card" style="width: 250px; height: 400px; margin: 10px;"> 
  <div class="card-content"> 
    
      <img src="${element.productImage}"; width : 250px; height : 250px; />
    <p>${element.name}</p>
    <p>$${element.price}</p>
  <div>
  </div>
  </div>
  `
        $('#box').append(innerContent); // create HTML elements and assign content dynamically
    });
}



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

let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) { slides[i].style.display = "none"; } slideIndex++; if (slideIndex > slides.length) { slideIndex = 1 }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 4000);
}
fetch('./footer.html')
    .then(response => response.text())
    .then(data => {
        // Insert the navigation code into the placeholder div
        document.getElementById('footer-placeholder').innerHTML = data;
    });
function onClickProduct() {

}



$('#main-card-container').on('click', function(){
    var clickedElement = event.target; // get the clicked item
    const card = clickedElement.closest('.card'); // find the closes card to the clicked item
    const productId = card.id; 
    var url = 'productDetails.html?id=' + encodeURIComponent(productId); // burn the name to url as search parametre
    window.location.href = url; // open productDetails.html web page
});




function changeTheme(icon) {
    const body = document.body;

    icon.classList.toggle("fa-moon");
    $('*').css('color', 'white');
    $('*').css('background-color', 'rgba(35,37,47,255)');

    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('dark-mode-preference', 'dark');
        console.log("dark mode");
    } else {
        localStorage.setItem('dark-mode-preference', 'light');
        console.log("light mode");
    }
}
