export function FetchDataBase(pages, items) {
    return Promise.resolve($.ajax(`/api/topic/getDataBase.json?pages=${pages}&items=${items}`))
}
export function FetchOnlineData(items) {
    return Promise.resolve($.ajax(`/api/topic/getOnlineData.json?items=${items}`))
}



