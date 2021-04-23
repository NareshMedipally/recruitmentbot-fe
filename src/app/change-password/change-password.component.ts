import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/auth.service';
import { ServicesService } from 'app/services.service';
import swal from 'sweetalert2';

@Component({
  selector: 'ngx-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  userInfo = {
    "newPassword" : "",
    "confirmPassword" : ""
  }

  constructor(private router:Router, private route: ActivatedRoute, private globals: ServicesService, private authService: AuthService) { }

  ngOnInit(): void {
    this.globals.hideLoading('')
  }

  resetPwd(){
    let data = {
      "newPassword" : this.userInfo.newPassword,
      "confirmPassword" : this.userInfo.confirmPassword
    }
    this.authService.changePwd(localStorage.getItem('correl_id'),data).subscribe((res)=>{
      console.log(res);
      if(res.body.status == 'Success'){
        swal.fire({
          title: 'Password updated!',
          text: '',
          icon: 'success',
          allowOutsideClick: false
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.router.navigate(['/login'])
          }
        })
      }
    },err => {
      console.log(err);
    })
  }

}
