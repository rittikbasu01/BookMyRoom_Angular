import { AuthGuard } from 'src/app/auth/auth.guard';
import { AdminComponent } from 'src/app/admin/admin.component';
import { ShowfavlistComponent } from './showfavlist/showfavlist.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { ConfirmbookingComponent } from "src/app/confirmbooking/confirmbooking.component";
import { SearchComponent } from "src/app/search/search.component";
import { PagenotfoundComponent } from "src/app/pagenotfound/pagenotfound.component";
import { DashboardCompComponent } from "src/app/dashboard-comp/dashboard-comp.component";
import { LoginCompComponent } from './login-comp/login-comp.component';
import { HomeCompComponent } from './home-comp/home-comp.component';
import { PreviousbookingsComponent } from "src/app/previousbookings/previousbookings.component";
import { UserProfileComponent } from "src/app/user-profile/user-profile.component";
import { ForgotPasswordComponent } from "src/app/forgot-password/forgot-password.component";
import { VerifyOTPComponent } from "src/app/verify-otp/verify-otp.component";
import { ReviewComponent } from "src/app/review/review.component";
import { PaymentPageComponent } from './payment-page/payment-page.component';
const routes: Routes = [
   { path: '', redirectTo: '/BookMyRoom', pathMatch: 'full' },
  {path:'BookMyRoom',component:DashboardCompComponent},
  {path:'Search',component:SearchComponent,canActivate:[AuthGuard]},
   {path:'confirmbooking',component:ConfirmbookingComponent,canActivate:[AuthGuard]},
   {path:'Home',component:HomeCompComponent,canActivate:[AuthGuard]},
   {path:'ForgotPassword',component:ForgotPasswordComponent,canActivate:[AuthGuard]},
   {path:'VerifyOTP',component:VerifyOTPComponent,canActivate:[AuthGuard]},
   {path:'admin',component:AdminComponent,canActivate:[AuthGuard]},
   {path:'review',component:ReviewComponent,canActivate:[AuthGuard]},
   {path:'favlist',component:ShowfavlistComponent,canActivate:[AuthGuard]},
   {path:'previous', component:PreviousbookingsComponent,canActivate:[AuthGuard]},
   {path:'userProfile',component:UserProfileComponent,canActivate:[AuthGuard]}, 
   {path:'Payment',component:PaymentPageComponent,canActivate:[AuthGuard]},
   {path:'**',component:PagenotfoundComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

