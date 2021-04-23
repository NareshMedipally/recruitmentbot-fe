import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/auth.service';
import { ServicesService } from 'app/services.service';
import swal from 'sweetalert2';

@Component({
  selector: 'ngx-update-enterprise',
  templateUrl: './update-enterprise.component.html',
  styleUrls: ['./update-enterprise.component.scss']
})
export class UpdateEnterpriseComponent implements OnInit {

  fileToUpload;
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
  validFrom = new Date();
  logoImg = false;
  logo: string;
  previousLogo:any;

  constructor( private router: Router, private datapipe: DatePipe , private route: ActivatedRoute, private http: HttpClient, private authService: AuthService, private globals: ServicesService) {

  }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.globals.showLoading('');
    this.authService.getEntCompany(this.route.snapshot.params.id).subscribe((result)=>{
      if(result.body.result_code == 200){
        console.log(result);
        this.previousLogo = result.body.fields[0].company_logo
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

  onFileChange(event){
    if (event.target.files.length > 0) {
      console.log(event.target.files[0].size);
      if(event.target.files[0].size <= 512000){
        const file = event.target.files[0];
        this.fileToUpload = file;
        this.company.company_logo = this.fileToUpload;
        console.log(this.company.company_logo);
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (e: any)=>{
          this.logo = e.target.result;
        }
        this.logoImg = true;
      }else {
        swal.fire('','Logo max size is 500KB!','error')
      }
    }
  }

  Save(){
    const formData = new FormData();
    formData.append("company_name", this.company.company_name);
    formData.append("website_url", this.company.website_url);
    formData.append("company_logo", this.previousLogo);
    formData.append("email_id", this.company.email_id);
    formData.append("linkedIn_url", this.company.linkedIn_url);
    formData.append("phone", this.company.phone);
    formData.append("tax_id", this.company.tax_id);
    formData.append("address_line_1", this.company.address_line_1);
    formData.append("address_line_2", this.company.address_line_2);
    formData.append("zipcode", this.company.zipcode);
    formData.append("city", this.company.city);
    formData.append("state", this.company.state);
    formData.append("country", this.company.country);
    formData.append("valid_from", this.company.valid_from ? this.datapipe.transform(this.company.valid_from, 'yyyy-MM-dd') : "");
    formData.append("valid_to", this.company.valid_to ? this.datapipe.transform(this.company.valid_to, 'yyyy-MM-dd') : "");
    formData.append("comments", this.company.comments);
    if(this.fileToUpload){
      formData.append("upcompany_logo", this.fileToUpload);
    }
    this.authService.updateEntCompany(this.route.snapshot.params.id,formData)
      .subscribe(event => {
        console.log("event",event);
        if(event.body.desc == 'Record Updated Successfully'){
          swal.fire({
            title: '',
            text: 'Updated Successfully!',
            icon: 'success',
            allowOutsideClick: false
          }).then((result) => {
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
