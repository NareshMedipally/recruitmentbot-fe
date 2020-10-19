import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { technology } from '../model/model.model';
import swal from 'sweetalert2';
import { ServicesService } from 'app/services.service';
import { AuthService } from 'app/auth.service';
import { DatePipe } from '@angular/common';


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
  admincompanyname: any;
  technology= new technology()
  dataarray=[];
  Role_id:any;
  companyDis = false;
  visaDisable = true;
  drivDisable = true;
  data: any[] = [];
  emailTemplate ="";
  AccessToken:string = "";
  fileToUpload;
  certificate:any =[]
  visacopy:any
  drivingcopy:any;
  resume:any =[];
  expiryDate = new Date();

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

  conData = {
    "first_name" : "",
    "last_name" : "",
    "company_name":"",
    "email_id":"",
    "phone":"",
    "dob" : "",
    "comments":"",
    "role_type":"",
    "expiry_date": "",
    "education":"",
    "rate":"",
    "relocation":"",
    "addressline1" : "",
    "addressline2" : "",
    "zipcode" : "",
    "city" : "",
    "total_experience" : "",
    "usa_experience" : "",
    "marketing_phone" : "",
    "marketing_email_id" : "",
    "looking_for_job" : "",
    "subject_tag" : "",
    "non_sub_tag" : "",
    "linkedIn_url" : "",
    "tags" : "",
    "resume_loc" : "",
    "certificate_loc" : "",
    "email_template" : "",
    "DL_copy" : "",
    "DL_valid_from" : null,
    "DL_valid_to" : null,
    "visa_status": "",
    "visa_copy_loc": "",
    "visa_valid_from": "",
    "visa_valid_to": "",
  }

  con_generalInfo  = [
    {
      "first_name" : "",
      "last_name" : "",
      "dob": null,
      "education":"",
      "rate" : "",
      "expiry_date" : null
  }]

  con_contactInfo = [{
    "email_id":"",
    "phone":"",
    "relocation":"",
    "address_line_1" : "",
    "address_line_2" : "",
    "zipcode" : "",
    "city" : "",
  }]

  con_technology = [
    {
      "id": 1,
      "total_experience" : "",
      "usa_experience" : "",
      "marketing_phone" : "",
      "marketing_email_id" : "",
      "looking_for_job" : "",
      "subject_tag" : "",
      "non_subject_tag" : "",
      "linkedIn_url" : "",
      "tags" : "",
      "resume_loc" : "",
      "certificate_loc" : "",
    }
  ]

  con_otherInfo = [{
    "email_template" : "",
    "DL_copy" : "",
    "DL_valid_from" : null,
    "DL_valid_to" : null,
    "visa_status": "",
    "visa_copy_loc": "",
    "visa_valid_from": null,
    "visa_valid_to": null,
    "comments":"",
  }]

  constructor(private modalService: BsModalService, private datapipe:DatePipe, private http: HttpClient, private router: Router, private globals:ServicesService, private authService: AuthService) {
    console.log(this.globals.UserRoleid);
    this.Role_id = localStorage.getItem('roleId');
    this.admincompanyname = this.globals.company;
    this.AccessToken = localStorage.getItem('token');
    if(this.Role_id == '1'){
      this.companyname = localStorage.getItem('company');
    }else {
      this.companyname = localStorage.getItem('company_Name');
    }
  }

  ngOnInit(): void {
    this.getCompanies();
    this.getRoles();
    this.gettags();
  }

  getCompanies() {
    // this.companies=[
    //   {"id":0,"company":"BlueSpace","value":"BlueSpace"},
    //   {"id":1,"company":"Company 1","value":"Company 1"},
    //   {"id":2,"company":"Company 2","value":"Company 2"},
    //   {"id":3,"company":"Company 3","value":"Company 3"},
    // ];
    this.authService.getEntCompanies().subscribe((result)=>{
      console.log(result.body.fields);
      this.companies = result.body.fields;
    },err => {
      console.log(err);
      swal.fire('','Something went wrong!','error');
    })
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
    if(this.selectedcompany == 'Bluespace'){
      this.roles=[
        {"id":0,"role":"Super Admin","value":1},
        {"id":1,"role":"Admin","value":2},
        {"id":2,"role":"Recruiter","value":3},
        {"id":3,"role":"Consultant","value":4},
      ];
      this.companyDis = true;
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

  onCertificate(event){
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.certificate = file;
      this.con_technology[0].certificate_loc = this.certificate;
    }
  }

  readFile(event){
    this.visaDisable = false;
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.visacopy = file;
      this.con_otherInfo[0].visa_copy_loc = this.visacopy;
    }
  }

  drivFile(event){
    this.drivDisable = false;
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.drivingcopy = file;
      this.con_otherInfo[0].DL_copy = this.drivingcopy;
    }
  }

  /***Technology add and remove starts***/
  addForm() {
    // this.technology=new technology()
    // this.dataarray.push(this.technology);
    this.con_technology.push ( {
      "id": this.con_technology.length+1,
      "total_experience" : "",
      "usa_experience" : "",
      "marketing_phone" : "",
      "marketing_email_id" : "",
      "looking_for_job" : "",
      "subject_tag" : "",
      "non_subject_tag" : "",
      "linkedIn_url" : "",
      "tags" : "",
      "resume_loc" : "",
      "certificate_loc" : "",
    })
    console.log("this.con_technology",this.con_technology)
  }

  removeForm(index){
    this.dataarray.splice(index);
    this.con_technology.splice(index, 1);
  }
  // /****ends here****/

  submitForm() {
    console.log(this.formData);
    let sadmin_form = {
      "first_name" : this.formData.first_name,
      "last_name" : this.formData.last_name,
      "company_name": this.companyname,
      "expiry_date": this.formData.expiry_date,
      "email_id": this.formData.email_id,
      "phone": this.formData.phone,
      "comments": this.formData.comments,
      "role_type": localStorage.getItem('role')
    }
    console.log(sadmin_form);
    this.authService.createUser(sadmin_form).subscribe((result)=>{
      console.log(result);
      if(result.body.status == 'success'){
        swal.fire('', 'Created successfully', 'success').then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/pages/manage-user']);
          }
        })
      }else if(result.body.desc == 'User Already Exists'){
        swal.fire('', 'Email Address Already Exists!', 'error')
      }
    },err=>{
      console.log(err)
      swal.fire('Something went wrong', '', 'error')
    })
  }

  adminForm() {
    console.log(this.formData)
    let admin_form = {
      "first_name" : this.formData.first_name,
      "last_name" : this.formData.last_name,
      "company_name": this.companyname,
      "expiry_date": this.formData.expiry_date ? this.datapipe.transform(this.formData.expiry_date, 'yyyy-MM-dd') : "",
      "email_id": this.formData.email_id,
      "phone": this.formData.phone,
      "comments": this.formData.comments,
      "role_type": localStorage.getItem('role')
    }
    console.log(admin_form);
    this.authService.createUser(admin_form).subscribe((result)=>{
      console.log(result);
      if(result.body.status == 'success'){
        swal.fire('', 'Created successfully', 'success').then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/pages/manage-user']);
          }
        })
      }else if(result.body.desc == 'User Already Exists'){
        swal.fire('', 'Email Address Already Exists!', 'error')
      }
    },err=>{
      console.log(err);
      swal.fire('Something went wrong', '', 'warning')
    })
  }

  recruiterForm(){
    let recData = {
      "first_name" : this.formData.first_name,
      "last_name" : this.formData.last_name,
      "company_name": this.companyname,
      "expiry_date": this.formData.expiry_date ? this.datapipe.transform(this.formData.expiry_date, 'yyyy-MM-dd') : "",
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
    this.authService.createUser(recData).subscribe((result)=>{
      console.log(result);
      if(result.body.status == 'success'){
        swal.fire('', 'Created successfully', 'success').then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/pages/manage-user']);
          }
        })
      }else if(result.body.desc == 'User Already Exists'){
        swal.fire('', 'Email Address Already Exists!', 'error')
      }
    },err=>{
      console.log(err);
      swal.fire('Something went wrong', '', 'error')
    })
  }

  onFileChange(source,event,index?){
    console.log("source",source)
    let file = ''
    if (event.target.files.length > 0) {
      console.log('here3');
      file = event.target.files[0];
      if(source == "resume"){
        this.resume.push(file)
      }else if(source == "certificate"){
        console.log('here');
        this.certificate.push(file)
      } else if(source == "driving_license"){
        this.drivingcopy = file;
        this.drivDisable = false;
      }else if(source == "visa"){
        this.visacopy = file;
        this.visaDisable = false;
      }
    }
    console.log('resume',this.resume)
    console.log('certificate',this.certificate)
    console.log('driving_license',this.drivingcopy)
    console.log('visa',this.visacopy)
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

  saveCon(){
    console.log(this.con_generalInfo);
    console.log(this.con_contactInfo);
    console.log(this.con_technology);
    console.log(this.con_otherInfo);
    console.log(this.emailTemplate)
    this.con_generalInfo[0].dob = this.con_generalInfo[0].dob ? this.datapipe.transform(this.con_generalInfo[0].dob, 'yyyy-MM-dd'): null
    this.con_generalInfo[0].expiry_date = this.con_generalInfo[0].expiry_date ? this.datapipe.transform(this.con_generalInfo[0].expiry_date, 'yyyy-MM-dd'): null
    this.con_otherInfo[0].visa_valid_from = this.con_otherInfo[0].visa_valid_from ? this.datapipe.transform(this.con_otherInfo[0].visa_valid_from, 'yyyy-MM-dd'): null
    this.con_otherInfo[0].visa_valid_to = this.con_otherInfo[0].visa_valid_to ? this.datapipe.transform(this.con_otherInfo[0].visa_valid_to, 'yyyy-MM-dd'): null
    this.con_otherInfo[0].DL_valid_from = this.con_otherInfo[0].DL_valid_from ? this.datapipe.transform(this.con_otherInfo[0].DL_valid_from, 'yyyy-MM-dd'): null
    this.con_otherInfo[0].DL_valid_to = this.con_otherInfo[0].DL_valid_to ? this.datapipe.transform(this.con_otherInfo[0].DL_valid_to, 'yyyy-MM-dd'): null
    this.con_generalInfo[0]["created_user"] = localStorage.getItem('email_id');
    const formData = new FormData();
    formData.append("generalInfo", JSON.stringify(this.con_generalInfo));
    formData.append("contactInfo", JSON.stringify(this.con_contactInfo));
    formData.append("technology", JSON.stringify(this.con_technology));
    formData.append("email_template", this.emailTemplate);
    formData.append("otherInfo",JSON.stringify(this.con_otherInfo));
    formData.append("role_type", localStorage.getItem('role'));
    formData.append("role_id", localStorage.getItem('role'));
    formData.append("company_name", this.companyname);
    if(this.resume){
      for(var x = 0; x<this.resume.length; x++) {
        formData.append("resume", this.resume[x]);
    }

    }
    if(this.certificate){
      for(var x = 0; x<this.certificate.length; x++) {
        formData.append("certificate", this.certificate[x]);
    }

    }
    if(this.visacopy){
      formData.append("visa", this.visacopy);
    }
    if(this.drivingcopy){
      formData.append("driving_license", this.drivingcopy);
    }
    this.authService.createConsultant(formData).subscribe((res)=>{
      console.log(res);
      if(res.body.status == 'success'){
        this.resetForm()
        swal.fire('', 'Created successfully', 'success').then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/pages/manage-user']);
          }
        })
      }else if(res.body.desc == 'User Already Exists'){
        swal.fire('', 'Email Address Already Exists!', 'error')
      }
    })
  }

  resetForm(){
    this.resume = [];
    this.certificate = [];
    this.visacopy = "";
    this.drivingcopy = ""
    this.con_generalInfo  = [
      {
        "first_name" : "",
        "last_name" : "",
        "dob": null,
        "education":"",
        "rate" : "",
        "expiry_date" : null
    }]

    this.con_contactInfo = [{
      "email_id":"",
      "phone":"",
      "relocation":"",
      "address_line_1" : "",
      "address_line_2" : "",
      "zipcode" : "",
      "city" : "",
    }]

    this.con_technology = [
      {
        "id": 1,
        "total_experience" : "",
        "usa_experience" : "",
        "marketing_phone" : "",
        "marketing_email_id" : "",
        "looking_for_job" : "",
        "subject_tag" : "",
        "non_subject_tag" : "",
        "linkedIn_url" : "",
        "tags" : "",
        "resume_loc" : "",
        "certificate_loc" : "",
      }
    ]

    this.con_otherInfo = [{
      "email_template" : "",
      "DL_copy" : "",
      "DL_valid_from" : null,
      "DL_valid_to" : null,
      "visa_status": "",
      "visa_copy_loc": "",
      "visa_valid_from": null,
      "visa_valid_to": null,
      "comments":"",
    }]

  }

  getemailContent(val){
    console.log("val",val)
    this.emailTemplate = val
  }
}
