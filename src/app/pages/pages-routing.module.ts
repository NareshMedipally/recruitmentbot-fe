import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { CreateEnterpriseComponent } from './forms/enterprise/create-enterprise/create-enterprise.component';
import { EnterpriseComponent } from './forms/enterprise/enterprise.component';
import { CreateUserComponent } from './forms/user/create-user/create-user.component';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import { ManageUserComponent } from './forms/manage-user/manage-user.component';
import { UpdateUserComponent } from './forms/user/update-user/update-user.component';
import { ViewUserComponent } from './forms/user/view-user/view-user.component';
import { ProfileComponent } from './forms/profile/profile.component';
import { ResetPasswordComponent } from './forms/reset-password/reset-password.component';
import { TagsComponent } from './forms/settings/tags/tags.component';
import { CreateComponent } from './forms/settings/tags/create/create.component';
import { ViewEnterpriseComponent } from './forms/enterprise/view-enterprise/view-enterprise.component';
import { UpdateTagsComponent } from './forms/settings/tags/update-tags/update-tags.component';
import { UpdateEnterpriseComponent } from './forms/enterprise/update-enterprise/update-enterprise.component';
import { EmailAuthComponent } from './forms/email-auth/email-auth.component';
import { ReportsComponent } from './forms/reports/reports.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'iot-dashboard',
      component: ECommerceComponent,
    },
    {
      path: 'login',
      component: NbLoginComponent,
    },
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'enterprise-info',
      component: EnterpriseComponent,
    },
    {
      path: 'createEnterprise',
      component: CreateEnterpriseComponent,
    },
    {
      path: 'view-enterprise/:id',
      component: ViewEnterpriseComponent,
    },
    {
      path: 'update-enterprise/:id',
      component: UpdateEnterpriseComponent,
    },
    {
      path: 'create-user',
      component: CreateUserComponent,
    },
    {
      path: 'update-user/:id',
      component: UpdateUserComponent,
    },
    {
      path: 'view-user/:id',
      component: ViewUserComponent,
    },
    {
      path: 'manage-user',
      component: ManageUserComponent,
    },
    {
      path: 'profile',
      component: ProfileComponent,
    },
    {
      path: 'reports',
      component: ReportsComponent,
    },
    {
      path: 'email-auth/:status',
      component: EmailAuthComponent,
    },
    {
      path: 'tags',
      component: TagsComponent,
    },
    {
      path: 'tags-create',
      component: CreateComponent,
    },
    {
      path: 'update-tags/:id',
      component: UpdateTagsComponent,
    },
    {
      path: 'reset-pwd',
      component: ResetPasswordComponent,
    },
    {
      path: 'layout',
      loadChildren: () => import('./layout/layout.module')
        .then(m => m.LayoutModule),
    },
    {
      path: 'forms',
      loadChildren: () => import('./forms/forms.module')
        .then(m => m.FormsModule),
    },
    {
      path: 'ui-features',
      loadChildren: () => import('./ui-features/ui-features.module')
        .then(m => m.UiFeaturesModule),
    },
    {
      path: 'modal-overlays',
      loadChildren: () => import('./modal-overlays/modal-overlays.module')
        .then(m => m.ModalOverlaysModule),
    },
    {
      path: 'extra-components',
      loadChildren: () => import('./extra-components/extra-components.module')
        .then(m => m.ExtraComponentsModule),
    },
    {
      path: 'maps',
      loadChildren: () => import('./maps/maps.module')
        .then(m => m.MapsModule),
    },
    {
      path: 'charts',
      loadChildren: () => import('./charts/charts.module')
        .then(m => m.ChartsModule),
    },
    {
      path: 'editors',
      loadChildren: () => import('./editors/editors.module')
        .then(m => m.EditorsModule),
    },
    {
      path: 'tables',
      loadChildren: () => import('./tables/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
