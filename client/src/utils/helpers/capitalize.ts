export const capitalize = (str: string) => {
  const words =
    str
      .toLowerCase()
      .match(/[a-z]+/g)
      ?.join(" ") || "";
  return words.charAt(0).toUpperCase() + words.slice(1);
};
