import { BEGIN_COMIC_NUMBER, END_COMIC_NUMBER } from '@/js/const';

export const randomInteger = (min = BEGIN_COMIC_NUMBER, max = END_COMIC_NUMBER) => {
  const rand = min - 0.5 + Math.random() * (max - min + 1);

  return Math.round(rand);
};

export const getButtonElement = (e) => {
  if (e.target.tagName === 'IMG') {
    return e.target.parentNode;
  }

  return e.target;
};
