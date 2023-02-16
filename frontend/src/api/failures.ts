import axios from 'axios';
const baseUrl = 'http://localhost:8080';
const restUrl = '/api/failures';
const url = baseUrl + restUrl;

interface ICommentValues {
  comment: string;
  commentorId: string;
  failureId: string;
}

interface IVotingValues {
  voterId: string;
  failureId: string;
  isDeletingVote: boolean;
}

interface IReviewValues {
  raterId: string;
  failureId: string;
  ratingValue: number;
}

const getJwtToken = () => {
  const loggedUserJSON = localStorage.getItem('loggedUser');
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON);
    return user.token;
  }
  return null;
};

const config = () => {
  return {
    headers: { Authorization: `Bearer ${getJwtToken()}` },
  };
};

// Failures
const getAllFailures = async () => {
  const response = await axios.get(url, config());
  return response.data;
};

const getUsersFailures = async () => {
  const response = await axios.get(`${url}/user`, config());
  return response.data;
};

const createFailure = async (failure: any) => {
  const response = await axios.post(url, { failure: failure }, config());
  return response.data;
};

const deleteFailure = async (failureId: string) => {
  const response = await axios.delete(`${url}/${failureId}`, config());
  return response.data;
};

// Comments
const addCommentToFailure = async ({ comment, commentorId, failureId }: ICommentValues) => {
  const response = await axios.post(
    `${url}/comment/${failureId}`,
    {
      comment,
      commentorId,
    },
    config(),
  );
  return response.data;
};

const getFailureComments = async (failureId: string) => {
  const response = await axios.get(`${url}/comment/${failureId}`, config());
  return response.data;
};

const toggleCommentAllowed = async (failureId: string, isCommentsAllowed: boolean) => {
  // Send token here?
  const response = await axios.put(
    `${url}/comment/${failureId}/toggle-comment-allowance`,
    {
      isCommentsAllowed,
    },
    config(),
  );
  return response.data;
};

// Voting
const handleVoting = async ({ voterId, failureId, isDeletingVote }: IVotingValues) => {
  const response = await axios.post(
    `${url}/vote/${failureId}`,
    {
      voterId,
      isDeletingVote,
    },
    config(),
  );
  return response.data;
};

const getVotingData = async (failureId: string, userId: string) => {
  const response = await axios.get(`${url}/vote/${failureId}/user/${userId}`, config());
  return response.data;
};

const getFailureOfTheWeek = async () => {
  const response = await axios.get(`${url}/vote/failure-week`, config());
  return response.data;
};

// Start ratings / review
const sendRating = async ({ raterId, failureId, ratingValue }: IReviewValues) => {
  const response = await axios.post(
    `${url}/rate/${failureId}`,
    {
      raterId,
      ratingValue,
    },
    config(),
  );
  return response.data;
};

const getRatingData = async (failureId: string, userId: string) => {
  const response = await axios.get(`${url}/rate/${failureId}/user/${userId}`, config());
  return response.data;
};

const getReviewOfTheMonth = async () => {
  const response = await axios.get(`${url}/rate/failure-month`, config());
  return response.data;
};

export default {
  createFailure,
  getAllFailures,
  getUsersFailures,
  addCommentToFailure,
  handleVoting,
  sendRating,
  getRatingData,
  getVotingData,
  toggleCommentAllowed,
  getFailureOfTheWeek,
  getFailureComments,
  deleteFailure,
  getReviewOfTheMonth,
};
