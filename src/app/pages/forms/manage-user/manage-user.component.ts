import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UpdateUserComponent } from '../user/update-user/update-user.component';
import swal from 'sweetalert2';
import { ServicesService } from 'app/services.service';
import { AuthService } from 'app/auth.service';

@Component({
  selector: 'ngx-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {

  // modalRef: BsModalRef;
  Companies: any[];
  totalItems: number = 0;
  Page: number = 1;
  searchTerm: string;
  adminType: any=[];
  recruiterType: any=[];
  Role_id:any;

  constructor(private http: HttpClient, private globals: ServicesService, private authService: AuthService) {
    this.Role_id = localStorage.getItem('roleId');
    console.log(this.Role_id)
  }

  ngOnInit(): void {
    this.getCompanies();
  }

  getCompanies(){
    if(this.Role_id == 1){
      this.globals.showLoading('');
      this.authService.getallCompanies().subscribe((result)=>{
        console.log(result.body.user_profile);
        this.Companies = result.body.user_profile;
        console.log(this.Companies);
        if(result.status == 200){
          this.globals.hideLoading('');
          // this.adminType = result.body.fields.filter(x => x.role_type != 'Super Admin')
          // console.log(this.adminType);
          // this.recruiterType = this.adminType.filter(x => x.role_type != 'Admin')
          // console.log(this.recruiterType);
        }
      },err=>{
        console.log(err);
        swal.fire(
          '',
          'Something went wrong!',
          'error'
        )
      })
    }else{
      this.globals.showLoading('');
      this.authService.getCompanies(localStorage.getItem('company_Name')).subscribe((result)=>{
        console.log(result.body.fields);
        this.Companies = result.body.fields;
        console.log(this.Companies);
        this.globals.hideLoading('');
        if(result.status == 200){
          this.adminType = result.body.fields.filter(x => x.role_type != 'Super Admin')
          console.log(this.adminType);
          this.recruiterType = this.adminType.filter(x => x.role_type != 'Admin')
          console.log(this.recruiterType);
        }
      },err=>{
        console.log(err);
        swal.fire(
          '',
          'Something went wrong!',
          'error'
        )
      })
    }
  }

  Search(){
    if(this.searchTerm != ""){
      this.Companies = this.Companies.filter(res=>{
        return res.first_name.toLocaleLowerCase().match(this.searchTerm.toLocaleLowerCase());
      });
    }else if(this.searchTerm == "") {
      this.getCompanies();
    }
  }

  openDelete(data){
    console.log(data)
    swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.deleteCompany(data.correl_id).subscribe((result)=>{
          console.log(result);
          if(result.body.desc == 'User Deleted Successfully!'){
            swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            ).then((result) => {
              if (result.isConfirmed) {
                this.getCompanies();
              }
            })
          }
        },err => {
          console.log(err);
          swal.fire('','something went wrong!','error');
        })
      }
    })
  }

  onChange(item){
    console.log(item);
    if(item.bot_status == 0 || item.bot_status == null){
      let data = {
        "bot_status": 1,
        "email_id": item.email_id
      };
      console.log(data)
      this.authService.botStatus(data).subscribe((res)=>{
        console.log(res);
        swal.fire('', 'Updated successfully!', 'success').then((result) => {
          if (result.isConfirmed) {
            this.getCompanies();
          }
        })
      })
    }else if(item.bot_status == 1){
      let data = {
        "bot_status": 0,
        "email_id": item.email_id
      };
      console.log(data)
      this.authService.botStatus(data).subscribe((res)=>{
        console.log(res);
        swal.fire('', 'Updated successfully!', 'success').then((result) => {
          if (result.isConfirmed) {
            this.getCompanies();
          }
        })
      })
    }
  }

}
