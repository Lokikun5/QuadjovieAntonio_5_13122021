//recupere la valeur id en url
var str = window.location.protocol + "//" + window.location.host + "/" + window.location.pathname + window.location.search
var url = new URL (str);
var search_params = new URLSearchParams(url.search);

if(search_params.has('id')) {
    var id = url.searchParams.get('id');
    console.log(id);
}
//changer id par la valeur de l'id dans l'url
let productObject = [];

const fetchApi = async () => {
await fetch(`http://localhost:3000/api/products/${id}`)
  .then((res) => res.json())
  .then((promise) => {
    productObject = promise;
    console.log(productObject);
  });
};

const canapeDisplay = async () => { 
    await fetchApi();

document.querySelector('.item__img').innerHTML += ` <img src="${productObject.imageUrl}" alt="${productObject.altTxt}">`;

document.querySelector('.item__content__titlePrice').innerHTML += ` <h1 id="title">${productObject.name}</h1>
                                                                <p>Prix : <span id="price">${productObject.price}</span>€</p>`;

document.querySelector('.item__content__titlePrice').innerHTML += `<p class="item__content__description__title">Description :</p>
                                                                                <p id="description">${productObject.description}</p>`;
document.querySelector('.item__content__settings__color').innerHTML += `<div class="item__content__settings__color">
<label for="color-select">Choisir une couleur :</label>
<select name="color-select" id="colors">
    <option value="">--SVP, choisissez une couleur --</option>
    
</select>
</div>`

//-------------------choix des couleur----------------//  
const listColor = document.querySelector('#colors');
  const listcolor = productObject.colors;
  console.log(listcolor);

 for (let couleurs of listcolor){
    var option = document.createElement("option");
    option.text = couleurs;
    option.value = couleurs;
    var select = document.getElementById("colors");
    //select.appendChild(option);
    listcolor.innerHTML += select.appendChild(option);
  }

const quantite = document.querySelector('#quantity');

  var nomProduit= productObject.name;
  var prixProduit= productObject.price;
  var imageProduit= productObject.imageUrl;
  var altProduit= productObject.altTxt;
  var descriptionProduit= productObject.description;

  const ajouterPanier = document.querySelector("#addToCart");

  ajouterPanier.addEventListener('click',(event) => {
    event.preventDefault();
    
    const quantiteProduit = parseInt(quantite.value) ;
    const couleurProduit = listColor.value;
  
// ------------------------------------- Variable panier produit -------------------------------------
  let panierJson = {
    id:id , 
    nom:nomProduit,
    image:imageProduit,
    alt:altProduit,
    description:descriptionProduit,
    couleur:couleurProduit, 
    nombre_article:quantiteProduit,
    prix: prixProduit
  }
  let produitEnregistrerStorage = JSON.parse(localStorage.getItem("panier"));

  if(panierJson.couleur =="" || panierJson.nombre_article=='0' || panierJson.nombre_article > 100){
    alert("Veuillez selectionnez une couleur et un nombre d'article")
  }else{
    if(!produitEnregistrerStorage){
      produitEnregistrerStorage=[]
    }
  
    for (let i=0; i< produitEnregistrerStorage.length; i++){
      if ((panierJson.couleur === produitEnregistrerStorage[i].couleur) && (panierJson.id === produitEnregistrerStorage[i].id)){
        
        produitEnregistrerStorage[i].nombre_article += parseInt(panierJson.nombre_article);
        localStorage.setItem('panier',JSON.stringify(produitEnregistrerStorage))
      }
    } //for
  
    let check = produitEnregistrerStorage.some( e => e.id === panierJson.id && e.couleur === panierJson.couleur)
    console.log(check)
    console.log(produitEnregistrerStorage)
  
    if(!check){
      produitEnregistrerStorage.push(panierJson)
      localStorage.setItem('panier', JSON.stringify(produitEnregistrerStorage))
      alert("votre article à est bien été ajouté");
      location.href = "cart.html?";
    }
  }// si l'entrée est valide
  ;

}) //event 
}
  canapeDisplay();

  