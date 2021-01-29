const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';

const getComicUrl = (id) => `https://xkcd.com/${id}/info.0.json`;

export default async (id) => {
  const url = getComicUrl(id);

  const res = await fetch(`${PROXY_URL}${url}`);

  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, received ${res.status}`);
  }

  const data = await res.json();

  return data;
};
