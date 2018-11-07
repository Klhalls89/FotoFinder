class Photo {
  constructor(title, caption, file, id, favorite) {
    this.title = title;
    this.caption = caption;
    this.id = id || Date.now();
    this.file = file;
    this.favorite = favorite || false;
    
  }

  deleteFromStorage(key) {
    var newPhotoArray = photoArray.filter(function (photoInst) {
      if (photoInst.id !== key){
        return photoInst;
      }
    });

    photoArray = newPhotoArray;
    this.saveToStorage(photoArray);
  }
  
  saveToStorage(array) {
    localStorage.clear();
    var stringArray = JSON.stringify(array);
    localStorage.setItem('photosKey', stringArray);
  }

  updatePhoto(title, caption, favorite) {
    this.title = title;
    this.caption = caption;
    this.favorite = favorite;
  }

}
