import { Product } from './../interface/product';
import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { ProductDetails } from '../interface/product';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from '../shopping-cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {

  productDetails :any;

  constructor(private _ProductsService:ProductsService , private _ActivatedRoute :ActivatedRoute , private _ShoppingCartService :ShoppingCartService ,private toastr: ToastrService){}

  ngOnInit(): void {

    let id = this._ActivatedRoute.snapshot.params['productID'];
    console.log(this._ActivatedRoute)
    
    this._ProductsService.getProductDetails(id).subscribe(
      (response) => {

        this.productDetails = response.data;
        
        console.log(this.productDetails.id)

      }
    );
    
  }


  addToCart(pID:any ){

    let myToken = localStorage.getItem('token');

    this._ShoppingCartService.addToCart(pID , myToken).subscribe({

      next:(response) =>{

        this.showSuccess()
        localStorage.setItem('cartItemsNumber' , response.numOfCartItems)
        this._ShoppingCartService.cartItemsNumber.next(response.numOfCartItems)
      }

    })

  }


  showSuccess() {
    this.toastr.success('Product added successfully to your cart');
  }

}
