<?php

<?php
$imgPath = $_GET['img'] ?? '';
$fullPath = realpath($imgPath);

if (!$fullPath || !file_exists($fullPath)) {
    http_response_code(404);
    exit('Image not found.');
}

$extension = strtolower(pathinfo($fullPath, PATHINFO_EXTENSION));

switch ($extension) {
    case 'webp':
        $im = imagecreatefromwebp($fullPath);
        break;
    case 'jpg':
    case 'jpeg':
        $im = imagecreatefromjpeg($fullPath);
        break;
    case 'png':
        $im = imagecreatefrompng($fullPath);
        break;
    case 'gif':
        $im = imagecreatefromgif($fullPath);
        break;
    default:
        http_response_code(415);
        exit('Unsupported image type.');
}

if (!$im) {
    http_response_code(500);
    exit('Failed to create image resource.');
}

$width = 110;
$height = 88;
$thumb = imagecreatetruecolor($width, $height);
imagecopyresampled($thumb, $im, 0, 0, 0, 0, $width, $height, imagesx($im), imagesy($im));

header('Content-Type: image/webp');
imagewebp($thumb);
imagedestroy($im);
imagedestroy($thumb);
?>
