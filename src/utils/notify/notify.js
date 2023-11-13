import { Notify } from 'notiflix/build/notiflix-notify-aio';

const notifyFailure = (timeout = 3000) =>
  Notify.failure('Sorry, there are no images matching your search query. Please try again.', {
    timeout,
  });

const notifySuccess = (totalHits, timeout = 3000) =>
  Notify.success(`Hooray! We found ${totalHits} images.`, { timeout });

const notifyInfo = (timeout = 3000) =>
  Notify.info('Were sorry, but youve reached the end of search results.', {
    timeout,
  });

export { notifyFailure, notifySuccess, notifyInfo };
