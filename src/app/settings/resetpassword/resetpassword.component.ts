import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenService } from 'src/app/authen.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent {

  isLoading = false ;

  apiResponseMessage :string =''

  constructor(private _AuthenService:AuthenService){}

  updatePasswordForm = new FormGroup({
    currentPassword :new FormControl('' , [Validators.required]),
    password :new FormControl('' , [Validators.required , Validators.pattern(/^[A-z][a-zA-Z0-9 ]{5,16}$/)]),
    rePassword :new FormControl('' , [Validators.required]),
  })


  updatePassword(form:any){

    form.markAllAsTouched();

    console.log(form)

    if(form.valid && form.get('password').value === form.get('rePassword').value){

      this.isLoading = true ;
      let myToken = localStorage.getItem('token');

    this._AuthenService.updataPassword(form.value , myToken).subscribe({
      next:(response) => {
        console.log(response)
        this.isLoading = false;
        this.apiResponseMessage = response.message;

        this._AuthenService.logOut();
      
      },
      error:(error) => {
        console.log(error)
        this.isLoading = false;
        this.apiResponseMessage=error.error.message;

      
      },
    })

    }
    
  }
}
