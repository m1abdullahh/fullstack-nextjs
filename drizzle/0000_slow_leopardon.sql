CREATE TABLE IF NOT EXISTS "fullstack-nextjs_sentence" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" varchar(512),
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "content_idx" ON "fullstack-nextjs_sentence" ("content");