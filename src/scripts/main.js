const uploadElement = document.getElementById("uploadEl");

function convertBytesToMegabytes(bytes = 1048576) {
  // 1 byte is equal to 9.5367431640625e-7 megabytes
  const megabytes = bytes * 9.5367431640625e-7;
  return megabytes.toFixed(2);
}

console.log("test", convertBytesToMegabytes());

uploadElement.addEventListener("change", () => {
  const uploadedFile = uploadElement.files[0];

  console.log("original", uploadedFile.size);

  const url = URL.createObjectURL(uploadedFile);
  const img = new Image();

  img.src = url;

  img.onload = function () {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    context.drawImage(img, 0, 0);

    const compressBtn = document.querySelector("#compress-btn");
    const compressBtnText = document.querySelector("#cta-btn-text");
    const compressSize = document.querySelector("#compress-file-size");

    compressBtn.addEventListener("click", () => {
      const mimeType = document.getElementById(
        "compressing-format-select"
      ).value;
      console.log("format", mimeType);

      canvas.toBlob(
        (blob) => {
          console.log("compressed", blob.size);
          const fr = new FileReader();

          fr.addEventListener("load", () => {
            document.querySelector("#compress-figcaption").textContent =
              "Your compressed image below:";

            const dataURL = fr.result;
            const finalImage = document.getElementById("compressed-image");
            finalImage.src = dataURL;
            // console.log("dataURL", dataURL);

            finalImage.onload = () => {
              compressSize.textContent = `${convertBytesToMegabytes(
                blob.size
              )}MB`;

              compressBtnText.innerHTML = `
              <a href="${dataURL}" download="${uploadedFile.name
                .split(".")
                .shift()}_compressed">
                <button>Download</button>
              </a>
            `;
            };
          });

          fr.readAsDataURL(blob);
        },
        mimeType,
        0.9
      );
    });
  };
});
