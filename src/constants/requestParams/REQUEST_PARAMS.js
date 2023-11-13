// Адреса api сервера
const BASE_URL = 'https://pixabay.com/api/';

// Кількість зображень на 1 сторінку
const PER_PAGE = 40;

// Параметри запиту
const REQUEST_PARAMS = Object.freeze({
  key: process.env.API_KEY,
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
  page: 1,
  per_page: PER_PAGE,
});

export { REQUEST_PARAMS, BASE_URL, PER_PAGE };
