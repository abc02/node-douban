export function FetchItems(pages, items) {
    return Promise.resolve($.ajax(`/getitems?pages=${pages}&items=${items}`))
}
export function FetchDouban(items) {
    return Promise.resolve($.ajax(`/getdouban?items=${items}`))
}



