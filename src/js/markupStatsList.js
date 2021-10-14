import statsItem from '../templates/statsItem.hbs';

const statsList = document.querySelector('#table__list-stats');

const markupStatsList = data => {
  statsList.insertAdjacentHTML('beforeend', statsItem(data));
};

export default markupStatsList;
