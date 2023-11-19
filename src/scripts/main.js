// Initialization for ES Users
import { Collapse, Select, Ripple, initTE } from "tw-elements";

initTE({ Collapse, Select, Ripple });

const uploadElement = document.getElementById("uploadEl");

uploadElement.addEventListener("change", () => {
  const uploadedFile = uploadElement.files[0];

  console.log("original", uploadedFile.size);

  const url = URL.createObjectURL(uploadedFile);
  const img = new Image();

  img.src = url;

  img.onload = function () {
    // document.body.appendChild(img);

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    context.drawImage(img, 0, 0);

    const compressBtn = document.querySelector("#compress-btn");

    compressBtn.addEventListener("click", () => {
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
        0.9
      );
    });
  };
});
