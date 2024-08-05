function compressImage(
  imgToCompress: HTMLImageElement,
  resizingFactor: number,
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

  const canvasWidth = originalWidth * resizingFactor;
  const canvasHeight = originalHeight * resizingFactor;

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  context.drawImage(imgToCompress, 0, 0, canvasWidth, canvasHeight);

  // reducing the quality of the image
  canvas.toBlob(
    (blob) => {
      if (blob) {
        compressedImageBlob = blob;
        if (compressedImage) {
          compressedImage.src = URL.createObjectURL(compressedImageBlob);
        }
        const sizeElement = document.querySelector("#size");
        if (sizeElement) {
          sizeElement.innerHTML = bytesToSize(blob.size);
        }
      }
    },
    "image/jpeg",
    quality
  );
}

// source: https://stackoverflow.com/a/18650828
function bytesToSize(bytes: number): string {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

  if (bytes === 0) {
    return "0 Byte";
  }

  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i)) + " " + sizes[i];
}

export { compressImage };
