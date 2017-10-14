export function FetchDoubanItems(pages, items) {
    return Promise.resolve($.ajax(`/getitems?pages=${pages}&items=${items}`))
}


