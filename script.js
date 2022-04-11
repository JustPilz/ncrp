const dayDiff = (date1, date2) =>
  Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / 86400000);

const weekdays = [
  'Воскресенье',
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
];

const months = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];

const start = new Date('2022-04-10');
const now = new Date();

const daysPassed = dayDiff(start, now);

document.querySelector('#days-passed').textContent = `День ${daysPassed}`;

document.querySelector('#date').textContent = `${
  weekdays[now.getDay()]
}, ${now.getDate()} ${months[now.getMonth()]}, ${now.getFullYear()}`;
