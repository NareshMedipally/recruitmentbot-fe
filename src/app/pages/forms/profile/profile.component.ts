import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'app/services.service';

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  Role_id:any;

  constructor(private globals: ServicesService) {
    this.Role_id = this.globals.UserRoleid;
  }

  ngOnInit(): void {
  }

}
