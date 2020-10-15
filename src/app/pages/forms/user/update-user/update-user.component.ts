import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'app/auth.service';
import swal from 'sweetalert2';
import { ServicesService } from 'app/services.service';

@Component({
  selector: 'ngx-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  dataType: any;
  dateVisible = true;
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

  constructor(private datapipe:DatePipe, private router: Router, private route: ActivatedRoute, private http: HttpClient, private authService: AuthService, private globals: ServicesService) { }

  ngOnInit(): void {
    this.globals.showLoading('')
    this.authService.getCompany(this.route.snapshot.params.id).subscribe((result)=>{
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
        "comments": result.body.fields[0].comments ? result.body.fields[0].comments : "",
        "expiry_date": result.body.fields[0].expiry_date,
        "role_type": result.body.fields[0].role_type,
        "role_id": result.body.fields[0].role_id,
      }
      console.log(this.formData);
      this.dataType = result.body.fields[0].role_type;
      console.log(this.dataType);
      this.globals.hideLoading('');
    });
    if(this.globals.UserRoleid == 1){
      this.dateVisible = false;
    }
  }

  updateCompany(type){
    if(type == 'Super Admin'){
      console.log(type);
      let sData = {
        "first_name" : this.formData.first_name,
        "last_name" : this.formData.last_name,
        "company_name": this.formData.company_name,
        "email_id": this.formData.email_id,
        "phone": this.formData.phone,
        "comments": this.formData.comments,
        "role_type": this.formData.role_id ? this.formData.role_id : "null",
        "role_id": this.formData.role_id ? this.formData.role_id : "null",
      }
      console.log(sData);
      this.authService.updateCompany(this.route.snapshot.params.id, sData).subscribe((result)=>{
        console.log(result);
        swal.fire('', 'Updated successfully', 'success').then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/pages/manage-user']);
          }
        })
      },err=> {
        console.log(err);
        swal.fire('Oops...', 'Something went wrong!', 'error')
      })
    }else if (type == 'Admin'){
      console.log(type)
      let aData = {
        "first_name" : this.formData.first_name,
        "last_name" : this.formData.last_name,
        "company_name": this.formData.company_name,
        "email_id": this.formData.email_id,
        "phone": this.formData.phone,
        "comments": this.formData.comments,
        "expiry_date": this.formData.expiry_date ? this.datapipe.transform(this.formData.expiry_date, 'yyyy-MM-dd') : "",
        "role_type": this.formData.role_id ? this.formData.role_id : "null",
        "role_id": this.formData.role_id ? this.formData.role_id : "null",
      }
      console.log(aData);
      this.authService.updateCompany(this.route.snapshot.params.id, aData).subscribe((result)=>{
        console.log(result);
        swal.fire('', 'Updated successfully', 'success').then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/pages/manage-user']);
          }
        })
      },err=> {
        console.log(err);
        swal.fire('Oops...', 'Something went wrong!', 'error')
      })
    }else if(type == 'Recruiter') {
      console.log(type)
      let aData = {
        "first_name" : this.formData.first_name,
        "last_name" : this.formData.last_name,
        "company_name": this.formData.company_name,
        "email_id": this.formData.email_id,
        "phone": this.formData.phone,
        "primary_email_id": this.formData.primary_email_id,
        "generic_email_id": this.formData.generic_email_id,
        "personal_email_id": this.formData.personal_email_id,
        "cc_email_id": this.formData.cc_email_id,
        "bcc_email_id": this.formData.bcc_email_id,
        "comments": this.formData.comments,
        "expiry_date": this.formData.expiry_date ? this.datapipe.transform(this.formData.expiry_date, 'yyyy-MM-dd') : "",
        "role_type": this.formData.role_id ? this.formData.role_id : "null",
        "role_id": this.formData.role_id ? this.formData.role_id : "null",
      }
      console.log(aData);
      this.authService.updateCompany(this.route.snapshot.params.id, aData).subscribe((result)=>{
        console.log(result);
        swal.fire('', 'Updated successfully', 'success').then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/pages/manage-user']);
          }
        })
      },err=> {
        console.log(err);
        swal.fire('Oops...', 'Something went wrong!', 'error')
      })
    }

  }

}
