CREATE TABLE "favorite_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"recipe_id" text NOT NULL,
	"title" text NOT NULL,
	"image" text,
	"cook_time" integer,
	"servings" integer
);
