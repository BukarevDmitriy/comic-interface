import '@/assets/css/main.css';
import arrow from '@/assets/icons/arrow.svg'
import { fetchComic } from '@/js/api';
import {
  comicTitle,
  comicImage,
  comicDescription,
  notification,
  prevButton,
  randomButton,
  nextButton,
  toBeginButton,
  toEndButton
} from '@/js/elements';
import { checkButton, randomInteger } from '@/js/helpers';
import { BEGIN_COMIC_NUMBER, END_COMIC_NUMBER, ERROR_SHOW_TIME } from "@/js/const";

let currentComicId

const renderComic = (title, img, alt, description) => {
  comicTitle.innerHTML = title
  comicDescription.innerHTML = description
  comicImage.src = img
  comicImage.alt = alt
}
const renderNotification = (message) => {
  notification.innerHTML = message
  notification.classList.add('notification-show')

  setTimeout(() => {
    notification.classList.remove('notification-show')
  }, ERROR_SHOW_TIME)
}

const onButtonClick = (button) => {
  try {
    fetchComic(currentComicId)
      .then(({ title, img, alt, transcript }) => {
        renderComic(title, img, alt, transcript)
      })
      .catch((e) => {
        renderNotification(e)
      })
      .finally(() => {
        button.disabled = false
        checkRoundButtons()
      });
  } catch (e) {
    renderNotification(e)
  }
}

const onClickPrevButton = (e) => {
  const button = checkButton(e)

  button.disabled = true
  currentComicId--

  if (currentComicId <= BEGIN_COMIC_NUMBER) {
    currentComicId = BEGIN_COMIC_NUMBER
  }

  onButtonClick(button)
}

const onClickNextButton = (e) => {
  const button = checkButton(e)

  button.disabled = true
  currentComicId++

  if (currentComicId > END_COMIC_NUMBER) {
    currentComicId = END_COMIC_NUMBER
  }

  onButtonClick(button)
}

const checkRoundButtons = () => {
  prevButton.disabled = currentComicId <= BEGIN_COMIC_NUMBER
  nextButton.disabled = currentComicId >= END_COMIC_NUMBER
}

const onClickRandomButton = (e) => {
  e.target.disabled = true

  currentComicId = randomInteger(BEGIN_COMIC_NUMBER, END_COMIC_NUMBER)

  onButtonClick(e.target)
}

const onClickToBeginButton = (e) => {
  e.target.disabled = true

  currentComicId = BEGIN_COMIC_NUMBER

  onButtonClick(e.target)
}

const onClickToEndButton = (e) => {
  e.target.disabled = true

  currentComicId = END_COMIC_NUMBER

  onButtonClick(e.target)
}

prevButton.addEventListener('click', onClickPrevButton)
nextButton.addEventListener('click', onClickNextButton)
randomButton.addEventListener('click', onClickRandomButton)
toBeginButton.addEventListener('click', onClickToBeginButton)
toEndButton.addEventListener('click', onClickToEndButton)

// begin script
currentComicId = END_COMIC_NUMBER
checkRoundButtons()

fetchComic(currentComicId)
  .then(({title, img, alt, transcript}) => {
    renderComic(title, img, alt, transcript)
  })
  .catch((e) => {
    renderNotification(e)
  });
