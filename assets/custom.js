const productCards = document.querySelectorAll('.grid__item');

if (productCards.length > 0) {
  productCards.forEach(card => {
    const swatchElems = card.querySelectorAll('.color__swatches-swatch');
    const cardImgElem = card.querySelector('.card__media img');
    const addButton = card.querySelector('.add__to-bag')
    if (swatchElems.length > 0) {
      swatchElems.forEach(swatch => {
        swatch.addEventListener('click', changeVariantData);
      });
    }

    function changeVariantData(e) {
      const variantImage = this.getAttribute('data-variantimg');
      if (variantImage) {
        cardImgElem.setAttribute('src', variantImage);
        cardImgElem.setAttribute('srcset', variantImage);
      }
      const selectedColor = this.getAttribute('data-color');
      const allSizesList = card.querySelectorAll('.product__sizes select');
      allSizesList.forEach(sizes=>{
        sizes.classList.add('hidden')
        sizes.classList.remove('active')
      })

      document.querySelector(`.${selectedColor}`).classList.remove('hidden');
      document.querySelector(`.${selectedColor}`).classList.add('active');
    }   

    if(addButton){
        
        addButton.addEventListener('click', addToCart);
    }
    function addToCart(variant_id,quantity){
        const variant_id = card.querySelector('.product__sizes.active').value;
        const quantity = 1;
        let formData = {
            'items': [{
             'id': parseInt(variant_id),
             'quantity': quantity
             }]
           };
           
           fetch(window.Shopify.routes.root + 'cart/add.js', {
             method: 'POST',
             headers: {
               'Content-Type': 'application/json'
             },
             body: JSON.stringify(formData)
           })
           .then(response => {

             return response.json();
           })
           
           .catch((error) => {
             console.error('Error:', error);
           });
           
    }

  });
}
