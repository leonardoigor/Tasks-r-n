import moment from 'moment';
const dateCompare = (res, maxDate, title) => {
  const toDay = (day1, day2, tasks) => {
    if (moment(day2).isSame(day1)) {
      return tasks;
    } else {
    }
  };
  const week = (day1, day2, tasks) => {
    if (
      moment(day2).isSame(day1) ||
      (moment(day1).isBefore(day2) && day1 >= moment().format('YYYY-MM-DD'))
    ) {
      return tasks;
    } else {
    }
  };

  const resp = res.data.filter(tasks => {
    switch (title) {
      case 'Hoje':
        return toDay(tasks.estimateAt, maxDate, tasks);
      case 'Amanhã':
        return toDay(tasks.estimateAt, maxDate, tasks);
      case 'Semana':
        return week(tasks.estimateAt, maxDate, tasks);
      case 'Mês':
        return week(tasks.estimateAt, maxDate, tasks);
      default:
        break;
    }
  });
  return resp;
};

export {dateCompare};
