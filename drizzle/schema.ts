import { mysqlTable, mysqlSchema, AnyMySqlColumn, primaryKey, int, text, tinyint } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const todos = mysqlTable("todos", {
	id: int("id").autoincrement().notNull(),
	content: text("content"),
	done: tinyint("done"),
},
(table) => {
	return {
		todosId: primaryKey(table.id),
	}
});