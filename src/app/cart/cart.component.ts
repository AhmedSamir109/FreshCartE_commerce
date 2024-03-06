import { Component } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { ProductItem } from '../interface/shopping-cart';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  cartProducts : ProductItem[] = [];

  // for cart loading
  // isCartLoading :any ;
  apiResponse :boolean = false ;


  totalCartPrice :number = 0 ;


 


  // to unsubscribe observable
  getLoggedUserCartSubscribtion = new Subscription()
  




  constructor(private _ShoppingCartService:ShoppingCartService , private toastr: ToastrService , private _Router:Router ){}

 ngOnInit(): void {

  let loggedUserToken = localStorage.getItem("token");

  
 
  this._ShoppingCartService.getLoggedUserCart(loggedUserToken).subscribe({
    next:(response) =>{console.log(response);
    
      this.cartProducts=response.data.products;
      this.totalCartPrice = response.data.totalCartPrice;


      //cart loading
        // this.isCartLoading = response.data.cartOwner;
        this.apiResponse = true ;

      this._ShoppingCartService.cartItemsNumber.next(response.numOfCartItems)

      localStorage.setItem('cartItemsNumber' ,String(response.numOfCartItems))

      localStorage.setItem('cartID' ,response.data._id)

    

      console.log(this.totalCartPrice)

    },
    error:(error) =>{
      console.log(error)

            //cart loading
      this.apiResponse = true ;
    },
  })
 }




 updateCartProductIncrease(productID :any , productCount :number){


  let myToken = localStorage.getItem('token')

  this._ShoppingCartService.updateCartProduct(productID , productCount , myToken).subscribe({
    next: (response) =>{ 

     this.cartProducts = response.data.products;
     this.totalCartPrice = response.data.totalCartPrice ;

     localStorage.setItem('cartItemsNumber' , response.numOfCartItems)


     this._ShoppingCartService.cartItemsNumber.next(response.numOfCartItems)
     localStorage.setItem('cartItemsNumber' ,String(response.numOfCartItems))



    
    }
  })
 }



 updateCartProductDecrease(productID :any , productCount :number){
  
  if (productCount === 1){
    productCount = 1;

  }else{
    productCount --;

  }

  let myToken = localStorage.getItem('token')

  this._ShoppingCartService.updateCartProduct(productID , productCount , myToken).subscribe({
    next: (response) =>{ 

     this.cartProducts = response.data.products;
     this.totalCartPrice = response.data.totalCartPrice ;

    //  localStorage.setItem('cartItemsNumber' , response.numOfCartItems)

     this._ShoppingCartService.cartItemsNumber.next(response.numOfCartItems)
     localStorage.setItem('cartItemsNumber' ,String(response.numOfCartItems))

    
    }
  })
 }



 
 deletProduct(pID : any ){
  let myToken = localStorage.getItem('token')

  this._ShoppingCartService.deleteProduct(pID , myToken).subscribe({
    next:(response)=>{ 
      this.cartProducts = response.data.products;
      this.totalCartPrice = response.data.totalCartPrice;

      localStorage.setItem('cartItemsNumber' , response.numOfCartItems)
      
      this._ShoppingCartService.cartItemsNumber.next(response.numOfCartItems)
      localStorage.setItem('cartItemsNumber' ,String(response.numOfCartItems))


      this.showSuccess('The product has been deleted' )
    }
  })
 }



 clearCart(){
  let myToken = localStorage.getItem('token');
  this._ShoppingCartService.clearCart(myToken).subscribe({
    next:(response)=>{
      this.cartProducts=[];

      this.showSuccess("Your shopping cart has been emptied");
      
      localStorage.setItem('cartItemsNumber' , "0")  ;

      let cartItemsNum= Number(localStorage.getItem('cartItemsNumber'));

      this._ShoppingCartService.cartItemsNumber.next(cartItemsNum);

      this._Router.navigate(['/home'])

    }
  })
 }




 ngOnDestroy(): void {
  
  this.getLoggedUserCartSubscribtion.unsubscribe();
 }




 showSuccess(message:string ) {
  this.toastr.error(message);
}



 
}
