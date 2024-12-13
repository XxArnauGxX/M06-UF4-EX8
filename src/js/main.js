import { listAllPosts } from './events.js';

console.log('main.js loaded');

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded event');
  listAllPosts().catch((err) => {
    console.error('Error in listAllPosts:', err);
  });
});
