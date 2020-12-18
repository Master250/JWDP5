    /* Récupérer l'id dans l'URL */
function getId(){
    const param = window.location.search;
    console.log(window.location);
    const id = param.replace("?id=", "");//Récupère uniquement l'identifiant d'un produit
    return id;
};

    /* Ajoute l'appareil dans le panier avec la lentille selectionnée par l'utilisateur */
function addBasketContent(item){
    
    let basketContent = JSON.parse(localStorage.getItem("basketContent"));

    if (basketContent === null){
        basketContent = [];
    } 
    basketContent.push(item);// Produit ajouter au local storage
   
    localStorage.setItem("basketContent", JSON.stringify(basketContent));
};

    /* création du cadre de l'appareil photo sélectionné et ajoute les informations du produit dans la pages HTML */

function addProductInfo(response){
    
    const container = document.getElementById("produitcontainer");

    const div = document.createElement("div");
    div.setAttribute("class","produit-border offset-1 col-10 col-md-6 offset-md-3 mt-5 mb-5 p-3 border border-dark");

    const img = document.createElement("img");
    img.setAttribute("src", response.imageUrl);
    img.setAttribute("width", "100%");

    const title = document.createElement("div");
    title.innerHTML = response.name;
    title.setAttribute("class", "produittitle text-center mb-4");
    title.setAttribute("font-weight", "bolder");
    title.setAttribute("text-align", "center");

    const legend = document.createElement("div");
    legend.innerHTML = response.description;

    const price = document.createElement("p");
    price.setAttribute("font-size", "x-large")
    price.innerHTML = response.price/100 + "€";

    const lenses = document.createElement("select");
    const selectDefault = document.createElement("option");
    selectDefault.innerHTML = "Sans option";//choix de lentilles
    lenses.appendChild(selectDefault);

    const choix = document.createElement("div");
    choix.innerHTML = "Choix de l'option :";
    legend.appendChild(choix);
        
    /*Message d'alerte ajout panier*/
    const btn = document.createElement("button");
    btn.innerHTML = "Ajouter au panier";

    /* Ajout d'élément au local storage */
    btn.addEventListener("click", function(event){
        event.preventDefault();
        const lenses = document.getElementsByTagName("select");
        const lenseSelectionner = lenses[0].value;
        const item = response.description;
        
        addBasketContent({
            "id": getId() ,
            "name" : response.name,
            "description" : item,
            "option" : lenseSelectionner,
            "img" : response.imageUrl,
            "price" : response.price/100
        });
        alert("ajouté au panier");
    });
    
    for (let i = 0; i < response.lenses.length; i = i + 1){
        const option = document.createElement("option");
        option.setAttribute("value", response.lenses[i]);
        option.innerHTML = response.lenses[i];
        lenses.appendChild(option);
    };

    /* arboresences dans la page HTML */
        container.appendChild(div);
        div.appendChild(title);
        div.appendChild(img);
        div.appendChild(legend);
        div.appendChild(lenses);
        div.appendChild(price);
        div.appendChild(btn);
};
    const id = getId();
    get("http://localhost:3000/api/cameras/" + id) // Requête ajax GET
    .then(function (response){
        console.log(response);
            addProductInfo(response);
        })
        .catch(function(error){// requête ajax annulé
            console.log(error);
            if (error === 0){
                alert("serveur ne repond pas");
            }
    });