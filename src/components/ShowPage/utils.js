const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})

const externalLinksToArray = externalLink => {
    const brands = ['facebook', 'imdb' , 'twitter' , 'instagram']
    const newLinks = Object.entries(externalLink)
        .filter(i => brands.includes(i[0].split('_')[0]))
        .map(i => {
        return {
            id: Math.random(),
            name: i[0].split('_')[0],
            external_id: i[1]
        }
    })
    return newLinks
}

export {formatter,externalLinksToArray}