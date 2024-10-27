function run() {
  let htmlCode = document.getElementById("html").value;
  let cssCode = document.getElementById("css").value;
  let jsCode = document.getElementById("js").value;
  let output = document.getElementById("output");
  output.contentDocument.body.innerHTML = htmlCode + "<style>" + cssCode + "</style>";
  output.contentWindow.eval(jsCode);
}