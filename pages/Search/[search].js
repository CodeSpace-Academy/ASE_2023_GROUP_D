import { runFilter2, runFav, runCategories, getHistory } from "@/fetching-data/data";
import RecipeList from "@/components/recipes/recipes-list";
import Navbar from "@/components/header/navbar";
import SearchBar from "@/components/text-search/auto-submission";
import styles from '@/components/header/summary.module.css'
//import style from "@/components/text-search/searchBar.module.css"
import { useState } from "react";
import { useRouter } from "next/router";
import Footer from "@/components/footer/footer";


function Search({ filteredCharacters, favRecipes, categories, history }) {
    const router = useRouter();
    const { search } = router.query
    const [loadmore, setLoadMore] = useState(filteredCharacters.length)
    const [loadData, setLoadData] = useState(20)

    function countMatchingRecipes(filteredCharacters, searchQuery) {
        const matchingRecipes = filteredCharacters.filter(recipe =>
            recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return matchingRecipes.length;
    }

    const matchingRecipeCount = countMatchingRecipes(filteredCharacters, search);

    return (
        <>
            <Navbar />
            <SearchBar search={search} categories={categories} />
            <div>
                {matchingRecipeCount > 0 ? (
                    <p>{`Found ${matchingRecipeCount} Matching Recipes`}</p>
                ) : (
                    <h2>No Matching Recipes Based On Search</h2>
                )}
            </div>

            

            {/* Render the 'RecipeList' component, passing in the first 20 items of the 'filteredCharacters' array and 'patcheNo' as a prop. */}
            {filteredCharacters.length > 0 ? <RecipeList recipes={filteredCharacters.slice(0, loadData)} patcheNo={1} favRecipes={favRecipes} search={search} /> : <h2>No Matching Recipes Based On Search</h2>}

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={() => {
                    setLoadMore(loadmore - 20)
                    setLoadData(loadData + 20)
                }}
                    disabled={loadmore == 0 ? true : false}
                    className={`${styles.button} `}
                >Load More {`(${loadmore})`}
                </button>
            </div>
         <Footer />
        </>
    )
}

export async function getServerSideProps(context) {

    const finalSearchString = {}

    const searchChar = context.params.search
    const Tags = context.query.Tags
    const Prep = parseInt(context.query.Prep)
    const Categories = context.query.Categories
    const Ingredients = context.query.Ingredients
    const tagsArray = Tags.split(',');
    const ingredientsArray = Ingredients.split(',');

    const sortCharacter = Prep ? { prep: Prep } : {}
    searchChar ? finalSearchString.title = { $regex: searchChar, $options: 'i' } : undefined
    Tags ? finalSearchString.tags = { $all: tagsArray } : undefined
    Categories ? finalSearchString.category = Categories : undefined
    Ingredients ? ingredientsArray.map((ingredient) => finalSearchString[`ingredients.${ingredient}`] = { $exists: true }) : undefined

    const filteredCharacters = await runFilter2(1, finalSearchString, sortCharacter)
    const favRecipes = await runFav(1);
    const categories = await runCategories();
    const history = await getHistory();
    console.log(history)

    return {
        props: {
            filteredCharacters,
            favRecipes,
            categories,
            history,
        },
    };
}

export default Search;


//CREATING A FEATURE TO STORE HISTORY SEARCHES
// Models/HistorySearches.js
// const mongoose = require('mongoose');


// const searcheHistorySchema = new mongoose.Schema({
//     query:String,
//     prep:String,
//     tags:[String],
//     category:String,
//     ingredients:[String],
// });

// const SearchHistory = mongoose.model('SearchHIstory',searchHistorySchema);

// module.export = SearchHistory;

//setting up express.js routes
//routes/searchHistory.js

// const express = ('express');
// const router = express.Router();
// const SearchHistory = require('../modelSearchHistory');

//save search history to mongoDB

// router.post('/search-history', async (req, res)=>{
//     const {query, prep,tags,category,ingredients } = req.body
//     const searchHistory = new SearchHistory ({query,prep,tags,category,ingredients});
//     try {
//         await searchHistory.save();
//         res.status(201).json(searchHistory);
//     } catch(error){
//         res.status(500).json({error:'Internal Server Error'});
//     }
// });

// Get search history from MongoDB
// router.get('/search-history', async (req, res) => {
//     try {
//     const searchHistory = await SearchHistory.find();
//     res.status(200).json(searchHistory);
//     } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// module.exports = router;



