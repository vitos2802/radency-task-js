import tableItem from '../templates/tableItem.hbs';

const tableList = document.querySelector('#table-list-js');

const markupList = date => {
  tableList.insertAdjacentHTML('beforeend', tableItem(date));
};

export default markupList;
