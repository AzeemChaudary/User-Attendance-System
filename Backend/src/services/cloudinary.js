import cloudinary from 'cloudinary';
cloudinary.config ({
    cloud_name :process.env.CLOUD_NAME ||  "Your Cloud Name" ,  
    api_key :process.env.API_KEY  || "Your Cloud Key", 
    api_secret : process.env.API_SECRET || "Your Cloud Secret"
})



export const uploadToCloudinary = async (path, folder) => {
    try {
        console.log("uploadToCloudinary calling " );
      const data = await cloudinary.v2.uploader.upload(path, { folder });
      return { url: data.url, public_id: data.public_id };
    } catch (error) {
      console.log("There is an error while uploading file to Cloudinary: " + error);
      throw error; 
    }
  };
  

   
export const removeFromCloudinary = async (public_id) =>{
    await cloudinary.v2.uploader.destroy(public_id , function (error, result){
        console.log("Removing of file from Cloudinary " + result);
        console.log("There is an error while Removing file from Cloudinary " + error);

    })
}

