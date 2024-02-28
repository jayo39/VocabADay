SET SESSION FOREIGN_KEY_CHECKS=0;

/* Drop Tables */

DROP TABLE IF EXISTS vad_genre;
DROP TABLE IF EXISTS vad_history;
DROP TABLE IF EXISTS vad_vocab;
DROP TABLE IF EXISTS vad_book;
DROP TABLE IF EXISTS vad_user;




/* Create Tables */

CREATE TABLE vad_book
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(50) NOT NULL,
	series varchar(50) NOT NULL,
	comCnt int DEFAULT 0 NOT NULL,
	img varchar(200),
	description varchar(250) NOT NULL,
	PRIMARY KEY (id)
);


CREATE TABLE vad_genre
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(20) NOT NULL,
	book_id int NOT NULL,
	PRIMARY KEY (id)
);


CREATE TABLE vad_history
(
	id int NOT NULL AUTO_INCREMENT,
	correctNum int NOT NULL,
	user_id int NOT NULL,
	book_id int NOT NULL,
	PRIMARY KEY (id)
);


CREATE TABLE vad_user
(
	id int NOT NULL AUTO_INCREMENT,
	username varchar(20) NOT NULL,
	password text NOT NULL,
	role varchar(7) NOT NULL,
	PRIMARY KEY (id),
	UNIQUE (username)
);


CREATE TABLE vad_vocab
(
	id int NOT NULL AUTO_INCREMENT,
	vocab varchar(20) NOT NULL,
	answer varchar(100) NOT NULL,
	option1 varchar(100) NOT NULL,
	option2 varchar(100) NOT NULL,
	option3 varchar(100) NOT NULL,
	book_id int NOT NULL,
	PRIMARY KEY (id)
);



/* Create Foreign Keys */

ALTER TABLE vad_genre
	ADD FOREIGN KEY (book_id)
	REFERENCES vad_book (id)
	ON UPDATE RESTRICT
	ON DELETE RESTRICT
;


ALTER TABLE vad_history
	ADD FOREIGN KEY (book_id)
	REFERENCES vad_book (id)
	ON UPDATE RESTRICT
	ON DELETE RESTRICT
;


ALTER TABLE vad_vocab
	ADD FOREIGN KEY (book_id)
	REFERENCES vad_book (id)
	ON UPDATE RESTRICT
	ON DELETE RESTRICT
;


ALTER TABLE vad_history
	ADD FOREIGN KEY (user_id)
	REFERENCES vad_user (id)
	ON UPDATE RESTRICT
	ON DELETE RESTRICT
;


update vad_user set role = 'ADMIN' where username = 'jayo39';
select * from vad_book;
select * from vad_genre;
select * from vad_vocab;
select * from vad_history;

select * from vad_user;

delete from vad_history;

select h.user_id, h.correctNum, b.name, h.percent, h.total*100 total
from vad_history h left outer join vad_book b
on h.book_id = b.id
where h.user_id = 1;

select b.id, b.name, b.description, b.series, b.img, group_concat(g.name) as genre
from vad_book b left outer join vad_genre g
on b.id = g.book_id
group by b.id;

select b.id, b.name, b.description, b.series, b.img, g.name genre, v.*
from vad_book b left outer join vad_genre g
on b.id = g.book_id
left outer join vad_vocab v
on b.id = v.book_id;

select b.id, v.*
from vad_book b left outer join vad_vocab v
on b.id = v.book_id;

ALTER TABLE vad_history
ADD total int;

select * from vad_vocab;
where book_id = 4;
select * from vad_book;

select b.id from vad_book b left outer join  vad_genre g
on b.id = g.book_id
where g.name = 'Adventure'
group by b.id;

