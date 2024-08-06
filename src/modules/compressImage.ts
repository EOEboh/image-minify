import bytesToSize from "../utils/bytesToSize";

function compressImage(
  imgToCompress: HTMLImageElement,
  dimensionFactor: number,
  imgFormat: string,
  quality: number
): void {
  const compressedImage =
    document.querySelector<HTMLImageElement>("#compressedImage");
  // showing the compressed image
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  let compressedImageBlob: Blob;

  if (!context) {
    return;
  }

  const originalWidth = imgToCompress.width;
  const originalHeight = imgToCompress.height;

  const canvasWidth = originalWidth * dimensionFactor;
  const canvasHeight = originalHeight * dimensionFactor;

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  context.drawImage(imgToCompress, 0, 0, canvasWidth, canvasHeight);

  // reducing the quality of the image
  canvas.toBlob(
    (blob) => {
      if (blob) {
        compressedImageBlob = blob;
        console.log("blob", blob);
        if (compressedImage) {
          compressedImage.src = URL.createObjectURL(compressedImageBlob);
        }
        const sizeElement = document.querySelector("#size");
        if (sizeElement) {
          sizeElement.innerHTML = bytesToSize(blob.size);
        }
      }
    },
    imgFormat,
    quality
  );
}

export { compressImage };
