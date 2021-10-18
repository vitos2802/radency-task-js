const searchDate = text => {
  const regexp = /(\d{1,2}[./]){2,2}(\d{2,4})?/g;
  const result = regexp.exec(text);
  return result ? result[0] : '';
};

export default searchDate;
