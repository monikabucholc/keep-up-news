export interface NewsRepr {
    totalArticles: number,
    articles: ArticleRepr[]
}

 export interface ArticleRepr {
    title: string,
    description: string,
    content: string,
    url: string,
    image: string,
    publishedAt: string,
    source: SourceRepr
}

 interface SourceRepr {
    name: string,
    url: string
}
    