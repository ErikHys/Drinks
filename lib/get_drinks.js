import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const drinkDirectory = path.join(process.cwd(), 'drink_info/gin_drinks')


export function getSortedDrinksData(){
    const fileNames = fs.readdirSync(drinkDirectory)
    const allDrinksData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, '');
        
        const fullPath = path.join(drinkDirectory);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        const matterResult = matter(fileContents)

        return {
            id,
            ...matterResult.data
        };
        
    });
    return allDrinksData.sort(({drinkType: a}, {drinkType: b}) =>{
        if (a < b) {
            return 1;
        } else if (a > b) {
            return -1;
        } else {
            return 0;
        }
    });
}