export function generateNameAndLabel(str: string) {
  const splitStr = str.split(" ");
  const strLen = splitStr.length;

  let label = "";
  let name = "";

  if (strLen > 1) {
    name = splitStr
      .map((str, i) =>
        i === 0
          ? str.toLowerCase()
          : str[0].toUpperCase() + str.slice(1, str.length)
      )
      .join("");
    label = splitStr
      .map((str) => str[0].toUpperCase() + str.slice(1, str.length))
      .join(" ");
  } else {
    const str = splitStr.join();
    name = str.toLowerCase();
    label = str[0].toUpperCase() + str.slice(1, str.length);
  }

  return { name, label };
}
