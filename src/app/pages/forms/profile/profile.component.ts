import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/auth.service';
import { ServicesService } from 'app/services.service';
import swal from 'sweetalert2';


@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  Role_id:any;
  profile = {
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
  };
  correlId: any;

  constructor(private globals: ServicesService, private authService: AuthService, private datapipe:DatePipe, private router: Router) {
    this.Role_id = localStorage.getItem('roleId');
    this.correlId = localStorage.getItem('correl_id');
    this.getProfile();
  }

  ngOnInit(): void {
  }

  getProfile(){
    this.globals.showLoading('');
    this.authService.getCompany(localStorage.getItem('correl_id')).subscribe((res)=>{
      console.log(res);
      this.profile = res.body.fields[0];
      this.profile.expiry_date = res.body.fields[0].expiry_date ? this.datapipe.transform(res.body.fields[0].expiry_date, 'yyyy-MM-dd') : "";
      console.log(this.profile);
      this.globals.hideLoading('');
    },err => {
      swal.fire('','Something went wrong!','error')
    })
  }

  updateRecruiter(){
    let data = {
      "first_name" : this.profile.first_name,
      "last_name" : this.profile.last_name,
      "company_name": this.profile.company_name,
      "email_id": this.profile.email_id,
      "phone": this.profile.phone,
      "primary_email_id": this.profile.primary_email_id,
      "generic_email_id": this.profile.generic_email_id,
      "personal_email_id": this.profile.personal_email_id,
      "cc_email_id": this.profile.cc_email_id,
      "bcc_email_id": this.profile.bcc_email_id,
      "comments": this.profile.comments,
      "expiry_date": this.profile.expiry_date ? this.datapipe.transform(this.profile.expiry_date, 'yyyy-MM-dd') : "",
      "role_type": this.profile.role_id ? this.profile.role_id : "null",
      "role_id": this.profile.role_id ? this.profile.role_id : "null",
    }
    this.authService.updateCompany(this.correlId,data).subscribe((res)=>{
      if(res.body.desc == 'Record Updated Successfully'){
        console.log(res);
        swal.fire('', 'Updated successfully', 'success').then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/pages/dashboard']);
          }
        })
      }
    },err => {
      swal.fire('','Something went wrong!','error');
    })
  }

}
