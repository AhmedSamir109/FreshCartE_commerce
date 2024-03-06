import { Component } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent {

  isLoading :boolean = false ;

  constructor(private _ShoppingCartService:ShoppingCartService){}

  checkOutForm = new FormGroup({
    details : new FormControl('' , [Validators.required , Validators.minLength(3)]),
    phone : new FormControl('' , [Validators.required , Validators.pattern(/[010|011|012|015][0-9]{8}$/)]),
    city : new FormControl('' , [Validators.required ]),
  })



  checkOut(form : any){
    form.markAllAsTouched()

    let myToken = localStorage.getItem('token')
    let cartID = localStorage.getItem('cartID')

console.log(form)
    if(form.valid){
      this.isLoading = true ;

      
      this._ShoppingCartService.onlinePayment(cartID , form.value , myToken).subscribe({
      next:(responce) => {

        this.isLoading = false ;


        console.log(responce)
        window.open(responce.session.url , '_self')
        

        //to update cart items num on navbar
        localStorage.setItem('cartItemsNumber' , '0');

        let num =Number(localStorage.getItem('cartItemsNumber'));
        this._ShoppingCartService.cartItemsNumber.next(num)

      },

      error: (error) => {
        
        console.log(error);
        this.isLoading = false ;

      }
    })
  
  }
  
}

}
