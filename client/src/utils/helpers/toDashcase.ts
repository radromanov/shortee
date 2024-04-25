export const toDashcase = (str: string) => {
  const words = str.toLowerCase().match(/[a-z]+/g) || [];

  return words.length > 1 ? words.join("-") : words.join();
};
