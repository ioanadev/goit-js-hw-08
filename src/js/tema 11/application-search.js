import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const form = document.getElementById('search-form');
console.log(form);
let gallery = document.querySelector('.gallery');
const button = console.log(gallery);
let currentPage = 1;
let searchQuery = '';
//---------
form.addEventListener('submit', event => {
  event.preventDefault();
  console.log('s - a apasat butonul...');
  searchQuery = event.target.searchQuery.value;
  console.log('Search:', searchQuery);
  clearGallery();
  if (searchQuery.trim() === '') {
    Notify.failure('Please enter a search query.');
  } else {
    searchImages();
  }
});
//+++++++++++++
/*function checkSearchQuery() {
  if (searchQuery.trim() === '') {
    Notify.failure('Please enter a search query.');
    clearGallery();
    return;
  }
}*/
//@@@@@@@@@@@@@@@@@@@@@@@
async function searchImages() {
  const API_KEY = '36995967-7696682f503bb4e5597a47b78';
  //checkSearchQuery();
  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&lang=ro`;

  try {
    const response = await axios(url);
    console.log('Response:', response.data);
    const images = response.data.hits;
    //const total = response.total;
    //  console.log(images.length);
    //  console.log(images);
    if (images.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      images.forEach(image => {
        const card = makeImageCard(image);
        gallery.appendChild(card);
      });
      const lightbox = new SimpleLightbox('.gallery a');
      lightbox.refresh();
    }
  } catch (error) {
    console.log(error);
  }
}

//#####################
function clearGallery() {
  gallery.innerHTML = '';
}

//^^^^^^^^^^^^^^^^^^^
function makeImageCard(image) {
  const card = document.createElement('div');
  card.classList.add('photo-card');
  const linkImage = document.createElement('a');
  linkImage.href = image.largeImageURL;

  const img = document.createElement('img');
  img.src = image.webformatURL;
  img.alt = image.tags;
  img.loading = 'lazy';
  img.classList.add('image');
  linkImage.appendChild(img);
  card.appendChild(linkImage);

  const contInfo = document.createElement('div');
  contInfo.classList.add('info');
  contInfo.appendChild(makeImageInfo('Likes:', image.likes));
  contInfo.appendChild(makeImageInfo('Views:', image.views));
  contInfo.appendChild(makeImageInfo('Comments:', image.comments));
  contInfo.appendChild(makeImageInfo('Downloads:', image.downloads));
  card.appendChild(contInfo);

  return card;
}
//$$$$$$$$$$$$$$$$$$$$$$$$$$
function makeImageInfo(label, value) {
  const paragraf = document.createElement('p');
  paragraf.classList.add('paragraf-info');
  const infoLabel = document.createElement('b');
  infoLabel.textContent = label;
  const infoValue = document.createTextNode(value);
  //infoValue.classList.add('info-value');
  paragraf.appendChild(infoLabel);
  paragraf.appendChild(infoValue);
  return paragraf;
}
