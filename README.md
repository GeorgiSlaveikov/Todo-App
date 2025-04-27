# Todo-App
Todo app (Task handle application) created using electron.js, react, html, css, javascript. You can create your own tasks, save them in local .json files, open .json files (load todos). 
Other option is to load todos from an API.

Проектът представлява десктоп приложение за windows.

Технологиите използвани в проекта са:
HTML, CSS, JavaScript, React, Electron.js

За Electron.js:
Electron.js е фреймуърк, който позволява създаването на десктоп приложения с помощта на уеб технологии като HTML, CSS и JavaScript. С Electron можеш да изграждаш приложения, които работят на Windows, Mac и Linux, използвайки познанията и инструментите, които се използват за изграждане на уеб сайтове.

Проектът представен накратко с помоща на снимки:

Начално меню. Това е страницата, която се отваря при стартиране на програмата. Разполага с четири бутона: 'Информация' (Info), 'Изход' (Exit), 'Извличане' (Fetch) и 'Файл' (File).
Бутонът 'Информация' (Info) показва кратка информация за приложението.
Бутонът 'Изход' (Exit) служи за напускане на програмата.
Бутонът 'Извличане' (Fetch) зарежда списък с todos (задачи) от следния линк: https://jsonplaceholder.typicode.com/todos.
Бутонът 'Файл' (File) позволява на потребителя да създава собствени todos (задачи), да създава и отваря .json файлове, да записва, създадените todos във файлове, да зарежда todos от избран от него файл.
![homeMenu](https://github.com/user-attachments/assets/2101ff52-d7f8-4907-b486-eb6b05230919)

Меню 'Извличане' (Fetch):
Структурата на това меню е разделена на три основни части. Част, отделена за незавършените todos, част отделена за завършените todos и част отделена за кратка информация за потребителите.
Секциите за завърпени и незавършени todos за доста подобни. Показват броя на todos в съответната секция, както и всяко едно от тези todos. 
Всяко todo, което е незавършено има заглавие и бутон за завършване, а всяко, което е незавършено има заглавие, дата на завършване и бутон за отбелязване като незавършено.
Todos, които са били предварително отбелязани във файл като завършение се маркират със сегашна дата (моментът на 'Извличане' (Fetch)).
![fetchMenu](https://github.com/user-attachments/assets/4a97893d-0903-4dab-9a5f-137c8a39330a)

Визуализация на броя на завършените и незавършени todos (задачи)
![pendingCount](https://github.com/user-attachments/assets/9289bad8-278b-4ccf-b4d1-72e7a3e14416) ![CompletedCount](https://github.com/user-attachments/assets/b3cbd771-8e7c-4e5c-9498-722726cc6341)

Горната част на менюто съдържа лентата със бутони.
Бутон Start Page, връща потребителя към началната страница.
Бутон Refresh, презарежда страницата и заедно с това и todos.
Бутон Exit служи за изход от програмата.
![fetchMenuButtons](https://github.com/user-attachments/assets/463bd736-75fa-4e3d-bce1-f5177a4154dc)

Меню с възможност за сортиране и филтриране
![filtersAndSorts](https://github.com/user-attachments/assets/d6680e12-8b5d-4f77-90ef-5aa20b3fc862)
Filter by username (Филтриране по име на потребител - име/id). Засяга и обновява и двете секции - завършени и незавършени.
Sort by username (Сортиране по име на потребител, по азбучен ред в низходящ и възходящ ред).Засяга и обновява и двете секции - завършени и незавършени.
Sort by title (сортиране по заглавие на todo, по азбучен ред в низходящ и възходящ ред). Засяга само колоната, над която се намира.
Sort by date (сортиране по дата на завършване, в низходящ и възходящ ред). Засяга само колоната за завършени todos.

Меню за работа с файлове
![fileBaseMenu](https://github.com/user-attachments/assets/caf41332-3187-4cd0-9593-c516a0bed943)

Горната част на менюто съдържа лентата със бутони.
Бутон Start Page, връща потребителя към началната страница.
Бутон Exit служи за изход от програмата.
Бутон Save File служи за запазване на промените по списъците с todos в отворения файл. Ако не е отворен файл, няма да се запазят промените.
Бутон Create Todo служи за създаване на нови todos.
Бутон New File служи за създаване на нови .json файлове.
Бутон Open File служи за отваряне на вече съществуващ .json файл. Ако има записани todos в него, то те се зареждат.
![fileMenuButtons](https://github.com/user-attachments/assets/98488253-7303-48d6-bf27-af3228dd2471)

Това са менютата за създаване на todos, създаване на файл, отваряне на файл.
![createTodo](https://github.com/user-attachments/assets/1d78f67f-0ae2-4751-8385-6bad9a4ac0b1)
![OpenFile](https://github.com/user-attachments/assets/76eeab92-ecba-4de7-80c2-b0e71786d078)
![createNewFile](https://github.com/user-attachments/assets/59d3c245-4756-4764-a8e3-91f03988fb6e)




