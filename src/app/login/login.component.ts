import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenService } from '../authen.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  apiResponse :string = '';
  isLoading :boolean = false ;
  
  isDisabled :boolean = true;

  constructor( private _AuthenService:AuthenService , private _Router :Router ){}

  loginForm = new FormGroup({
    email : new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null , [Validators.required ])
  });




  logIn(formData:any){

    formData.markAllAsTouched();

    console.log(this.loginForm)
    
    if (formData.valid){ 

      this.isLoading = true ;

        this._AuthenService.logIN(formData.value).subscribe({
            next: (response) =>{ 
              this.apiResponse = response.message;
              this.isLoading =false;



            if(this.apiResponse = 'success'){
              
              // it must be true to (enableNavBar / and the guard be true to move to homeComp)
              this._AuthenService.isLogin.next(true);
              this._Router.navigate(['/home']);
            
             

              localStorage.setItem('token' , response.token)

              // this._AuthenService.name.next(response.user.name)
              // console.log(this._AuthenService.name.next(response.user.name))

              let decodedToken : any = jwtDecode(response.token) ; 
              console.log(decodedToken)

              this._AuthenService.userName.next(decodedToken.name) ;
            }
            
            } ,
            error : (err) => {
              this.apiResponse = err.error.message;
              this.isLoading =false;
           }
          })}


  }
}
