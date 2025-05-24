<?php
$host = "localhost";
$user = "root";
$pass = "";
$db = "datadokumen";

// Membuat koneksi
$conn = new mysqli($host, $user, $pass, $db);

// Cek koneksi
if ($conn->connect_error) {
  die("Koneksi gagal: " . $conn->connect_error);
} else {
  echo "Berhasil connect ke database";
}
?>
