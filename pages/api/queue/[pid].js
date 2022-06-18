import fs from "fs";
import path from "path";

export default async function handler (req, res) {
    const { pid } = req.query
    const id = pid
    const queuePath = path.join(process.cwd(), 'queue/queue.txt')
    const fileContents = fs.readFileSync(queuePath, 'utf8');
    let newFile = fileContents.split('\n')
    const index = newFile.indexOf(id)
    newFile.splice(index, 1)
    newFile = newFile.join('\n')
    fs.writeFileSync(queuePath, newFile)
    res.statusCode = 200
    res.json(`{"number": ${0}}`)
}