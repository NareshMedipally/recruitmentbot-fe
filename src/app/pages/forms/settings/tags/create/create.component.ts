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
      "tag_type": this.tagType,
      "company_name": this.globals.company,
      "created_user": this.globals.email
    }
    console.log(tagData);
    this.authService.postTags(tagData).subscribe((res)=>{
      console.log(res);
      if(res.body.status == 'success'){
        this.router.navigate(['/pages/tags']);
      }else if(res.body.status == 'failed!') {
        swal.fire('','Something went wrong!','error')
      }
    },err=>{
      console.log(err)
    })
  }

  getData(){
    this.globals.showLoading('');
    this.authService.getTags(this.globals.company).subscribe((result)=>{
      console.log(result);
      this.globals.hideLoading('');
    },err=>{
      swal.fire('','Something went wrong!','error')
    })
  }

}
