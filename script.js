window.onload = function () {
  let content = document.querySelector('.content'),
    edit = content.querySelector('.profile__edit-button'),
    pop = document.querySelector('.pop-up'),
    close = document.querySelector('.pop-up__close-button'),
    popName = document.querySelector('.pop-up__input_name'),
    popDesc = document.querySelector('.pop-up__input_desc'),
    profName = content.querySelector('.profile__name'),
    profDesc = content.querySelector('.profile__description'),
    form = document.querySelector('.pop-up__form'),
    editHoverIcon = content.querySelector('.profile__edit-icon'),
    editHoverButton = content.querySelector('.profile__edit-button'),
    addHoverIcon = content.querySelector('.profile__add-icon'),
    addHoverButton = content.querySelector('.profile__add-button'),
    body = document.querySelector('.root');

  function editButton() {
    if (pop.classList.contains('pop-up_opened')) {
      pop.classList.remove('pop-up_opened');
      popName.value = profName.textContent;
      popDesc.value = profDesc.textContent;
      body.setAttribute('style', 'overflow: hidden;');
    }
  }

  function closeButton() {
    if (!pop.classList.contains('pop-up_opened')) {
      pop.classList.add('pop-up_opened');
      body.removeAttribute('style');
    }
  }

  function formSubmitHandler(evt) {
    evt.preventDefault();

    profName.textContent = popName.value;
    profDesc.textContent = popDesc.value;
    pop.classList.toggle('pop-up_opened');
    body.removeAttribute('style');
  }

  edit.addEventListener('click', editButton);
  close.addEventListener('click', closeButton);
  form.addEventListener('submit', formSubmitHandler);

  editHoverButton.onmouseover = function() {
    editHoverIcon.setAttribute('style', 'opacity: .6;');
  }

  editHoverButton.onmouseout = function() {
    editHoverIcon.removeAttribute('style');
  }

  addHoverButton.onmouseover = function() {
    addHoverIcon.setAttribute('style', 'opacity: .6;');
  }

  addHoverButton.onmouseout = function() {
    addHoverIcon.removeAttribute('style');
  }
}
