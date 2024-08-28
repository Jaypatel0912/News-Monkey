import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseCrudService {

  // private api = 'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=99ef85a115f34e93b7866b53223b01c2';

  private api = 'https://newsapi.org/v2/top-headlines/sources?apiKey=99ef85a115f34e93b7866b53223b01c2';

  // newsData: {title: string, description: string, image: string, author: string}[] = [];
  newsData: any[] = [];
  id!: number;
  newsDetails!: any;
  private selectedNews!: any[];

  constructor(private httpClient: HttpClient) { }

  getNewsList() {
    return this.httpClient.get<{status: string, sources:[]}>(this.api);
  }

  getNewsDetails(id:number){
    this.id = id;
    this.newsData = JSON.parse(localStorage.getItem('newsData')!);
    this.newsDetails = this.newsData[this.id];
    console.log(this.newsDetails);
  }

  getNews(){
    return this.newsData;
  }

  setSelectedNews(news: any) {
    this.selectedNews = news;
  }

  getSelectedNews() {
    console.log(this.selectedNews);
    return this.selectedNews;
  }
}
