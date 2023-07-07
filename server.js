
const { json } = require("express");
const fs = require("fs");
fs.readFile("./data/products.json", "utf8", (err, jsonString) => {
  if (err) {
    console.log("Error reading file from disk:", err);
    return;
  }
  try {
    const customer = JSON.parse(jsonString);
    console.log("Customer address is:", customer); // => "Customer address is: Infinity Loop Drive"

    //var jsonString = JSON.stringify(customer); // Convert JSON object to string


    let output = "";

    customer.forEach(element => {
      console.log(element.color);
      var listItem = document.createElement("p");
      listItem.textContent = element.name; // Replace "propertyName" with the actual property you want to display
      console.log("DONE!");
      output += `<p>${element.name}</p> <p>${element.color}</p>`;
    });

    document.querySelector('.data').innerHTML = output;

    /* for(let x of customer){
       console.log(x.color)
       element.innerHTML = x;
       placeholder.append(element)
     }*/


    // placeholder.innerHTML = out;


  } catch (err) {
    console.log("Error parsing JSON string:", err);

  }
})


/*const fs = require("fs");
   
// Read users.json file
fs.readFile("./data/products.json", function(err, data) {
      
    // Check for errors
    if (err) throw err;
   
    // Converting to JSON
    const products = JSON.parse(data);
      
    console.log(products); // Print users 

}); */