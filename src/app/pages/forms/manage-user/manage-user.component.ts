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
    this.getCompanies();
    this.Role_id = this.globals.UserRoleid;
    console.log(this.Role_id)
  }

  ngOnInit(): void {

  }

  getCompanies(){
    this.globals.showLoading('');
    this.authService.getCompanies(this.globals.company).subscribe((result)=>{
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
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.deleteCompany(data.correl_id).subscribe((result)=>{
          console.log(result);
          swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          this.getCompanies();
        },err => {
          console.log(err)
        })
      }
    })
  }

}
