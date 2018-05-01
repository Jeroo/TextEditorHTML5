$(document).ready(function () {
  $(document).tooltip();
  
  var container = $('.faimg'), inputFile = $('#file');	
			
	container.on('click', function(){	
		inputFile.click();
	});

	inputFile.on('change', function(e){
		
    var filesSelected = this.files;
    if (filesSelected.length > 0) {
      var fileToLoad = filesSelected[0];
  
      if (fileToLoad.type.match("image.*")) {
        var fileReader = new FileReader();
        fileReader.onload = function (fileLoadedEvent) {
          var imageLoaded = document.createElement("img");
          imageLoaded.src = fileLoadedEvent.target.result;
          document.getElementById("editor-textarea").appendChild(imageLoaded);
        };
        fileReader.readAsDataURL(fileToLoad);
      }
    }
		
 }); 

});


var oDoc, sDefTxt;

function initDoc() {
  oDoc = document.getElementById("editor-textarea");
  sDefTxt = oDoc.innerHTML;
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

function loadImageFileAsURL() {
  var filesSelected = document.getElementById("inputFileToLoad").files;
  if (filesSelected.length > 0) {
    var fileToLoad = filesSelected[0];

    if (fileToLoad.type.match("image.*")) {
      var fileReader = new FileReader();
      fileReader.onload = function (fileLoadedEvent) {
        var imageLoaded = document.createElement("img");
        imageLoaded.src = fileLoadedEvent.target.result;
        imageLoaded.classList.add("resize");
        document.getElementById("editor-textarea").appendChild(imageLoaded);
      };
      fileReader.readAsDataURL(fileToLoad);
    }
  }
}

function insertHTML(img) {
  var id = "rand" + Math.random();
  var doc = document.getElementById("editor");
  doc = doc.document ? doc.document : doc.contentWindow.document;
  img = "<img src='" + img + "' id=" + id + ">";

  if(document.all) {
    var range = doc.selection.createRange();
    range.pasteHTML(img);
    range.collapse(false);
    range.select();
  } else {
    doc.execCommand("insertHTML", false, img);
  }
  return doc.getElementById(id);
};

function appendToStorage(name, data) {
  
  localStorage.clear();
  localStorage.setItem(name,data);
}

function addTextArea() {

  appendToStorage('documento',  $('#editor-textarea').html());
}

function openTextArea() {

  $('#editor-textarea').html(localStorage.getItem('documento'));
}