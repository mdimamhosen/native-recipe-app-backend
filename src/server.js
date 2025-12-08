import express from 'express';
import cors from 'cors';
import { ENV } from './config/env.js';
import { db } from './db/db.js';
import { FavoriteItems } from './db/schema.js';
import { and, eq } from 'drizzle-orm';

const app = express();
const PORT =    ENV.PORT || 5001;
app.use(cors());

app.use(express.json());



 

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.post('/api/favorites', async (req, res) => {
  try {
    const {userId, recipeId, title, image, cookTime, servings} = req.body;
    
    if(!userId || !recipeId || !title) {
      return res.status(400).json({error: 'Missing required fields'});
    }

   const newFav = await db.insert(FavoriteItems).values({
      userId,
      recipeId,
      title,
      image,
      cookTime,
      servings
    }).returning();

    res.status(201).json({id: newFav[0]});
  
  
  } catch (error) {
    console.error('Error adding favorite item:', error);
    res.status(500).json({error: 'Internal server error'});
  }
});

app.delete("/api/favorites/:userId/:recipeId", async (req, res) => {
  try {
    const { userId, recipeId } = req.params;
    const DeleteFav = await db.delete(FavoriteItems)
      .where(
        and(
          eq(FavoriteItems.userId, userId),
          eq(FavoriteItems.recipeId, recipeId)
        )
      )
      .returning();

    if (DeleteFav.length === 0) {
      return res.status(404).json({ error: "Favorite item not found" });
    }
    res.status(200).json({ message: "Favorite item deleted successfully" });
  } catch (error) {
    console.error("Error deleting favorite item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
})

app.get("/api/favorites/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const userFavorites = await db
      .select()
      .from(FavoriteItems)
      .where(eq(FavoriteItems.userId, userId));

    res.status(200).json(userFavorites);
  } catch (error) {
    console.log("Error fetching the favorites", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
