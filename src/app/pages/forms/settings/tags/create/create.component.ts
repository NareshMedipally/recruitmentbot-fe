import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/auth.service';
import { ServicesService } from 'app/services.service';
import swal from 'sweetalert2';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  tech: any[] = [];
  tagType: any;
  tags = {
    "tag_name": "",
    "tag_desc": "",
    "tag_type": "",
    "company_name": "",
    "created_user": ""
  }

  constructor(private globals: ServicesService, private authService: AuthService, private router: Router) {
    this.getTechnoligies();
    this.getData();
  }

  ngOnInit(): void {
  }

  getTechnoligies(){
    this.tech = [
      {"id":0,"title":"Technology","value":"Technology"},
      {"id":1,"title":"Subject","value":"Subject"},
      {"id":2,"title":"Non Subject","value":"Non Subject"}
    ]
  }

  clickType(title){
    this.tagType = title;
    console.log(title);
  }

  saveTag(){
    let tagData = {
      "tag_name": this.tags.tag_name,
      "tag_desc": this.tags.tag_desc,
      "tag_type": this.tech[0].value,
      "company_name": localStorage.getItem('company_Name'),
      "created_user": localStorage.getItem('email_id')
    }
    console.log(tagData);
    this.authService.postTags(tagData).subscribe((res)=>{
      console.log(res);
      if(res.body.status == 'success'){
        swal.fire({
          text: 'Created successfully',
          icon: 'success',
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: `Ok`,
          allowOutsideClick: false
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.router.navigate(['/pages/tags']);
          }
        })
      }else if(res.body.desc == 'Tag Already Exists') {
        swal.fire('','Tag Already Exists','error')
      }
    },err=>{
      console.log(err);
      swal.fire('','Somethine went wrong!','error')
    })
  }

  getData(){
    this.globals.showLoading('');
    this.authService.getTags(localStorage.getItem('company_Name')).subscribe((result)=>{
      console.log(result);
      this.globals.hideLoading('');
    },err=>{
      swal.fire('','Something went wrong!','error')
    })
  }

}
