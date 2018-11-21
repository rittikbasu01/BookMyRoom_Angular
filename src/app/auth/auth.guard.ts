import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfirmserviceService } from "src/app/shared/confirmservice.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  url:string;
  constructor(public auth:ConfirmserviceService,public route:Router){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
      if(this.auth.access)
        {         
          return true;        
        }
   else
   { 
    this.route.navigate(['/BookMyRoom']);
    
   }
  }
  }

