const copyShortLink = async (url: string) => {
  return await navigator.clipboard.writeText(url);
};

export default copyShortLink;
