import { Injectable } from "@angular/core";
import { NewsModel } from "./news.model";
import { HttpClient, HttpClientModule, HttpParams } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class NewsService {
  private options = {
    headers: new HttpHeaders().set(
      "X-Api-Key",
      "9745f66798d64771b075894a2f7b0293"
    ),
  };
  newsArticles: NewsModel[] = [];
  temp: NewsModel = new NewsModel();

  newsApiKey = "9745f66798d64771b075894a2f7b0293";
  newsUrl = "http://newsapi.org/v2/everything?q=india";
  newsSectionaUrl = "http://newsapi.org/v2/everything?q=";
  constructor(private http: HttpClient) {}

  GetAllNews() {
    return this.http.get<any>(this.newsUrl, this.options);
  }
  GetNewsSearchResult(section: string) {
    return this.http.get(this.newsSectionaUrl + section, this.options);
  }

  public CusotomMapper(item): NewsModel {
    this.temp = new NewsModel();
    this.temp.thumbnail = item.urlToImage;
    this.temp.sectionId = item.source.id;
    this.temp.webPublicationDate = item.publishedAt;
    this.temp.webTitle = item.title;
    this.temp.webUrl = item.url;
    this.temp.trailText = item.content;
    return this.temp;
  }
}
