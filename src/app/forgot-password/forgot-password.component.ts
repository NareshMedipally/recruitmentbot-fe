import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'ngx-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotpwd = {
    "email_id" : "",
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
