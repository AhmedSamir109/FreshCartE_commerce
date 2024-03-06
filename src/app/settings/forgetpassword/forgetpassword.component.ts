import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenService } from 'src/app/authen.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent {

  isloading:boolean = false ;

  forgotResponse : boolean = true ;
  resetCodeResponce :boolean=true;

  forgotApiMessage :string =''
  resetCodeApiMessage:string = ''
  resetPasswordApiMessage:string=''

  userEmail:string='';

  constructor(private _AuthenService:AuthenService , private _Router:Router){}

  forgotPassForm = new FormGroup({
    email : new FormControl('' , [Validators.required , Validators.email])
  });

  resetCodeForm = new FormGroup({
    resetCode : new FormControl('' , [Validators.required , Validators.minLength(6)])
  });


  resetPasswordForm = new FormGroup({
    email : new FormControl(this.userEmail , [Validators.required]),
    newPassword : new FormControl(null , [Validators.required , Validators.pattern(/^[A-z][a-zA-Z0-9 ]{5,16}$/)])
  });



  forgotPassword(form:any){

   form.markAllAsTouched();

    if(form.valid){

      this.isloading =true ;


      this._AuthenService.forgotPassword(form.value).subscribe({
        next:(response)=>{
          console.log(response)

          this.forgotApiMessage = response.statusMsg;

          //for loading on btn
          this.isloading=false;

          //need it for add new pass form
          this.userEmail=form.value.email;
          console.log(this.userEmail)

          //to display forgot or reset code form
          this.forgotResponse = false ;

        },
        error:(error)=>{ 
          console.log(error)
          this.isloading=false;

          this.forgotApiMessage = error.error.message;
        }
      });

    };

  };


  resetCode(form:any){

    form.markAllAsTouched()
    console.log(form)

    if(form.valid){

      this.isloading=true ;

    
      this._AuthenService.resetCode(form.value).subscribe({
        next:(response) =>{
          console.log(response);
          this.resetCodeResponce = false ;

          this.isloading=false ;
        },
        error:(error) => {

          console.log(error)
          this.resetCodeApiMessage=error.error.message;

          this.isloading=false ;

        }
      })
      ;
    };
   

  };



  resetPassword(form:any){
   form.markAllAsTouched();
   
    if(form.valid){

      this.isloading=true ;

      this._AuthenService.resetPassword(form.value).subscribe({
        next:(responce) => {
          console.log(responce);
          this._Router.navigate(['/login'])
          this.isloading=false ;
        },
        error:(error) => {
          console.log(error);
          this.isloading=false ;
          this.resetPasswordApiMessage = 'There is no user registered with this email address'
        }
      })
    }
   
  }
}
