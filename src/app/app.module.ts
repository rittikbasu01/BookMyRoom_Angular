import { PaymentPageComponent } from './payment-page/payment-page.component';
import { DialogUserEdit } from './admin/manage-user/manage-user.component';
// import { DialogHotelEdit } from './admin/manage-hotel/manage-hotel.component';
import { ShowfavlistComponent } from './showfavlist/showfavlist.component';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{ FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//====================================================================================================
import { CardComponent } from './card/card.component';
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, MatTabsModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatDividerModule, MatDialogModule, MatStepperModule, MatExpansionModule, MatCheckboxModule, MatTooltipModule, MatTreeModule, MatToolbarModule, MatTableModule, MatSortModule, MatSnackBarModule, MatSidenavModule, MatSliderModule, MatRadioModule, MatProgressBarModule, MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule, MatButtonToggleModule, MatChipsModule, MatDatepickerModule, MatListModule, MatNativeDateModule, MatPaginatorModule, MatProgressSpinnerModule, MatRippleModule, MatSlideToggleModule } from '@angular/material';
import{LayoutModule} from '@angular/cdk/layout';
import { ConfirmbookingComponent } from './confirmbooking/confirmbooking.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
// ==================================================================================================
import { UserService} from './shared/user.service';
import { RouterModule } from '@angular/router';
import { DashboardCompComponent } from './dashboard-comp/dashboard-comp.component';
import { LoginCompComponent } from './login-comp/login-comp.component';
import { HomeCompComponent } from './home-comp/home-comp.component';
import { AuthGuard } from "src/app/auth/auth.guard";
//====================================================================================================
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from "angularx-social-login";
import { DatePipe } from "@angular/common";
import { ErrorHandler } from "@angular/core";
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { PreviousbookingsComponent } from './previousbookings/previousbookings.component';
import { ReactiveFormsModule } from "@angular/forms";
import { VerifyOTPComponent } from "src/app/verify-otp/verify-otp.component";
import { ForgotPasswordComponent } from "src/app/forgot-password/forgot-password.component";
import { AddingCityDialog, AddingHotelNameDialog, HotelComponent } from "src/app/admin/add-hotel/hotel.component";
import { AdminComponent } from "src/app/admin/admin.component";
import { ManageHotelComponent } from "src/app/admin/manage-hotel/manage-hotel.component";
import { ManageUserComponent } from "src/app/admin/manage-user/manage-user.component";
import { ManageBookingComponent } from "src/app/admin/manage-booking/manage-booking.component";
import { ReviewComponent } from "src/app/review/review.component";
import { UserProfileComponent } from "src/app/user-profile/user-profile.component";







//============================================SOCIAL LOGIN===========================================
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("313797022719176")
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("529148044156-47brg14026ctsukd50m7pno2uua31io2.apps.googleusercontent.com")
        },
      ]
  );
  return config;
}
//============================================SOCIAL LOGIN===========================================

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    CardComponent,
    ConfirmbookingComponent,
    PagenotfoundComponent,
    DashboardCompComponent,
    LoginCompComponent,
    HomeCompComponent,
   ShowfavlistComponent,
    PreviousbookingsComponent,
    VerifyOTPComponent,ForgotPasswordComponent,
    HotelComponent,
    AdminComponent,
    AddingCityDialog,
    AddingHotelNameDialog,DialogUserEdit,
    ManageHotelComponent,
   ManageUserComponent ,
   ManageBookingComponent,ReviewComponent,PaymentPageComponent,UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    Ng4LoadingSpinnerModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    SocialLoginModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    HttpClientModule,
    MatIconModule,
    FormsModule,
    MatStepperModule,
    ReactiveFormsModule, 
    HttpClientModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatInputModule,
    MatDividerModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    SocialLoginModule,
    MatTabsModule,
    MatGridListModule, 
    MatCardModule, 
    MatMenuModule, 
    MatIconModule, 
    MatButtonModule, 
    MatExpansionModule, 
    MatCheckboxModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,MatFormFieldModule,
    MatSelectModule,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    HttpClientModule,
    MatIconModule,
    FormsModule,
    MatStepperModule,
    MatFormFieldModule,BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    // -------------------------------------
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatInputModule,
    MatIconModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    MatStepperModule,
    MatInputModule,
    MatDividerModule,
    MatDialogModule
  ],
  providers: [UserService,  { provide: ErrorHandler, useClass: UserService }, DatePipe,AuthGuard,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent],
  entryComponents:[AddingCityDialog,AddingHotelNameDialog,DialogUserEdit]
})
export class AppModule { }

