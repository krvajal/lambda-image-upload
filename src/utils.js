import axios from "axios";

export function formatSize(size) {
  const units = ["B", "kB", "MB", "GB"];
  let fSize = size * 1.0;
  let unitIndex = 0;

  while (fSize / Math.pow(1024, unitIndex) >= 1024) {
    fSize = fSize / Math.pow(1024, unitIndex);
    unitIndex++;
  }

  return `${(fSize / 1024).toFixed(2)}${units[unitIndex]}`;
}

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let encoded = reader.result.replace(/^data:(.*;base64,)?/, "");
      if (encoded.length % 4 > 0) {
        encoded += "=".repeat(4 - (encoded.length % 4));
      }
      resolve(encoded);
    };
    reader.onerror = error => reject(error);
  });
}

export function uploadFile(file, onProgress) {
  let url = "https://9otqivelml.execute-api.eu-west-1.amazonaws.com/dev/upload"; // fill from AWS

  return getBase64(file)
    .then(base64File => {
      axios.post(
        url,
        { file: base64File, type: file.type, filename: file.name },
        {
          headers: {
            "Content-Type": `application/json`
          }
        }
      );
    })
    .catch(err => {
      console.log("Oops, it does not work");
      console.log(Object.keys(err));
      console.log(JSON.stringify(err.config, null, 2));
    });
}
