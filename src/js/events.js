import { getUsersMap, getPosts, getPostById, getCommentsByPostId, createPost, updatePost, deletePost } from './api.js';
import { renderPosts, showModal, closeModal, modalCloseBtn } from './dom.js';

const formCreate = document.getElementById('formCreate');
const formUpdate = document.getElementById('formUpdate');
const formDelete = document.getElementById('formDelete');

console.log('events.js loaded');

async function showPostWithComments(postId) {
  console.log('showPostWithComments called', postId);
  const post = await getPostById(postId);
  const comments = await getCommentsByPostId(postId);

  let commentsHtml = '<ul>';
  comments.forEach((c) => {
    commentsHtml += `<li><strong>${c.name}</strong>: ${c.body}</li>`;
  });
  commentsHtml += '</ul>';

  const html = `
    <h2>${post.title}</h2>
    <p>${post.body}</p>
    <h3>Comments</h3>
    ${commentsHtml}
  `;

  showModal(html);
}

export async function listAllPosts() {
  console.log('listAllPosts called');
  const userMap = await getUsersMap();
  const posts = await getPosts();
  renderPosts(posts, userMap);

  const commentButtons = document.querySelectorAll('.view-comments-btn');
  commentButtons.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      const postId = e.target.getAttribute('data-id');
      await showPostWithComments(postId);
    });
  });
}

// Event listeners
formCreate.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const body = document.getElementById('body').value;
  let userId = document.getElementById('userId').value;
  userId = userId ? parseInt(userId, 10) : 1;

  try {
    const newPost = await createPost({ title, body, userId });
    alert(`Post creado con éxito. ID: ${newPost.id}`);
    listAllPosts();
  } catch (error) {
    alert(error.message);
  }
});

formUpdate.addEventListener('submit', async (e) => {
  e.preventDefault();
  const postId = document.getElementById('updateId').value;
  const updateTitle = document.getElementById('updateTitle').value;
  const updateBody = document.getElementById('updateBody').value;

  try {
    const updatedPost = await updatePost({ id: postId, title: updateTitle, body: updateBody });
    alert(`Post modificado con éxito: ${JSON.stringify(updatedPost)}`);
    listAllPosts();
  } catch (error) {
    alert(error.message);
  }
});

formDelete.addEventListener('submit', async (e) => {
  e.preventDefault();
  const postId = document.getElementById('deleteId').value;
  try {
    await deletePost(postId);
    alert('Post eliminado con éxito.');
    listAllPosts();
  } catch (error) {
    alert(error.message);
  }
});

modalCloseBtn.addEventListener('click', closeModal);
