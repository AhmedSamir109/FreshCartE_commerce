import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, loginData } from './interface/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthenService {

  // used to deal with navBar / footer / pathGuard 
  isLogin = new BehaviorSubject(false) ;
  // name = new BehaviorSubject('');

  userName = new BehaviorSubject('');

  

  

  constructor(private _HttpClient:HttpClient , private _Router:Router) { 

    if(localStorage.getItem('token') !== null){


      let token :any = localStorage.getItem('token');
      console.log(token);

      let decodedToken:any = jwtDecode(token)

      this.userName.next(decodedToken.name)



      // to still inside website (because gard need to be true to stay active (to not move to login page))
      this.isLogin.next(true);
      // _Router.navigate(['/home']);

    }else{
      this.isLogin.next(false);
    }

  };


  signUp(user:User):Observable<any>{

   return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup' ,user)

  };



  logIN(user: loginData):Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin' , user)
  };


logOut(){
  this.isLogin.next(false);
  localStorage.removeItem('token');
  // this.userName.next('');
  this._Router.navigate(['/login']);
};


forgotPassword(userEmail :string):Observable<any>{

  return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords' , userEmail)

};

resetCode(code:any):Observable<any>{
  return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode' , code)
};


resetPassword(newPassword : any):Observable<any>{
  return this._HttpClient.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword' , newPassword )
};



updataPassword(newPassword:any , myToken :any):Observable<any>{
  return this._HttpClient.put('https://ecommerce.routemisr.com/api/v1/users/changeMyPassword' , newPassword , {headers:{token:myToken}})

};


}


