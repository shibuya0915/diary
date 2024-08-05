<?php
// データベース接続情報
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "comments_db";

// データベースに接続
$conn = new mysqli($servername, $username, $password, $dbname);

// 接続を確認
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// コメントを取得
$sql = "SELECT id, username, comment_text, created_at FROM comments ORDER BY created_at DESC";
$result = $conn->query($sql);

$comments = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $comments[] = $row;
    }
}

// JSON形式でコメントを返す
echo json_encode($comments);

// 接続を閉じる
$conn->close();
?>