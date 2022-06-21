import fs from "fs";
import path from "path";
import { createClient } from "next-sanity";

export default async function handler (req, res) {

    const client = createClient({
        projectId: "9pky32mv",
        dataset: "production",
        apiVersion: "2022-06-25",
        token: process.env.apiToken,
        useCdn: false
    })

    const { pid } = req.query
    client.create(
        {
        _type: "drink",
        name: pid
    }).then((res) => {
        console.log(`Drink was queued, id: ${res._id}`)
    }).catch((err) => {
        console.error('Creation failed: ', err.message)
    })
    const queue = await client.fetch(`*[_type == "drink" && name != ""]`)
    console.log(`Queue length: ${queue.length}`)
    res.statusCode = 200
    res.json(`{"number": ${queue.length}}`)
}