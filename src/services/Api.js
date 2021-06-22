import axios from 'axios';
const BaseURL = "https://jsonplaceholder.typicode.com";
export const userData = () => {
    return axios(BaseURL + '/users', {
        method: 'GET',
    })
        .then(response => response)
        .catch(e => e.response);
};
export const usersPost = (id) => {
    console.log('BaseURL  + id__', BaseURL + '/posts/' + id)
    return axios(BaseURL + '/posts/' + id, {
        method: 'GET',
    })
        .then(response => response)
        .catch(e => e.response);
};
export const addPost = data => {
    return axios(BaseURL + '/posts', {
        method: 'POST',
        data: data,
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then(response => response)
        .catch(e => e.response);
};
export const updatePost = (data, id) => {
    return axios(BaseURL + '/posts/' + id, {
        method: 'PUT',
        data: data,
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then(response => response)
        .catch(e => e.response);
};
export const deletePost = id => {
    return axios(BaseURL + '/posts/' + id, {
        method: 'DELETE',
    })
        .then(response => response)
        .catch(e => e.response);
};
