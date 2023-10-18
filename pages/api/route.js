import { runInstructions } from "@/lib/db";

export async function getInstructions () {
    const data = await runInstructions()
    console.log(data)
}
