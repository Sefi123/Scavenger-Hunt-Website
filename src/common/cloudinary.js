import cloudinary from "cloudinary-core";

export const CLOUDINARY_UPLOAD_PRESET = "ml_default";
export const CLOUDINARY_CLOUD_NAME = "dfz28acim";

export const cloudinaryCore = new cloudinary.Cloudinary({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  secure: true,
});

export const uploadImage = async (img, cb) => {
  if (img != null) {
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    data.append("cloud_name", CLOUDINARY_CLOUD_NAME);
    return fetch("https://api.cloudinary.com/v1_1/dfz28acim/upload", {
      mode: "cors",
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        cb(data.url, true);
      })
      .catch((err) => {
        console.log({ err });

        cb("", false);
      });
  }
};
