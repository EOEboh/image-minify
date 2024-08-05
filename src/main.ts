import * as Compress from "./modules/compressImage";

const fileInput = document.querySelector<HTMLInputElement>("#upload");

const originalImage =
  document.querySelector<HTMLImageElement>("#originalImage");

const CompressBtn = document.querySelector(
  "#compress-btn"
) as HTMLButtonElement;

const resizingElement =
  document.querySelector<HTMLInputElement>("#resizingRange");
const qualityElement =
  document.querySelector<HTMLInputElement>("#qualityRange");

// const uploadButton = document.querySelector<HTMLButtonElement>("#uploadButton");

let resizingFactor = 0.8;
let quality = 0.8;

// initializing the compressed image
if (originalImage) {
  Compress.compressImage(originalImage, resizingFactor, quality);
}

fileInput?.addEventListener("change", async () => {
  const file = (fileInput.files as FileList)[0];
  if (file && originalImage) {
    // storing the original image
    originalImage.src = await fileToDataUri(file);

    // compressing the uploaded image
    CompressBtn.addEventListener("click", () => {
      Compress.compressImage(originalImage, resizingFactor, quality);
    });
  }
});

resizingElement?.addEventListener("input", (e: Event) => {
  const target = e.target as HTMLInputElement;
  resizingFactor = parseInt(target.value) / 100;
  if (originalImage) {
    Compress.compressImage(originalImage, resizingFactor, quality);
  }
});

qualityElement?.addEventListener("input", (e: Event) => {
  const target = e.target as HTMLInputElement;
  quality = parseInt(target.value) / 100;
  if (originalImage) {
    Compress.compressImage(originalImage, resizingFactor, quality);
  }
});

// uploadButton?.addEventListener("click", () => {
//   // uploading the compressed image to Imgur (if present)
//   if (compressedImageBlob) {
//     const formData = new FormData();
//     formData.append("image", compressedImageBlob);

//     fetch("https://api.imgur.com/3/image/", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         Authorization: "Client-ID YOUR_CLIENT_ID",
//       },
//       body: formData,
//     }).then((response) => {
//       if (response?.status === 403) {
//         alert("Invalid Client-ID!");
//       } else if (response?.status === 200) {
//         // retrieving the URL of the image just uploaded to Imgur
//         response.json().then((jsonResponse) => {
//           alert(`URL: ${jsonResponse.data?.link}`);
//         });
//         alert("Upload completed successfully!");
//       } else {
//         console.error(response);
//       }
//     });
//   } else {
//     alert("Resized and compressed image missing!");
//   }
// });

function fileToDataUri(field: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      resolve(reader.result as string);
    });
    reader.readAsDataURL(field);
  });
}
