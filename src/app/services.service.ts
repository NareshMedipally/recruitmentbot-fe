import { Injectable } from '@angular/core';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  public UserRoleid: number = 0;
  public company: string;
  public email: string;
  public correlId: string;

  constructor() {
    var currentUser: any = localStorage.getItem('currentData');
    console.log("user",currentUser);
    if(currentUser != null && currentUser != undefined && currentUser != '') {
      currentUser=JSON.parse(currentUser)
      this.UserRoleid = currentUser.role_id;
      this.company = currentUser.company_Name;
      this.email = currentUser.email_id;
      this.correlId = currentUser.correl_id;
    }
  }

  showLoading(message){
    swal.fire({
      title:message,
      allowEscapeKey: false,
      allowOutsideClick: false,
      imageUrl: 'assets/images/Dual Ring-1s-64px.svg',
      showConfirmButton: false,
      showClass: {
        popup: 'animated fadeInDown faster'
      },
      hideClass: {
        popup: 'animated fadeOutUp faster'
      }
    });
}

hideLoading(message){
  swal.fire({
    title:message,
    allowEscapeKey: false,
    allowOutsideClick: false,
    timer:10,
    imageUrl: 'assets/images/Dual Ring-1s-64px.svg',
    showConfirmButton: false,
    showClass: {
      popup: 'animated fadeInDown faster'
    },
    hideClass: {
      popup: 'animated fadeOutUp faster'
    }
  });
}
}
