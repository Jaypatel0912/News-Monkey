import { Component } from '@angular/core';
import { BaseCrudService } from '../../services/base-crud.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-news-details',
  standalone: true,
  imports: [],
  templateUrl: './news-details.component.html',
  styleUrl: './news-details.component.css'
})
export class NewsDetailsComponent {


  id!: number;
  news!: any;

  constructor(private baseService: BaseCrudService, private route:ActivatedRoute){}

  ngOnInit(): void {
    this.getId();
    this.getNewsDetails();
  }

  getId(){
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    })
  }

  getNewsDetails(){
    this.news = this.baseService.getSelectedNews()
    console.log("In Details : ",this.news);
  }
}
