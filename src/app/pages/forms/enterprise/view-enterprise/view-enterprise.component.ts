import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/auth.service';
import { ServicesService } from 'app/services.service';
import swal from 'sweetalert2';

@Component({
  selector: 'ngx-view-enterprise',
  templateUrl: './view-enterprise.component.html',
  styleUrls: ['./view-enterprise.component.scss']
})
export class ViewEnterpriseComponent implements OnInit {

  company = {
    "company_name": "",
    "website_url": "",
    "company_logo": "assets/images/users.svg",
    "email_id": "",
    "linkedIn_url": "",
    "phone": "",
    "tax_id": "",
    "address_line_1": "",
    "address_line_2": "",
    "zipcode": "",
    "city": "",
    "state": "",
    "country": "",
    "valid_from": null,
    "valid_to": null,
    "comments": ""
  }

  constructor( private datapipe: DatePipe , private route: ActivatedRoute, private http: HttpClient, private authService: AuthService, private globals: ServicesService) { }

  ngOnInit(): void {
    this.globals.showLoading('');
    this.authService.getEntCompany(this.route.snapshot.params.id).subscribe((result)=>{
      if(result.body.result_code == 200){
        console.log(result);
        this.company = {
          "company_name": result.body.fields[0].company_name,
          "website_url": result.body.fields[0].website_url,
          "company_logo": result.body.fields[0].company_logo,
          "email_id": result.body.fields[0].email_id,
          "linkedIn_url": result.body.fields[0].linkedIn_url,
          "phone": result.body.fields[0].phone,
          "tax_id": result.body.fields[0].tax_id,
          "address_line_1": result.body.aresult[0].address_line_1,
          "address_line_2": result.body.aresult[0].address_line_2,
          "zipcode": result.body.aresult[0].zipcode,
          "city": result.body.aresult[0].city,
          "state": result.body.aresult[0].state,
          "country": result.body.aresult[0].country,
          "valid_from": result.body.fields[0].valid_from ? this.datapipe.transform(result.body.fields[0].valid_from, 'yyyy-MM-dd') : "",
          "valid_to": result.body.fields[0].valid_to ? this.datapipe.transform(result.body.fields[0].valid_to, 'yyyy-MM-dd') : "",
          "comments": result.body.fields[0].comments
        };
        if(result.body.fields[0].company_logo == ''){
          this.company.company_logo = 'assets/images/users.svg'
        }else if(result.body.fields[0].company_logo != ''){
          let url = 'https://hireswing.com/api/files/';
          this.company.company_logo = url+result.body.fields[0].company_logo;
        }
        console.log(this.company);
        this.globals.hideLoading('');
      }else{
        this.globals.hideLoading('');
        swal.fire('','Something went wrong!','error')
      }
    },err => {
      console.log(err);
      this.globals.hideLoading('');
      swal.fire('','Something went wrong!','error')
    })
  }

}
