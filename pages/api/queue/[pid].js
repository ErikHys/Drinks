import fs from "fs";
import path from "path";
import {createClient} from "next-sanity";

export default async function handler (req, res) {
    const client = createClient({
        projectId: "9pky32mv",
        dataset: "production",
        apiVersion: "2022-06-25",
        token: process.env.apiToken,
        useCdn: false
    })
    const { pid } = req.query
    client.delete({query: `*[_type == "drink" && name == ${pid}][0]`}).then(() => {
        console.log('Drink removed')
    }).catch((err) => {
            console.error('Delete failed: ', err.message)
        })
    res.statusCode = 200
    res.json(`{"number": ${0}}`)
}