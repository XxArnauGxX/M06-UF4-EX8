console.log('dom.js loaded');

const postsList = document.getElementById('posts-list');
const modal = document.getElementById('modal');
const modalText = document.getElementById('modal-text');
const modalCloseBtn = document.getElementById('modal-close-btn');

export function renderPosts(posts, userMap) {
  console.log('renderPosts called', posts.length);
  let html = '';
  posts.forEach((post) => {
    const username = userMap[post.userId] || 'Desconocido';
    html += `
      <div style="border:1px solid #ccc; margin-bottom:10px; padding:10px;">
        <h4>${post.title}</h4>
        <p>${post.body}</p>
        <small>Author: ${username}</small><br>
        <button data-id="${post.id}" class="view-comments-btn">View Comments</button>
      </div>
    `;
  });
  postsList.innerHTML = html;
}

export function showModal(htmlContent) {
  console.log('showModal called');
  modalText.innerHTML = htmlContent;
  modal.showModal();
}

export function closeModal() {
  console.log('closeModal called');
  modal.close();
}

export { modalCloseBtn, postsList };
