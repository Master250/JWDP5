// Ajoute des liens vers le code HTML

function addProduct(responseProduit, section){
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
    link.setAttribute("href", "produit.html?id=" + responseProduit._id);
    
    section[1].appendChild(div);
    div.appendChild(link);
    link.appendChild(img);
    div.appendChild(legend);
    div.appendChild(lenses);
    div.appendChild(price);
    
    
}

get("http://localhost:3000/api/cameras")
    .then(function(response){
        const section = document.getElementsByClassName("row");

        //Créeation des cadres de présentations des appareils photos
        for(let i = 0; i < response.length; i = i + 1){
            addProduct(response[i], section);
        }
    })
    .catch(function (error){
        if (error === 0){
        // requete ajax annulée
        alert("serveur ne repond pas");
        }
});