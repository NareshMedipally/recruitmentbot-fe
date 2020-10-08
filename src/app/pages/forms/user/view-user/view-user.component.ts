import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/auth.service';
import { ServicesService } from 'app/services.service';

@Component({
  selector: 'ngx-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {

  dataType: any;
  formData = {
    "first_name" : "",
    "last_name" : "",
    "company_name":"",
    "email_id":"",
    "phone":"",
    "primary_email_id":"",
    "generic_email_id":"",
    "personal_email_id":"",
    "cc_email_id": "",
    "bcc_email_id":"",
    "comments":"",
    "expiry_date": "",
    "role_type":"",
    "role_id": ''
  }

  constructor(private datapipe:DatePipe, private router: ActivatedRoute, private http: HttpClient, private authService: AuthService, private globals: ServicesService) { }

  ngOnInit(): void {
    this.globals.showLoading('');
    this.authService.getCompany(this.router.snapshot.params.id).subscribe((result)=>{
      console.log(result.body);
      this.formData = {
        "first_name" : result.body.fields[0].first_name,
        "last_name" : result.body.fields[0].last_name,
        "company_name": result.body.fields[0].company_name,
        "email_id": result.body.fields[0].email_id,
        "phone": result.body.fields[0].phone,
        "primary_email_id": result.body.fields[0].primary_email_id,
        "generic_email_id": result.body.fields[0].generic_email_id,
        "personal_email_id": result.body.fields[0].personal_email_id,
        "cc_email_id": result.body.fields[0].cc_email_id,
        "bcc_email_id": result.body.fields[0].bcc_email_id,
        "comments": result.body.fields[0].comments,
        "expiry_date": result.body.fields[0].expiry_date ,
        "role_type": result.body.fields[0].role_type,
        "role_id": result.body.fields[0].role_id,
      }
      console.log(this.formData);
      this.dataType = result.body.fields[0].role_type;
      console.log(this.dataType);
      this.globals.hideLoading('');
    })
  }

}
