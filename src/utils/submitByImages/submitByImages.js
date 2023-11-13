import { refs } from '../refs/refs';
import { simpleLightBox } from '../simpleLightBox/simpleLightBoxInit';
import { fetchImages } from '../fetchData/fetchImages';
import { createImageNode } from '../createNodes/createImageNode';
import { smoothScroll } from '../scrollUtils/smoothScroll';
import { PER_PAGE } from '../../constants/requestParams/REQUEST_PARAMS';
import { notifyFailure, notifySuccess, notifyInfo } from '../notify/notify';

let page = 1;
let inputText = '';
let isHiddenLoadMore = true;

/**
 * Renders new images if the promise is successful
 * @param {object} imagesSet Object with information about found images
 * @returns {void}
 */
const promiseSuccessfulProcessing = imagesSet => {
  const { totalHits, hits } = imagesSet;

  refs.messageTextEl.style.display = 'none';

  isHiddenLoadMore = hits.length < PER_PAGE || Math.ceil(totalHits / PER_PAGE) === page;

  // If no requested image is found
  if (!totalHits) {
    notifyFailure(5000);
    return;
  } else if (isHiddenLoadMore) {
    // If all found images are loaded
    notifyInfo(5000);
    refs.loadMoreEl.style.display = 'none';
  } else {
    // If another set of image information is loaded
    refs.loadMoreEl.style.display = 'inline-block';
    page++;
  }

  notifySuccess(totalHits, 5000);
  const galleryNodes = hits.map(imageInfo => createImageNode(imageInfo));
  refs.galleryEl.insertAdjacentHTML('beforeend', galleryNodes.join(''));
  simpleLightBox.refresh();
};

/**
 * Request error handling
 * @param {object} error
 * @returns {void}
 */
const promiseErrorProcessing = error => {
  refs.messageTextEl.style.display = 'block';
  refs.messageTextEl.textContent = error.message;
  if (!isHiddenLoadMore) refs.loadMoreEl.style.display = 'inline-block';
};

/**
 * Final actions after a request attempt
 */
const promiseFinallyProcessing = () => {
  refs.loaderEl.style.display = 'none';
  page > 2 && smoothScroll();
};

/**
 * Calls a function to perform a request to the server
 * @param {string} q - query
 */
const callFetchImages = async q => {
  refs.loaderEl.style.display = 'block';
  await fetchImages({ q, page })
    .then(promiseSuccessfulProcessing)
    .catch(promiseErrorProcessing)
    .finally(promiseFinallyProcessing);
};

/**
 * Generates new information for the query
 * @param {object} event 'submit'
 * @returns {void}
 */
const onSubmitByImages = async event => {
  event.preventDefault();

  refs.searchBtnEl.blur();

  refs.galleryEl.innerHTML = '';
  refs.loadMoreEl.style.display = 'none';
  page = 1;
  inputText = '';

  inputText = event.currentTarget.elements.searchQuery.value;

  if (!inputText) {
    notifyFailure();
    return;
  }

  refs.messageTextEl.style.display = 'none';
  await callFetchImages(inputText);

  if (page > 1) {
    refs.formEl.reset();
  }
};

/**
 * Loading more images on previous request
 */
const onLoadMoreImages = () => {
  refs.loadMoreEl.blur();
  refs.loadMoreEl.style.display = 'none';
  callFetchImages(inputText);
};

export { onSubmitByImages, onLoadMoreImages };
