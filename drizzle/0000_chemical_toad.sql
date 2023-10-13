-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `_96c077c0_9ede_502a_815a_0dc79dff2a6b_20231011214957_vrepl` (
	`id` int AUTO_INCREMENT NOT NULL,
	`something` varchar(255),
	CONSTRAINT `_96c077c0_9ede_502a_815a_0dc79dff2a6b_20231011214957_vrepl_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `authors` (
	`id` int AUTO_INCREMENT NOT NULL,
	`author` varchar(255) NOT NULL,
	CONSTRAINT `authors_id` PRIMARY KEY(`id`),
	CONSTRAINT `author` UNIQUE(`author`)
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`category` varchar(255) NOT NULL,
	CONSTRAINT `categories_id` PRIMARY KEY(`id`),
	CONSTRAINT `category` UNIQUE(`category`)
);
--> statement-breakpoint
CREATE TABLE `something` (
	`id` int AUTO_INCREMENT NOT NULL,
	`something` varchar(255) NOT NULL,
	CONSTRAINT `something_id` PRIMARY KEY(`id`)
);

*/