import * as Compress from "./modules/compressImage";
import bytesToSize from "./utils/bytesToSize";

const fileInput = document.querySelector<HTMLInputElement>("#upload");

let imgFormat: string;
document
  .getElementById("img-format")
  ?.addEventListener("change", (event: Event) => {
    const target = event.target as HTMLSelectElement;
    imgFormat = target.value;
  });

// console.log("formatSelect", formatSelect.value);
const originalImage =
  document.querySelector<HTMLImageElement>("#originalImage");

const CompressBtn = document.querySelector(
  "#compress-btn"
) as HTMLButtonElement;

const resizingElement =
  document.querySelector<HTMLInputElement>("#resizingRange");
const qualityElement =
  document.querySelector<HTMLInputElement>("#qualityRange");

const sizeElement = document.querySelector<HTMLSpanElement>("#size");

// const uploadButton = document.querySelector<HTMLButtonElement>("#uploadButton");

let dimensionFactor = 1;
let quality = 1;

// initializing the compressed image
if (originalImage) {
  Compress.compressImage(
    originalImage,
    dimensionFactor,
    (imgFormat = "image/png"),
    quality
  );
}

fileInput?.addEventListener("change", async () => {
  const file = (fileInput.files as FileList)[0];
  if (file && originalImage) {
    // storing the original image
    originalImage.src = await fileToDataUri(file);

    console.log("file", file);
    if (sizeElement) {
      sizeElement.innerHTML = bytesToSize(file.size);
    }

    // compressing the uploaded image
    CompressBtn.addEventListener("click", () => {
      Compress.compressImage(
        originalImage,
        dimensionFactor,
        imgFormat,
        quality
      );
    });
  }
});

resizingElement?.addEventListener("input", (e: Event) => {
  const target = e.target as HTMLInputElement;
  // resizingFactor = parseInt(target.value) / 100;
  dimensionFactor = parseInt(target.value) / 100;
  if (originalImage) {
    Compress.compressImage(originalImage, dimensionFactor, imgFormat, quality);
  }
});

qualityElement?.addEventListener("input", (e: Event) => {
  const target = e.target as HTMLInputElement;
  quality = parseInt(target.value) / 100;
  if (originalImage) {
    Compress.compressImage(originalImage, dimensionFactor, imgFormat, quality);
  }
});

function fileToDataUri(field: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      resolve(reader.result as string);
    });
    reader.readAsDataURL(field);
  });
}
