window.onload = function () {
  const content = document.querySelector('.content'),
    edit = content.querySelector('.profile__edit-button'),
    pop = document.querySelector('.pop-up'),
    close = document.querySelector('.pop-up__close-button'),
    popName = document.querySelector('.pop-up__input_name'),
    popDesc = document.querySelector('.pop-up__input_desc'),
    profName = content.querySelector('.profile__name'),
    profDesc = content.querySelector('.profile__description'),
    form = document.querySelector('.pop-up__form');

  function editButton() {
    if (pop.classList.contains('pop-up_opened')) {
      pop.classList.remove('pop-up_opened');
      popName.value = profName.textContent;
      popDesc.value = profDesc.textContent;
    }
  }

  function closeButton() {
    if (!pop.classList.contains('pop-up_opened')) {
      pop.classList.add('pop-up_opened');
    }
  }

  function formSubmitHandler(evt) {
    evt.preventDefault();

    profName.textContent = popName.value;
    profDesc.textContent = popDesc.value;
    closeButton();
  }

  edit.addEventListener('click', editButton);
  close.addEventListener('click', closeButton);
  form.addEventListener('submit', formSubmitHandler);

}
