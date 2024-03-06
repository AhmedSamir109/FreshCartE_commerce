import { Subscription, timeout } from 'rxjs';
import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product, category } from '../interface/product';
import { ShoppingCartService } from '../shopping-cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../wish-list.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  productContainer : Product[] = [];
  categories : category[]=[];

  seachWord:string='';

  loggedUserToken :any ;


  wishListProductsId : string [] = []


  //to unsubscribe observable on Destroy component
  getProductSubscription = new Subscription();
  getCategorySubscription = new Subscription();
  addToCartSubscription  = new Subscription();


  constructor(private _ProductsService:ProductsService , private _ShoppingCartService:ShoppingCartService , private toastr: ToastrService ,
    private _WishListService:WishListService){
    
    }

  ngOnInit(): void {

    this.loggedUserToken=localStorage.getItem('token')

    this._ProductsService.getProduct().subscribe( 

      (response) => {
        this.productContainer = response.data
        console.log(this.productContainer)
      }
    );


    //_______________categories____________________
   
    this._ProductsService.getCategory().subscribe(
      (response) => {
        this.categories =response.data;
        console.log(this.categories)
      }
    );


    //wishList

    // to save wishListProductsIs value (product in wish list) after refrech  and( to save the change happend on heart icon on product card on home )
    this._WishListService.getLoggedUSerWishList(this.loggedUserToken).subscribe({
      next : (response)=>{
        console.log(response);

        // map take an array and return another array with some condition
        let data = response.data.map((item:any)=> item._id);

        this.wishListProductsId =data ;
      },
      error : ()=>{}
    })




  };


  addToCart(id:string){

    this._ShoppingCartService.addToCart(id , this.loggedUserToken ).subscribe({
      next:(response)=>{

        console.log(response);


        this.showSuccess(response.message);
        
        this._ShoppingCartService.cartItemsNumber.next(response.numOfCartItems);
        
        localStorage.setItem('cartItemsNumber' ,String(response.numOfCartItems))



      },

      error:(err)=>{console.log(err)}
    });

  };



  addToWishList(productID : any){
    let myToken = localStorage.getItem('token');
    console.log(productID)

     // heart?.classList.remove('text-danger');
        // heart?.classList.add('text-warning');
    

    this._WishListService.addToWishList(productID , myToken).subscribe({
      next:(response)=>{

       
        console.log(response);


        localStorage.setItem('wishListProductsId' , response.data)

        this.wishListProductsId = response.data;

        
        this.showSuccess('product Added successfully to Wish List')
      
      
      },
      error:(error)=>{
         console.log(error)
        
        }

    })


  }






  showSuccess(message:string ) {
    this.toastr.success(message);

  };




  ngOnDestroy(): void {
    this.getProductSubscription.unsubscribe();
    this.getCategorySubscription.unsubscribe();
    this.addToCartSubscription.unsubscribe();
  };

}
