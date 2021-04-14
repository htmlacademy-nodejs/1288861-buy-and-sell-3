'use strict';

const express = require(`express`);
const request = require(`supertest`);

const search = require(`./search`);
const DataService = require(`../data-service/search`);

const {HttpCode} = require(`../../constants`);

const mockData = [
  {
    "id": `ztaNYN`,
    "category": [
      `Животные`,
      `Книги`,
      `Разное`,
      `Посуда`,
      `Журналы`
    ],
    "description": `Кажется, что это хрупкая вещь. Это настоящая находка для коллекционера! Кому нужен этот новый телефон, если тут такое... При покупке с меня бесплатная доставка в черте города.`,
    "picture": `item01.jpg`,
    "title": `Куплю детские санки.`,
    "type": `offer`,
    "sum": 34681,
    "comments": [
      {
        "id": `XIaHpZ`,
        "text": `Вы что?! В магазине дешевле. А где блок питания?`
      }
    ]
  },
  {
    "id": `lJGlf6`,
    "category": [
      `Посуда`,
      `Животные`,
      `Игры`
    ],
    "description": `Пользовались бережно и только по большим праздникам. Если найдёте дешевле — сброшу цену. Товар в отличном состоянии. Кажется, что это хрупкая вещь.`,
    "picture": `item16.jpg`,
    "title": `Продам новую приставку Sony Playstation 5.`,
    "type": `offer`,
    "sum": 77791,
    "comments": [
      {
        "id": `IUVBd_`,
        "text": `Оплата наличными или перевод на карту? С чем связана продажа? Почему так дешёво?`
      },
      {
        "id": `aVUXOp`,
        "text": `С чем связана продажа? Почему так дешёво? Неплохо, но дорого.`
      }
    ]
  },
  {
    "id": `jn3QgN`,
    "category": [],
    "description": `При покупке с меня бесплатная доставка в черте города. Таких предложений больше нет! Продаю с болью в сердце... Товар в отличном состоянии.`,
    "picture": `item09.jpg`,
    "title": `Продам новую приставку Sony Playstation 5.`,
    "type": `offer`,
    "sum": 29597,
    "comments": [
      {
        "id": `5pU3Pp`,
        "text": `Неплохо, но дорого.`
      }
    ]
  },
  {
    "id": `sUIPyH`,
    "category": [
      `Журналы`,
      `Игры`,
      `Разное`,
      `Книги`
    ],
    "description": `Мой дед не мог её сломать. При покупке с меня бесплатная доставка в черте города. Бонусом отдам все аксессуары. Если товар не понравится — верну всё до последней копейки.`,
    "picture": `item07.jpg`,
    "title": `Продам книги Стивена Кинга.`,
    "type": `offer`,
    "sum": 45177,
    "comments": [
      {
        "id": `dVnfXI`,
        "text": `Вы что?! В магазине дешевле.`
      },
      {
        "id": `C3e8FW`,
        "text": `Продаю в связи с переездом. Отрываю от сердца. Неплохо, но дорого. А где блок питания?`
      },
      {
        "id": `-lASGI`,
        "text": `Неплохо, но дорого. А сколько игр в комплекте?`
      },
      {
        "id": `4LpDg8`,
        "text": `Вы что?! В магазине дешевле. Неплохо, но дорого.`
      }
    ]
  },
  {
    "id": `nlK2Qt`,
    "category": [
      `Разное`,
      `Журналы`,
      `Посуда`,
      `Игры`
    ],
    "description": `Даю недельную гарантию. Продаю с болью в сердце... Не пытайтесь торговаться. Цену вещам я знаю. Мой дед не мог её сломать.`,
    "picture": `item05.jpg`,
    "title": `Продам новую приставку Sony Playstation 5.`,
    "type": `sale`,
    "sum": 21125,
    "comments": [
      {
        "id": `KBu9dV`,
        "text": `Оплата наличными или перевод на карту?`
      },
      {
        "id": `EzCnOX`,
        "text": `Продаю в связи с переездом. Отрываю от сердца. А сколько игр в комплекте? Оплата наличными или перевод на карту?`
      }
    ]
  }
];

const app = express();
app.use(express.json());
search(app, new DataService(mockData));

describe(`API returns offer based on search query`, () => {

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/search`)
      .query({
        query: `Куплю детские санки`
      });
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`1 offer found`, () => expect(response.body.length).toBe(1));
  test(`Offer has correct id`, () => expect(response.body[0].id).toBe(`ztaNYN`));
});

test(`API returns code 404 if nothing is found`,
    () => request(app)
      .get(`/search`)
      .query({
        query: `Продам свою душу`
      })
      .expect(HttpCode.NOT_FOUND)
);

test(`API returns 400 when query string is absent`,
    () => request(app)
      .get(`/search`)
      .expect(HttpCode.BAD_REQUEST)
);
