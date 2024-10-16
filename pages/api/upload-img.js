import { connectToDatabase } from "../../lib/db.js";
import { ObjectId } from "mongodb";
import { testing } from "../../lib/istesting.js";

async function handler(req, res) {
  // console.log("executed");

  const data = req.body;

  // console.log(data);

  // *********** Upload file to Cloudinary ******************** //
  function uploadFile(file) {
    const productionCloudKey = ddxhm7w2n;
    const myCloudKey = dgzynn8cb;
    const currentCloudKey = testing ? myCloudKey : productionCloudKey;

    const url = `https://api.cloudinary.com/v1_1/${currentCloudKey}/upload`;
    const fd = new FormData();
    fd.append("upload_preset", unsignedUploadPreset);
    fd.append("tags", "browser_upload"); // Optional - add tags for image admin in Cloudinary
    fd.append("file", file);

    fetch(url, {
      method: "POST",
      body: fd,
    })
      .then((response) => response.json())
      .then((data) => {
        // File uploaded successfully
        const url = data.secure_url;
        // Create a thumbnail of the uploaded image, with 150px width
        const tokens = url.split("/");
        tokens.splice(-3, 0, "w_150,c_scale");
        const img = new Image();
        img.src = tokens.join("/");
        img.alt = data.public_id;
        document.getElementById("gallery").appendChild(img);
      })
      .catch((error) => {
        console.error("Error uploading the file:", error);
      });
  }

  // *********** Handle selected files ******************** //
  const handleFiles = function (files) {
    for (let i = 0; i < files.length; i++) {
      uploadFile(files[i]); // call the function to upload the file
    }
  };
}

export default handler;
