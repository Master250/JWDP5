//Récupération de l'API
function get(url){
  const promise = new Promise(function(resolve, reject){
    const request = new XMLHttpRequest();
    request.open("GET", url);
    request.onreadystatechange = function(){
      if(this.readyState === XMLHttpRequest.DONE){
        if(this.status === 200){
          resolve(JSON.parse(request.responseText));
        } else{
          reject(request.status);
        }
      }
    };
    request.send();
  });
  return promise;
};


//Renvoi de l'API

function post(url, jsonBody){
  const promise = new Promise(function(resolve, reject){
    const request = new XMLHttpRequest();    
    request.onreadystatechange = function(){
      if(request.readyState === 4){
        if(request.status >= 200 && request.status < 300){
            resolve(JSON.parse(this.responseText));
          }else{
            reject(request.status);
        }
      }
    
    };
    request.open("POST", url);
    request.setRequestHeader("content-type", "application/json");
    request.send(JSON.stringify(jsonBody));
  });
  return promise;
};