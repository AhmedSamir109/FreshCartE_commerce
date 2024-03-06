import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { pathGuard } from '../path.guard';

const routes: Routes = [
  {path:'' ,redirectTo:'forgetpassword' , pathMatch:'full'},
  {path:'forgetpassword' , component :ForgetpasswordComponent , title:'Forget Password'},
  {path:'resetpassword' , component :ResetpasswordComponent , title:'Reset Password' , canActivate:[pathGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
