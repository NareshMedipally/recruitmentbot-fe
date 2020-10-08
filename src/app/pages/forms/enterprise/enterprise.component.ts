import { Component, OnInit } from '@angular/core';
import { SmartTableData } from 'app/@core/data/smart-table';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-enterprise',
  templateUrl: './enterprise.component.html',
  styleUrls: ['./enterprise.component.scss']
})
export class EnterpriseComponent implements OnInit {

  data: any[] = [];
  totalItems: number = 0;
  Page: number = 1;
  searchTerm: string;

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData) {
    const data = this.service.getData();
    this.source.load(data);
  }
  ngOnInit() {
    this.getData()
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  getData(){
    this.data = [
      {"id":0,"company":"Amazon","website":"amazon.com","phone":"9848022338"},
      {"id":1,"company":"Infosys","website":"infosys.com","phone":"9848022338"},
      {"id":2,"company":"Wipro","website":"wipro.com","phone":"9848022338"},
      {"id":3,"company":"Cognizant","website":"cgnant.com","phone":"9848022338"},
      {"id":4,"company":"Bluespace","website":"bluespace.com","phone":"9848022338"},
      {"id":5,"company":"IBM","website":"ibm.com","phone":"9848022338"},
      {"id":6,"company":"Google","website":"google.com","phone":"9848022338"},
      {"id":7,"company":"Facebook","website":"facebook.com","phone":"9848022338"},
      {"id":8,"company":"Flipkart","website":"flipkart.com","phone":"9848022338"},
      {"id":9,"company":"SnapIt","website":"snapit.com","phone":"9848022338"},
    ]
  }
}
