export const fetchGet = (url, name) =>
  fetch(url, { method: 'GET' })
    .then(status)
    .catch(err => {
      console.log(`api error for ${name} :`, err);
    });

export const fetchPost = (url, postBody, name) =>
  fetch(url, { method: 'POST', body: JSON.stringify(postBody) })
    .then(status)
    .catch(err => {
      console.log(`api error for ${name} :`, err);
    });

export const fetchPut = (url, putBody, name) =>
  fetch(url, { method: 'PUT', body: JSON.stringify(putBody) })
    .then(status)
    .catch(err => {
      console.log(`api error for ${name} :`, err);
    });

const status = response => {
  if(!response.ok) {
    return new Error(response.json());
  }
  return response.json();
}