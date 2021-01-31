import '@/assets/css/main.css';
// eslint-disable-next-line no-unused-vars
import arrow from '@/assets/icons/arrow.svg';
import fetchComic from '@/js/api';
import {
  comicTitle,
  comicImage,
  comicDescription,
  notification,
  prevButton,
  randomButton,
  nextButton,
  toBeginButton,
  toEndButton,
} from '@/js/elements';
import { getButtonElement, randomInteger } from '@/js/helpers';
import { BEGIN_COMIC_NUMBER, END_COMIC_NUMBER, NOTIFICATION_SHOW_TIME } from '@/js/const';

let currentComicId;

const renderComic = (title, img, alt, description) => {
  comicTitle.innerHTML = title;
  comicDescription.innerHTML = description;
  comicImage.src = img;
  comicImage.alt = alt;
};
const renderNotification = (message) => {
  notification.innerHTML = message;
  notification.classList.add('notification-show');

  setTimeout(() => {
    notification.classList.remove('notification-show');
  }, NOTIFICATION_SHOW_TIME);
};

const checkRoundButtons = () => {
  prevButton.disabled = currentComicId <= BEGIN_COMIC_NUMBER;
  nextButton.disabled = currentComicId >= END_COMIC_NUMBER;
};

const onButtonClick = (button) => {
  try {
    fetchComic(currentComicId)
      .then(({
        title, img, alt, transcript,
      }) => {
        renderComic(title, img, alt, transcript);
      })
      .catch((e) => {
        renderNotification(e);
      })
      .finally(() => {
        button.disabled = false;
        checkRoundButtons();
      });
  } catch (e) {
    renderNotification(e);
  }
};

const onClickPrevButton = (e) => {
  const button = getButtonElement(e);

  button.disabled = true;
  currentComicId -= currentComicId;

  if (currentComicId <= BEGIN_COMIC_NUMBER) {
    currentComicId = BEGIN_COMIC_NUMBER;
  }

  onButtonClick(button);
};

const onClickNextButton = (e) => {
  const button = getButtonElement(e);

  button.disabled = true;
  currentComicId += 1;

  if (currentComicId > END_COMIC_NUMBER) {
    currentComicId = END_COMIC_NUMBER;
  }

  onButtonClick(button);
};

const onClickRandomButton = (e) => {
  e.target.disabled = true;

  currentComicId = randomInteger(BEGIN_COMIC_NUMBER, END_COMIC_NUMBER);

  onButtonClick(e.target);
};

const onClickToBeginButton = (e) => {
  e.target.disabled = true;

  currentComicId = BEGIN_COMIC_NUMBER;

  onButtonClick(e.target);
};

const onClickToEndButton = (e) => {
  e.target.disabled = true;

  currentComicId = END_COMIC_NUMBER;

  onButtonClick(e.target);
};

prevButton.addEventListener('click', onClickPrevButton);
nextButton.addEventListener('click', onClickNextButton);
randomButton.addEventListener('click', onClickRandomButton);
toBeginButton.addEventListener('click', onClickToBeginButton);
toEndButton.addEventListener('click', onClickToEndButton);

// begin script
currentComicId = END_COMIC_NUMBER;
checkRoundButtons();

fetchComic(currentComicId)
  .then(({
    title, img, alt, transcript,
  }) => {
    renderComic(title, img, alt, transcript);
  })
  .catch((e) => {
    renderNotification(e);
  });
