import axios from 'axios';
const baseUrl = 'http://localhost:8080';
const restUrl = '/api/failures';
const url = baseUrl + restUrl;

const getAllFailures = async () => {
  const response = await axios.get(`${url}/all`);
  return response.data;
};

const getUsersFailuresById = async (id: string) => {
  const response = await axios.get(`${url}/all/${id}`);
  return response.data;
};

export default { getAllFailures, getUsersFailuresById };
