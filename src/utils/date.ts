export const getLastSunday = (fullDate: string) => {
  let isUseTwoMonth = false;

  const _fullDate = fullDate.split('/');
  const d = new Date(_fullDate[2] + '-' + _fullDate[0] + '-' + _fullDate[1]);

  // 오늘날의 요일, 년, 월, 일 데이터

  const date = d.getDay();
  const day = d.getDate();
  const month = d.getMonth();
  const year = d.getFullYear();
  const prevMonthDayCounts = month === 0 ? getDayCountFromMonth(year, 11) : getDayCountFromMonth(year, month);
  let lastSunday = day - date;

  if (lastSunday <= 0) {
    isUseTwoMonth = true;
    lastSunday = prevMonthDayCounts + lastSunday;
  }

  const _weeks = [];

  for (let i = 0; i < 7; i++) {
    _weeks.push(lastSunday + i);
  }

  if (isUseTwoMonth) {
    for (let i = 0; i < 7; i++) {
      _weeks[i] = _weeks[i] > prevMonthDayCounts ? _weeks[i] - prevMonthDayCounts : _weeks[i];
    }
  }
  return _weeks;
};

const getDayCountFromMonth = (year: number, month: number) => {
  return new Date(year, month, 0).getDate();
};
