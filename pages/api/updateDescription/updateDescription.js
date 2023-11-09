import {runUpdateDescription} from '../../../fetching-data/data';

 async function handler(req, res)  {
    if (req.method === 'POST') {
        try {
            const { recipeId, description} = req.body;
            //console.log(recipeId)

            if (!description) {
                return res.status(400).json({ message: 'Invalid description format' });
            }

            const result = await runUpdateDescription(recipeId, description);
            console.log(result)

            if (result.success) {
                return res.status(200).json({ message: result.message });
            } else {
                return res.status(500).json({ message: 'Internal server error' });
            }
        } catch (error) {
            console.error('Request handling error:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
};

export default handler;