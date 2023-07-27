
const prefersDarkMode = localStorage.getItem('dark-mode-preference');
if (prefersDarkMode === 'dark') {
    document.body.classList.add('dark-mode');
    console.log("dark mode details page");
}

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
            }
        });
    });

fetch('./footer.html')
    .then(response => response.text())
    .then(data => {
        // Insert the navigation code into the placeholder div
        document.getElementById('footer-placeholder').innerHTML = data;
    });

const url = window.location.href;
const searchParams = url.searchParams;
/*           const productName = searchParams.get('name');
          console.log('URL:', url);
          console.log('name: ', productName) */
const productName = new URLSearchParams(window.location.search).get('name');
console.log(productName);
const productDetails = document.getElementById('product-name');
const productDescription = document.getElementById('product-description');
const productImage = document.getElementById('product-image');
var idOfProduct = -1;
fetch('./data/products.json')
    .then(response => response.json())
    .then(data => {
        for (let key in data) {
            if (data[key].name == productName) {
                productDetails.innerText = productName;
                productDescription.innerText = data[key].Description;
                productImage.src = data[key].productImage;
                $('#product-price').text('$' + data[key].price);

                productImage.style.display = 'block';
                $('.shimmer-effect').hide();

                idOfProduct = data[key].id;
                console.log("idOfProduct here... " + idOfProduct);
            }
        }
        const jsonArray = JSON.parse(localStorage.getItem('IDs'));

        if (jsonArray.includes(idOfProduct)) {
            console.log("idOfProduct " + idOfProduct)
            const length = jsonArray.length;
            console.log(`lenght of array is : ${length} includes  ${jsonArray} is includes? : ${jsonArray.includes(idOfProduct)}`);
            console.log(jsonArray);
            $('#addToCartButton').addClass('button-added');
            //$('#shopping-icon').show();
        }
    });



$('#addToCartButton').click(function () {
    const jsonArray = JSON.parse(localStorage.getItem('IDs'));
    if (!jsonArray.includes(idOfProduct)) {
        $('#addToCartButton').addClass('button-added');
        // $('#shopping-icon').hide();
        addID(idOfProduct)
        console.log("length of array " + jsonArray.length);
        $('.button__badge').text(jsonArray.length + 1);
    } else {
        removeID(idOfProduct);
        console.log("already includes" + jsonArray)
        $('#addToCartButton').removeClass('button-added');
        $('.button__badge').text(jsonArray.length - 1);
        // $('#shopping-icon').show();

    }
});


// Retrieve the stored IDs from local storage
function getIDsFromLocalStorage() {
    const storedIDs = localStorage.getItem('IDs');

    return storedIDs ? JSON.parse(storedIDs) : [];
}

// Save the IDs to local storage
function saveIDsToLocalStorage(IDs) {
    const IDsString = JSON.stringify(IDs);
    localStorage.setItem('IDs', IDsString);
}

// Add an ID to the list and update local storage
function addID(id) {
    //clearIDList();
    const IDs = getIDsFromLocalStorage();
    /*             console.log(IDs)
                var isInclude = false;
                list.forEach(element => {
                    if (element == id) {
                        isInclude = true;
                        return;
                    }
                });
                if (isInclude) {
                    return;
                } */


    //if (isIDNotStored(id)) { return; }
    IDs.push(id);
    saveIDsToLocalStorage(IDs);
    // console.log(IDs)
}

function isIDNotStored(id) {
    const storedIDs = localStorage.getItem('IDs');
    if (storedIDs) {
        const parsedIDs = JSON.parse(storedIDs);
        return !parsedIDs.includes(id);
    }
    return true;
}

// Remove an ID from the list and update local storage
function removeID(id) {
    const storedIDs = JSON.parse(localStorage.getItem('IDs'));
    const index = storedIDs.indexOf(id);
    if (index !== -1) {
        storedIDs.splice(index, 1);
        saveIDsToLocalStorage(storedIDs);
    }
}
function clearIDList() {
    localStorage.removeItem('IDs');
}

const numberOfCart = document.getElementsByClassName('button__badge');
numOfProductCart();
function numOfProductCart() {
    const jsonArray = JSON.parse(localStorage.getItem('IDs'));
    console.log(jsonArray.length);
    numberOfCart.innerHTML = "4";
}


