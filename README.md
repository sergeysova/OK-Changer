OK-Changer
==========

Extension for Chrome and Opera 15+<br>
<br>
 - [Group in Odnoklassniki.ru](http://ok.ru/okchanger)<br>
 - [Site](http://okchanger.net)<br>
 - [Beta](http://beta.okchanger.net)<br>

## Windows

### Debug
1. Create folder "a"
2. Copy content of folder "source" to folder "a"
3. Copy and rename file "build/chrome-manifest.json" to "a/manifest.json"
4. Load unpacked extension to Google Chrome, Yandex or Opera 15+

### Build
1. Build must be run ONLY after "DEBUG"
2. Copy content from "a" to "source" (overwrite) (do not copy manifest.json!)
   Don't change version in file a/manifest.json (must be 0.0.0.0)
3. If you changed file a/manifest.json, copy and replace his to build/chrome-manifest.json
4. Run build/build.exe
5. In field Version set need version and click Build
6. For Google CHrome Webstore archive placed in release/ by name okchanger_0.0.0.0-chrome.zip
7. For Opera 15+ folder with sources -- build/opera/. Key is a.pem


## Linux
Need /bin/bash

`./a-debug.sh`
Create dir ./a/ and pull sources

`./a-update.sh`
Move changes to ./source/

`./build.sh 0.0.0.0`
Build extension. `0.0.0.0` -- version
For Google Chrome Webstore archive placed in ./release/



# По русски

## Windows

### Debug
1. Создать папку `/a`
2. Скопировать содержимое папки `/source` в `/a`
3. Скопировать и переименовать файл `/build/chrome-manifest.json` в `/a/manifest.json`
4. Загрузить распакованное расширение из Google Chrome(Yandex, Opera)


### Build
1. Всё выполнять ТОЛЬКО после действий для отладки!
2. Копировать содержимое папки `/a` в папку `/source` с заменой(кроме файла `manifest.json`)
3. Если файл `manifest.json` был изменен, то перемещаем его на место файла `/build/chrome-manifest.json`
ВАЖНО! В файле манифеста строку с версией изменять запрещено! она должна быть `"version" : "0.0.0.0"`,
4. После этого запускаем `/build/build.exe`
5. В поле Version выставляем необходимую версию и нажимаем Build
6. Для отправки в Chrome Webstore архив находится в папке `/release/` по имени `okchanger_0.0.0.0-chrome.zip`
7. Для упаковки и подписи в Opera 15+ папка с файлами релиза в `/build/opera`, ключ для подписи `/a.pem`


## Linux

`./a-debug.sh`
Создает каталог `./a/` и наполняет его исходниками для отладки

`./a-update.sh`
Перенесет изменения в папку с исходниками `./source/`

`./build.sh 0.0.0.0`
Соберет расширение где `0.0.0.0` это версия
Архив для отправки в Chrome Webstore в каталоге `./release/`

`./build-beta.sh 0.0.0.0`
Собирает аналогично обычной сборке.
Добавляет `-beta` к версии в `manifest.json` и названии zip-архива
