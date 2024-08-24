export const createGalleryCardTemplate = ({
  largeImageURL,
  webformatURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) => {
  return `
  <li class="gallery-item">
      <a class="gallery-link" href="${largeImageURL}">
      <img class="gallery-img" src="${webformatURL}" alt="${tags}" />
      </a>
      <ul class="img-info-list">
        <li class="img-info-item">
          <p class="img-info-text">Likes</p>
          <p class="img-info-value">${likes}</p>
        </li>
        <li class="img-info-item">
          <p class="img-info-text">Views</p>
          <p class="img-info-value">${views}</p>
        </li>
        <li class="img-info-item">
           <p class="img-info-text">Comments</p>
          <p class="img-info-value">${comments}</p>
        </li>
        <li class="img-info-item">
          <p class="img-info-text">Downloads</p>
          <p class="img-info-value">${downloads}</p>
        </li>
      </ul>
  </li>
  `;
};

export const createGalleryMarkup = images => {
  return images.map(imgDetails => createGalleryCardTemplate(imgDetails)).join('');
};
