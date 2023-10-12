import { mysqlTable, mysqlSchema, AnyMySqlColumn, primaryKey, int, varchar, unique } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const authors = mysqlTable("authors", {
	id: int("id").autoincrement().notNull(),
	author: varchar("author", { length: 255 }).notNull(),
},
(table) => {
	return {
		authorsId: primaryKey(table.id),
		author: unique("author").on(table.author),
	}
});

export const categories = mysqlTable("categories", {
	id: int("id").autoincrement().notNull(),
	category: varchar("category", { length: 255 }).notNull(),
},
(table) => {
	return {
		categoriesId: primaryKey(table.id),
		category: unique("category").on(table.category),
	}
});

export const something = mysqlTable("something", {
	id: int("id").autoincrement().notNull(),
	something: varchar("something", { length: 255 }).notNull(),
},
(table) => {
	return {
		somethingId: primaryKey(table.id),
	}
});