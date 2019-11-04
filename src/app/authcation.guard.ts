import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthcationGuard implements CanActivate {
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  // constructor(private router : Router){}

  //   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  //       let url: string = state.url;  
  //       return this.verifyLogin(url);
  //   }

  //   verifyLogin(url) : boolean{
  //       if(!this.isLoggedIn()){
  //           this.router.navigate(['/login']);
  //           return false;
  //       }
  //       else if(this.isLoggedIn()){
  //           return true;
  //       }
  //   }
  //   public isLoggedIn(): boolean{
  //       let status = false;
  //       if( localStorage.getItem('isLoggedIn') == "true"){
  //         status = true;
  //       }
  //       else{
  //         status = false;
  //       }
  //       return status;
  //   }

    constructor(private auth: AuthService,
      private myRoute: Router){
    }
    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(this.auth.isLoggedIn()){
        return true;
      }else{
        this.myRoute.navigate(["login"]);
        return false;
      }
    }
}
