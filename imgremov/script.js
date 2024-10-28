function removeBackground() {
    var fileInput = document.getElementById("file");
    var file = fileInput.files[0];
    var formData = new FormData();
    formData.append("image_file", file);
    fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: {
        "X-Api-Key": "o8jt9NHnMwDAKZGJSqRZGadz"
      },
      body: formData
    })
    .then(response => response.blob())
    .then(blob => {
      var url = URL.createObjectURL(blob);
      var resultDiv = document.getElementById("result");
      var image = new Image();
      image.src = url;
      resultDiv.appendChild(image);
  
      // Create download link
      var link = document.createElement("a");
    link.href = url;
    link.download = "background_removed.png";
    var span = document.createElement("span");
    span.innerHTML = "Download <i class='fa fa-download'></i>";
    link.appendChild(span);
    resultDiv.appendChild(link);
    })
    .catch(error => {
      console.error(error);
    });
  }
  
  