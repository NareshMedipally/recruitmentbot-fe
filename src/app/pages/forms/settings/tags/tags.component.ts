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
    this.authService.getTags(this.globals.company).subscribe((result)=>{
      console.log(result.body.fields);
      this.data = result.body.fields;
      this.globals.hideLoading('');
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
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.DeleteTag(data.tag_id).subscribe((result)=>{
          console.log(result);
          swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          // this.getData();
        },err => {
          console.log(err)
        })
      }
    })
  }

}
