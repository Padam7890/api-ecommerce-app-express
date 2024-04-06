
const fs = require ('fs/promises')

const deletefile = async (imageUrl)=>{
    try {
       const data = await fs.unlink('.' + imageUrl);
       return data;
    } catch (error) {
         console.log(error);
         throw new Error('Failure in Image delet' + error)
    }
}

const deletefiles =   async (imageUrlarray)=>{
    for (const image of imageUrlarray) {
        try {
          await deletefile(image.url);
          console.log("Successfully deleted image:", image.url);
        } catch (error) {
          console.error("Unable to unlink/delete image:", image.url, error);
        }
      }
}

module.exports =  {deletefile, deletefiles};
