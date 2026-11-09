const MAX_DIMENSION = 1080;

export function resizeImage(file: File): Promise<File> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/") || file.type.includes("svg")) {
      resolve(file);
      return;
    }
    const img = new Image();
    img.onload = () => {
      const { width, height } = img;
      if (width <= MAX_DIMENSION && height <= MAX_DIMENSION) {
        resolve(file);
        return;
      }
      const scale = Math.min(MAX_DIMENSION / width, MAX_DIMENSION / height);
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(width * scale);
      canvas.height = Math.round(height * scale);
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(
        (blob) => {
          if (!blob) { reject(new Error("Resize failed")); return; }
          resolve(new File([blob], file.name.replace(/\.[^.]+$/, ".jpg"), { type: "image/jpeg" }));
        },
        "image/jpeg",
        0.8
      );
    };
    img.onerror = () => reject(new Error("Image load failed"));
    img.src = URL.createObjectURL(file);
  });
}
