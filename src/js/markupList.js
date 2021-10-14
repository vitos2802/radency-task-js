import tableItem from '../templates/tableItem.hbs';

const tableList = document.querySelector('#table-list-js');

const markupList = data => {
  tableList.insertAdjacentHTML('beforeend', tableItem(data));
};

export default markupList;
