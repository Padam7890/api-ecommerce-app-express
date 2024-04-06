
const saveimagePath = (imageUrl)=>{
    const imagePath = "/storage/" + imageUrl.filename;
    return imagePath;
}

module.exports = saveimagePath;