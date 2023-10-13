import { boolean, int, mysqlTable, text } from "drizzle-orm/mysql-core";


export const todos = mysqlTable('todos', {
	id: int('id').primaryKey().autoincrement(),
	content: text('content'),
	done: boolean('done'),
});