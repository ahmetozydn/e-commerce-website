let item;
const container = document.getElementById('container');

document.addEventListener('DOMContentLoaded', fetchData);


fetch('navigation.html')
    .then(response => response.text())
    .then(data => {
        // Insert the navigation code into the placeholder div
        document.getElementById('navigation-placeholder').innerHTML = data;
        $('#openCart').remove();
        const parentContainer = document.getElementById('navigation-placeholder');
        parentContainer.addEventListener('click', function (event) {
            // Check if the clicked element matches the desired selector

            /* if (event.target.matches('.button__badge')) {
                // Handle the event for the dynamically created element
                window.location.href = './cart.html'
            } */
        });
        const jsonArray = JSON.parse(localStorage.getItem('IDs'));

        $('.button__badge').text(jsonArray.length)

        $('.website-name').click(function () {
            window.location.href = "./home.html";
        })
        $('#openCart').click(function () {
            window.location.href = "./cart.html"
        })
        $('#search-button').on('click', function () {

            if ($('#search-input').val()) {
            window.location.href = "./search.html?search="+$('#search-input').val();
            }
        });
    });

fetch('./footer.html')
    .then(response => response.text())
    .then(data => {
        // Insert the navigation code into the placeholder div
        document.getElementById('footer-placeholder').innerHTML = data;
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


            jsonData = await response.json(); // JSON data is fetched
            const jsonArray = JSON.parse(localStorage.getItem('IDs')); // find if of all products in the cart
            jsonData.forEach(item =>{
                jsonArray.forEach(element =>{
                    if(element == item.id){ // id comparison to find details of products
                        // assign values dynamically with JQuery
                        let productDetail = `<div class="card" id = "${item.id}"> 
                        <img src="${item.productImage}" alt="Card Image" class="card-image">
                        <div class="card-content">
                            <h3 class="card-title" id = "product-name">${item.name} </h3>
                          <p class="card-price">$${item.price}</p>
                          <p class="card-description" style = "max-width: 300px; max-height : 60px; overflow: hidden;"> ${item.Description}...</p>
                          <button class="decrease-quantity" onClick = "decreaseQuantity()">-</button>
                          <input type="text" class="quantity" value="1" min="1" readOnly>
                          <button class="increase-quantity" onClick = "increaseQuantity()">+</button>
                        </div>
                        <span class="card-icon" id = "delete-card">
                            <button id = "delete-item" class = "delete">
                                <i id = "delete-icon"class="fa-solid fa-trash" style = "scale = 1.3;"></i>
                            </button>
                        </span>
                      </div>`;
                      $('#container').append(productDetail); // add all element one by one by appending to HTML
                    }
                });
            });
            checkListEmpty();
            $('#item-count').text(jsonArray.length);
            calculateTotalPrice()
    
            const childrenElements = $(this).children();
    
            // Loop through the children and do something with each child element
            childrenElements.each(function (index) {
                console.log("Child " + (index + 1) + ": " + $(this).text());
            });
    
            $('.card').on('click', function (event) { // make a card clickable
                const clickedElementId = $(event.target).attr("id"); // get the id of clicked item
                console.log(clickedElementId);
                 if (clickedElementId == 'delete-item' || clickedElementId == 'delete-card' || clickedElementId == 'delete-icon') {     // suggest a better approach for inner clickable button
                     item = event.target.closest('.card'); // if trash icon is clicked open a alert dialog
                     deleteItem(event); 
                 }else {
                    const product = event.target.closest(".card"); // if a card is clicked get its id 
                    var url = 'productDetails.html?id=' + product.id; // send id attribute of the product to prdct details page
                    window.location.href = url;
                }
            });


            $('delete-item').on('click', function (event) { // trash icon is clicked
                event.stopPropagation();
                const clickedElement = event.target;
                console.log(clickedElement);
                item = clickedElement.closest('.card'); // suggest better suggestion
                if (item) {
                    showAlert();
                }
            })
            console.log(jsonData);
           //prepareUI(jsonData); // render the data in the ui and make it meaningful
        } catch (error) {
            console.error('Error fetching data:', error.message); // an error occured while fetching the data
        }
    }


    function prepareUI(jsonData){
        console.log("inside prepare UI")
        
  
    }

