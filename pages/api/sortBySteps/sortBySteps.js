

import { runSortInstructionsByLength } from '../../../fetching-data/data';

async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { instructions, sortOrder } = req.query;

      if (!instructions || !instructions.length) {
        return res.status(400).json({ message: 'Invalid instructions format' });
      }

      const page = 1; // You might want to extract this from the query params if needed

      let result;
      if (sortOrder && sortOrder.toLowerCase() === 'desc') {
        result = await runSortInstructionsByLength(page, 'desc');
      } else {
        result = await runSortInstructionsByLength(page, 'asc');
      }

      if (result && result.length > 0) {
        // Find min and max instruction lengths
        const minInstructionsLength = result[0].instructions.length;
        const maxInstructionsLength = result[result.length - 1].instructions.length;

        //console.log(maxInstructionsLength);
        return res.status(200).json({
          success: true,
          maxInstructionsLength,
          minInstructionsLength,
          recipes: result, // Optionally include the sorted recipes
        });
      } else {
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }
    } catch (error) {
      console.error('Request handling error:', error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}

export default handler;


