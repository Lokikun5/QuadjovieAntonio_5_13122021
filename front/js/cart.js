let panier = JSON.parse(localStorage.getItem("panier"));
let qty = 0;
let total = 0;
contact = {
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  email: "",
};
products = [];
orderId = undefined;
inputError = 0;
//
//------Affichage des vignettes pour chaque élément du panier
//

// SINON SI nous nous trouvons dans la page panier on execute notre code
if (location.href.search("confirmation") > 0) {
  // SINON c'est que nous sommes sur la page "confirmation.html" donc on affiche le numero de commande stocké dans l'URL
  // et on supprime le panier du localStorage pour pouvoir passer d'autres commandes

  orderId = window.location.search.replace("?", "");
  document.getElementById("orderId").innerHTML = orderId;
  localStorage.removeItem("panier");
} else {
  // SI le panier est vide on affiche "Vous n'avez aucun article dans votre panier !" à la place

  if (panier == null) {
    document.getElementById("cart__items").innerHTML = `<h3 style="text-align: center; margin-bottom: 50px;">Vous n'avez aucun article dans votre panier !</h3>`;
  } else {
    for (let productObject of panier) {
      qty += productObject.nombre_article;
      console.log(productObject.id);
      total += productObject.nombre_article * productObject.prix;
      console.log(productObject)
      let html = `
  <article class="cart__item" data-id="${productObject.id}" id="${productObject.id}${productObject.color}" data-color="${productObject.color}">
                <div class="cart__item__img">
                  <img src="${productObject.image}" alt="${productObject.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${productObject.nom}</h2>
                    <p>${productObject.couleur}</p>
                    <p>${productObject.prix} &euro;</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productObject.nombre_article}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
  `;
      document.getElementById("cart__items").innerHTML += html;
    }
    // Affichage de la quantité et du prix total
    document.getElementById("totalQuantity").innerHTML = qty;
    document.getElementById("totalPrice").innerHTML = Intl.NumberFormat(
      "fr-FR",
      {
        style: "currency",
        currency: "EUR",
      }
    ).format(total);
  }
  //
  //------recalcule du total des quantité et du prix

  function recalc() {
    let panier = JSON.parse(localStorage.getItem("panier"));
    
    let quantity = 0;
    let total = 0;
    for (productObject of panier) {
      
      quantity += parseInt(productObject.quantity);
      total += parseFloat(productObject.prix) * parseInt(productObject.quantity);
    }
    document.getElementById("totalQuantity").innerHTML = quantity;
    document.getElementById("totalPrice").innerHTML = Intl.NumberFormat(
      "fr-FR",
      {
        style: "currency",
        currency: "EUR",
      }
    ).format(total);
  }

  let vignettes = document.getElementsByClassName("cart__item");
  let suppressions = document.getElementsByClassName("deleteItem");
  

  // Boucle qui ajoute un eventListener sur toute les vignettes d'article affichés dans le panier
  for (let i = 0; i < vignettes.length; i++) {
    let vignette = vignettes[i];
    vignette.addEventListener("input", (e) => {
      //On envoie la quantité selectionnée dans le panier
      panier[i].quantity = parseInt(e.target.value);
      // On met à jour le localstorage
      localStorage.setItem("panier", JSON.stringify(panier));
      // on lance la fonction qui va mettre à jour le prix et le total de la page panier
      recalc();
    });
  }
  //
  // Boucle qui ajoute un eventListener sur toute les vignettes d'article affichés dans le panier
  for (let i = 0; i < suppressions.length; i++) {
    let suppr = suppressions[i];
    suppr.addEventListener("click", () => {
      // On supprime de notre panier l'élément de la boucle selectionné via splice()
      panier.splice(i, 1);
      // on supprime le code HTML de ce même élément
      vignettes[i].remove();
      // On met à jour le localstorage
      localStorage.setItem("panier", JSON.stringify(panier));
      // on lance la fonction qui va mettre à jour le prix et le total de la page panier
      recalc();
    });
  }

  //------Formulaire utilisateur

  let form = document.getElementsByClassName("cart__order__form");
  let formFirst = document.getElementById("firstName");
  let formLast = document.getElementById("lastName");
  let formAdress = document.getElementById("address");
  let formCity = document.getElementById("city");
  let formMail = document.getElementById("email");
  let formValid = document.getElementById("order");
  
  // CREATION EXPRESSION REGULIAIRE EMAIL
  formMail.addEventListener('change', function() {
      validMail(this)
  });
  const validMail =  function (inputMail){
      let emailRegExp = new RegExp ('^[a-zA-Z0-9ôöáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s-]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');
      let testMail = emailRegExp.test(inputMail.value)
      if(testMail){
          formMail.style.boxShadow ='0px 0px 10px #070606'
          formMail.style.boxSizing = 'border-box'
          document.getElementById("emailErrorMsg").innerHTML = "Email Valide !"
          document.getElementById("emailErrorMsg").style.color ='#B0F59A'
  
      }else{
          formMail.style.boxShadow ='0px 0px 10px red'
          formMail.style.boxSizing = 'border-box'    
          document.getElementById("emailErrorMsg").innerHTML = `"${inputMail.value} n'est pas valide !"`
      }    
  };
  
  // CREATION EXPRESSION REGULIAIRE VILLE
  formCity.addEventListener('change', function() {
      validCity(this)
  });
  const validCity =  function (inputCity){
      let villeRegExp = new RegExp ('^[a-zA-Z-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s-]*$', 'g');
      let testVille = villeRegExp.test(inputCity.value)
      if(testVille){
          formCity.style.boxShadow ='0px 0px 10px #070606'
          formCity.style.boxSizing = 'border-box'
          document.getElementById("cityErrorMsg").innerHTML = "Ville Valide !"
          document.getElementById("cityErrorMsg").style.color ='#B0F59A'
  
      }else{
          formCity.style.boxShadow ='0px 0px 10px red'
          formCity.style.boxSizing = 'border-box'
          document.getElementById("cityErrorMsg").innerHTML = `"${inputCity.value} n'est pas valide !"`
      }    
  };
  
  // CREATION EXPRESSION REGULIAIRE ADRESSE
  formAdress.addEventListener('change', function() {
      validAdress(this)
  });
  const validAdress =  function (inputAdress){
      let AdressRegExp = new RegExp ('^[ a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s -]*$', 'g');
      let testAdress = AdressRegExp.test(inputAdress.value)
      if(testAdress){
          formAdress.style.boxShadow ='0px 0px 10px #070606'
          formAdress.style.boxSizing = 'border-box'
          document.getElementById("addressErrorMsg").innerHTML = "Adresse Valide !"
          document.getElementById("addressErrorMsg").style.color ='#B0F59A'
      }else{
          formAdress.style.boxShadow ='0px 0px 10px red'
          formAdress.style.boxSizing = 'border-box'
          document.getElementById("addressErrorMsg").innerHTML = `"${inputAdress.value} n'est pas valide !"`
      }    
  };
  
  // CREATION EXPRESSION REGULIAIRE LASTNAME
  formLast.addEventListener('change', function() {
      validLast(this)
  });
  const validLast =  function (inputLast){
      let LastRegExp = new RegExp ('^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s -]*$', 'g');
      let testLast = LastRegExp.test(inputLast.value)
      if(testLast){
          formLast.style.boxShadow ='0px 0px 10px #070606'
          formLast.style.boxSizing = 'border-box'
          document.getElementById("lastNameErrorMsg").innerHTML = "Nom Valide !"
          document.getElementById("lastNameErrorMsg").style.color ='#B0F59A'
  
      }else{
          formLast.style.boxShadow ='0px 0px 10px red'
          formLast.style.boxSizing = 'border-box'
          document.getElementById("lastNameErrorMsg").innerHTML = `"${inputLast.value} n'est pas valide !"`
      }    
  };
  
  // CREATION EXPRESSION REGULIAIRE FIRSTNAME
  formFirst.addEventListener('change', function() {
      validFirst(this)
  });
  const validFirst =  function (inputFirst){
      let FirstRegExp = new RegExp ('^[a-zA-Z-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s -]*$', 'g');
      let testFirst = FirstRegExp.test(inputFirst.value)
      if(testFirst){
          formFirst.style.boxShadow ='0px 0px 10px #070606'
          formFirst.style.boxSizing = 'border-box'
          document.getElementById("firstNameErrorMsg").innerHTML = "Prénom Valide !"
          document.getElementById("firstNameErrorMsg").style.color ='#B0F59A'
      }else{
          formFirst.style.boxShadow ='0px 0px 10px red'
          formFirst.style.boxSizing = 'border-box'
          document.getElementById("firstNameErrorMsg").innerHTML = `"${inputFirst.value} n'est pas valide !"`
      }    
  };
  
  // ENVOI DU FORMULAIRE AVEC FETCH
  formValid.addEventListener("click", function(evt) {
      evt.preventDefault();
      if(
          !formFirst.value ||
          !formLast.value ||
          !formAdress.value ||
          !formCity.value ||
          !formMail.value
          
      ) {
          const cmd = document.getElementById('order')
          cmd.setAttribute('value', 'Veuillez remplir tous les champs et cliquer')
          return evt.preventDefault();
      }else{
  
      
  const contact = {
        firstName: `${formFirst.value}`,
        lastName: `${formLast.value}`,
        address: `${formAdress.value}`,
        city: `${formCity.value}`,
        email: `${formMail.value}`
      }
      // let order = JSON.stringify(contact)
      localStorage.setItem("contact", JSON.stringify(contact));
  // RECUPERATION DES ID POUR ENVOI FETCH
      let products = []
      for(i = 0; i < panier.length; i++){
          products.push(panier[i].id)
      }
  
      let envoiProducts = {contact, products}
      console.log(envoiProducts);
  
      fetch("http://localhost:3000/api/products/order" , {
          method: "POST",
          body: JSON.stringify(envoiProducts),
          headers: {
              "content-type" : "application/json",
          }   
      })
  // POUR AVOIR LE RETOUR SERVEUR    
      .then(res => {
          return res.json();
      }).then((data) => {
          let orderId = data.orderId
         window.location.href= `./confirmation.html?id=${orderId}` ; 
      console.log(orderId);
      }).catch((error) =>{
          console.log(error);
      })
  }
  }
  ); 
}
