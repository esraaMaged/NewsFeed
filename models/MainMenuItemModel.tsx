
import NewsArticleModel from "./NewsArticleModel"

class MainMenuItemModel {
  status: string
  totalResults: number
  articles: NewsArticleModel[]
  constructor(status: string, totalResults: number, articles: NewsArticleModel[]) {
    this.status = status
    this.totalResults = totalResults
    this.articles = articles
  }
}

export default MainMenuItemModel