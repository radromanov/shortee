export const toDashcase = (str: string) => {
  const words = str.toLowerCase().match(/[a-z]+/g) || [];

  console.log(words);
  return words.length > 1 ? words.join("-") : words.join();
};
