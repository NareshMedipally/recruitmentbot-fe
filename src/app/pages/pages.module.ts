import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UpdateUserComponent } from './forms/user/update-user/update-user.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { CKEditorModule } from 'ng2-ckeditor';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    NgSelectModule,
    NgxPaginationModule,
    CKEditorModule,
    BsDatepickerModule,
  ],
  exports: [
    BsDatepickerModule
  ],
  entryComponents: [
    UpdateUserComponent,
  ],
  providers: [
    NgxPaginationModule,
    CKEditorModule
  ],
  declarations: [
    PagesComponent,

  ],
})
export class PagesModule {
}
