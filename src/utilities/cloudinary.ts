import { POST } from "./axios-helper";

export const cloudinaryConfig: any = {
  cloudName: process.env.NEXT_PUBLIC_CLOUD_NAME,
  uploadPreset: process.env.NEXT_PUBLIC_CLOUD_UPLOAD_PRESET,
};

const uploadFiles = async (files: any) => {
  // Promise.all is used to wait for all the files to be uploaded
  return Promise.all(
    files.map(async (file: any) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", cloudinaryConfig.uploadPreset);
      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        return { type: data.resource_type, url: data.secure_url };
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    })
  );
};

export default uploadFiles;

// files.forEach(async (file: any) => {
//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("upload_preset", cloudinaryConfig.uploadPreset);
//   try {
//     const response = await fetch(
//       `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/upload`,
//       {
//         method: "POST",
//         body: formData,
//       }
//     );

//     const data = await response.json();
//     links.push(data.secure_url);
//   } catch (error) {
//     console.error("Error uploading image:", error);
//   }
// });
