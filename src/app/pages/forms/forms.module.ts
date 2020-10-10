import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule, NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { FormsRoutingModule } from './forms-routing.module';
import { FormsComponent } from './forms.component';
import { FormInputsComponent } from './form-inputs/form-inputs.component';
import { FormLayoutsComponent } from './form-layouts/form-layouts.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { FormsModule as ngFormsModule } from '@angular/forms';
import { EnterpriseComponent } from './enterprise/enterprise.component';
import { CreateEnterpriseComponent } from './enterprise/create-enterprise/create-enterprise.component';
import { UpdateEnterpriseComponent } from './enterprise/update-enterprise/update-enterprise.component';
import { TablesRoutingModule } from '../tables/tables-routing.module';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ProfileComponent } from './profile/profile.component';
import { ReportsComponent } from './reports/reports.component';
import { ViewUserComponent } from './user/view-user/view-user.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { CKEditorModule } from 'ng2-ckeditor';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { TagsComponent } from './settings/tags/tags.component';
import { CreateComponent } from './settings/tags/create/create.component';
import { ViewEnterpriseComponent } from './enterprise/view-enterprise/view-enterprise.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { UpdateTagsComponent } from './settings/tags/update-tags/update-tags.component';

@NgModule({
  imports: [
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    FormsRoutingModule,
    NbSelectModule,
    NbIconModule,
    ngFormsModule,
    NgSelectModule,
    NgxPaginationModule,
    TablesRoutingModule,
    CKEditorModule,
    BsDatepickerModule
  ],
  declarations: [
    FormsComponent,
    ButtonsComponent,
    FormInputsComponent,
    FormLayoutsComponent,
    DatepickerComponent,
    EnterpriseComponent,
    CreateEnterpriseComponent,
    UpdateEnterpriseComponent,
    CreateUserComponent,
    UpdateUserComponent,
    ManageUserComponent,
    ProfileComponent,
    ReportsComponent,
    ViewUserComponent,
    ResetPasswordComponent,
    TagsComponent,
    CreateComponent,
    ViewEnterpriseComponent,
    UpdateTagsComponent,
  ],
  providers: [
    NgxPaginationModule,
  ],
})
export class FormsModule { }
