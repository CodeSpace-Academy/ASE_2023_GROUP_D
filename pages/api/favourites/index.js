import { insertFavOrHistory, runFav} from "@/fetching-data/data";

async function handler(req, res) {
const FavRecipe = req.body

    if (req.method === 'POST') {
        try {
            const recipes = await insertFavOrHistory('favourites', FavRecipe);
            res.status(200).json({ message: 'Added to Favourites!', recipes: FavRecipe});
        } catch (error) {
            res.status(500).json({ message: 'Inserting to Favourites failed!' });
        }
    }

    // if (req.method === 'GET') {
    //     try {
    //         const recipes = await runFav(1);
    //         // console.log(recipes)
    //         res.status(200).json({ recipes: recipes});
    //     } catch (error) {
    //         res.status(500).json({ message: 'Inserting to Favourites failed!' });
    //     }
    // }
}

export default handler;
