//- Создание и рендер разметки по массиву данных `galleryItems` из `app.js` и предоставленному шаблону.
import galleryItems from './db.js'

const gallery = document.querySelector('.js-gallery')

gallery.insertAdjacentHTML(
  'beforeend',
  galleryItems
    .map(
      image =>
        `<li class="gallery__item">
          <a class="gallery__link" href="${image.original}">
            <img
              class="gallery__image"
              src="${image.preview}"
              data-source="${image.original}"
              alt="${image.description}"
            />
          </a>
        </li>`,
    )
    .join(''),
)

//- Реализация делегирования на галерее `ul.js-gallery` и получение `url` большого изображения.
gallery.addEventListener('click', handleNavClick)

function handleNavClick(event) {
  event.preventDefault()

  const target = event.target

  if (target.nodeName !== 'IMG') return

  toOpenLightbox()
  getLargerImageLink(target)
}

//- Открытие модального окна по клику на элементе галереи.
const lightbox = document.querySelector('.js-lightbox')

function toOpenLightbox() {
  lightbox.classList.add('is-open')

  lightboxCloseBtn.addEventListener('click', toCloseLightbox)
  lightboxCloseOverlay.addEventListener('click', toCloseLightbox)
  window.addEventListener('keydown', lightboxByKey)
}

//- Подмена значения атрибута `src` элемента `img.lightbox__image`.
const currentLargeImage = document.querySelector('.lightbox__image')

function getLargerImageLink(targetImage) {
  currentLargeImage.setAttribute('src', targetImage.dataset.source)
  currentLargeImage.setAttribute('alt', targetImage.alt)
}

//- Закрытие модального окна по клику на кнопку `button[data-action="close-lightbox"]`.
const lightboxCloseBtn = document.querySelector('[data-action="close-lightbox"]')

function toCloseLightbox() {
  lightbox.classList.remove('is-open')
  resetLargerImageLink()

  lightboxCloseBtn.removeEventListener('click', toCloseLightbox)
  lightboxCloseOverlay.removeEventListener('click', toCloseLightbox)
  window.removeEventListener('keydown', lightboxByKey)
}

//- Очистка значения атрибута `src` элемента `img.lightbox__image`. Это необходимо для того, чтобы при следующем открытии
//  модального окна, пока грузится изображение, мы не видели предыдущее.
function resetLargerImageLink() {
  currentLargeImage.setAttribute('src', '')
  currentLargeImage.setAttribute('alt', '')
}

//- Закрытие модального окна по клику на `div.lightbox__overlay`.
const lightboxCloseOverlay = document.querySelector('.lightbox__overlay')

//- Закрытие модального окна по нажатию клавиши `ESC`.
function lightboxByKey(event) {
  event.code === 'Escape' ? toCloseLightbox() : null
  event.code === 'ArrowLeft' ? toSlideLeft() : null
  event.code === 'ArrowRight' ? toSlideRight() : null
}

//- Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".
const lengthArray = galleryItems.length

function toSlideLeft() {
  for (let i = 0; i < lengthArray; i += 1) {
    if (currentLargeImage.getAttribute('src') === galleryItems[i].original) {
      currentLargeImage.setAttribute('alt', galleryItems[i - 1].description)
      currentLargeImage.setAttribute('src', galleryItems[i - 1].original)
      return
    }
  }
}

function toSlideRight() {
  for (let i = 0; i < lengthArray; i += 1) {
    if (currentLargeImage.getAttribute('src') === galleryItems[i].original) {
      currentLargeImage.setAttribute('alt', galleryItems[i + 1].description)
      currentLargeImage.setAttribute('src', galleryItems[i + 1].original)
      return
    }
  }
}
