const cheerio = require('cheerio');

const parseStudentList = (html) => {
    // const MAX_ROWS = 10;
    const MAX_ROWS = undefined;

    const $ = cheerio.load(html);

    return $('table tr')
        .slice(1, MAX_ROWS)
        .map((i, row) => {
            const $cols = $('td, th', row);
            const getCol = (idx) => $cols.eq(idx).text().trim();
            return {
                firstName: getCol(2),
                lastName: getCol(3),
                phone: getCol(4)
            };
        })
        .get();
};

module.exports = {
    parseStudentList
};
