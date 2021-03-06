import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';



export default async function handler (req, res) {
    const { pid } = req.query
    const id = pid
    const drinkDirectory = path.join(process.cwd(), 'drink_info')
    const fullPath = path.join(drinkDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const processedContent = await remark().use(html).process(matterResult.content);
    const contentHtml = processedContent.toString()
    res.statusCode = 200
    // res.json(matterResult.data);
    res.json(`{"id": "${id}", "contentHtml": "${contentHtml}", "title": "${matterResult.data['title']}", "img": "${matterResult.data['img']}", "type": "${matterResult.data['drinkType']}"}`);
}