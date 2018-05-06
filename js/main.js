//Inicializamos Jquery para usar JQueryUI una vez cargue el documento completo
$(document).ready(function () {
 
  //Inicializamos la funcion tooltip de JQueryUI
  $(document).tooltip();

});

var oDoc, sDefTxt;
//Inicializamos los eventos de javascript cuando carga todo el documento
window.onload = function(){

function initDoc() {
  oDoc = document.getElementById("editor-textarea");
  sDefTxt = oDoc.innerHTML;

  return false;
}

initDoc();
var container =  document.getElementById('faimgid'), idSaveDoc = document.getElementById('idSaveDoc'), idOpenDoc = document.getElementById('idOpenDoc'), inputFile = document.getElementById('file');	

container.addEventListener('click', clickInputFile, false);

function clickInputFile() {

  inputFile.click();

  return false;
}


inputFile.addEventListener("change",function (e) {
  
  var filesSelected = this.files;
  if (filesSelected.length > 0) {
    var fileToLoad = filesSelected[0];

    if (fileToLoad.type.match("image.*")) {
      var fileReader = new FileReader();
      fileReader.onload = function (fileLoadedEvent) {
        var imageLoaded = document.createElement("img");
        imageLoaded.src = fileLoadedEvent.target.result;
        oDoc.appendChild(imageLoaded);
      };
      fileReader.readAsDataURL(fileToLoad);
    }
  }

  return false;

});

idSaveDoc.addEventListener("click",function (e) { 

  var documento = oDoc.innerHTML;
  saveInLocalStored(documento);
  return false;

},false);


idOpenDoc.addEventListener("click",function (e) { 

      if (localStorage.getItem('documentoGuardado') != "" && localStorage.getItem('documentoGuardado') != undefined && localStorage.getItem('documentoGuardado') != null) {
          
        // Code for localStorage/sessionStorage.
        oDoc.innerHTML = localStorage.getItem('documentoGuardado');
        
    
      } else {
    
          alert("No tiene documentos guardados!");
        
      }  

 },false);




}

function saveInLocalStored(data) {
 
  localStorage.clear();
  localStorage.documentoGuardado = data;
  alert("Documento Guardado Con éxito!");

  return false;  
}


function formatDoc(sCmd, sValue) {
  document.execCommand(sCmd, false, sValue);
}


function main() {
  var inputFileToLoad = document.createElement("input");
  inputFileToLoad.type = "file";
  inputFileToLoad.id = "inputFileToLoad";
  document.body.appendChild(inputFileToLoad);

  var buttonLoadFile = document.createElement("button");
  buttonLoadFile.onclick = loadImageFileAsURL;
  buttonLoadFile.textContent = "Load Selected File";
  document.body.appendChild(buttonLoadFile);
}