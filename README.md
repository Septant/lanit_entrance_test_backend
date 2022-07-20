# lanit_entrance_test
entrance test task for fullstack

Перед началом:
IDE: WebStorm
npm, nvm, node version 16.12.0

Для реализации db используется dbForgeStudio 2020 for MySQL
Сервер: OpenServer 5.4.1
SQL: MYSQL
Код таблицы:
CREATE TABLE lanit_entrance_db.user (
  id int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  name varchar(50) NOT NULL DEFAULT '',
  surname varchar(255) NOT NULL DEFAULT '',
  date_of_birth date DEFAULT NULL,
  created timestamp NULL DEFAULT NULL,
  updated timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 8,
AVG_ROW_LENGTH = 5461,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_unicode_ci;

0. Запустить сервер с помощью OpenServer, создать базу данных lanit_entrance_db, host: localhost порт для MySQL 3306

1. Склонировать проект из репозитория

2. Командой npm install libraryname --save установить библиотеки из списка package.json

3. Запустить приложение командой node app.js

Функционал:

Отправка списка пользователей из базы данных user (app.get '/users' )
Добавление новых объектов user в базу (app.post '/user')
Удаление выбранного объекта по id (app.delete '/user/:id')
Редактирование выбранного объекта (app.put '/user/:id')

Для настройки сетевого взаимодействия использован фреймворк express
Для работы с db: mysql2
bodyparser и moment для работы с данными.




