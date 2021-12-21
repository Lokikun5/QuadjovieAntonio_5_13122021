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

  };
  canapeDisplay();