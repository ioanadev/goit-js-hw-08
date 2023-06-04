import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const searchForm = document.getElementById('search-form');
console.log(searchForm);
const button = document.querySelector('.button');
console.log(button);
const searchInput = document.querySelector('input[name="searchQuery"]');
console.log(searchInput);
const gallery = document.querySelector('.gallery');
const searchVal = searchInput.value;

const API_KEY = '36995967-7696682f503bb4e5597a47b78';
const url = `https://pixabay.com/api/?key=${API_KEY}&q=${searchVal}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`;
async function getImages() {
  try {
    const data = await axios(url);
    console.log('Data:', data);
    const imageObject = data.data.hits;
    console.log(imageObject.length);
    if (imageObject.length == 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      imageObject.forEach(image => {
        const {
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        } = image;
        console.log(image);
        console.log(webformatURL);
        console.log(largeImageURL);
        console.log(tags);
        console.log(likes);
        console.log(views);
        console.log(comments);
        console.log(downloads);
        // makeGalleryCard(image);
      });
    }
  } catch (error) {
    console.log(error);
  }
}

button.addEventListener('click', e => {
  e.preventDefault();
  getImages();
  makeGalleryCard();
});
const makeGalleryCard = () => {
  const photoCard = document.createElement('div');
  photoCard.classList.add('photo-info');
  const searchImage = document.createElement('img');
  const infoSection = document.createElement('div');
  infoSection.appendChild(makeInfoItems('likes', likes));
  infoSection.dataset.likes = likes;
  infoSection.appendChild(makeInfoItems('views', views));
  infoSection.dataset.views = views;
  infoSection.appendChild(makeInfoItems('comments', comments));
  infoSection.dataset.comments = comments;
  infoSection.appendChild(makeInfoItems('downloads', downloads));
  infoSection.dataset.downloads = downloads;
  photoCard.appendChild(searchImage);
  photoCard.appendChild(infoSection);
  gallery.appendChild(photoCard);
  // });
};
const makeInfoItems = (dataInfo, text) => {
  const paragrafInfo = document.createElement('p');
  paragrafInfo.classList.add('info-item');
  const boldInfo = document.createElement('b');
  paragrafInfo.appendChild(boldInfo);
  return paragrafInfo;
};
/*const displayImages = images => {
  gallery.innerHTML = '';
  console.log(images);
  //gallery.appendChild(makeGalleryCard(images));*/
/*if (images.length == 0) {
    console.log('Nu s-au gasit imagini pt cuvantul introdus');
  } else {
    gallery.appendChild(makeGalleryCard(images));
  }*/
/*};*/
//displayImages();
