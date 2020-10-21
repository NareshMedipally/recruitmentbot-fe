import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/auth.service';
import { ServicesService } from 'app/services.service';
import swal from 'sweetalert2';

@Component({
  selector: 'ngx-update-tags',
  templateUrl: './update-tags.component.html',
  styleUrls: ['./update-tags.component.scss']
})
export class UpdateTagsComponent implements OnInit {

  tech: any[] = [];
  tagType: any;
  tag:any;
  tags = {
    "tag_name": "",
    "tag_desc": "",
    "tag_type": "",
    "company_name": "",
    "created_user": ""
  }

  constructor(private datapipe:DatePipe, private router: Router, private route: ActivatedRoute, private http: HttpClient, private authService: AuthService, private globals: ServicesService) {
    this.getTechnoligies();
  }

  ngOnInit(): void {
    this.globals.showLoading('');
    this.authService.getTag(this.route.snapshot.params.id).subscribe((result)=>{
      console.log(result);
      this.tags = {
        "tag_name": result.body.fields[0].tag_name,
        "tag_desc": result.body.fields[0].tag_desc,
        "tag_type": result.body.fields[0].tag_type,
        "company_name": result.body.fields[0].company_name,
        "created_user": result.body.fields[0].created_user
      };
      this.tag = result.body;
      this.globals.hideLoading('');
    },err=>{
      console.log(err);
      swal.fire('','Something went wrong!','error')
    })
  }

  getTechnoligies(){
    this.tech = [
      {"id":0,"title":"Technology","value":"Technology"},
      {"id":1,"title":"Subject","value":"Subject"},
      {"id":2,"title":"Non Subject","value":"Non Subject"}
    ];
    console.log(this.tech);
  }

  clickType(title){
    this.tagType = title;
    console.log(title);
  }

  saveTag(){
    let tagdata = {
      "tag_name": this.tags.tag_name,
      "tag_desc": this.tags.tag_desc,
      "tag_type": this.tags.tag_type,
      "company_name": this.tags.company_name
    }
    console.log(tagdata);
    this.globals.showLoading('');
    this.authService.UpdateTag(this.route.snapshot.params.id,tagdata).subscribe((res)=>{
      console.log(res);
      if(res.body.status == 'Success') {
        this.globals.hideLoading('');
        swal.fire({
          text: 'Updated successfully',
          icon: 'success',
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: `Ok`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.router.navigate(['/pages/tags']);
          }
        })
      }else if(res.body.desc == 'Tag Already Exists'){
        this.globals.hideLoading('');
        swal.fire('','Tag Already Exists!','error');
      }
    },err => {
      swal.fire('','Something went wrong!','error');
    })
  }

}
