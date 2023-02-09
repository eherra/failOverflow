import axios from 'axios';
const baseUrl = 'http://localhost:8080';
const restUrl = '/api/failures';
const url = baseUrl + restUrl;

interface ICommentValues {
  comment: string;
  commentorId: string;
  failureId: string;
}

const getAllFailures = async () => {
  const response = await axios.get(`${url}/all`);
  return response.data;
};

const getUsersFailuresById = async (id: string) => {
  const response = await axios.get(`${url}/all/${id}`);
  return response.data;
};

const createFailure = async (failure: any, id: string) => {
  const response = await axios.post(url, { failure: failure, creatorId: id });
  return response.data;
};

const addCommentToFailure = async ({ comment, commentorId, failureId }: ICommentValues) => {
  const response = await axios.post(`${url}/comment/${failureId}`, {
    comment,
    commentorId,
  });
  return response.data;
};

export default { createFailure, getAllFailures, getUsersFailuresById, addCommentToFailure };
