import { AuthenService } from './authen.service';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const pathGuard: CanActivateFn = (route, state) => {
  
 let _Authen = inject(AuthenService) ;
 let _Router = inject(Router)

 if(_Authen.isLogin.value){
   return true;
 }else

 _Router.navigate(['/login'])

  return false;


};
