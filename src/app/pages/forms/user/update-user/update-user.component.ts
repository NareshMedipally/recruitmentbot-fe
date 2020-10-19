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

  recLoc: any[] =[];
  visa: any[] =[];
  dataType: any;
  dateVisible = true;
  data: any[] = [];
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
    "role_id": '',
    "dob": "",
    "education": "",
    "rate": "",
    "relocation": "",
    "visa_copy_loc": "",
    "visa_status": "",
    "visa_valid_from": "",
    "visa_valid_to": "",
    "DL_copy": "",
    "DL_valid_from": "",
    "DL_valid_to": "",
    "correl_id": "",
    "created_user": "",
    "email_template": "",
  }

  addressInfo = {
    "address_line_1": "",
    "address_line_2": "",
    "city": "",
    "zipcode": ""
  }

  techInfo = [
    {
      "technology_name": "",
      "total_experience": "",
      "usa_experience": "",
      "marketing_phone": "",
      "marketing_email_id": "",
      "looking_for_job": "",
      "subject_tag": "",
      "non_subject_tag": "",
      "linkedIn_url": "",
      "tags": "",
      "resume_loc": "",
      "certificate_loc": ""
    }
  ]

  constructor(private datapipe:DatePipe, private router: Router, private route: ActivatedRoute, private http: HttpClient, private authService: AuthService, private globals: ServicesService) {
    this.getRecLoc();
    this.gettags();
    this.visaStatus();
  }

  ngOnInit(): void {
    this.globals.showLoading('')
    this.authService.getCompany(this.route.snapshot.params.id).subscribe((result)=>{
      console.log(result.body);
      this.dataType = result.body.fields[0].role_type;
      console.log(this.dataType);
      if(this.dataType != 'Consultant'){
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
          "dob": result.body.fields[0].dob ? this.datapipe.transform(result.body.fields[0].dob, 'yyyy-MM-dd') : "",
          "education": result.body.fields[0].education,
          "rate": result.body.fields[0].rate,
          "relocation": result.body.fields[0].relocation,
          "visa_copy_loc": result.body.fields[0].visa_copy_loc,
          "visa_status": result.body.fields[0].visa_status,
          "visa_valid_from": result.body.fields[0].visa_valid_from ? this.datapipe.transform(result.body.fields[0].visa_valid_from, 'yyyy-MM-dd') : "",
          "visa_valid_to": result.body.fields[0].visa_valid_to ? this.datapipe.transform(result.body.fields[0].visa_valid_to, 'yyyy-MM-dd') : "",
          "DL_copy": result.body.fields[0].DL_copy,
          "DL_valid_from": result.body.fields[0].DL_valid_from ? this.datapipe.transform(result.body.fields[0].DL_valid_from, 'yyyy-MM-dd') : "",
          "DL_valid_to": result.body.fields[0].DL_valid_to ? this.datapipe.transform(result.body.fields[0].DL_valid_to, 'yyyy-MM-dd') : "",
          "correl_id": result.body.fields[0].correl_id,
          "created_user": result.body.fields[0].created_user,
          "email_template": result.body.fields[0].email_template,
        }
      }else if(this.dataType == 'Consultant'){
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
          "expiry_date": result.body.fields[0].expiry_date ? this.datapipe.transform(result.body.fields[0].expiry_date, 'yyyy-MM-dd') : "",
          "role_type": result.body.fields[0].role_type,
          "role_id": result.body.fields[0].role_id,
          "dob": result.body.fields[0].dob ? this.datapipe.transform(result.body.fields[0].dob, 'yyyy-MM-dd') : "",
          "education": result.body.fields[0].education,
          "rate": result.body.fields[0].rate,
          "relocation": result.body.fields[0].relocation,
          "visa_copy_loc": result.body.fields[0].visa_copy_loc,
          "visa_status": result.body.fields[0].visa_status,
          "visa_valid_from": result.body.fields[0].visa_valid_from ? this.datapipe.transform(result.body.fields[0].visa_valid_from, 'yyyy-MM-dd') : "",
          "visa_valid_to": result.body.fields[0].visa_valid_to ? this.datapipe.transform(result.body.fields[0].visa_valid_to, 'yyyy-MM-dd') : "",
          "DL_copy": result.body.fields[0].DL_copy,
          "DL_valid_from": result.body.fields[0].DL_valid_from ? this.datapipe.transform(result.body.fields[0].DL_valid_from, 'yyyy-MM-dd') : "",
          "DL_valid_to": result.body.fields[0].DL_valid_to ? this.datapipe.transform(result.body.fields[0].DL_valid_to, 'yyyy-MM-dd') : "",
          "correl_id": result.body.fields[0].correl_id,
          "created_user": result.body.fields[0].created_user,
          "email_template": result.body.fields[0].email_template,
        }
        this.addressInfo = {
          "address_line_1": result.body.addresult[0].address_line_1,
          "address_line_2": result.body.addresult[0].address_line_2,
          "city": result.body.addresult[0].city,
          "zipcode": result.body.addresult[0].zipcode
        }
        this.techInfo = result.body.techresult
      }
      console.log(this.formData);
      console.log(this.addressInfo);
      console.log(this.techInfo);
      this.globals.hideLoading('');
    });
    if(this.globals.UserRoleid == 1){
      this.dateVisible = false;
    }
  }

  getRecLoc(){
    this.recLoc = [
      {"id":0,"title":"Yes","value":"Yes"},
      {"id":1,"title":"No","value":"No"},
    ]
  }

  visaStatus(){
    this.visa = [
      {"id":0,"title":"Active","value":"Active"},
      {"id":1,"title":"Inactive","value":"Inactive"},
    ]
  }

  gettags(){
    this.globals.showLoading('');
    this.authService.getTags(this.globals.company).subscribe((result)=>{
      console.log(result.body.fields);
      this.data = result.body.fields;
      this.globals.hideLoading('');
    },err=>{
      swal.fire('','Something went wrong!','error')
    })
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
