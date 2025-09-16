/**
 * 기준은 오늘 날짜
 * @params 며칠전 인지 양수로 입력
 * @returns yyyy-mm-dd
 */
export const getFullDateByCalcDaysAgo = (prevDay = 0) => {
  const d = new Date();
  const year = d.getFullYear(); // 년
  const month = d.getMonth(); // 월
  const date = d.getDate(); // 일
  //   const day = d.getDay(); //

  const fullDtae = new Date(year, month, date - prevDay)
    .toISOString()
    .split('T')[0]
    .split('-')
    .map((_, index) => {
      if (index > 0) {
        return _.length === 1 ? '0' + _ : _;
      } else {
        return _;
      }
    });

  return fullDtae[0] + '-' + fullDtae[1] + '-' + fullDtae[2];
};
