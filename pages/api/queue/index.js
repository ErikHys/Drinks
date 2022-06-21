import { createClient } from "next-sanity";

export default async function handler (req, res) {

    const client = createClient({
        projectId: "9pky32mv",
        dataset: "production",
        apiVersion: "2022-06-20",
        token: process.env.apiToken,
        useCdn: false
    })

    const rawQueue = await client.fetch(`*[_type == "drink" && name != ""]`);
    const queue = rawQueue.map((drink) => {
        return drink.name
    })
    const newFile = queue.join(',')
    // console.log(`queue: ${newFile}`)
    res.statusCode = 200
    res.json(`{"ids": "${newFile.toString()}"}`)
}