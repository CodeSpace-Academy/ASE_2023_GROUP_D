import { runFilter } from "@/fetching-data/data";

async function handler(req, res){
    const filter = req.query.filter
    console.log(filter)


     const dynmaic = `ingredients.${filter}`
    if(req.method === 'GET'){
        try {
            const filteredRecipes = await runFilter(1, {[dynmaic] : {$exists: true}})
            res.status(200).json({filteredRecipes: filteredRecipes})
            console.log(filteredRecipes)
        } catch (error) {
            res.status(500).json({message : 'failed to get filteredRecipes'})
        }
    }
}

export default handler;