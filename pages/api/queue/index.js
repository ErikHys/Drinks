import fs from "fs";
import path from "path";

export default async function handler (req, res) {
    const queuePath = path.join(process.cwd(), 'queue/queue.txt')
    const fileContents = fs.readFileSync(queuePath, 'utf8');
    const number = fileContents.split('\n').length - 1
    let newFile = fileContents.split('\n')
    newFile.pop()
    newFile = newFile.join(',')
    res.statusCode = 200
    res.json(`{"ids": "${newFile.toString()}"}`)
}