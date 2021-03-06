import { Component, OnInit } from '@angular/core';
import { SmartTableData } from 'app/@core/data/smart-table';
import { AuthService } from 'app/auth.service';
import { ServicesService } from 'app/services.service';
import swal from 'sweetalert2';

@Component({
  selector: 'ngx-enterprise',
  templateUrl: './enterprise.component.html',
  styleUrls: ['./enterprise.component.scss']
})
export class EnterpriseComponent implements OnInit {

  data: any[] = [];
  totalItems: number = 0;
  Page: number = 1;
  searchTerm: string;


  constructor(private service: SmartTableData, private authService: AuthService, private globals: ServicesService) {
    const data = this.service.getData();
  }
  ngOnInit() {
    this.getData()
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  getData(){
    this.globals.showLoading('');
    this.authService.getEntCompanies().subscribe((result)=>{
      console.log(result.body.fields);
      this.data = result.body.fields;
      this.globals.hideLoading('');
    },err => {
      console.log(err);
      this.globals.hideLoading('');
      swal.fire('','Something went wrong!','error');
    })
  }

  Search(){
    if(this.searchTerm != ""){
      this.data = this.data.filter(res=>{
        return res.company_name.toLocaleLowerCase().match(this.searchTerm.toLocaleLowerCase());
      });
    }else if(this.searchTerm == "") {
      this.getData();
    }
  }

  openDelete(data){
    console.log(data);
    if(data.company_name == 'Bluespace'){
      swal.fire('','You are not authorized to delete this company!','error');
    }else{
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
          this.authService.delEntCompany(data.correl_id).subscribe((result)=>{
            console.log(result);
            if(result.body.status == 'success'){
              swal.fire({
                title: '',
                text: 'Deleted successfully!',
                icon: 'success',
                allowOutsideClick: false
              }).then((result) => {
                if (result.isConfirmed) {
                  this.getData();
                }
              })
            }else {
              swal.fire('','something went wrong!','error');
            }
          },err => {
            console.log(err);
            swal.fire('','something went wrong!','error');
          })
        }
      })
    }
  }
}
