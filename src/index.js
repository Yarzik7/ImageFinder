import 'dotenv/config';
import { refs } from './utils';
import { onSubmitByImages, onLoadMoreImages } from './utils/submitByImages/submitByImages';

refs.formEl.addEventListener('submit', onSubmitByImages);
refs.loadMoreEl.addEventListener('click', onLoadMoreImages);
