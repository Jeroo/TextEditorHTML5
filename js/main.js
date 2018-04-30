$( document ).ready(function() {
    $( document ).tooltip();
});


var oDoc, sDefTxt;

function initDoc() {
  oDoc = document.getElementById("editor-textarea");
  sDefTxt = oDoc.innerHTML;
}

function formatDoc(sCmd, sValue) {
    document.execCommand(sCmd, false, sValue);
  }