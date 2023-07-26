let item;
const container = document.getElementById('container');


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
            window.location.href = "./main.html";
        })
        $('#openCart').click(function () {
            window.location.href = "./cart.html"
        })
    });

fetch('./footer.html')
    .then(response => response.text())
    .then(data => {
        // Insert the navigation code into the placeholder div
        document.getElementById('footer-placeholder').innerHTML = data;
    });

fetch('./data/products.json')
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
        <span class="card-icon">
            <button id = "menu" onClick = "deleteItem()">
                <i class="fa-solid fa-trash" style = "scale = 1.3;"></i>
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



        $('.card').on('click', function () {
            const childElements = this.children;
            //const nameContent = this.querySelector(".card-content").textContent;
            const productId = this.id;
            //const $cardContent = $(this).find('.card-title');
            //let data = fetchData(productId);
            const cardContent = $(this).find('.card .card-content');
            //console.log(cardContent.textContent);
            const children = this.children;
            const firstElement = children[1];
            const secondElement = firstElement.children;
            const targetElement = secondElement[0];
            let productName = targetElement.textContent;
            //console.log(firstElement);
            /* data.forEach(element =>{
                if(productId == element.id){
                    productName = element.name;
                    return;
                }
            }); */

            //let parsedJSON = JSON.parse(data);

            /*  for (let i = 0; i < children.length; i++) {
                const element = children[i];
                console.log(element);
            }       */

            /* for (let i = 0; i < this.length; i++) {
                const element = children[i];
                console.log(element);
            }   */
            //console.log(another);

            //var url = 'productDetails.html?id=' + encodeURIComponent(productId) + "&name = "+ productName;
            var url = 'productDetails.html?name='+productName;
            window.location.href = url;
        });
    });


/*     function handleCardClick(event) {
        const clickedElement = event.target;
        const cardElement = clickedElement.closest('.card');
        if (cardElement) {
            var idOfProduct = cardElement.id;
            console.log("id of card:" + idOfProduct);
            removeID(idOfProduct);
            cardElement.remove();
            checkListEmpty();
            const storedIDs = JSON.parse(localStorage.getItem('IDs'));
            console.log(storedIDs)
        }
        if (clickedElement.classList.contains('card')) {
            console.log('Card clicked:', clickedElement.textContent);
        } else {
            console.log('Another element inside the parent container was clicked.');
        }
    }
    const cardListContainer = document.getElementById('container');
    cardListContainer.addEventListener('click', handleCardClick); */


function deleteItem() {
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
        cardElement.remove();
        checkListEmpty();
        
    } */
}


function removeItem() {
    if (item) {
        var idOfProduct = item.id;
        removeID(idOfProduct);
        hideAlert();
        checkListEmpty();
        const parentElement = item.querySelector(".card-content");
        console.log(parentElement);
        item.remove();
        //updateSummary(item);
    }
}

function showAlert() {
    const modalOverlay = document.getElementById('modalOverlay');
    modalOverlay.style.display = 'block';
}

// Function to hide the custom alert
function hideAlert() {
    const modalOverlay = document.getElementById('modalOverlay');
    modalOverlay.style.display = 'none';
}

// Event handler for the click event on the close button in the alert
function handleCloseAlertButtonClick() {
    hideAlert();
}
function handleDeleteAlertButtonClick() {
    removeItem();
}


// Get the close button in the alert by its ID
const closeAlertButton = document.getElementById('closeAlertButton');

// Add the click event listener to the close button in the alert
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

function checkListEmpty() {
    console.log(listContainer.childElementCount + "hello");

    if (listContainer.childElementCount === 0) {
        emptyListMessage.style.display = 'block';
        $('.order-summary').hide()
    } else {
        emptyListMessage.style.display = 'none';
        $('.order-summary').show()
    }
}



function openHome() {
    window.location.href = "./main.html";
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
    const list = JSON.parse(localStorage.getItem('IDs'))
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
    console.log("the total count is " + $('#total-price').text());

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
