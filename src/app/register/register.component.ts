import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenService } from '../authen.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  apiResponce :string='';
  isLoading :boolean = false;

  constructor(private _AuthenService:AuthenService , private _Router:Router){};

  registerationForm = new FormGroup({
    name :new FormControl(null , [Validators.required , Validators.minLength(3) ,Validators.maxLength(16) ]),
    email :new FormControl(null , [Validators.required , Validators.email]  ),
    password :new FormControl(null , [ Validators.required , Validators.pattern(/^[A-z][a-zA-Z0-9 ]{5,16}$/)]),
    rePassword :new FormControl(null , [ Validators.required , Validators.pattern(/^[A-z][a-zA-Z0-9 ]{5,16}$/)]),
    phone :new FormControl(null , [Validators.required , Validators.pattern(/[010|011|012|015][0-9]{8}$/)])
  });


  signUp(formData:any){

    formData.markAllAsTouched()

    if(formData.valid && formData.get('password').value === formData.get('rePassword').value){

      this.isLoading=true;


    this._AuthenService.signUp(formData.value).subscribe({

      next:(response) => { this.apiResponce= response.message ;
        this.isLoading =false ;

        if (this.apiResponce = 'sucsses'){
          this._Router.navigate(['/login']);
        };
      },

      error:(err) => { this.apiResponce = err.error.message;
        this.isLoading =false ;

      }
    });
    

  };

  
 
};

}
