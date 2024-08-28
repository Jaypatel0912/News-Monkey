import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { BaseCrudService } from '../../services/base-crud.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { CATEGORY } from '../../model/new.model';
import { DropdownModule } from 'primeng/dropdown';
import { ActivatedRoute, Route, Router } from '@angular/router';


@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [CommonModule, FormsModule, InputGroupModule, InputGroupAddonModule, DropdownModule],
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.css',
})
export class NewsListComponent{

  newsList: any[] = [];
  newsImage = 'https://www.pewresearch.org/wp-content/uploads/sites/8/2016/07/PJ_2016.07.07_Modern-News-Consumer_0-01.png'


  searchInput!: string;
  filteredNews: any[] = [];
  category = CATEGORY;
  selectedCategory: {name: string, value: string} = {name: 'General', value:'general'};

  constructor(private baseService: BaseCrudService,private router: Router, private route: ActivatedRoute, private cdf: ChangeDetectorRef){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.baseService.getNewsList();
    this.getNewsList();
  }

  getNewsList(){
    this.baseService.getNewsList().subscribe({
      next: (data) => {
        this.newsList = Object.values(data.sources);
        this.filteredNews = JSON.parse(JSON.stringify(this.newsList));
        console.log("News List", this.newsList);
      },
      error: (error) => {
        console.error("Error occurred:", error);
      }
    });
  }

  onSearch(){
    console.log(this.searchInput);
    this.filteredNews = this.newsList.filter((news) => {
      return(
        news.name.toLocaleLowerCase().includes(this.searchInput.toLocaleLowerCase()) ||
        news.description.toLocaleLowerCase().includes(this.searchInput.toLocaleLowerCase()) ||
        news.url.toLocaleLowerCase().includes(this.searchInput.toLocaleLowerCase()) ||
        news.category.toLocaleLowerCase().includes(this.searchInput.toLocaleLowerCase())
      )
    })

    this.filteredNews = [...this.filteredNews];

    console.log(this.newsList, this.filteredNews);
    this.cdf.detectChanges();
  }

  onSelectCategory(){
    console.log("Category", this.selectedCategory);
    this.filteredNews = this.newsList.filter(
      (news) => news.category.toLowerCase() === this.selectedCategory.value.toLowerCase()
    );

    console.log(this.filteredNews);
    this.filteredNews = [...this.filteredNews];
  }

  onGetNewsDetails(news: any){
    console.log(news);
    const id  = this.filteredNews.findIndex((n) => n.id === news.id);
    console.log(id);
    this.baseService.setSelectedNews(news);
    this.router.navigate([id], { relativeTo: this.route })
  }

}
