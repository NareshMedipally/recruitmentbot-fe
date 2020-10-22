import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  reports: any[] = [];
  Companies: any[];
  dtOptions: any = {};

  constructor() {
    this.reportsData();
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
        buttons: [
            { extend: 'copy', className: 'table-button button btn btn-primary', },
            { extend: 'csv', className: 'table-button button btn btn-primary', },
            { extend: 'excel', className: 'table-button button btn btn-primary', },
            { extend: 'print', className: 'table-button button btn btn-primary', }
        ]
    };
  }

  reportsData(){
    this.reports = [
      { "id": "0", "title": "recrexample@gmail.com", "title_2": "receexample@gmail.com", "subject": "Comment" },
      { "id": "1", "title": "recrexample2@gmail.com", "title_2": "receexample2@gmail.com", "subject": "Comment" },
      { "id": "2", "title": "recrexample3@gmail.com", "title_2": "receexample3@gmail.com", "subject": "Comment" },
    ]
  }

}
