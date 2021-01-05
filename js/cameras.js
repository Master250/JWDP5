/**************** Ajoute des liens vers le code HTML *************/

function addProductToHTML(responseProduit, section){
    const div = document.createElement("div");
    div.innerHTML = responseProduit.name;
    div.setAttribute("class","col-md-5 product-border mt-5 mb-4 col-sm-6 mr-4 ml-4 border border-dark");
    const img = document.createElement("img");
    img.setAttribute("src", responseProduit.imageUrl);
    img.setAttribute("width", "100%");

    const legend = document.createElement("div");
    legend.innerHTML = responseProduit.description;

    const lenses = document.createElement("p");
    lenses.innerHTML = "Choix des optiques:"+ responseProduit.lenses;

    const price = document.createElement("p");
    price.innerHTML = responseProduit.price/100 + "€";

    const link = document.createElement("a");
    link.setAttribute("href", "pages/produit.html?id=" + responseProduit._id);
    
    link.appendChild(img);
    div.appendChild(link);
    div.appendChild(legend);
    div.appendChild(lenses);
    div.appendChild(price);
    section.appendChild(div);
}

get("http://localhost:3000/api/cameras")
    .then(function(response){
        const section = document.getElementsByClassName("row");
        for(let i = 0; i < response.length; i = i + 1){//Créeation des cadres de présentations des appareils photos
            addProductToHTML(response[i], section[1]);
        }
    })
    .catch(function (error){// requete ajax annulée
        if (error === 0){
        alert("serveur ne repond pas");
        }
});