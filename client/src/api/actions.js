import { ADD_TASK, GET_TODO_LIST, REMOVE_TASK, UPDATE_TASK } from "./constants";

const API_BASE = process.env.REACT_APP_API_URl || '';


export async function getTodoList() {
  const result = await fetch(API_BASE + GET_TODO_LIST);
  const parsed = await result.json();
  return parsed;
}

export async function addTask(content) {
  const result = await fetch(API_BASE + ADD_TASK, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: content })
  });
  const response = await result.json();
  return response;
}

export async function updateTask(id, content) {
  const url = UPDATE_TASK.replace('%ID%', id);
  const result = await fetch(API_BASE + url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: content })
  });
  const response = await result.json();
  return response;
}

export async function removeTask(id) {
  const url = REMOVE_TASK.replace('%ID%', id);
  const result = await fetch(API_BASE + url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });
  const response = await result.json();
  return response;
}