/*   fetch('./data/products.json')
    .then(response => response.json())
    .then(data => {
        const jsonArray = JSON.parse(localStorage.getItem('IDs'));
        jsonArray.forEach(element => {
            for (let key in data) {
                if (data[key].id == element) {
                    let element = `<div class="card" id = "${data[key].id}">
        <img src="${data[key].productImage}" alt="Card Image" class="card-image">
        <div class="card-content">
            <h3 class="card-title" id = "product-name">${data[key].name} </h3>
          <p class="card-price">$${data[key].price}</p>
          <p class="card-description" style = "max-width: 300px; max-height : 60px; overflow: hidden;"> ${data[key].Description}...</p>
          <button class="decrease-quantity" onClick = "decreaseQuantity()">-</button>
          <input type="text" class="quantity" value="1" min="1" readOnly>
          <button class="increase-quantity" onClick = "increaseQuantity()">+</button>
        </div>
        <span class="card-icon" id = "delete-card">
            <button id = "delete-item" class = "delete">
                <i id = "delete-icon"class="fa-solid fa-trash" style = "scale = 1.3;"></i>
            </button>
        </span>
      </div>`
                    container.innerHTML += element;
                }
            }

        });
        checkListEmpty();
        $('#item-count').text(jsonArray.length);
        calculateTotalPrice()

        const childrenElements = $(this).children();

        // Loop through the children and do something with each child element
        childrenElements.each(function (index) {
            console.log("Child " + (index + 1) + ": " + $(this).text());
        });

        $('.card').on('click', function (event) {
            const clickedElementId = $(event.target).attr("id"); //$(event.target).hasClass('')
            console.log(clickedElementId);

             if (clickedElementId == 'delete-item' || clickedElementId == 'delete-card' || clickedElementId == 'delete-icon') { // suggest a better approach for inner clickable button
                 console.log('Button inside card clicked');
                 item = event.target.closest('.card'); // suggest better suggestion
                 deleteItem(event)
             }else {
                //const productId = this.id; should be passed parametre to the link
                const children = this.children;
                const product = event.target.closest(".card");
                const firstElement = children[1]; // suggest a better approach to find h3 element
                const secondElement = firstElement.children;
                const targetElement = secondElement[0];
                let productName = targetElement.textContent;
                var url = 'productDetails.html?id=' + product.id;
                window.location.href = url;
            }
        });
        $('delete-item').on('click', function (event) {
            event.stopPropagation();
            const clickedElement = event.target;
            console.log(clickedElement);
            item = clickedElement.closest('.card'); // suggest better suggestion
            if (item) {
                showAlert();
            }
        })

    });     */

function deleteItem(event) {
    const clickedElement = event.target;
    console.log(clickedElement);
    item = clickedElement.closest('.card'); // suggest better suggestion
    if (item) {
        showAlert();
    }
    /* const clickedElement = event.target;
    const cardElement = clickedElement.closest('.card'); // suggest better suggestion
    if (cardElement) {
        var idOfProduct = cardElement.id;
        removeID(idOfProduct);
        cardElement.remove();<
        checkListEmpty();
        
    } */
}


function removeItem() { 
    if (item) {
        updateSummary(item); // update checkout details
        var idOfProduct = item.id;
        removeID(idOfProduct); // remove product id from cart list
        hideAlert(); // hide alert dialog the user pressed cancel or delete
        item.remove(); // that basic code snippet removes the element from HTML
        checkListEmpty(); // check list is empty, if it's empty show a message
    }
}

function showAlert() {
    const modalOverlay = document.getElementById('modalOverlay');
    modalOverlay.style.display = 'block';
}

function hideAlert() {
    const modalOverlay = document.getElementById('modalOverlay');
    modalOverlay.style.display = 'none';
}

function handleCloseAlertButtonClick() {
    hideAlert();
}
function handleDeleteAlertButtonClick() {
    removeItem();
}


const closeAlertButton = document.getElementById('closeAlertButton');

closeAlertButton.addEventListener('click', handleCloseAlertButtonClick);


const deleteAlertButton = document.getElementById('deleteAlertButton');
deleteAlertButton.addEventListener('click', handleDeleteAlertButtonClick);

function removeID(id) {
    const storedIDs = JSON.parse(localStorage.getItem('IDs'));
    const index = storedIDs.indexOf(id);
    const newArray = storedIDs.filter((element) => element !== id);
    storedIDs.forEach(element => {
        if (element == id) {
            const newArray = storedIDs.filter((element) => element !== id);
            storedIDs.splice(storedIDs.indexOf(element), 1);
            saveIDsToLocalStorage(storedIDs);
        }
    });
    if (index !== -1) {
        storedIDs.splice(index, 1);
        saveIDsToLocalStorage(storedIDs);
    }
}
function saveIDsToLocalStorage(IDs) {
    const IDsString = JSON.stringify(IDs);
    localStorage.setItem('IDs', IDsString);
}

