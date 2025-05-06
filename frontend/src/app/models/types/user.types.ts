export type books = {
    name:String
    author:String,
    rate:Number,
    linkImg:String
}

export type articles = {
    title: String,
    authors: String[],
    tags:String[]
}

export type news = {
    title: String,
    author: String,
    date:String,
    time:String,
    linkImg:String
}

export type userNotes = {
    title?:String,
    content:String
    noteType:String
    noteDate: String
}