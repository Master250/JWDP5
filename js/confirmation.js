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
}
messageConfirm();
