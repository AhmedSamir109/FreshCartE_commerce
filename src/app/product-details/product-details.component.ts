import { Product } from './../interface/product';
import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { ProductDetails } from '../interface/product';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from '../shopping-cart.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {

  productDetails :any;

  productImages :string[] =[]

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: true,
    dots: false,
    // autoplay:true,
    navSpeed: 700,
    autoplayHoverPause: true,
    navText: ['', ''],
    nav: true,

    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    
  }
  
  getProductDetailsSubscription = new Subscription();

  constructor(private _ProductsService:ProductsService , private _ActivatedRoute :ActivatedRoute , private _ShoppingCartService :ShoppingCartService ,private toastr: ToastrService){}

  ngOnInit(): void {

    let id = this._ActivatedRoute.snapshot.params['productID'];
    console.log(this._ActivatedRoute)
    
    this._ProductsService.getProductDetails(id).subscribe(
      (response) => {

        this.productDetails = response.data;
        this.productImages = this.productDetails.images;

        
        console.log(this.productDetails.id)

      }
    );
    
  }


  addToCart(pID:any ){

    let myToken = localStorage.getItem('token');

    this._ShoppingCartService.addToCart(pID , myToken).subscribe({

      next:(response) =>{

        this.showSuccess()
        // localStorage.setItem('cartItemsNumber' , response.numOfCartItems)
        this._ShoppingCartService.cartItemsNumber.next(response.numOfCartItems)
      }

    })

  }


  showSuccess() {
    this.toastr.success('Product added successfully to your cart');
  }


  ngOnDestroy(): void {
    this.getProductDetailsSubscription.unsubscribe();
  }

}
