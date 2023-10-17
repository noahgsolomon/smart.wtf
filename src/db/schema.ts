import { boolean, int, mysqlTable, text } from 'drizzle-orm/mysql-core';
import { uuid } from 'drizzle-orm/pg-core';

export const todos = mysqlTable('todos', {
	id: int('id').primaryKey().autoincrement(),
	content: text('content'),
	done: boolean('done'),
});

export const users = mysqlTable('users', {
	id: int('id').primaryKey().autoincrement(),
	name: text('name'),
	email: text('email'),
});
