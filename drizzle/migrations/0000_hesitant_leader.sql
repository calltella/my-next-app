
DROP TABLE IF EXISTS `files`;
CREATE TABLE `files` (
	`id` text PRIMARY KEY NOT NULL,
	`fileName` text NOT NULL,
	`filePath` text NOT NULL,
	`contentType` text NOT NULL,
	`expiresAt` text NOT NULL,
	`createdAt` text NOT NULL
);

DROP TABLE IF EXISTS `notes`;
CREATE TABLE `notes` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
