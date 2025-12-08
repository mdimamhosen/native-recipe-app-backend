import { integer, text, timestamp } from "drizzle-orm/gel-core"
import {pgTable, serial} from "drizzle-orm/pg-core"


export const FavoriteItems = pgTable("favorite_items", {
    id:serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    recipeId: text("recipe_id").notNull(),
    title: text("title").notNull(),
    image: text("image"),
    cookTime: integer("cook_time"),
    servings: integer("servings"),
})