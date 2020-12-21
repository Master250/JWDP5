/************************************** Confirmation de la commade **************************************/
/////////////////////////////////////// Confirmation de la commade /////////////////////////////////
function messageConfirm(){
  const idOrderValid = localStorage.getItem("orderValid");
  const confirmation = document.getElementById("confirmation");
  const totalOrder = localStorage.getItem("totalOrder");
  const smsConfirm = document.createElement("p");
  smsConfirm.innerHTML = "Nous vous remercions pour votre commande n° "+ idOrderValid;
  const confirmationPrice = document.createElement("p");
  confirmationPrice.innerHTML = "Prix total de votre commande: "+totalOrder;
  smsConfirm.setAttribute("class", "confirmation-title pt-5")
  confirmation.appendChild(smsConfirm);
  confirmation.appendChild(confirmationPrice);




    let t1 = document.createElement("table");
    let caption = document.createElement("caption")
    caption.textContent = "Récapitulatif de la commande";
    let lign = document.createElement("tr");
    t1.appendChild(caption);
    
    let containPhoto = document.createElement("th");
    let colonNom = document.createElement("th");
    let colonPrix = document.createElement("th");

    let lignTotal = document.createElement("tr");
    let lignPrixTotal = document.createElement("th");
    let prixConfirme = document.createElement("td");

    colonPrix.textContent = "Prix";
    colonNom.textContent = "Nom Article";
    containPhoto.textContent = "Image Article";
    
    
    let tableau = document.getElementById("review");

    tableau.appendChild(t1);
    t1.appendChild(lign);
    lign.appendChild(containPhoto);
    lign.appendChild(colonNom);
    lign.appendChild(colonPrix);

    

    let i = 0;
    const basketRecap = JSON.parse(localStorage.getItem("recap"));
    basketRecap.products.forEach((element) => {
    let lignProduct = document.createElement("tr");
    lignProduct.setAttribute("id", element._id);
    let photoProduct = document.createElement("img");
    photoProduct.setAttribute("src", element.imageUrl);
    photoProduct.setAttribute("width", "110px");
    let nomProduct = document.createElement("td");
    nomProduct.textContent = element.name;
    nomProduct.setAttribute("width", "100px");
    let prixProduct = document.createElement("td");
    prixProduct.setAttribute("width", "100px");
    prixProduct.textContent = element.price/100 +"€";

      
      

    t1.appendChild(lignProduct);
    lignProduct.appendChild(photoProduct);
    lignProduct.appendChild(nomProduct);
    lignProduct.appendChild(prixProduct);

    tableau.appendChild(lignTotal);
    t1.appendChild(lignTotal);
    lignTotal.appendChild(lignPrixTotal);
    lignTotal.appendChild(prixConfirme);
    lignPrixTotal.textContent ="Prix Payé";
    lignPrixTotal.setAttribute("colspan", "4");
    prixConfirme.textContent = totalOrder;
    lignPrixTotal.setAttribute("colspan", "2");

    });
  
};
messageConfirm();



