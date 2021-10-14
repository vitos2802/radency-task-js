import './styles/main.scss';
import markupList from './js/markupList';
import markupStatsList from './js/markupStatsList';
import markupArchiveList from './js/markupArchiveList';
import { mdiCartOutline, mdiHeadCog, mdiLightbulbOutline } from '@mdi/js';
import formatDate from './js/date';
import generateIcon from './js/taskIcon';

let db = [
  {
    id: 1,
    icon: mdiCartOutline,
    name: 'Name',
    created: formatDate,
    category: 'Task',
    content: 'How are you?',
    dates: '',
    archived: true,
  },
  {
    id: 2,
    icon: mdiHeadCog,
    name: 'Name 2',
    created: formatDate,
    category: 'Random thought',
    content: 'How are you?',
    dates: '',
    archived: true,
  },

  {
    id: 3,
    icon: mdiHeadCog,
    name: 'Name 3',
    created: formatDate,
    category: 'Random thought',
    content: 'How are you?',
    dates: '',
    archived: false,
  },
  {
    id: 4,
    icon: mdiLightbulbOutline,
    name: 'Name 2',
    created: formatDate,
    category: 'Idea',
    content: 'How are you?',
    dates: '',
    archived: false,
  },
];

const tableList = document.querySelector('#table-list-js');
const statsList = document.querySelector('#table__list-stats');
const formModal = document.querySelector('#modal-create');
const editForm = document.querySelector('#edit-form');
const createForm = document.querySelector('.create-form');
const addBtn = document.querySelector('.table__add-btn');
const editModal = document.querySelector('#modal-edit');
const editInput = document.querySelector('#edit-input');
const editSelect = document.querySelector('#edit-select');
const editContent = document.querySelector('#content-edit');
const editDate = document.querySelector('.dates');
const closeModalBtn = document.querySelector('.close');
const archiveBtn = document.querySelector('.archive-btn');
const archiveModal = document.querySelector('.modal_archive');
const archiveList = document.querySelector('.modal-archive-list');
const closeArchiveModalBtn = document.querySelector('.modal-archive__close');
const closeEditModalBtn = document.querySelector('.modal-edit__close');

console.log(db);

const stats = db => {
  return db.reduce((acc, obj) => {
    const newObj = {
      icon: generateIcon(obj.category),
      category: obj.category,
      active: 0,
      archived: 0,
    };

    obj.archived ? (newObj.archived += 1) : (newObj.active += 1);

    const filterAcc = acc.find(obj => obj.category === newObj.category);

    if (filterAcc && filterAcc.category === obj.category) {
      obj.archived ? (filterAcc.archived += 1) : (filterAcc.active += 1);
    } else {
      acc.push(newObj);
    }

    return acc;
  }, []);
};

const activeTodo = db => db.filter(todo => todo.archived === false);
const archivedTodo = db => db.filter(todo => todo.archived === true);

const render = () => {
  tableList.textContent = '';
  statsList.textContent = '';
  markupList(activeTodo(db));
  markupStatsList(stats(db));
};

render();

const modalOpen = () => {
  formModal.classList.add('is-open');
};

const closeModal = () => {
  formModal.classList.remove('is-open');
};

const openModalEdit = () => {
  editModal.classList.add('is-open');
};

const closeModalEdit = () => {
  editModal.classList.remove('is-open');
};

const closeArchiveModal = () => {
  archiveModal.classList.remove('is-open');
  archiveList.textContent = '';
};

const addTodo = e => {
  e.preventDefault();
  const newTodo = {
    id: Date.now(),
    created: formatDate,
    // dates: [],
    icon: '',
    archived: false,
  };

  const formData = new FormData(e.target);
  formData.forEach((value, key) => {
    newTodo[key] = value;
  });
  newTodo.dates = newTodo.dates.split(/-\s*/).reverse().join('/');
  newTodo.icon = generateIcon(newTodo.category);

  db = [...db, newTodo];

  render();
  createForm.reset();
  closeModal();
  console.log(newTodo);
};

const editTodo = e => {
  e.preventDefault();

  if (e.target.closest('.edit')) {
    openModalEdit();
    const id = e.target.dataset.id;
    const todo = db.find(todo => todo.id === +id);

    editInput.value = todo.name;
    editSelect.value = todo.category;
    editContent.value = todo.content;
    // todo.name = todo.name;
    // todo.category = todo.category;
    // todo.content = todo.content;
    // editDate.value = todo.dates;
    console.log(todo);

    // todo.dates = [...todo.created, ...formatDate];
    todo.created = formatDate;
    const lastDate = todo.dates;
    const saveChange = e => {
      e.preventDefault();

      const formData = new FormData(e.target);
      formData.forEach((value, key) => {
        todo[key] = value;
      });

      todo.dates = lastDate
        ? `${lastDate},
        ${todo.dates.split(/-\s*/).reverse().join('/')}`
        : todo.dates.split(/-\s*/).reverse().join('/');
      todo.icon = generateIcon(todo.category);
      tableList.textContent = '';
      createForm.reset();
      closeModalEdit();
      markupList(activeTodo(db));

      editForm.removeEventListener('submit', saveChange);
    };
    editForm.addEventListener('submit', saveChange);
  }
};

const deleteTodo = e => {
  e.preventDefault();
  if (e.target.closest('.delete')) {
    const id = e.target.dataset.id;
    db = db.filter(todo => todo.id !== +id);
    render();
  }
};

const archiveTodo = e => {
  if (e.target.closest('.archive')) {
    e.preventDefault();
    const id = e.target.dataset.id;
    const findTodo = db.find(todo => todo.id === +id);
    findTodo.archived = true;
    render();
  }
};

const showArchiveList = e => {
  e.preventDefault();
  archiveModal.classList.add('is-open');
  markupArchiveList(archivedTodo(db));
};

const unarchiveTodo = e => {
  if (e.target.closest('.unarchive')) {
    e.preventDefault();
    const id = e.target.dataset.id;
    const findTodo = db.find(todo => todo.id === +id);
    findTodo.archived = false;
    archiveList.textContent = '';
    markupArchiveList(archivedTodo(db));
    render();
    if (!archivedTodo(db).length) {
      closeArchiveModal();
    }
  }
};

addBtn.addEventListener('click', modalOpen);

createForm.addEventListener('submit', addTodo);

tableList.addEventListener('click', deleteTodo);
tableList.addEventListener('click', editTodo);
tableList.addEventListener('click', archiveTodo);
closeModalBtn.addEventListener('click', closeModal);
archiveBtn.addEventListener('click', showArchiveList);
archiveList.addEventListener('click', unarchiveTodo);
closeArchiveModalBtn.addEventListener('click', closeArchiveModal);
closeEditModalBtn.addEventListener('click', closeModalEdit);
