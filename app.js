/*
All rights reserved writen by tunechiBrain : sidymbengue25@gmail.com
 */
//1) les variables représentant nos éléments html

let civite=document.getElementById('civite');
let newsletter=document.getElementById('newsletter');
let couriel=document.getElementById('couriel');
let formTest=document.getElementById('formTest');
let formChildren=document.querySelectorAll('.form-group');
let inputsText=document.querySelectorAll('input');
let errorNumbers;
let input;

//2) Nos fonctions de vérification
  //fonctions pour notifier les erreurs prend en paramétre un élément HTML : ajout de la classe "has-error"
let errorNotifier=elem1 =>{
  elem1.parentNode.classList.add('has-error');
  elem1.parentNode.innerHTML+='<span class="help-block">Ce champ est obligatoire</span>';
};
  //fonction pour dire que lélément en HTML est bien renseigné : ajout de la classe "has-succes"
let successNotifier=elem2 =>{
  elem2.parentNode.classList.add('has-success');
};
  //fonction pour enlever la classe has-error à un élément HTML en cas de correction
let errorRemover= elem3 =>{
  elem3.parentNode.classList.remove('has-error');
  elem3.parentNode.removeChild(elem3.parentNode.lastChild);
};
  //fonction de validificaion du formulaire : parcours tous les éléments pour vérifier s'il ya des erreurs ('has-error') si oui il retourne le nombre d'erreurs à corriger
let formValidator= v =>{
  let result=0;
  v.classList.forEach(className=>{
    if(className==='has-error'){
      result++;
    }
  });
   return result;
};
  //fonctions pour envoyer le nombre d'erreurs à l'utilisateur : elle fait appelle à la fonction formValidator pour connaitre le nombre d'erreur. S'il y'en a pas elle autorise l'envoie du formulaire : elle prend en paramétre 2 éléments l'event et un Nodelist(l'ensemble des div englobant nos inputs)
let sendForm=(event,elem4) =>{
  errorNumbers = 0;
  elem4.forEach(child=>{
    errorNumbers+=formValidator(child);
  });
  if(errorNumbers>=1){
    alert(`Il reste ${errorNumbers} champs à remplir`);
    event.preventDefault();
  }else{
    alert('Le formulaire est envoyé avec succes!!');
    formTest.submit=true;
    for(let i=0;i<inputsText.lenght;i++){
      inputsText[i].value='';
    }
  }
};
  //fonction pilote qui va vérifier si les champs son vide ou pas ainsi elle fait appel aux fonctions de vérification(errorNotifier,errorRemover et successNotifier) pour envoyer des indications à l'utilisateur .
  let formVerifier= () =>{
  for (let i = 0,lengthInputsText=inputsText.length; i < lengthInputsText; i++) {
    if(inputsText[i].type==='text'){
      if(inputsText[i].value===''){
        if(inputsText[i].parentNode.classList.length===2&& inputsText[i].parentNode.classList[1]==='has-error'){
          errorRemover(inputsText[i]);
        }
        errorNotifier(inputsText[i]);
      }else{
        if(inputsText[i].parentNode.classList.length===2 && inputsText[i].parentNode.classList[1]==='has-error'){
          errorRemover(inputsText[i]);
        }
        successNotifier(inputsText[i]);
      }
    }
  }
  if(adresse.value===''){
    if(adresse.parentNode.classList.length===2 && adresse.parentNode.classList[1]==='has-error'){
      errorRemover(adresse);
    }
    errorNotifier(adresse);
  }else{
    if(adresse.parentNode.classList.length===2 && adresse.parentNode.classList[1]==='has-error'){
      errorRemover(adresse);
    }
    successNotifier(adresse);
  }
};
//3)Listes des événements
  //Ecout du click sur le bouton envoyer pour déclencher nos fonctions
document.getElementById('submit').addEventListener('click',(e)=>{
  //Déclenchement de notre fonction pilote formVerifier() pour détecter les erreurs
  formVerifier();
  //Déclenchement de notre fonction d'envoie qui vérifie est ce formValidator() a vu des erreurs. Si oui elle renvoie le message à le user sinon elle valide et envoie le formulaire
  sendForm(e,formChildren);
},false);

  //Ecout du click sur l'élément "je souhaite recevoir la newslettre" pour mettre le focus sur le champs ou le user doit mettre son mail
newsletter.addEventListener('click',()=> {
  if(newsletter.checked){
    couriel.focus();
  }
},false);
//Ecout du focus sur le champ couriel pour automatiquement cocher "je souhaite recevoir la newslettre"
couriel.addEventListener('focus',()=> {
  newsletter.checked=true;
},false);
//Ecout du blur sur le champ couriel pour vérifier si le user a saisi quelque chose : si il a rien mis on décoche automatiquement "je souhaite recevoir la newslettre"
couriel.addEventListener('blur',()=> {
  if(couriel.value===''){
    newsletter.checked=false;
  }
},false);

