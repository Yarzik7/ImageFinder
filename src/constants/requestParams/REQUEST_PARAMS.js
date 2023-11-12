// Адреса api сервера
const BASE_URL = 'https://pixabay.com/api/';

// Параметри запиту
const REQUEST_PARAMS = Object.freeze({
  key: '',
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
  page: 1,
  per_page: 40,
});

export { REQUEST_PARAMS, BASE_URL };
