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

// Failures
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

// Comments
const addCommentToFailure = async ({ comment, commentorId, failureId }: ICommentValues) => {
  const response = await axios.post(`${url}/comment/${failureId}`, {
    comment,
    commentorId,
  });
  return response.data;
};

const toggleCommentAllowed = async (failureId: string, isCommentsAllowed: boolean) => {
  // Send token here?
  const response = await axios.put(`${url}/comment/${failureId}/toggle-comment-allowance`, {
    isCommentsAllowed,
  });
  return response.data;
};

// Voting
const handleVoting = async ({ voterId, failureId, isDeletingVote }: IVotingValues) => {
  const response = await axios.post(`${url}/vote/${failureId}`, {
    voterId,
    isDeletingVote,
  });
  return response.data;
};

const getVotingData = async (failureId: string, userId: string) => {
  const response = await axios.get(`${url}/vote/${failureId}/user/${userId}`);
  return response.data;
};

// Start ratings / review
const sendRating = async ({ raterId, failureId, ratingValue }: IReviewValues) => {
  const response = await axios.post(`${url}/rate/${failureId}`, {
    raterId,
    ratingValue,
  });
  return response.data;
};

const getRatingData = async (failureId: string, userId: string) => {
  const response = await axios.get(`${url}/rate/${failureId}/user/${userId}`);
  return response.data;
};

export default {
  createFailure,
  getAllFailures,
  getUsersFailuresById,
  addCommentToFailure,
  handleVoting,
  sendRating,
  getRatingData,
  getVotingData,
  toggleCommentAllowed,
};
