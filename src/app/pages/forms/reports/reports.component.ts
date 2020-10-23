import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/auth.service';
import { ServicesService } from 'app/services.service';

@Component({
  selector: 'ngx-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  reports = [];
  dtOptions: any = {};
  role:any;
  renderTable =false;

  constructor(private authService: AuthService, private globals: ServicesService) {
    this.role = localStorage.getItem('roleId');
  }

  ngOnInit(): void {
    this.reports = [];
    this.reportsData();
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
    // this.reports = [
    //   { "id": "0", "title": "recrexample@gmail.com", "title_2": "receexample@gmail.com", "subject": "Comment" },
    //   { "id": "1", "title": "recrexample2@gmail.com", "title_2": "receexample2@gmail.com", "subject": "Comment" },
    //   { "id": "2", "title": "recrexample3@gmail.com", "title_2": "receexample3@gmail.com", "subject": "Comment" },
    // ];
    if(this.role == 1){
      this.globals.showLoading('');
      this.authService.getRoprts().subscribe((res)=>{
        console.log(res);
        this.reports = res.body.fields;
        console.log(this.reports);
        this.renderTable = true;
        this.globals.hideLoading('');
      });
    }else if(this.role == 2){
      this.globals.showLoading('');
      this.authService.RoprtsbyCompany(localStorage.getItem('company_Name')).subscribe((res)=>{
        console.log(res);
        this.reports = res.body.fields;
        console.log(this.reports);
        this.renderTable = true;
        this.globals.hideLoading('');
      })
    }else if(this.role == 3){
      this.globals.showLoading('');
      this.authService.RoprtsbyRec(localStorage.getItem('email_id')).subscribe((res)=>{
        console.log(res);
        this.reports = res.body.fields;
        console.log(this.reports);
        this.renderTable = true;
        this.globals.hideLoading('');
      })
    }
  }

}
