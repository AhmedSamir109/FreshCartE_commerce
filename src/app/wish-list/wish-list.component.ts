import { Component } from '@angular/core';
import { WishListService } from '../wish-list.service';
import { WishList } from '../interface/wish-list';
import { ShoppingCartService } from '../shopping-cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent {

  wishListContainer :WishList[] =[]

  apiResponse : boolean = false ;

  constructor(private _WishListService:WishListService , private _ShoppingCartService:ShoppingCartService , private toastr: ToastrService){};

  ngOnInit(): void {
    let myToken = localStorage.getItem('token');

    this._WishListService.getLoggedUSerWishList(myToken).subscribe({
      next:(response) => {
        console.log(response)
        // for loader
          this.apiResponse= true ;

        this.wishListContainer =response.data ;
        console.log(this.wishListContainer)

        console.log(response.data._id)
      },
      error:(error) =>{
        console.log(error)
         
        //for loader
        this.apiResponse = true ;

      }
    })
  };


  addToCart(id:any){

    let myToken = localStorage.getItem('token')

    this._ShoppingCartService.addToCart(id , myToken).subscribe({
      next:(response) => {
        //for loader
        this.apiResponse= true ;

        console.log(response);
        this.showSuccess("Product Added Successfully to your Cart");

        this._ShoppingCartService.cartItemsNumber.next(response.numOfCartItems);
        
        localStorage.setItem('cartItemsNumber' ,String(response.numOfCartItems))


        // to delete product from wish list after add to cart
        this._WishListService.deleteProductFromWishList(id , myToken).subscribe({
          next:(responce) => {
            this.apiResponse = true;
    
            console.log(responce)
            this.ngOnInit()
          }
        });

        this.ngOnInit();
      },
      error:(error) =>{ 
        this.apiResponse= true ;

        console.log(error);
      }
    })
  }


  deleteProductFromWishList(productID:any){
    let myToken = localStorage.getItem('token');

    this._WishListService.deleteProductFromWishList(productID , myToken).subscribe({
      next:(responce) => {
        this.apiResponse = true;

        console.log(responce)
        this.ngOnInit()
        this.showError(responce.message);
      },
      error:(error) =>{
        this.apiResponse = true ;
        console.log(error)
      }
    })

  }
  
  showSuccess(message:string ) {
    this.toastr.success(message);
  };


  showError(message:string ) {
    this.toastr.error(message);
  };

}
