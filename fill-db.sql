
INSERT INTO users(email, password_hash, first_name, last_name, avatar) VALUES
('ivanov@example.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'Иван', 'Иванов', 'avatar1.jpg'),
('petrov@example.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'Пётр', 'Петров', 'avatar2.jpg');
INSERT INTO categories(name) VALUES
('Книги'),
('Разное'),
('Посуда'),
('Игры'),
('Животные'),
('Журналы');
ALTER TABLE offers DISABLE TRIGGER ALL;
INSERT INTO offers(title, description, type, sum, picture, user_id) VALUES
('Куплю антиквариат.', 'Если товар не понравится — верну всё до последней копейки. Мой дед не мог её сломать. Это настоящая находка для коллекционера! При покупке с меня бесплатная доставка в черте города.', 'SALE', 88967, 'item13.jpg', 2);
ALTER TABLE offers ENABLE TRIGGER ALL;
ALTER TABLE offer_categories DISABLE TRIGGER ALL;
INSERT INTO offer_categories(offer_id, category_id) VALUES
(1, 2);
ALTER TABLE offer_categories ENABLE TRIGGER ALL;
ALTER TABLE comments DISABLE TRIGGER ALL;
INSERT INTO COMMENTS(text, user_id, offer_id) VALUES
('Почему в таком ужасном состоянии? Оплата наличными или перевод на карту?', 1, 1),
('Неплохо, но дорого.', 1, 1);
ALTER TABLE comments ENABLE TRIGGER ALL;