OK-Changer
==========

 ![GitHub tag](https://img.shields.io/github/tag/lestad/OK-Changer.svg)

Extension for Chrome and Opera 15+<br>
<br>
 - [Group in Odnoklassniki.ru](http://ok.ru/okchanger)<br>
 - [Site](http://okchanger.net)<br>
 - [Beta](http://beta.okchanger.net)<br>


# Building

Requirements:
 * `node.js` or `io.js`
 * `npm`

Clone repository and install needs
```bash
git clone https://github.com/LestaD/OK-Changer.git okch
cd okch
npm install
```

For create debug version:
```bash
gulp build
```
In `./debug/` will be created work copy of code. You can load unpacked extension on Chrome or Opera

Before rebuild, you must:
```bash
gulp clean
```
All files from `./debug/` will be removed
You must edit code in `./source/` and `gulp build` after code change

For release a stable version `1.9.4`:
```bash
gulp release --ver 1.9.4
```

For beta version:
```bash
gulp release --ver 1.9.5 --beta
```

In `./release/` you will see *.zip archives with release and beta versions of OK Changer


===


# Сборка

Требования:
 * `node.js` или `io.js`
 * `npm`

Клонирование репозитория и установка зависимостей:
```bash
git clone https://github.com/LestaD/OK-Changer.git okch
cd okch
npm install
```

Для создания отладочной версии:
```bash
gulp build
```
В директории `./debug/` будет создана рабочая версия кода. Уже эту директорию можно загружать через `Загрузить распакованное расширение` в Chrome или Opera

Перед сборкой необходимо очистить рабочую директорию:
```bash
gulp clean
```
Все файлы из `./debug/` будут удалены
Необходимо редактировать код в директории `./source/` и выполнять `gulp build` после сохранения изменений

Для выпуска стабильной версии `1.9.4` необходимо выполнить:
```bash
gulp release --ver 1.9.4
```

Для выпуска бета версии:
```bash
gulp release --ver 1.9.5 --beta
```

В директории `./release/` будут файлы *.zip архивов с рабочими и бета версиями OK Changer
