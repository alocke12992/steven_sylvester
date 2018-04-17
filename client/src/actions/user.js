import axios from 'axios';

export const updateUser = (user, id) => {
  return (dispatch) => {
    let {name, email, password} = user;
    let url = `/api/users/${id}?name=${name}&email=${email}&password=${password}`
    axios.put(url)
      .then(res => {
        dispatch({
          type: 'USER',
          user: res.data,
          headers: res.headers
        })
      });
  }
}