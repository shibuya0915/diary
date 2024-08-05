<?php
// データベース接続情報
$servername = "localhost";
$username = "root"; // デフォルトのMySQLユーザー
$password = ""; // デフォルトのMySQLパスワード（通常空）
$dbname = "comments_db";

// データベースに接続
$conn = new mysqli($servername, $username, $password, $dbname);

// 接続を確認
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// フォームからデータを取得
$username = $_POST['username'];
$comment_text = $_POST['comment_text'];

// SQLインジェクションを防ぐためにデータをエスケープ
$username = $conn->real_escape_string($username);
$comment_text = $conn->real_escape_string($comment_text);

// コメントをデータベースに保存
$sql = "INSERT INTO comments (username, comment_text, created_at) VALUES ('$username', '$comment_text', NOW())";

if ($conn->query($sql) === TRUE) {
    echo "コメントが投稿されました";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// 接続を閉じる
$conn->close();
?>