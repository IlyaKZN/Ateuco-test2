$(() => {
  const colorOptions = ['green', 'gray', 'yellow', 'red'];

  $('.cupboard_color-container').on('click', handleColorContainerClick);

  function handleColorContainerClick(e) {
    if ($('.select-color-popup').length === 0) {
      createPopup(e)
    };
  }

  function createPopup(e) {
    e.target.append($('#select-color-template')[0].content.cloneNode(true));
    $('.select-color-popup_item').on('click', handlePopupItemClick);
    $('.select-color-popup_close-button').on('click', closePopup);
    const colorItems = $('.select-color-popup_item');

    //"Раскрашиваем" панель выбора цветов
    Array.from(colorItems).forEach((el, index) => {
      el.style.backgroundColor = colorOptions[index];
    })
  }

  function handlePopupItemClick(e) {
    const selectedColor = e.target.style.backgroundColor;
    $('.select-color-popup').parent()[0].style.backgroundColor = selectedColor;
    closePopup();
  }

  function closePopup() {
    $('.select-color-popup').remove();
  }
})