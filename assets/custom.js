// Get all product cards on the page
const productCards = document.querySelectorAll('.grid__item');

if (productCards.length > 0) {
  // Iterate through each product card
  productCards.forEach(card => {
    // Get the color swatch elements, card image element, and add to bag button within the card
    const swatchElems = card.querySelectorAll('.color__swatches-swatch');
    const cardImgElem = card.querySelector('.card__media img');
    const addButton = card.querySelector('.add__to-bag');

    // Attach click event listeners to color swatch elements
    if (swatchElems.length > 0) {
      swatchElems.forEach(swatch => {
        swatch.addEventListener('click', changeVariantData);
      });
    }

    // Function to handle changing variant data based on the selected color swatch
    function changeVariantData(e) {
      // Remove the 'active' class from all color swatch elements
      swatchElems.forEach(swatch => {
        swatch.classList.remove('active');
      });

      // Add the 'active' class to the clicked color swatch element
      this.classList.add('active');

      // Update the variant image and selected size list based on the clicked color swatch
      const variantImage = this.getAttribute('data-variantimg');
      if (variantImage) {
        cardImgElem.setAttribute('src', variantImage);
        cardImgElem.setAttribute('srcset', variantImage);
      }

      const selectedColor = this.getAttribute('data-color');
      const allSizesList = card.querySelectorAll('.product__sizes select');

      // Hide and deactivate all size lists
      allSizesList.forEach(sizes => {
        sizes.classList.add('hidden');
        sizes.classList.remove('active');
      });

      // Show and activate the size list corresponding to the selected color
      const selectedSizeList = card.querySelector(`.${selectedColor}`);
      selectedSizeList.classList.remove('hidden');
      selectedSizeList.classList.add('active');
    }

    // Attach click event listener to the 'Add to Cart' button
    if (addButton) {
      addButton.addEventListener('click', addToCart);
    }

    // Function to handle adding items to the cart
    function addToCart() {
      // Get the active size select element and selected size
      const activeSizeSelect = card.querySelector('.product__sizes select.active') || card.querySelector('.product__sizes select');
      const activeSize = activeSizeSelect.selectedOptions[0].textContent.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s/g, '');

      // Get the variant ID and active color
      const variant_id = activeSizeSelect ? activeSizeSelect.value : null;
      const colorsList = card.querySelector('.color__swatches-swatch.active');
      let activeColor;
      if (colorsList) {
        activeColor = card.querySelector('.color__swatches-swatch.active').getAttribute('data-name').toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s/g, '');
      }

      if (variant_id) {
        const quantity = 1;
        let items = [{
          'id': parseInt(variant_id),
          'quantity': quantity
        }];

        // Check if its black-medium variant
        if (activeColor === "black" && activeSize === "medium") {
          items.push({
            'id': 45224281506089,
            'quantity': 1
          });
        }
        const formData = {
          'items': items
        };

        // add items in the cart
        fetch(`${window.Shopify.routes.root}cart/add.js`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
          .then(response => response.json())
          .then(res => {
            // Redirect to the cart page after success
            window.location = '/cart';
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }
    }
  });
}

