import archiveItem from '../templates/archiveItem.hbs';

const archiveModalList = document.querySelector('.modal-archive-list');

const markupArchiveList = data => {
  archiveModalList.insertAdjacentHTML('beforeend', archiveItem(data));
};

export default markupArchiveList;
