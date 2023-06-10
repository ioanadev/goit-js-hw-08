import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const form = document.getElementById('search-form');
let gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');
loadMore.style.visibility = 'hidden';
let currentPage = 1;
let perPage = 40;
let searchQuery = '';

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
form.addEventListener('submit', event => {
  event.preventDefault();
  searchQuery = event.target.searchQuery.value;
  currentPage = 1;
  clearGallery();
  if (searchQuery.trim() === '') {
    loadMore.style.visibility = 'hidden';
    Report.failure('Please enter a search query.', '');
  } else {
    searchImages();
  }
});
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
loadMore.addEventListener('click', event => {
  event.preventDefault();
  currentPage++;
  searchImages();
});
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
async function searchImages() {
  const API_KEY = '36995967-7696682f503bb4e5597a47b78';

  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${currentPage}&lang=ro`;

  try {
    const response = await axios(url);
    console.log('Response:', response.data);
    const images = response.data.hits;
    const totalHits = response.data.totalHits;
    if (images.length === 0) {
      loadMore.style.visibility = 'hidden';
      Report.failure(
        'Sorry',
        'There are no images matching your search query. Please try again.'
      );
      //  } else if (currentPage * perPage > totalHits) {
      //    console.log(
      //      'We	&acute;re sorry, but you&acute;ve reached the end of search results.'
      //     );
      //  Notify.info(
      //    'We	&acute;re sorry, but you&acute;ve reached the end of search results.'
      //  );
    } else {
      images.forEach(image => {
        const card = makeImageCard(image);
        gallery.appendChild(card);
        loadMore.style.visibility = 'visible';
      });
      /////////// loadMoreButton();
      const lightbox = new SimpleLightbox('.gallery a');
      lightbox.refresh();
    }
    if (currentPage * perPage > totalHits) {
      Report.info(
        '',
        'We	&acute;re sorry, but you&acute;ve reached the end of search results.'
      );
      loadMore.style.visibility = 'hidden';
    } else if (currentPage > 1) {
      Notify.info(
        `${currentPage * perPage} pictures out of ${totalHits} were displayed!`
      );
    }
  } catch (error) {
    console.log(error);
  }
}

//##################################################################
function clearGallery() {
  gallery.innerHTML = '';
}

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
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
  paragraf.appendChild(infoLabel);
  paragraf.appendChild(infoValue);
  return paragraf;
}

//@@@@@@@@@@@@@@@@@@@@@@@
