import { refs } from '../refs/refs';
import { simpleLightBox } from '../simpleLightBox/simpleLightBoxInit';
import { fetchImages } from '../fetchData/fetchImages';
import { createImageNode } from '../createNodes/createImageNode';
import { smoothScroll } from '../scrollUtils/smoothScroll';
import { PER_PAGE } from '../../constants/requestParams/REQUEST_PARAMS';

let page = 1; // Представляє номер сторінки для завантаження
let inputText = ''; // Зображення чого потрібно знайти

/**
 * Рендерить нові зображення якщо проміс успішний
 * @param {object} imagesSet Об'єкт з інформацією про знайдені зображення
 * @returns {void}
 */
const promiseProcessing = imagesSet => {
  const { totalHits, hits } = imagesSet;

  // Якщо не знайдено жодного зображення за запитом
  if (!totalHits) {
    return;
  } else if (hits.length < PER_PAGE || totalHits / PER_PAGE === page) {
    // Якщо завантажені всі знайдені зображення
    loadMoreEl.style.display = 'none';
  } else {
    // Якщо завантажений черговий набір інформації про зображення
    loadMoreEl.style.display = 'inline-block';
    page++;
  }

  const galleryNodes = hits.map(imageInfo => createImageNode(imageInfo)); // Створення розмітки для одного зображення
  galleryEl.insertAdjacentHTML('beforeend', galleryNodes.join('')); // Рендер розмітки з зображеннями
  simpleLightBox.refresh(); // Повторна ініціалізація SimpleLightbox
  if (page > 2) smoothScroll(); // Плавний скрол вниз на 2 висоти елемента галереї
};

/**
 * Викликає функцію для виконання запиту на сервер
 * @param {string} q
 */
const callFetchImages = q => {
  fetchImages({ q, page })
    .then(imagesSet => promiseProcessing(imagesSet.data))
    .catch(error => console.log(error));
};

/**
 * Формує нову інформацію для запиту
 * @param {object} event 'submit'
 * @returns {void}
 */
const onSubmitByImages = event => {
  event.preventDefault();

  refs.searchBtnEl.blur();

  refs.galleryEl.innerHTML = '';
  refs.loadMoreEl.style.display = 'none';
  page = 1;
  inputText = '';

  inputText = event.currentTarget.elements.searchQuery.value;

  if (!inputText) {
    return;
  }

  callFetchImages(inputText); // Передача нової інформації для запиту

  refs.form.reset();
};

/**
 * Завантажує ще зображення за попереднім запитом
 */
const onLoadMoreImages = () => {
  refs.loadMoreEl.style.display = 'none';
  callFetchImages(inputText);
};

export { onSubmitByImages, onLoadMoreImages };
