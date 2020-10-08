import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { technology } from '../model/model.model';
import swal from 'sweetalert2';
import { ServicesService } from 'app/services.service';

@Component({
  selector: 'ngx-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  companies: any[] = [];
  roles: any[] = [];
  roles1: any[] = [];
  selectedrole: any;
  selectedcompany: any;
  superadmin = false;
  modalRef: BsModalRef;
  companyname: any;
  technology= new technology()
  dataarray=[];
  Role_id:any;
  visaDisable = true;
  drivDisable = true;

  AccessToken:string = "";

  selectedCars = [3];
    cars = [
        { id: 1, name: 'Volvo' },
        { id: 2, name: 'Saab', disabled: true },
        { id: 3, name: 'Opel' },
        { id: 4, name: 'Audi' },
    ];

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
    "role_type":""
  }

  constructor(private modalService: BsModalService, private http: HttpClient, private router: Router, private globals:ServicesService) {
    console.log(this.globals.UserRoleid);
    this.Role_id = this.globals.UserRoleid;
    this.AccessToken = localStorage.getItem('token')
  }

  ngOnInit(): void {
    this.getCompanies();
    this.getRoles();
    // this.companyname = localStorage.getItem('company');
  }

  getCompanies() {
    this.companies=[
      {"id":0,"company":"BlueSpace","value":"BlueSpace"},
      {"id":1,"company":"Company 1","value":"Company 1"},
      {"id":2,"company":"Company 2","value":"Company 2"},
      {"id":3,"company":"Company 3","value":"Company 3"},
    ]
  }

  getRoles(){
    if(this.Role_id == 2){
      this.roles1=[
        {"id":0,"role":"Admin","value":2},
        {"id":1,"role":"Recruiter","value":3},
        {"id":2,"role":"Consultant","value":4},
      ]
    }else if(this.Role_id == 3){
      this.roles1=[
        {"id":0,"role":"Recruiter","value":3},
        {"id":1,"role":"Consultant","value":4},
      ]
    }

    console.log(this.roles)
  }

  onchange(value) {
    this.selectedcompany = value;
    console.log(value);
    this.superadmin = true;
    localStorage.setItem('company', this.selectedcompany);
    if(this.selectedcompany == 'BlueSpace'){
      this.roles=[
        {"id":0,"role":"Super Admin","value":1},
        {"id":1,"role":"Admin","value":2},
        {"id":2,"role":"Recruiter","value":3},
        {"id":3,"role":"Consultant","value":4},
      ]
    }else{
      this.roles=[
        {"id":0,"role":"Admin","value":2},
      ]
    }
    this.companyname = localStorage.getItem('company');
  }

  clickSelect(role) {
    this.selectedrole = role;
    console.log(role);
    localStorage.setItem('role', this.selectedrole)
  }

  readFile(){
    this.visaDisable = false;
  }

  drivFile(){
    this.drivDisable = false;
  }

  /***Technology add and remove starts***/
  addForm() {
    this.technology=new technology()
    this.dataarray.push(this.technology);
  }

  removeForm(index){
    this.dataarray.splice(index);
  }
  // /****ends here****/

  submitForm() {
    console.log(this.formData);
    let sadmin_form = {
      "first_name" : this.formData.first_name,
      "last_name" : this.formData.last_name,
      "company_name": localStorage.getItem('company'),
      "expiry_date": this.formData.expiry_date,
      "email_id": this.formData.email_id,
      "phone": this.formData.phone,
      "comments": this.formData.comments,
      "role_type": localStorage.getItem('role')
    }
    console.log(sadmin_form);
    var headersForAPI = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*', 'Authorization': 'Bearer ' + this.AccessToken  });
    this.http.post<any>('https://recruitment-bot-demo.herokuapp.com/createuser',sadmin_form, { headers: headersForAPI, observe: 'response' }).subscribe((result)=>{
      console.log(result);
      if(result.status == 200){
        swal.fire('Form Submitted', '', 'success').then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.router.navigate(['/pages/manage-user']);
          }
        })
      }
    },err=>{
      console.log(err)
      swal.fire('Something went wrong', '', 'warning').then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.router.navigate(['/pages/manage-user']);
        }
      })
    })
  }

  adminForm() {
    console.log(this.formData)
    let admin_form = {
      "first_name" : this.formData.first_name,
      "last_name" : this.formData.last_name,
      "company_name": localStorage.getItem('company'),
      "expiry_date": this.formData.expiry_date,
      "email_id": this.formData.email_id,
      "phone": this.formData.phone,
      "comments": this.formData.comments,
      "role_type": localStorage.getItem('role')
    }
    console.log(admin_form);
    var headersForAPI = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*', 'Authorization': 'Bearer ' + this.AccessToken  });
    this.http.post<any>('https://recruitment-bot-demo.herokuapp.com/createuser',admin_form, { headers: headersForAPI, observe: 'response' }).subscribe((result)=>{
      console.log(result);
      if(result.status == 200){
        this.router.navigate(['/pages/manage-user']);
      }
    },err=>{
      console.log(err)
    })
  }

  recruiterForm(){
    let recData = {
      "first_name" : this.formData.first_name,
      "last_name" : this.formData.last_name,
      "company_name": localStorage.getItem('company'),
      "expiry_date": this.formData.expiry_date,
      "email_id": this.formData.email_id,
      "phone": this.formData.phone,
      "primary_email_id": this.formData.primary_email_id,
      "generic_email_id": this.formData.generic_email_id,
      "personal_email_id": this.formData.personal_email_id,
      "cc_email_id": this.formData.cc_email_id,
      "bcc_email_id": this.formData.bcc_email_id,
      "comments": this.formData.comments,
      "role_type": localStorage.getItem('role')
    }
    console.log(recData);
    var headersForAPI = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*', 'Authorization': 'Bearer ' + this.AccessToken  });
    this.http.post<any>('https://recruitment-bot-demo.herokuapp.com/createuser',recData, { headers: headersForAPI, observe: 'response' }).subscribe((result)=>{
      console.log(result);
      if(result.status == 200){
        this.router.navigate(['/pages/manage-user']);
      }
    },err=>{
      console.log(err)
    })
  }

}
