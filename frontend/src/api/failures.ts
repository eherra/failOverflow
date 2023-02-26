import axios from 'axios';
const restUrl = '/api/failures';
import { getJwtHeader } from './utils/headers';

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

// Failures
const getAllFailures = async (limit: number) => {
  const response = await axios.get(`${restUrl}?limit=${limit}`, getJwtHeader());
  return response.data;
};

const getUsersFailures = async () => {
  const response = await axios.get(`${restUrl}/user`, getJwtHeader());
  return response.data;
};

export const createFailure = async (failure: any) => {
  const response = await axios.post(restUrl, { failure: failure }, getJwtHeader());
  return response.data;
};

export const deleteFailure = async (failureId: string) => {
  const response = await axios.delete(`${restUrl}/${failureId}`, getJwtHeader());
  return response.data;
};

// Comments
export const addCommentToFailure = async ({ comment, failureId }: ICommentValues) => {
  const response = await axios.post(
    `${restUrl}/comment/${failureId}`,
    {
      comment,
    },
    getJwtHeader(),
  );
  return response.data;
};

const getFailureComments = async (failureId: string) => {
  const response = await axios.get(`${restUrl}/comment/${failureId}`, getJwtHeader());
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
    getJwtHeader(),
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
    getJwtHeader(),
  );
  return response.data;
};

const getVotingData = async (failureId: string, userId: string) => {
  const response = await axios.get(`${restUrl}/vote/${failureId}/user/${userId}`, getJwtHeader());
  return response.data;
};

const getFailureOfTheWeek = async () => {
  const response = await axios.get(`${restUrl}/vote/failure-week`, getJwtHeader());
  return response.data;
};

// Start ratings / review
export const handleRating = async ({ failureId, ratingValue }: IReviewValues) => {
  const response = await axios.post(
    `${restUrl}/rate/${failureId}`,
    {
      ratingValue,
    },
    getJwtHeader(),
  );
  return response.data;
};

const getRatingData = async (failureId: string, userId: string) => {
  const response = await axios.get(`${restUrl}/rate/${failureId}/user/${userId}`, getJwtHeader());
  return response.data;
};

const getReviewOfTheMonth = async () => {
  const response = await axios.get(`${restUrl}/rate/failure-month`, getJwtHeader());
  return response.data;
};

const getTechDistribution = async () => {
  const response = await axios.get(`${restUrl}/tech-distribution`, getJwtHeader());
  return response.data;
};

const getFailuresCreatedDistribution = async () => {
  const response = await axios.get(`${restUrl}/failures-distribution`, getJwtHeader());
  return response.data;
};

const getVoteDistribution = async () => {
  const response = await axios.get(`${restUrl}/vote-distribution`, getJwtHeader());
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
