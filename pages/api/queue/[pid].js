import {createClient} from "next-sanity";

export default async function handler (req, res) {
    const client = createClient({
        projectId: "9pky32mv",
        dataset: "production",
        apiVersion: "2022-06-20",
        token: process.env.apiToken,
        useCdn: false
    })
    const { pid } = req.query
    const rawQueue = await client.fetch(`*[_type == "drink" && name == $pid]`, {pid: pid});
    const queue = rawQueue.map((drink) => {
        return drink._id
    })
    client.delete(queue[0]).then(() => {
        console.log(`Drink removed ${pid}, id: ${queue[0]}` )
    }).catch((err) => {
        console.error('Delete failed: ', err.message)
    })
    res.statusCode = 200
    res.json(`{"number": ${0}}`)
}