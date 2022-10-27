$(() => {
  const fakeLogsData = [
    'Всех скороговорок не перескороговоришь, не перевыскороговоришь.',
    'Бык тупогуб, тупогубенький бычок, у быка губа тупа.',
    'От топота копыт пыль по полю летит.',
    'Вез корабль карамель, наскочил корабль на мель, матросы две недели карамель на мели ели.',
    'Стоит поп на копне, колпак на попе, копна под попом, поп под колпаком.',
    'На дворе трава, на траве дрова. Не руби дрова на траве двора.',
    'Ехал Гpека чеpез pеку, видит Гpека – в pеке pак. Сунул Гpека pуку в pеку, pак за pуку Гpеку цап!',
    'Краб крабу сделал грабли, подарил грабли крабу: «Грабь граблями гравий, краб».',
    'Тpидцaть тpи коpaбля лaвиpовaли, лaвиpовaли, лавировали, дa не вылaвиpовaли.',
    'Карл у Клары украл кораллы, Клара у Карла украла кларнет. Клара строго карала Карла за кражу коралла.',
    'Пришел Прокоп – кипит укроп, ушел Прокоп – кипит укроп. И при Прокопе кипит укроп, и без Прокопа кипит укроп.',
    'Везет Сеня Сaню с Соней в сaнкaх. Сaнки скок! Сеню – с ног, Сaню – в бок, Соню – в лоб. Все в сугpоб – хлоп!',
    'Не жалела мама мыла. Мама Милу мылом мыла. Мила мыла не любила, мыло Мила уронила.',
    'Шестнадцать шли мышей и шесть нашли грошей, а мыши, что поплоше, шумливо шарят гроши.',
    'Кукушка кукушонку купила капюшон. Как в капюшоне он смешон.',
    'Архип осип. Осип охрип.',
    'Вылит колокол, да не по-колоколовски. Шит колпак, да не по-колпаковски. Надо колокол переколоколовать, да перевыколоколовать. Надо колпак переколпаковать, да перевыколпаковать.',
  ]
  let stopAutoScroll = false;

  const logsContainer = $('.cupboard_logs-container');
  $('.cupboard_logs-button').on('click', () => {
    logsContainer.empty();
  })
  $('.cupboard_logs-container').on('scroll', handleScroll);

  setInterval(() => {
    logsContainer.append(createString());
    if (!stopAutoScroll) {
      //Автоматически скроллим в конец логов
      $('.cupboard_logs-container').scrollTop($('.cupboard_logs-container').prop('scrollHeight'));
    }
  }, 2000);

  //Создаем запись
  function createString() {
    const string = document.createElement('p');
    string.classList.add('cupboard_log-item');
    const date = document.createElement('span');
    date.append(getDate());
    const randomIndex = Math.round(Math.random() * (fakeLogsData.length - 1));
    string.append(date);
    string.append(fakeLogsData[randomIndex]);
    return string;
  };

  function getDate() {
    const date = new Date;
    let day = date.getDay();
    if (day < 10) day = '0' + day;
    let month = date.getMonth();
    if (month < 10) month = '0' + month;
    const year = date.getFullYear();
    let hour = date.getHours();
    if (hour < 10) hour = '0' + hour;
    let minute = date.getMinutes();
    if (minute < 10) minute = '0' + minute;
    let second = date.getSeconds();
    if (second < 10) second = '0' + second;

    return `${day}.${month}.${year} ${hour}:${minute}:${second} : `;
  };

  //Если пользователь начал прокручивать вверх, то отменяем авто-скролл вниз,
  //Если пользователь прокрутил скролл до конца вниз, снова включаем авто-скролл
  function handleScroll(e) {
    const test = e.target.clientHeight + e.target.scrollTop;
    if (Math.abs(test - e.target.scrollHeight) < 2) {
      stopAutoScroll = false;
    } else {
      stopAutoScroll = true;
    }
  }
})