// Vidur Ratna 1309874
import React from 'react'

function listBooks() {
    const dummyData = [{"rating":5,"category":"Database","cover":"https://d2z6cj5wcte8g7.cloudfront.net/book-covers/In-memory.png","price":18.99,"id":"6dyqsnj1-d93b-11e8-9f8b-f2801f1b9fd1","name":"In-memory","author":"Brady Fisher"},{"rating":5,"category":"Database","cover":"https://d2z6cj5wcte8g7.cloudfront.net/book-covers/Graph.png","price":22.96,"id":"3sbvndpe-d93b-11e8-9f8b-f2801f1b9fd1","name":"Graph","author":"Brady Fisher"},{"rating":5,"category":"Database","cover":"https://d2z6cj5wcte8g7.cloudfront.net/book-covers/Document.png","price":23.95,"id":"l1dcnrsi-d93b-11e8-9f8b-f2801f1b9fd1","name":"Document","author":"Brady Fisher"},{"rating":5,"category":"Database","cover":"https://d2z6cj5wcte8g7.cloudfront.net/book-covers/Master+admin.png","price":18.99,"id":"623gsnj1-d93b-11e8-9f8b-f2801f1b9fd1","name":"Master admin","author":"Brady Fisher"},{"rating":5,"category":"Database","cover":"https://d2z6cj5wcte8g7.cloudfront.net/book-covers/Databases.png","price":15.99,"id":"0o6r76vt-d93b-11e8-9f8b-f2801f1b9fd1","name":"Databases","author":"Brady Fisher"},{"rating":4,"category":"Database","cover":"https://d2z6cj5wcte8g7.cloudfront.net/book-covers/UX+software.png","price":22.96,"id":"y8vnbpvn-d93b-11e8-9f8b-f2801f1b9fd1","name":"UX Software","author":"Brady Fisher"},{"rating":5,"category":"Database","cover":"https://d2z6cj5wcte8g7.cloudfront.net/book-covers/Search.png","price":20.99,"id":"0u96q42u-d93b-11e8-9f8b-f2801f1b9fd1","name":"Search","author":"Brady Fisher"},{"rating":5,"category":"Database","cover":"https://d2z6cj5wcte8g7.cloudfront.net/book-covers/Storage+servers.png","price":18.99,"id":"6d32snj1-d93b-11e8-9f8b-f2801f1b9fd1","name":"Storage Servers","author":"Brady Fisher"},{"rating":4,"category":"Database","cover":"https://d2z6cj5wcte8g7.cloudfront.net/book-covers/Surviving+your+UX+career.png","price":17.99,"id":"nhco678y-d93b-11e8-9f8b-f2801f1b9fd1","name":"Surviving Your UX Career","author":"Brady Fisher"},{"rating":5,"category":"Database","cover":"https://d2z6cj5wcte8g7.cloudfront.net/book-covers/Key-value.png","price":23.95,"id":"0ld0qvru-d93b-11e8-9f8b-f2801f1b9fd1","name":"Key-value","author":"Brady Fisher"}]
    return dummyData;
}

it('Check if category page is listed in correct order', ()=> {
    const books = listBooks();
    
    const sortedBooks = books.sort((a:any, b:any) => {
        var nameA = a.name.toUpperCase();
        var nameB = b.name.toUpperCase();

        if(nameA < nameB) return -1
        if(nameA > nameB) return 1
        return 0;
    })
    
    const bookNamesOnly = sortedBooks.map((book) => book.name)
    
    expect(bookNamesOnly).toEqual([ 'Databases', 'Document', 'Graph', 'In-memory', 'Key-value', 'Master admin', 'Search', 'Storage Servers', 'Surviving Your UX Career', 'UX Software' ])
})
