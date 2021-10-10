import './styles/main.scss';
import markupList from './js/markupList';
import formatDate from './js/date';

let db = [
  {
    id: 1,
    name: 'Name',
    created: formatDate,
    category: 'Task',
    content: 'How are you?',
    dates: [],
  },
  {
    id: 2,
    name: 'Name 2',
    created: formatDate,
    category: 'Task 2',
    content: 'How are you?',
    dates: [],
  },
];
markupList(db);

const tableList = document.querySelector('#table-list-js');
const formModal = document.querySelector('.modal-create');
const createForm = document.querySelector('.create-form');
const addBtn = document.querySelector('.table__add-btn');

const modalOpen = () => {
  formModal.classList.add('is-open');
};

const closeModal = () => {
  formModal.classList.remove('is-open');
};

const addTodo = e => {
  e.preventDefault();
  const newTodo = {
    id: Date.now(),
    created: formatDate,
    dates: [],
  };

  const formData = new FormData(e.target);
  formData.forEach((value, key) => {
    newTodo[key] = value;
  });

  db = [...db, newTodo];
  tableList.textContent = '';
  createForm.reset();
  closeModal();
  markupList(db);
};

const deleteTodo = e => {
  e.preventDefault();
  if (e.target.closest('.delete')) {
    const id = e.target.dataset.id;
    db = db.filter(todo => todo.id !== +id);
    tableList.textContent = '';
    markupList(db);
  }
};

addBtn.addEventListener('click', modalOpen);
createForm.addEventListener('submit', addTodo);

tableList.addEventListener('click', deleteTodo);
