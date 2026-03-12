const http = require('http');
const path = require('node:path');
const fs = require('node:fs/promises');

// const PORT = 3000;

const server = http.createServer(async(requerst, response) => {
  

  if (requerst.url === '/') {
    const filePath = path.join(__dirname, 'index.html');
    const readFile = await fs.readFile(filePath, 'utf-8');
    const content = readFile;

    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    response.statusCode = 200;
    response.end(content);

  } else if (requerst.url === '/pages.html') {
    const filePath = path.join(__dirname, 'pages', 'pages.html');
    const readFile = await fs.readFile(filePath, 'utf-8');
    const content = readFile;

    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    response.statusCode = 200;
    response.end(content);
  } else if (requerst.url === '/portfolio.html') {
    const filePath = path.join(__dirname, 'pages', 'portfolio.html');
    const readFile = await fs.readFile(filePath, 'utf-8');
    const content = readFile;

    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    response.statusCode = 200;
    response.end(content);
  } else if (requerst.url === '/blog.html') {
    const filePath = path.join(__dirname, 'pages', 'blog.html');
    const readFile = await fs.readFile(filePath, 'utf-8');
    const content = readFile;

    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    response.statusCode = 200;
    response.end(content);
  } else if (requerst.url === '/shop.html') {
    const filePath = path.join(__dirname, 'pages', 'shop.html');
    const readFile = await fs.readFile(filePath, 'utf-8');
    const content = readFile;

    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    response.statusCode = 200;
    response.end(content);
  } else if (requerst.url === '/style.css') {
    const filePath = path.join(__dirname,  'style.css');
    const readFile = await fs.readFile(filePath, 'utf-8');
    const content = readFile;

    response.setHeader('Content-Type', 'text/css; charset=utf-8');
    response.statusCode = 200;
    response.end(content);
  } else if (requerst.url.includes('.')) { // ну здесь просто сервер смотрит, есть ли в файле . = photo.jpg и другие
    // 1. Декодируем путь (чтобы пробелы и %20 не ломали поиск)
    const urlPath = decodeURIComponent(requerst.url); // decodeURIComponent пробелы убирает,что винда читала с линуксом все
    //  превращает закодированные символы обратно в нормальные
    const relativePath = urlPath.startsWith('/') ? urlPath.slice(1) : urlPath; 
    // ну получаеться если файл с / начианется, то слайс убирает первый символ чтоб он "нашелся и работал, показывался"

    try {
        // 2. Склеиваем путь
        const filePath = path.join(__dirname, relativePath);
        const content = await fs.readFile(filePath);

        const ext = path.extname(relativePath).toLowerCase();
        // получение расширений, и ловеркейс убирает капс
        const types = { 
            '.css': 'text/css; charset=utf-8', 
            '.jpg': 'image/jpeg', 
            '.png': 'image/png', 
            '.svg': 'image/svg+xml',
            '.woff2': 'font/woff2' 
        };

        response.setHeader('Content-Type', types[ext] || 'application/octet-stream');
        return response.end(content); // Всё, файл отправлен, выходим

    } catch (err) {
        console.log("Файл реально не найден по пути:", relativePath);
        // Если файла нет, мы просто идем дальше к 404
    }
}

// ЭТОТ БЛОК ДОЛЖЕН БЫТЬ В САМОМ КОНЦЕ (после всех else if)
// Если мы дошли сюда, значит ни один if не сработал
try {
    const errorPath = path.join(__dirname, 'pages', '404.html');
    const errorContent = await fs.readFile(errorPath, 'utf-8');
    response.statusCode = 404;
    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    response.end(errorContent);
} catch (e) {
    response.statusCode = 404;
    response.end("404 - Not Found");
} 
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Сервер запущен http://localhost:${PORT}`);
});