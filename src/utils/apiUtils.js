export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`)
}

export async function apiRequest(url, options) {
  return fetch(url, options).then(checkResponse)
}