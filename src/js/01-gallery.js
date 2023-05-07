// Add imports above this line
import { galleryItems } from './gallery-items.js';
// Change code below this line
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
console.log(galleryItems);
let gallery = document.querySelector('.gallery');
console.log(gallery);
galleryItems.forEach(item => {
  //itereaza matricea galleryItems si creaza markup pentru fiecare element
  const galleryMarkup = `<li class = "gallery__item">
        <a class = "gallery__link" href = "${item.original}">
            <img class="gallery__image" src="${item.preview}" alt="${item.description}" />
        </a>
        </li >`;
  gallery.insertAdjacentHTML('afterbegin', galleryMarkup);
});
new SimpleLightbox('.gallery a', {
  captionsData: `alt`,
  captionDelay: 250,
  showCounter: false,
  scrollZoomFactor: 0.1,
});
