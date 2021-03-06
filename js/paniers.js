/***************** Affichage des produits dans le panier ***************/
function addBasketProduct(){
    const basketContent = JSON.parse(localStorage.getItem("basketContent"));//récuperation local storage
   
    let i = 0; // Le nombre de fois on tourne dans la boucle de produit
        for (let productBasket of basketContent){
                              
            /***** On interroge voir si le navigateur prend en charge l'élément de modèle HTML en vérifian l'attribut content de l'élément de modèle ******/

            if ('content' in document.createElement('template')) {

                /**** Instanciez la table avec le corps HTML existant et la ligne avec le modèle ****/
                
                var tbody = document.querySelector("tbody");               
                                            
                var template = document.querySelector("#product");
                
                /*** Calcul du montant total ***/
                let totalPrice = 0;
                basketContent.forEach((basketContent) => {
                  totalPrice += basketContent.price;
                });
                const totalPriceBasket = document.getElementById("totalPrice");
                totalPriceBasket.innerHTML = "Le Total de votre commande est: " + totalPrice + "€";
                                
                /*** Clonez la nouvelle ligne et insérez-la dans le tableau ****/
                var clone = template.content.cloneNode(true);
                                
                td = clone.querySelectorAll("td");
                                                
                td[0].firstElementChild.href = "produit.html?id=" + productBasket.id;
                td[0].firstElementChild.firstElementChild.src = productBasket.img;
                td[1].textContent = productBasket.name;
                td[2].textContent = productBasket.option;
                td[3].textContent = productBasket.price +"€";
                td[5].firstElementChild.dataset.ref = i; // On récupère la reférence de l'élément à supprimer
                let btn = td[5].firstElementChild;
                
                tbody.appendChild(clone);
                
                /*** Suppression d'un élément dans le panier ***/
                
                btn.addEventListener('click', function(e){
                    e.preventDefault();
                    const idx = e.target.dataset.ref;
                    basketContent.splice(idx, 1);
                    localStorage.setItem("basketContent", JSON.stringify(basketContent)); // Sauvegarde du panier mis à jour
                    
                    alert("Vous avez supprimé le produit :"+ productBasket.name);
                    window.location.reload(); // on recharge la page 
                });                                       
            }; 
         i++;
            
        }; 
            
};

  /****** Validation des données et les expressions régulières formulaire et contôle Regex ******/
  function isAlpha(value){
    return /[a-zA-Z]+/.test(value);
  }
  function validateEmail(value){
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)){
    return true;
  }
  return false;
  }
  function isAdresse(value){
    return /\w+/.test(value);
  }

  /****** Message erreur du formulaire quand les champs ne sont pas remplis ******/
  
  function alertMessage(klass,msg){
    const errorMessage = document.createElement("p");
    errorMessage.setAttribute("class", klass);
    errorMessage.innerHTML = msg;
    errorMessage.style.color = "#FF3D00";
     
    return errorMessage;
  };
  /****** Validation de la saisie de l'utilisateur ******/
  function validationContact(){
    let  isError = false;
    const warning = document.getElementById("warning");
    warning.innerHTML = "";
    let inputIds = ["firstname", "name", "email", "adresse", "city"];
    let inputTexts = ["firstname","name", "mail", "adresse", "ville"];
    for (let i = 0; i < inputIds.length; i++){
      const input = document.getElementById(inputIds[i]);
      
        if (inputIds[i] === "name" || inputIds[i] === "firstname" || inputIds[i] === "city"){
          if (isAlpha(input.value) === false){
            isError = true;
            warning.appendChild(alertMessage("text-warning","Merci de renseigner votre  "+ inputTexts[i]+ " "  + "en toutes lettres" +"."));
          }
        }
        if (inputIds[i] === "email"){
          if (validateEmail(input.value) === false){
            isError = true;
           warning.appendChild(alertMessage("text-warning","Merci de renseigner une adresse " + inputTexts[i] +" "  + "valide"));
          }
        }
        if (inputIds[i] === "adresse"){
          if (isAdresse(input.value) === false){
            isError = true;
            warning.appendChild(alertMessage("text-warning","Merci de renseigner votre " + inputTexts[i] +" " + "postale"));
          }
        }
      
    }
    return isError;
};
  
/****** création et envoi de la requête ******/

function sendOrder(){
  const contact = {
    "lastName" :document.getElementById("name").value,
    "firstName" : document.getElementById("firstname").value,
    "email" : document.getElementById("email").value,
    "address" : document.getElementById("adresse").value,
    "city" : document.getElementById("city").value
  };

  const basketContent = JSON.parse(localStorage.getItem("basketContent"));

  let products = [];// création du tableau produits 
  
  /******* On parcourt le panier pour récupérer les id des produits ******/

  for (let i = 0; i < basketContent.length; i++){
    basketContent[i].id;
    products.push(basketContent[i].id); // On ajoute les id dans le tableau produit
    console.log(basketContent[i]);
  }

  const sendOrderInfo = {contact:contact ,products:products}; // Création d'objet d'éléments à envoyer 
  
  /****** Envoi des informations et du tableau des produits ******/

  post("http://localhost:3000/api/cameras/order",sendOrderInfo).then(function(response){
         
    localStorage.setItem("orderValid",response.orderId);
    let totalPrice = 0;
    basketContent.forEach((basketContent) => {
      totalPrice += basketContent.price;
    });
    localStorage.setItem("totalOrder", totalPrice +"€");
    window.location.href = "../pages/confirmation.html";// si envoi reussit on se dirige sur la page confirmation   
      
    })
    .catch(function(error){
      if (error === 0){
        alert("impossible d'envoyer la requête, serveur non connecté");
      }
  });
}


  const btn1 = document.getElementById("btn1");

  btn1.addEventListener("click", function(event){
    event.preventDefault();
    let isError = validationContact();

    if (isError === false){
      sendOrder();
        contacts = {};//On remet l'objet contact vide
        products = [];//On vide le tableau des produits
        localStorage.clear();// Vider le localstorage
    } 
  });



 