import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com';

export async function getUsersMap() {
  console.log('getUsersMap called');
  const response = await axios.get(`${API_URL}/users`);
  if (response.status !== 200) throw new Error('No se pudieron obtener usuarios');
  const users = response.data;
  const map = {};
  users.forEach((u) => {
    map[u.id] = u.username;
  });
  console.log('getUsersMap success', map);
  return map;
}

export async function getPosts() {
  console.log('getPosts called');
  const response = await axios.get(`${API_URL}/posts`);
  if (response.status !== 200) throw new Error('Error al obtener posts');
  console.log('getPosts success');
  return response.data;
}

export async function getPostById(id) {
  console.log('getPostById called', id);
  const response = await axios.get(`${API_URL}/posts/${id}`);
  if (response.status !== 200) throw new Error('No se pudo obtener el post');
  return response.data;
}

export async function getCommentsByPostId(id) {
  console.log('getCommentsByPostId called', id);
  const response = await axios.get(`${API_URL}/posts/${id}/comments`);
  if (response.status !== 200) throw new Error('No se pudieron obtener los comentarios');
  return response.data;
}

export async function createPost({ title, body, userId }) {
  console.log('createPost called', { title, body, userId });
  const response = await axios.post(`${API_URL}/posts`, { title, body, userId });
  if (response.status !== 201) throw new Error('No se pudo crear el post');
  return response.data;
}

export async function updatePost({ id, title, body }) {
  console.log('updatePost called', { id, title, body });
  const response = await axios.put(`${API_URL}/posts/${id}`, { title, body, userId: 1 });
  if (response.status !== 200) throw new Error('No se pudo modificar el post');
  return response.data;
}

export async function deletePost(id) {
  console.log('deletePost called', id);
  const response = await axios.delete(`${API_URL}/posts/${id}`);
  if (response.status !== 200) throw new Error('No se pudo eliminar el post');
  return true;
}
