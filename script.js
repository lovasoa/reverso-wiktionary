var input = document.getElementById("search");
var form = document.getElementById("form");
var props = document.getElementById("props");
var iframe1 = document.getElementById("wt");
var iframe2 = document.getElementById("r");
form.onsubmit = function(evt) {
 evt.preventDefault();
 search(input.value);
 if (window.history) history.pushState(input.value, input.value, "index.html?s="+input.value);
 return false;
}

function search(value) {
   var s = (value);
   document.title = "Reverso-Wiktionary: " + s;
   input.value = s;
   iframe1.src = "https://en.wiktionary.org/wiki/"+s+"#Russian"; 
   iframe2.src = "http://context.reverso.net/translation/russian-french/"+s;
}

input.onkeyup = function(e) {
  if(e.keyCode === 13) {
    search(input.value);
    showSuggestions(false);
  }
  else {
    autocompleteRequest(input.value);
  }
}

var last_search = "", suggestions = false;
function autocompleteRequest(s) {
  if (s === last_search) return;
  last_search = s;
  showSuggestions(true);
  var script = document.createElement("script");
  script.src = "https://en.wiktionary.org/w/api.php?action=opensearch&format=json&formatversion=2&callback=updateOptions&search="+encodeURIComponent(s);
  document.body.appendChild(script);
}

function updateOptions(res) {
  if (!suggestions) return;
  props.innerHTML = "";
  res[1].forEach(function(prop) {
    var opt = document.createElement("option");
    opt.value = prop;
    props.appendChild(opt);
  });
}

function showSuggestions(show) {
  suggestions = show;
  if (suggestions === false) props.innerHTML = "";
}

var m = window.location.search.match(/\?s=([^&]*)/);
if (m) search(decodeURIComponent(m[1]));

window.onpopstate = function(evt) {
  search(evt.state);
};
