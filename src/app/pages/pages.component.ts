import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'app/services.service';

import { MENU_ITEMS } from './pages-menu';
import { MENU_ITEMS_ADMIN } from './pages-menu-admin';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  menu:any;
  role: any;

  constructor(private services:ServicesService) {
    console.log(this.services.UserRoleid)
  }

  ngOnInit(): void {
    if(this.services.UserRoleid == 1){
      this.menu = MENU_ITEMS;
    }else{
      this.menu = MENU_ITEMS_ADMIN;
    }
  }
}
