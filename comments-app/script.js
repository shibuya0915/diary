// コメントをローカルストレージから取得
function loadComments() {
  const comments = JSON.parse(localStorage.getItem('comments')) || [];
  comments.forEach(addCommentToDOM);
}

// コメントをDOMに追加
function addCommentToDOM(comment) {
  const commentElement = document.createElement('div');
  commentElement.classList.add('comment');
  commentElement.dataset.id = comment.id;

  commentElement.innerHTML = `
      <strong>${comment.username}:</strong> 
      <span class="comment-text">${comment.text}</span>
      <div class="comment-actions">
          <button class="edit">編集</button>
          <button class="delete">削除</button>
      </div>
  `;

  document.getElementById('comments').appendChild(commentElement);
}

// コメントをローカルストレージに保存
function saveComments(comments) {
  localStorage.setItem('comments', JSON.stringify(comments));
}

// コメントを追加
document.getElementById('commentForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const username = this.username.value.trim();
  const commentText = this.comment_text.value.trim();

  if (username && commentText) {
      const comments = JSON.parse(localStorage.getItem('comments')) || [];

      const newComment = {
          id: Date.now().toString(), // ユニークなIDを生成
          username,
          text: commentText
      };

      comments.push(newComment);
      saveComments(comments);

      addCommentToDOM(newComment);

      this.reset();
  } else {
      alert('ユーザー名とコメントを入力してください。');
  }
});

// 編集と削除のイベントをリッスン
document.getElementById('comments').addEventListener('click', function(event) {
  if (event.target.classList.contains('edit')) {
      editComment(event.target.closest('.comment'));
  } else if (event.target.classList.contains('delete')) {
      deleteComment(event.target.closest('.comment'));
  }
});

// コメントを編集
function editComment(commentElement) {
  const commentTextElement = commentElement.querySelector('.comment-text');
  const currentText = commentTextElement.textContent;
  const newText = prompt('コメントを編集:', currentText);

  if (newText !== null && newText.trim() !== '') {
      const comments = JSON.parse(localStorage.getItem('comments'));
      const commentId = commentElement.dataset.id;

      const comment = comments.find(c => c.id === commentId);
      comment.text = newText;

      saveComments(comments);

      commentTextElement.textContent = newText;
  }
}

// コメントを削除
function deleteComment(commentElement) {
  const commentId = commentElement.dataset.id;
  let comments = JSON.parse(localStorage.getItem('comments'));

  comments = comments.filter(c => c.id !== commentId);
  saveComments(comments);

  commentElement.remove();
}

// ページ読み込み時にコメントをロード
window.addEventListener('load', loadComments);
