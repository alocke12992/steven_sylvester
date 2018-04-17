import axios from 'axios';

export const updateUser = (user) => {
  return (dispatch) => {
    axios.put(`/api/users/${user.id}`, user)
    .then(res => {
        dispatch({
          type: 'USER',
          user: res.data.data,
          headers: res.headers
        })
      });
  }
}