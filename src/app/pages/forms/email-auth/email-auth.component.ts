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
  verify_emails = [];

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('currentData'));
    
    this.authService.getEmailAuth(this.userData.email_id).subscribe( e_res => {
      console.log(e_res);
      let verifyAuth = e_res.body.fields[0];
      verifyAuth.mail_id = JSON.parse(verifyAuth.mail_id);
      this.verify_emails = verifyAuth.mail_id;
      console.log(this.verify_emails);
    })

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
        console.log(res.body.mail_id);
        this.verify_emails = JSON.parse(res.body.mail_id);
      });
    }

  }

}
