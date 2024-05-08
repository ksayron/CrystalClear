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

    // Check if the product exists
    if (product) {
      // Retrieve the product information
      const productName = product.querySelector('name').textContent;
      const productImage = product.querySelector('image').textContent;
      const productPrice = product.querySelector('price').textContent;

      // Display the product information on the page
      const tovarName = document.querySelector('.tovar-name');
      const img = document.querySelector('.img img');
      const orderPrice = document.querySelector('.order-price b');

      tovarName.innerHTML = `<b>${productName}</b>`;
      img.src = productImage;
      orderPrice.textContent = `${productPrice} BYN`;
    } else {
      // Product not found
      const tovarName = document.querySelector('.tovar-name');
      tovarName.innerHTML = '<b>Product not found.</b>';
    }
  })
  .catch(error => {
    console.error('Error fetching XML document:', error);
  });