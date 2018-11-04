class Photo {
  constructor(title, caption, id) {
    this.title = title;
    this.caption = body;
    this.id = id || Date.now();
    
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
    // localStorage.clear();
    // var stringArray = JSON.stringify(array);
    // localStorage.setItem('ideasKey', stringArray);
  }

  updateSelf(title, caption) {
    // this.title = title;
    // this.caption = caption;
  }

}
