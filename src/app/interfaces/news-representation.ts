export interface NewsRepr {
    
    totalArticles: number,
    articles: ArticleRepr[]
}

 interface ArticleRepr {
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
    