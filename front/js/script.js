// initialisation api
let articles = [];

const fetchApi = async () => {
    await fetch("http://127.0.0.1:3001/api/products/")
      .then((res) => res.json())
      .then((data) => (articles = data));
  
    console.log(articles);
  };
// boucle images
  const canapeDisplay = async () => {
    await fetchApi();
    let items = document.getElementById("items");
    for (let i = 0; i < articles.length; i++) {
      items.innerHTML += `
        <a href="./product.html?id=${articles[i]._id}">
          <article>
            <img src="${articles[i].imageUrl}" alt="${articles[i].altTxt}">
            <h3 class="productName">${articles[i].name}</h3>
            <p class="productDescription">${articles[i].description}</p>
          </article>
        </a>`;
    }
  };
  canapeDisplay();  