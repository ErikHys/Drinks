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
    const rawQueue = await client.fetch(`*[_type == "drink" && name == $pid][0]`, {pid: pid});
    const queue = rawQueue.map((drink) => {
        return drink.name
    })
    const newFile = queue.join(',')
    console.log(`queue: ${newFile} from delete`)
    console.log(`Attempting to delete: ${pid}`)
    client.delete({query: `*[_type == "drink" && name == ${pid}][0]`}).then(() => {
        console.log(`Drink removed ${pid}` )
    }).catch((err) => {
        console.error('Delete failed: ', err.message)
    })
    const rawQueue1 = await client.fetch(`*[_type == "drink" && name != ""]`);
    const queue1 = rawQueue1.map((drink) => {
        return drink.name
    })
    const newFile1 = queue1.join(',')
    console.log(`queue: ${newFile1} after delete`)

    res.statusCode = 200
    res.json(`{"number": ${0}}`)
}