const productCards = document.querySelectorAll('.grid__item');

if (productCards.length > 0) {
  productCards.forEach(card => {
    const swatchElems = card.querySelectorAll('.color__swatches-swatch');
    const cardImgElem = card.querySelector('.card__media img');
    const addButton = card.querySelector('.add__to-bag');

    if (swatchElems.length > 0) {
      swatchElems.forEach(swatch => {
        swatch.addEventListener('click', changeVariantData);
      });
    }

    function changeVariantData(e) {
    swatchElems.forEach(swatch => {
        swatch.classList.remove('active')
    })
    this.classList.add('active');
      const variantImage = this.getAttribute('data-variantimg');
      if (variantImage) {
        cardImgElem.setAttribute('src', variantImage);
        cardImgElem.setAttribute('srcset', variantImage);
      }

      const selectedColor = this.getAttribute('data-color');
      const allSizesList = card.querySelectorAll('.product__sizes select');
      allSizesList.forEach(sizes => {
        sizes.classList.add('hidden');
        sizes.classList.remove('active');
      });

      const selectedSizeList = card.querySelector(`.${selectedColor}`);
      selectedSizeList.classList.remove('hidden');
      selectedSizeList.classList.add('active');
    }

    if (addButton) {
      addButton.addEventListener('click', addToCart);
    }

    function addToCart() {
      const activeSizeSelect = card.querySelector('.product__sizes select.active');
      const activeSize = card.querySelector('.product__sizes select.active').selectedOptions[0].textContent.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s/g, '');
      const variant_id = activeSizeSelect ? activeSizeSelect.value : null;
      const activeColor = card.querySelector('.color__swatches-swatch.active').getAttribute('data-name').toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s/g, '');
      
      if (variant_id) {
        const quantity = 1;
        let items = [{
            'id': parseInt(variant_id),
            'quantity': quantity
          }];
        if(activeColor == "black" && activeSize === "medium"){
            items.push({
                'id': 45224281506089,
                'quantity': 1
            });
        }
        console.log(`${activeSize}`)
        console.log(items)
        const formData = {
          'items': items
        };
        


        fetch(`${window.Shopify.routes.root}cart/add.js`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
          .then(response => response.json())
          .then(res => {
            // window.location = '/cart';
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }
    }
  });
}
