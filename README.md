[![Tests](https://github.com/yandex-praktikum/express-mesto-gha/actions/workflows/tests-13-sprint.yml/badge.svg)](https://github.com/yandex-praktikum/express-mesto-gha/actions/workflows/tests-13-sprint.yml) [![Tests](https://github.com/yandex-praktikum/express-mesto-gha/actions/workflows/tests-14-sprint.yml/badge.svg)](https://github.com/yandex-praktikum/express-mesto-gha/actions/workflows/tests-14-sprint.yml)

```
[![Tests for sprint 13](https://github.com/${MarinaFominykh}/${express-mesto-gha}/actions/workflows/tests-13-sprint.yml/badge.svg)](https://github.com/${имя_пользователя}/${имя репозитория}/actions/workflows/tests-13-sprint.yml) 

[![Tests for sprint 14](https://github.com/${имя_пользователя}/${имя репозитория}/actions/workflows/tests-14-sprint.yml/badge.svg)](https://github.com/${имя_пользователя}/${имя репозитория}/actions/workflows/tests-14-sprint.yml)
```

# Проект Mesto фронтенд + бэкенд
В данном проекте написана серверная часть проекта Mesto c помощью фреймворка Express.


## Полученные навыки:
* создание сервера на Express;
* настройка роутинга;
* создание middleware;
* обработка ошибок;
* работа с базами данных.

## Используемые технологии:
* Node.js;
* Express;
* MongoDB;
* JavaScript;
* Git.


## Роуты:
В проекте реализованы следующие роуты:
* GET: /users — возвращает всех пользователей
* GET: /users/:userId - возвращает пользователя по _id
* POST: /users — создаёт пользователя 
* GET: /cards — возвращает все карточки;
* POST: /cards — создаёт карточку;
* DELETE: /cards/:cardId — удаляет карточку по идентификатору;
* PATCH: /users/me — обновляет профиль
* PATCH: /users/me/avatar — обновляет аватар
* PUT: /cards/:cardId/likes — поставить лайк карточке
* DELETE: /cards/:cardId/likes — убрать лайк с карточки 

## Файловая система:
Файловая система проекта организована следующим образом:
`/routes` — папка с файлами роутера;  
`/controllers` — папка с файлами контроллеров пользователя и карточки;   
`/models` — папка с файлами описания схем пользователя и карточки.  
  
## Запуск проекта
`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload

## Ссылка на проект
https://github.com/MarinaFominykh/express-mesto-gha

