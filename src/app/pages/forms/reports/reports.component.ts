import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  reports: any[] = [];
  Companies: any[];
  totalItems: number = 0;
  Page: number = 1;
  searchTerm: string;

  constructor() {
    this.reportsData();
  }

  ngOnInit(): void {
  }

  reportsData(){
    this.reports = [
      { "id": "0", "title": "recrexample@gmail.com", "title_2": "receexample@gmail.com", "subject": "Comment" },
      { "id": "1", "title": "recrexample2@gmail.com", "title_2": "receexample2@gmail.com", "subject": "Comment" },
      { "id": "2", "title": "recrexample3@gmail.com", "title_2": "receexample3@gmail.com", "subject": "Comment" },
    ]
  }

  Search(){
    if(this.searchTerm != ""){
      this.reports = this.reports.filter(res=>{
        return res.title.toLocaleLowerCase().match(this.searchTerm.toLocaleLowerCase());
      });
    }else if(this.searchTerm == "") {
      this.reportsData();
    }
  }

}
