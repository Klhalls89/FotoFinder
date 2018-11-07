var photoArray = [];
var reader = new FileReader();

document.querySelector('.js-add-to-album-btn').addEventListener('click', createNewPhoto);
document.querySelector('.js-gallery-sect').addEventListener('click', functionCaller);
document.querySelector('.js-gallery-sect').addEventListener('focusout', cardUpdate);
document.querySelector('.js-input-file').addEventListener('change',getSrc);

getInput('search').addEventListener('keyup', cardSearch);

setInitState()

function clearInputs() {
  getInput('title').value = '';
  getInput('caption').value = '';
}

function createNewPhoto(event) { 
  event.preventDefault();
  var photo = new Photo(getInput('title').value, getInput('caption').value, getInput('file'));
  cardPrepend(photo);
  photoArray.push(photo);
  photo.saveToStorage(photoArray)
  clearInputs();
}

function cardPrepend(photoObj) {
  document.querySelector('.js-gallery-sect').insertAdjacentHTML('afterbegin',
    `<article data-key="${photoObj.id}" class="photo-card js-photo-card">
          <h3 contentEditable="true" class="js-card-title">${photoObj.title}</h3>
          <section name="image-home">
            <img class="fit-img" src="${photoObj.file}">
          </section>
          <h3 class="js-card-caption" contentEditable="true">${photoObj.caption}</h3>
          <section class="icon-div">
            <img class="js-delete icons" src="./assets/delete.svg">
            <img id="${photoObj.id}" class="js-fav icons" src="./assets/favorite.svg">
          </section>
        </article>`
    );
  if(photoObj.favorite === true){
    document.getElementById(photoObj.id).src = "./assets/favorite-active.svg";
  }
}

function cardSearch() {
  var allCards = document.querySelectorAll('.js-photo-card');

  allCards.forEach(function(card) {
    var title = card.children[0].innerText.toLowerCase();
    var caption = card.children[2].innerText.toLowerCase();
    console.log(title, caption)
    var searchInput = getInput('search').value.toLowerCase();

    if (!title.includes(searchInput) && !caption.includes(searchInput)) {
      card.classList.add('hidden');
    } else {
      card.classList.remove('hidden');
    }
  });
}

function cardUpdate() {
  if (event.target.classList.contains('js-card-title')) {
    titleUpdate();
  }

  if (event.target.classList.contains('js-card-caption')) {
    captionUpdate();
  }
}

function captionUpdate() {
  var cardKey = parseInt(event.target.closest('.js-photo-card').dataset.key);
  photoArray.forEach(function(photoInst) {
    if (photoInst.id === cardKey) {
      photoInst.updatePhoto(event.target.previousElementSibling.previousElementSibling.innerText, event.target.innerText); 
      photoInst.saveToStorage(photoArray);
    }
  });
}

function deleteCard() {
  var cardKey = parseInt(event.target.closest('.js-photo-card').dataset.key);

  photoArray.forEach(function(photoInst) {
    if (photoInst.id === cardKey) {
      photoInst.deleteFromStorage(cardKey);
    }
  });

  event.target.closest('.js-photo-card').remove();
}

function favPic() {
  var cardKey = parseInt(event.target.closest('.js-photo-card').dataset.key);
  var favArray;

  if(event.target.src.includes('favorite.svg') ){
    event.target.src = "./assets/favorite-active.svg";
  } else {
    event.target.src = "./assets/favorite.svg";
  }
 

  photoArray.forEach(function(photoInst) {
    if (photoInst.id === cardKey) {
      photoInst.favorite = !photoInst.favorite;
      photoInst.updatePhoto(photoInst.title, photoInst.caption, photoInst.favorite);
    photoInst.saveToStorage(photoArray)
    }
  });

  favBtnUpdate()
  //use favArray.length to update the inner html of the js-view-favs-btn 
}

function favBtnUpdate(){
    favArray = photoArray.filter(function(photoInst){
    return photoInst.favorite === true;
  })
  
  document.querySelector('.js-view-favs-btn').innerText = `View ${favArray.length} favorites`
}

function functionCaller() {
   if (event.target.classList.contains('js-fav')) {
    favPic();
  }

  if (event.target.classList.contains('js-delete')) {
    deleteCard();
  }
}

function getInput(value) {
if(value === 'title'){
  return document.querySelector('.js-title-input');
} else if (value === 'caption'){
  return document.querySelector('.js-caption-input');
} else if (value === 'file'){ 
   //
  return reader.result
} else {
  return document.querySelector('.js-searchbar-input');
}
}

function getSrc(){
  reader.readAsDataURL(document.querySelector('.js-input-file').files[0]);
}


function reinstateStorage() {
  var photoArrayString;
  photoArrayString = localStorage.getItem('photosKey');
  photoArray.length = 0;
  var jsonPhotoArray = JSON.parse(photoArrayString); 

  jsonPhotoArray.forEach(function(photoInst) {
    cardPrepend(photoInst);
    var photo = new Photo(photoInst.title, photoInst.caption, photoInst.file, photoInst.id, photoInst.favorite);
    photoArray.push(photo);
  });
}

function setInitState() {
  if (localStorage.length === 0) {
    return
  } else {
    reinstateStorage();
    favBtnUpdate();
  }
}

function titleUpdate() {
  var cardKey = parseInt(event.target.closest('.js-photo-card').dataset.key);
    
  photoArray.forEach(function(photoInst) {
    if (photoInst.id === cardKey) {
      photoInst.updatePhoto(event.target.innerText, event.target.nextElementSibling.nextElementSibling.innerText);
      photoInst.saveToStorage(photoArray);
    }
  });
}
