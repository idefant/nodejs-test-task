// Фейковая проверка на VIP статус
export const checkIsVip = () => {
  const promise = new Promise<boolean>((resolve) => {
    setTimeout(() => {
      resolve(Math.random() < 0.5);
    }, 1000);
  });

  return promise;
};
