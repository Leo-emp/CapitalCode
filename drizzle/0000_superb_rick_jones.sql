CREATE TABLE `scripts` (
	`id` text PRIMARY KEY NOT NULL,
	`video_id` text NOT NULL,
	`platform` text NOT NULL,
	`title` text NOT NULL,
	`hook` text NOT NULL,
	`body` text NOT NULL,
	`segments` text NOT NULL,
	`chapters` text,
	`word_count` integer NOT NULL,
	`estimated_duration` integer NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`video_id`) REFERENCES `videos`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_scripts_video` ON `scripts` (`video_id`);--> statement-breakpoint
CREATE TABLE `videos` (
	`id` text PRIMARY KEY NOT NULL,
	`topic` text NOT NULL,
	`type` text NOT NULL,
	`status` text DEFAULT 'generating' NOT NULL,
	`template` text NOT NULL,
	`created_at` integer NOT NULL,
	`reviewed_at` integer,
	`published_at` integer,
	`rejection_reason` text,
	`retry_count` integer DEFAULT 0,
	`quality_score` text,
	`metadata` text
);
--> statement-breakpoint
CREATE INDEX `idx_videos_status` ON `videos` (`status`);--> statement-breakpoint
CREATE INDEX `idx_videos_created` ON `videos` (`created_at`);--> statement-breakpoint
CREATE TABLE `scene_plans` (
	`id` text PRIMARY KEY NOT NULL,
	`video_id` text NOT NULL,
	`script_id` text NOT NULL,
	`sequence` text NOT NULL,
	`aspect_ratio` text NOT NULL,
	`total_frames` integer NOT NULL,
	`fps` integer DEFAULT 30 NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`video_id`) REFERENCES `videos`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`script_id`) REFERENCES `scripts`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_scene_plans_video` ON `scene_plans` (`video_id`);--> statement-breakpoint
CREATE TABLE `renders` (
	`id` text PRIMARY KEY NOT NULL,
	`video_id` text NOT NULL,
	`scene_plan_id` text NOT NULL,
	`aspect_ratio` text NOT NULL,
	`r2_url` text NOT NULL,
	`thumbnail_url` text,
	`subtitle_url` text,
	`duration` integer NOT NULL,
	`file_size` integer NOT NULL,
	`render_time` integer NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`video_id`) REFERENCES `videos`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`scene_plan_id`) REFERENCES `scene_plans`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_renders_video` ON `renders` (`video_id`);--> statement-breakpoint
CREATE TABLE `uploads` (
	`id` text PRIMARY KEY NOT NULL,
	`video_id` text NOT NULL,
	`render_id` text NOT NULL,
	`platform` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`platform_id` text,
	`platform_url` text,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`tags` text,
	`hashtags` text,
	`uploaded_at` integer,
	`error` text,
	`retry_count` integer DEFAULT 0,
	FOREIGN KEY (`video_id`) REFERENCES `videos`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`render_id`) REFERENCES `renders`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_uploads_video` ON `uploads` (`video_id`);--> statement-breakpoint
CREATE INDEX `idx_uploads_platform_status` ON `uploads` (`platform`,`status`);--> statement-breakpoint
CREATE TABLE `platform_tokens` (
	`id` text PRIMARY KEY NOT NULL,
	`platform` text NOT NULL,
	`access_token` text NOT NULL,
	`refresh_token` text,
	`expires_at` integer,
	`scopes` text,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_platform_tokens_platform` ON `platform_tokens` (`platform`);--> statement-breakpoint
CREATE TABLE `push_subscriptions` (
	`id` text PRIMARY KEY NOT NULL,
	`endpoint` text NOT NULL,
	`p256dh` text NOT NULL,
	`auth` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `topics` (
	`id` text PRIMARY KEY NOT NULL,
	`topic` text NOT NULL,
	`category` text NOT NULL,
	`used_at` integer,
	`source` text,
	`performance` text
);
--> statement-breakpoint
CREATE INDEX `idx_topics_used` ON `topics` (`used_at`);--> statement-breakpoint
CREATE INDEX `idx_topics_category` ON `topics` (`category`);