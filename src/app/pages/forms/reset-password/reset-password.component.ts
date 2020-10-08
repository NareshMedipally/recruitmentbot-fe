import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'ngx-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  userInfo = {
    "username": "",
    "new_password": "",
    "cnf_password": "",
  }

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  resetPwd(){
    swal.fire('New password sent to your email!', '', 'success').then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.router.navigate(['/login'])
      }
    })
  }

}
