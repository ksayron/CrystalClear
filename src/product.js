 // Get the product id from the URL query parameter
 const urlParams = new URLSearchParams(window.location.search);
 const productId = urlParams.get('id');

 // Fetch the XML document
 fetch('data.xml')
     .then(response => response.text())
     .then(data => {
         // Parse the XML data
         const parser = new DOMParser();
         const xmlDoc = parser.parseFromString(data, 'application/xml');

         // Get the necessary elements from the XML document
         const product = xmlDoc.querySelector(`product[id="${productId}"]`);

         // Check if the product e   xists
         if (product) {
             // Retrieve the product information
             const productName = product.querySelector('name').textContent;
             const productImage = product.querySelector('image').textContent;
             const productPrice = product.querySelector('price').textContent;
             const characteristics = product.querySelectorAll('characteristic');
             const description = product.querySelector('description text').innerHTML;

              // Populate the HTML elements with the data
             document.querySelector('.tovar-name b').textContent = productName;
             document.querySelector('.main .img img').src = productImage;
             document.querySelector('.order-price b').textContent = productPrice;
             
             const charList = document.createElement('ul');
             characteristics.forEach(characteristic => {
             const name = characteristic.querySelector('name').textContent;
             const value = characteristic.querySelector('value').textContent;

             const listItem = document.createElement('li');
             listItem.innerHTML = `<span>${name}</span> <span>${value}</span>`;
             charList.appendChild(listItem);
                 });

             document.querySelector('.char ul').replaceWith(charList);

             document.querySelector('.desc p').innerHTML = description;

         } else {
             // Product not found
             const productContainer = document.querySelector('.product-container');
             productContainer.innerHTML = '<p>Product not found.</p>';
         }
     })
     .catch(error => {
         console.error('Error fetching XML document:', error);
     });