import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/auth.service';
import { ServicesService } from 'app/services.service';
import swal from 'sweetalert2';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public role_id: number = 0;
  rememberMe: boolean;
  failedtoSignIn: boolean = false;
  btnSubmitStatus: boolean = true;

  loginInfo = {
    "email_id" : "",
    "password" : "",
  }

  constructor(private router:Router,private authService:AuthService,private globals:ServicesService) { }

  ngOnInit(): void {
    localStorage.clear();
  }

  LoginForm(form: NgForm) {
    this.globals.showLoading('');
    this.authService.login(this.loginInfo)
      .subscribe(resData => {
        console.log(resData);
        if(resData.body.status == 200) {
          let currentUser:any = resData.body;
          localStorage.setItem('currentData', JSON.stringify(currentUser));
          localStorage.setItem('token', currentUser.token);
          localStorage.setItem('roleId', currentUser.role_id);
          localStorage.setItem('correl_id', currentUser.correl_id);
          localStorage.setItem('company_Name', currentUser.company_Name);
          this.globals.UserRoleid = currentUser.role_id;
          console.log(this.globals.UserRoleid);
          if(currentUser.first_time_login == 'Y'){
            this.router.navigate(['/change-pwd']);
            this.globals.hideLoading('')
          }else {
            this.router.navigate(['/pages/manage-user']);
            this.globals.hideLoading('')
            console.log(this.btnSubmitStatus)
          }
          // this.globals.hideLoading('')
        }else if(resData.body.result_code == 300) {
          this.globals.hideLoading('')
          swal.fire(
            '',
            'Account is Expired!',
            'error'
          )
        }else if(resData.body.result_code == 400){
          /* Need to do something else */
          console.log(this.btnSubmitStatus);
          this.globals.hideLoading('')
          swal.fire(
            '',
            'Please check your credentials!',
            'error'
          )
          this.failedtoSignIn = true;
          this.btnSubmitStatus = true;
        }

      },
      (error) => {
        this.btnSubmitStatus = true;
        console.log('Error Block');
        swal.fire(
          '',
          'Something went wrong!',
          'error'
        )
        console.log(error);
        this.failedtoSignIn = true;
      }
      );
  }

}
