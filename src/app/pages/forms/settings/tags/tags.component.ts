import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/auth.service';
import { ServicesService } from 'app/services.service';
import swal from 'sweetalert2';

@Component({
  selector: 'ngx-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  data: any[] = [];
  totalItems: number = 0;
  Page: number = 1;
  searchTerm: string;

  constructor(private globals:ServicesService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getData()
  }

  getData(){
    this.globals.showLoading('');
    this.authService.getTags(localStorage.getItem('company_Name')).subscribe((result)=>{
      console.log(result);
      this.globals.hideLoading('');
      if(result.body.status == 'Success'){
        this.data = result.body.fields;
      }else if(result.body.desc == 'No tags available for this company'){
        console.log(result.body.desc);
        swal.fire('','No tags available for this company!','error')
      }
    },err=>{
      swal.fire('','Something went wrong!','error')
    })
  }

  Search(){
    if(this.searchTerm != ""){
      this.data = this.data.filter(res=>{
        return res.tag_name.toLocaleLowerCase().match(this.searchTerm.toLocaleLowerCase());
      });
    }else if(this.searchTerm == "") {
      this.getData();
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
        this.authService.DeleteTag(data.tag_id).subscribe((result)=>{
          console.log(result);
          if(result.body.desc == 'Tag Deleted'){
            swal.fire({
              text: 'Deleted successfully',
              icon: 'success',
              showDenyButton: false,
              showCancelButton: false,
              confirmButtonText: `Ok`,
              allowOutsideClick: false
            }).then((result) => {
              if (result.isConfirmed) {
                this.getData();
              }
            })
          }
        },err => {
          console.log(err);
          swal.fire('','Something went wrong!','error');
        })
      }
    })
  }

}
