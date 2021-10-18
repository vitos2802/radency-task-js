let date = new Date();

const options = {
  year: 'numeric',
  day: 'numeric',
  month: 'short',
};

const formatDate = date.toLocaleString('en-US', options);

export default formatDate;
