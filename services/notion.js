const {Client} = require('@notionhq/client');
require('dotenv').config();

const notion = new Client({auth: process.env.NOTION_API_KEY});
const notionDbID = process.env.NOTION_DATABASE_ID;

module.exports = async function getMovies() {
    const payload = {
        path: `databases/${notionDbID}/query`,
        method: 'POST',
    };

    const {results} = await notion.request(payload);

    const movies = results.map((page) => {
        return {
            id: page.properties.slug.rich_text[0].plain_text,
            title: page.properties.title.title[0].plain_text,
            author: page.properties.authors.rich_text[0].plain_text,
            rating: page.properties.rating.select.name,
            img: page.properties.img.files[0].external.url
        };
    });

    return movies;
}