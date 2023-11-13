import axios from 'axios';
import { REQUEST_PARAMS, BASE_URL } from '../../constants/requestParams/REQUEST_PARAMS';

axios.defaults.baseURL = BASE_URL;

/**
 * Makes a request to the server
 * @param {object} queryParams image query information
 * @returns {object} object with image data
 */
export async function fetchImages(queryParams) {
  const parameters = new URLSearchParams({ ...REQUEST_PARAMS, ...queryParams });
  const { data } = await axios.get(`?${parameters}`);
  return data;
}
