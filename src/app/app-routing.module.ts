import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { UserlistingComponent } from './userlisting/userlisting.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {component:LoginComponent,path:'login'},
  {component:RegisterComponent,path:'register'},
  {component:HomeComponent,path:'',canActivate:[AuthGuard]},
  {component:UserlistingComponent,path:'user',canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
