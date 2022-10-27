$(() => {
  //Здесь хранится количество символов в строке на момент изменения размера шрифта
  const savedNumberSymbols = {};
  $(".cupboard_text-container").on("input", handleInputEvent);

  function handleInputEvent(e) {
    const inputNumber = +e.target.getAttribute("data-number");
    if (e.originalEvent.inputType === "deleteContentBackward") {
      increaseFontSize(e, inputNumber);
    } else {
      decreaseFontSize(e, inputNumber);
    }
  }

  //Уменьшаем шрифт
  function decreaseFontSize(e, inputNumber) {
    //Проверяем, переполнен ли контейнер, если нет, прекращаем выполнение
    if (e.target.scrollHeight === e.target.clientHeight) {
      return;
    }
    
    const fontSize = window.getComputedStyle(e.target).fontSize;
    if (+fontSize.replace(/[px]/gi, "") < 14) {
      alert("Слишком большой размер текста");
      if (e.originalEvent.inputType === 'insertFromPaste') {
        document.execCommand("undo"); 
        increaseFontSize(e, inputNumber)
        return;
      }
      e.target.value = e.target.value.slice(0, -1);
      return;
    }
    if (savedNumberSymbols[inputNumber]) {
      savedNumberSymbols[inputNumber].push(e.target.value.length);
    } else {
      savedNumberSymbols[inputNumber] = [e.target.value.length];
    }
    const newFontSize = +fontSize.replace(/[px]/gi, "") - 2 + "px";
    e.target.style.fontSize = newFontSize;
    decreaseFontSize(e, inputNumber);
  }

  //Увеличиваем шрифт
  function increaseFontSize(e, inputNumber) {
    //Проверяем, переполнен ли контейнер, если да, инициируем уменьшение шрифта
    if (e.target.scrollHeight !== e.target.clientHeight) {
      decreaseFontSize(e, inputNumber);
      return;
    }

    if (
      !savedNumberSymbols[inputNumber] ||
      savedNumberSymbols[inputNumber].length < 1 ||
      e.target.value.length >= +savedNumberSymbols[inputNumber][savedNumberSymbols[inputNumber].length - 1]
    ) {
      return;
    }
    const fontSize = window.getComputedStyle(e.target).fontSize;
    const newFontSize = +fontSize.replace(/[px]/gi, "") + 2 + "px";
    e.target.style.fontSize = newFontSize;
    savedNumberSymbols[inputNumber].pop();
    increaseFontSize(e, inputNumber);
  }
});
