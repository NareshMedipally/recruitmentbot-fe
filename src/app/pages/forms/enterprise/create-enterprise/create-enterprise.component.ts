import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/auth.service';
import { ServicesService } from 'app/services.service';
import swal from 'sweetalert2';

@Component({
  selector: 'ngx-create-enterprise',
  templateUrl: './create-enterprise.component.html',
  styleUrls: ['./create-enterprise.component.scss']
})
export class CreateEnterpriseComponent implements OnInit {

  fileToUpload;
  validFrom = new Date();
  entData = {
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
    "valid_from": null,
    "valid_to": null,
    "comments": ""
  }

  constructor( private router: Router, private http: HttpClient, private datapipe:DatePipe, private authService: AuthService, private globals: ServicesService) { }

  ngOnInit(): void {
  }

  onFileChange(event){
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fileToUpload = file;
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any)=>{
        this.entData.company_logo = e.target.result;
      }
    }
  }

  Save(){
    const formData = new FormData();
    formData.append("company_name", this.entData.company_name);
    formData.append("website_url", this.entData.website_url);
    formData.append("company_logo", this.fileToUpload);
    formData.append("email_id", this.entData.email_id);
    formData.append("linkedIn_url", this.entData.linkedIn_url);
    formData.append("phone", this.entData.phone);
    formData.append("tax_id", this.entData.tax_id);
    formData.append("address_line_1", this.entData.address_line_1);
    formData.append("address_line_2", this.entData.address_line_2);
    formData.append("zipcode", this.entData.zipcode);
    formData.append("city", this.entData.city);
    formData.append("valid_from", this.entData.valid_from ? this.datapipe.transform(this.entData.valid_from, 'yyyy-MM-dd') : "");
    formData.append("valid_to", this.entData.valid_to ? this.datapipe.transform(this.entData.valid_to, 'yyyy-MM-dd') : "");
    formData.append("comments", this.entData.comments);
    this.authService.createCompany(formData)
      .subscribe(event => {
        console.log("event",event);
        if(event.body.status == 'success'){
          swal.fire('', 'Created Successfully!', 'success').then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/pages/enterprise-info']);
            }
          })
        }else if(event.body.desc == 'Company Name Already Exists'){
          swal.fire('','Company Name Already Exists!','error')
        }else if(event.body.desc == 'Email Address Already Exists'){
          swal.fire('','Email Address Already Exists!','error')
        }
      },err => {
        console.log(err);
        swal.fire('','Something went wrong!','error')
      });
  }

}
