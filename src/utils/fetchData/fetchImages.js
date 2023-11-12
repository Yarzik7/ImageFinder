import axios from 'axios';
import { REQUEST_PARAMS, BASE_URL } from '../../constants/requestParams/REQUEST_PARAMS';

axios.defaults.baseURL = BASE_URL; // Адреса api сервера

/**
 * Виконує запит на сервер
 * @param {object} queryParams інформація про запит за зображенням
 * @returns {object} об'єкт з даними про зображення
 */
export async function fetchImages(queryParams) {
  const parameters = new URLSearchParams({ ...REQUEST_PARAMS, ...queryParams }); // Отримує частину url з параметрами

  return await axios.get(`?${parameters}`);
}
