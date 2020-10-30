import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/auth.service';
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

  constructor(private router:Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  resetPwd(){
    console.log(this.forgotpwd);
    this.authService.forgotPwd(this.forgotpwd).subscribe((res)=>{
      if(res.body.result_code == 200){
        swal.fire('New password sent to your email!', '', 'success').then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/login'])
          }
        })
      }else if(res.body.result_code == 300){
        swal.fire('','Invalid Email Address','error');
      }
    },err => {
      swal.fire('','Something went wrong!','error');
    })
  }

}
