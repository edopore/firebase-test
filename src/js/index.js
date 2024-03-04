import { onAuthStateChanged } from 'firebase/auth';
import {
  getTasks,
  loginGoogle,
  createTask,
  deleteTask,
  logOut,
  auth,
} from './pruebaFirebase';

const googleUp = document.querySelector('button[sign-up-g]');
const getTasksList = document.querySelector('button[get-tasks]');
const logOutBtn = document.querySelector('#log-out-btn');
const infoCard = document.querySelector('#cardInfo');

const taskSection = document.querySelector('.todo');
const submitTask = document.getElementById('submit-btn');
const input = document.querySelector('#task');

const tasklist = document.querySelector('.task-list');
const taskItem = document.createElement('li');
const taskInfo = document.createElement('p');
const deleteTaskBtn = document.createElement('button');

googleUp.addEventListener('click', event => {
  event.preventDefault();
  loginGoogle();
});

submitTask.addEventListener('click', async event => {
  event.preventDefault();
  createTask(input.value);
  getListTasks();
});

getTasksList.addEventListener('click', async event => {
  event.preventDefault();
  getListTasks();
});

logOutBtn.addEventListener('click', event => {
  event.preventDefault();
  logOut();
});

deleteTaskBtn.addEventListener('click', event => {
  event.preventDefault();
  deleteTask(event.target.value);
  getListTasks();
});

async function getListTasks() {
  const tasks = await getTasks();
  tasks.forEach(doc => {
    console.log(doc.data());
  });
}
onAuthStateChanged(auth, user => {
  if (user !== null) {
    console.log('User logged');
    googleUp.classList.add('set-not-visible');
    logOutBtn.classList.remove('set-not-visible');
    taskSection.classList.remove('set-not-visible');
    infoCard.classList.remove('set-not-visible');
    getTasksList.classList.remove('set-not-visible');
    getListTasks();
  } else {
    googleUp.classList.remove('set-not-visible');
    getTasksList.classList.add('set-not-visible');
    taskSection.classList.add('set-not-visible');
    infoCard.classList.add('set-not-visible');
    logOutBtn.classList.add('set-not-visible');
    console.log('user not logged');
  }
});
