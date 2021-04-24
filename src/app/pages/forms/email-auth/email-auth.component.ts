import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/auth.service';

@Component({
  selector: 'ngx-email-auth',
  templateUrl: './email-auth.component.html',
  styleUrls: ['./email-auth.component.scss']
})
export class EmailAuthComponent implements OnInit {
  emailAuth:any 
  userData;

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('currentData'));

    console.log("fdfd",this.activatedRoute.snapshot.params);
    let email = this.activatedRoute.snapshot.params.email;
    let checkAuth = this.activatedRoute.snapshot.params.status;
    if(email != "email" && checkAuth == 'true'){
      let data = {
        "user_id": this.userData.email_id,
        "mail_id": [email]
      }
      console.log(data);
      this.authService.EmailAuth(data).subscribe( res => {
        console.log(res);
      });
    }
    if(checkAuth == 'true'){  
   
      this.emailAuth = true
    }else{
      this.emailAuth = false
    }

  }

}
