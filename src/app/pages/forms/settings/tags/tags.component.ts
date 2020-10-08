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

  openDelete(){
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
        swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

}
