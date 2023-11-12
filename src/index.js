import { refs, simpleLightBox } from './utils';
import { onSubmitByImages, onLoadMoreImages } from './utils/submitByImages/submitByImages';


refs.form.addEventListener('submit', onSubmitByImages);
refs.loadMoreEl.addEventListener('click', onLoadMoreImages);
