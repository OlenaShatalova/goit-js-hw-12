import SimpleLightbox from 'simplelightbox';
import iziToast from 'izitoast';
import { createGalleryCardTemplate, createGalleryMarkup } from './js/render-functions.js';
import { fetchPhotos } from './js/pixabay-api.js';
import icon from '../src/img/icon.svg';

let lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

const searchFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const loadMoreBtn = document.querySelector('.js-load-more-btn');
const spanLoadMore = document.querySelector('.available-photo-quantity');
const loader = document.querySelector('.js-loader');

const photoPerPage = 15;
let availablePhotoQuantity;
let searchedValue = '';
let currentPage;
let totalPages;

const checkAvailablePhoto = () => {
  if (currentPage !== totalPages) {
    loadMoreBtn.classList.remove('is-hidden');
    spanLoadMore.textContent = availablePhotoQuantity;
  } else {
    iziToast.show({
      timeout: 3000,
      message: "We're sorry, but you've reached the end of search results.",
      position: 'bottomLeft',
      iconUrl: icon,
    });
  }
};

const onSearchFormSubmit = async event => {
  try {
    event.preventDefault();

    loader.classList.remove('is-hidden');

    searchedValue = searchFormEl.elements.user_query.value.trim();
    if (!searchedValue) {
      iziToast.show({
        timeout: 3000,
        message: 'To search, fill out the form!',
        position: 'topLeft',
        iconUrl: icon,
      });

      galleryEl.innerHTML = '';
      searchFormEl.reset();

      return;
    }

    currentPage = 1;

    const { data } = await fetchPhotos(searchedValue, currentPage, photoPerPage);

    loader.classList.add('is-hidden');

    if (data.hits.length === 0) {
      iziToast.show({
        timeout: 5000,
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        iconUrl: icon,
      });

      galleryEl.innerHTML = '';
      searchFormEl.reset();

      return;
    }

    galleryEl.innerHTML = createGalleryMarkup(data.hits);

    lightbox.refresh();
    searchFormEl.reset();

    totalPages = Math.ceil(data.totalHits / photoPerPage);
    availablePhotoQuantity = data.totalHits - photoPerPage;
    checkAvailablePhoto();
  } catch (error) {
    iziToast.show({
      timeout: 5000,
      message: `An error occurred: ${error.message}`,
      position: 'topCenter',
      iconUrl: icon,
    });
  }
};

const onLoadMoreBtn = async () => {
  try {
    currentPage++;

    loader.classList.remove('is-hidden');
    loadMoreBtn.classList.add('is-hidden');

    const { data } = await fetchPhotos(searchedValue, currentPage, photoPerPage);

    galleryEl.insertAdjacentHTML('beforeend', createGalleryMarkup(data.hits));
    lightbox.refresh();

    loader.classList.add('is-hidden');

    availablePhotoQuantity -= photoPerPage;

    checkAvailablePhoto();

    const galleryImg = galleryEl.querySelector('li');
    let imgHeight = galleryImg.getBoundingClientRect().height;
    window.scrollBy({
      top: imgHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    iziToast.show({
      timeout: 5000,
      message: `An error occurred: ${error.message}`,
      position: 'topCenter',
      iconUrl: icon,
    });
  }
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMoreBtn);