const listContainer = document.getElementById('container');
const emptyListMessage = document.getElementById('empty-list-message');

function checkListEmpty() { // checks if the cart list is empty
    if (listContainer.childElementCount === 0) {
        emptyListMessage.style.display = 'block'; // show empty list message
        $('.order-summary').hide() // hide checkout section
    } else {
        emptyListMessage.style.display = 'none';
        $('.order-summary').show() 
    }
}

$('#purchase-button').on('click' ,
function (){
    window.location.href = "./orderPlaced.html";
});

function openHome() {
    window.location.href = "./home.html";
}

function calculateTotalPrice() {
    const input = $('.card-price').text();
    let total = 0;
    const numbersArray = input.match(/\d+(\.\d+)?/g);
    console.log(numbersArray);
    numbersArray.forEach(each => {
        let number = parseInt(each);
        total += number;
    })

    $('#total-price').text(total);


    console.log("the total is " + total)
    const textContents = [];
    $('.card-price').each(function () {
        const textContent = $(this).text();
        const numbersArray = textContent.match(/\d+(\.\d+)?/g);
        textContents.push(numbersArray);
    });
    console.log(textContents);
    /*   const numericValues = $('.card-price').text().map((str) => {
          const num = str.match(/\d+/);
          return parseInt(num);
      }); */

    textContents.forEach(eachElement => {
        console.log(eachElement);

    }
    )
}

function updateSummary(item) {
    let priceString = item.querySelector('.card-price');
    const price = priceString.textContent.match(/\d+(\.\d+)?/g);
    console.log("the price is "+ price[0]);
    let previousPrice = $('#total-price').text()
    $('#total-price').text(previousPrice - price[0])
    let itemCount = $('#item-count').text();
    console.log("last item count is "+itemCount)
    let totalItem = parseInt(itemCount);
    $('#item-count').text(totalItem - 1);


/*     const list = JSON.parse(localStorage.getItem('IDs'))
    $('#item-count').text(list.length);
    console.log(typeof (item));
    console.log($('item-count').text())
    itemPrice = parseInt(item.textContent + "the item's text content");
    console.log(item);

    // const child = item.find(".card-price");
    //const grandparentElement = $(".card-content");
    const parentElement = item.find(".card-content");
    const targetElement = parentElement.find(".card-price");
    console.log(targetElement);
    //console.log(child.textContent);
    $('#total-price').text(parseInt(item.textContent) - itemPrice);
    console.log("the total count is " + $('#total-price').text()); */

}
/* 
    function decreaseQuantity(event) {
    const cartItem = event.target.parentNode;
    const quantityInput = cartItem.querySelector(".quantity");
    let currentQuantity = parseInt(quantityInput.value);
    if (currentQuantity > 1) {
      currentQuantity--;
      quantityInput.value = currentQuantity;
    }
  } */

$('.increase-quantity').on('click', function () {
    console.log("hello world");

});
$('.decrease-quantity').on('click', function () {
    console.log("hello world1");
});



function increaseQuantity() {
    /*   const cartItem = event.target.parentNode;
      const quantityInput = cartItem.querySelector(".quantity");
      let currentQuantity = parseInt(quantityInput.value);
      currentQuantity++;
      quantityInput.value = currentQuantity; */
    let currentQuantity = $('.quantity').text();
    console.log(currentQuantity);
    console.log($('.quantity').text());
    //$('.quantity').text(currentQuantity);
}
function decreaseQuantity() {
    /*const cartItem = event.target.parentNode;
      const quantityInput = cartItem.querySelector(".quantity");
      let currentQuantity = parseInt(quantityInput.value);
      currentQuantity++;
      quantityInput.value = currentQuantity;*/
    let currentQuantity = $('.quantity').text();
    console.log(currentQuantity);
    console.log($('.quantity').text());
}





const person = {
    name: 'John Doe', // can be accessed as person.name
    age: 30,
    isEmployed: true
};





const fruits = ['apple', 'banana', 'orange'];
fruits.push('grape'); // add element
fruits.pop(); // remove last element
fruits.length; // lenght of the array
fruits.indexOf('banana'); // gives index of the element











