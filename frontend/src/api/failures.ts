import axios from 'axios';
const restUrl = '/api/failures';

interface ICommentValues {
  comment: string;
  failureId: string;
}

interface IVotingValues {
  failureId: string;
  isDeletingVote: boolean;
}

interface IReviewValues {
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
  const response = await axios.get(restUrl, config());
  return response.data;
};

const getUsersFailures = async () => {
  const response = await axios.get(`${restUrl}/user`, config());
  return response.data;
};

export const createFailure = async (failure: any) => {
  const response = await axios.post(restUrl, { failure: failure }, config());
  return response.data;
};

export const deleteFailure = async (failureId: string) => {
  const response = await axios.delete(`${restUrl}/${failureId}`, config());
  return response.data;
};

// Comments
export const addCommentToFailure = async ({ comment, failureId }: ICommentValues) => {
  const response = await axios.post(
    `${restUrl}/comment/${failureId}`,
    {
      comment,
    },
    config(),
  );
  return response.data;
};

const getFailureComments = async (failureId: string) => {
  const response = await axios.get(`${restUrl}/comment/${failureId}`, config());
  return response.data;
};

export const toggleCommentAllowed = async ({
  failureId,
  isCommentsAllowed,
}: {
  failureId: string;
  isCommentsAllowed: boolean;
}) => {
  const response = await axios.put(
    `${restUrl}/comment/${failureId}/toggle-comment-allowance`,
    {
      isCommentsAllowed,
    },
    config(),
  );
  return response.data;
};

// Voting
export const handleVoting = async ({ failureId, isDeletingVote }: IVotingValues) => {
  const response = await axios.post(
    `${restUrl}/vote/${failureId}`,
    {
      isDeletingVote,
    },
    config(),
  );
  return response.data;
};

const getVotingData = async (failureId: string, userId: string) => {
  const response = await axios.get(`${restUrl}/vote/${failureId}/user/${userId}`, config());
  return response.data;
};

const getFailureOfTheWeek = async () => {
  const response = await axios.get(`${restUrl}/vote/failure-week`, config());
  return response.data;
};

// Start ratings / review
export const handleRating = async ({ failureId, ratingValue }: IReviewValues) => {
  const response = await axios.post(
    `${restUrl}/rate/${failureId}`,
    {
      ratingValue,
    },
    config(),
  );
  return response.data;
};

const getRatingData = async (failureId: string, userId: string) => {
  const response = await axios.get(`${restUrl}/rate/${failureId}/user/${userId}`, config());
  return response.data;
};

const getReviewOfTheMonth = async () => {
  const response = await axios.get(`${restUrl}/rate/failure-month`, config());
  return response.data;
};

const getTechDistribution = async () => {
  const response = await axios.get(`${restUrl}/tech-distribution`, config());
  return response.data;
};

const getFailuresCreatedDistribution = async () => {
  const response = await axios.get(`${restUrl}/failures-distribution`, config());
  return response.data;
};

const getVoteDistribution = async () => {
  const response = await axios.get(`${restUrl}/vote-distribution`, config());
  return response.data;
};

export default {
  getAllFailures,
  getUsersFailures,
  getRatingData,
  getVotingData,
  getFailureOfTheWeek,
  getFailureComments,
  getReviewOfTheMonth,
  getTechDistribution,
  getFailuresCreatedDistribution,
  getVoteDistribution,
};
