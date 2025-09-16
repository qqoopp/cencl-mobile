export const getDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더해줍니다.
  const day = today.getDate();

  return {year, month, day};
};
