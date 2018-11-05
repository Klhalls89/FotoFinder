var photoArray = [];

document.querySelector('.js-add-to-album-btn').addEventListener('click', createNewPhoto);

function getInput(value) {
if(value === 'title'){
  return document.querySelector('.js-title-input');
} else if (value === 'caption'){
  return document.querySelector('.js-caption-input');
} else if (value === 'file'){
  return URL.createObjectURL(document.querySelector('.js-input-file').files[0]);
} else {
  return document.querySelector('.js-searchbar-input');
}
}

function createNewPhoto(event) { 
  event.preventDefault();
  var photo = new Photo(getInput('title').value, getInput('caption').value, getInput('file'));
  cardPrepend(photo);
  photoArray.push(photo);
  photo.saveToStorage(photoArray)
  clearInputs();
}

function clearInputs() {
  getInput('title').value = '';
  getInput('caption').value = '';
}


function cardPrepend(photoObj) {
  console.log('hi')
  document.querySelector('.js-gallery-sect').insertAdjacentHTML('afterbegin',
    `<article data-key="${photoObj.id}" class="photo-card js-photo-card">
          <h3 contentEditable="true" class="js-card-title">${photoObj.title}<h3>
          <section class="image-home">
            <img class="fit-img" src="${photoObj.file}">
          </section>
          <h3 contentEditable="true">${photoObj.caption}</h3>
          <section class="icon-div">
            <img class="icons" src="./assets/delete.svg">
            <img class="icons" src="./assets/favorite.svg">
          </section>
        </article>`
    );
}

