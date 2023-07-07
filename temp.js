const dataContainer = document.getElementById('json-data');

fetch('http://localhost:3000')
  .then(response => response.json())
  .then(data => {
    // Process the fetched data
    // For example, if the data is an array of objects, you can iterate over it and create HTML elements to display the data
    data.forEach(item => {
      const element = document.createElement('p');
      element.textContent = item.name;
      dataContainer.appendChild(element);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });