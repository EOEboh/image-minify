const uploadElement = document.getElementById("uploadEl");

uploadElement.addEventListener("change", () => {
  const uploadedFile = uploadElement.files[0];

  console.log("original", uploadedFile.size);

  const url = URL.createObjectURL(uploadedFile);
  const img = new Image();

  img.src = url;

  function fileValidation() {
    var fileInput = document.getElementById("uploaded-image");

    var filePath = fileInput.value;

    // Allowing file type
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

    if (!allowedExtensions.exec(filePath)) {
      alert("Invalid file type");
      fileInput.value = "";
      return false;
    } else {
      // Image preview
      if (fileInput.files && fileInput.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
          document.getElementById("imagePreview").innerHTML =
            '<img src="' + e.target.result + '"/>';
        };

        reader.readAsDataURL(fileInput.files[0]);
      }
    }
  }

  img.onload = function () {
    // document.body.appendChild(img);

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    context.drawImage(img, 0, 0);

    canvas.toBlob(
      (blob) => {
        console.log("compressed", blob.size);
        const fr = new FileReader();

        fr.readAsDataURL(blob);

        fr.addEventListener("load", () => {
          const dataURL = fr.result;
          const finalImage = document.getElementById("compressed-image");
          finalImage.src = dataURL;
          console.log("dataURL", dataURL);
        });
      },
      "image/webp",
      0.4
    );
  };
});
