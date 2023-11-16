// API code
import { runFilterBySteps } from "@/fetching-data/data";

export default async function handler(req, res) {
  const { numSteps } = req.query;

  try {
    if (numSteps) {
      const filter = {
        steps: parseInt(numSteps)
      };
      const filteredData = await runFilterBySteps(1, filter); // Assuming you're on page 1

      if (Array.isArray(filteredData) && filteredData.length > 0) {
        res.status(200).json(filteredData);
      } else {
        res.status(404).json({ message: `No recipes found with ${numSteps} steps.` });
      }
    } else {
      res.status(400).json({ message: "Invalid request. Please provide numSteps parameter." });
    }
  } catch (error) {
    console.error("Error in /api/filterBySteps:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}