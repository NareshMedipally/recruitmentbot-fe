import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-email-auth',
  templateUrl: './email-auth.component.html',
  styleUrls: ['./email-auth.component.scss']
})
export class EmailAuthComponent implements OnInit {
emailAuth:any 
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    console.log("fdfd",this.activatedRoute.snapshot.params);
    let checkAuth = this.activatedRoute.snapshot.params.status;
    if(checkAuth == 'true'){  
   
      this.emailAuth = true
    }else{
      this.emailAuth = false
    }

  }

}
