class Photo {
  constructor(title, caption, file, id) {
    this.title = title;
    this.caption = caption;
    this.id = id || Date.now();
    this.file = file;
    
  }

  deleteFromStorage(key) {
    // var newPhotoArray = photoArray.filter(function (ideaInst) {
    //   if (photoInst.id !== key){
    //     return photoInst;
    //   }
    // });

    // photoArray = newPhotoArray;
    // this.saveToStorage(photoArray);
  }
  
  saveToStorage(array) {
    localStorage.clear();
    var stringArray = JSON.stringify(array);
    localStorage.setItem('ideasKey', stringArray);
  }

  updateSelf(title, caption) {
    // this.title = title;
    // this.caption = caption;
  }

}
