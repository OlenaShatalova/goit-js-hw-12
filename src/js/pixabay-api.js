import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com';

export const fetchPhotos = (searchedQuery, page, perPage) => {
  const asyncParams = {
    params: {
      key: '45436364-f90a0cfe5f9b13d8d0e95a311',
      q: searchedQuery,
      page: page,
      per_page: perPage,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
    },
  };
  return axios.get('/api/', asyncParams);
};
