import fs from "fs";
import path from "path";

export default async function handler (req, res) {
    const { pid } = req.query
    const id = pid
    const queuePath = path.join(process.cwd(), 'queue/queue.txt')
    fs.appendFileSync(queuePath, id + `\n`, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
    const fileContents = fs.readFileSync(queuePath, 'utf8');
    const number = fileContents.split('\n').length - 1
    res.statusCode = 200
    res.json(`{"number": ${number}}`)
}