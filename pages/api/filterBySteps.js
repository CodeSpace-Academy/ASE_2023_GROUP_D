// api/filterBySteps.js
import { runFilter } from "@/fetching-data/data";

export default async function handler(req, res) {
  const { numSteps } = req.query;

  if (numSteps) {
    const filter = {
      steps: parseInt(numSteps)
    };
    const filteredData = await runFilter(1, filter); // Assuming you're on page 1

    res.status(200).json(filteredData);
  } else {
    res.status(400).json({ message: "Invalid request. Please provide numSteps parameter." });
  }
}


