const getJwtToken = () => {
  const loggedUserJSON = localStorage.getItem('loggedUser');
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON);
    return user.token;
  }
  return null;
};

export const getJwtHeaderWithFormData = () => {
  return {
    headers: { Authorization: `Bearer ${getJwtToken()}`, 'Content-Type': 'multipart/form-data' },
  };
};

export const getJwtHeader = () => {
  return {
    headers: { Authorization: `Bearer ${getJwtToken()}` },
  };
};
