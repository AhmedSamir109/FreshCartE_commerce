import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShippingAddress } from './interface/shipping-address';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  cartItemsNumber = new BehaviorSubject(0);



  



  constructor(private _HttpClient:HttpClient) { 

    let num =Number(localStorage.getItem('cartItemsNumber'))

 this.cartItemsNumber.next(num)
  }

  addToCart(id:any , userToken:any):Observable<any>{
    return this._HttpClient.post("https://ecommerce.routemisr.com/api/v1/cart", { productId: id }, {
      headers: { token: userToken }
    });
  }


 getLoggedUserCart(myToken:any):Observable<any>{
  return this._HttpClient.get("https://ecommerce.routemisr.com/api/v1/cart" , {
    headers:{token:myToken}
  })
 }


//pCount == new count whether + / -
 updateCartProduct(pID:any , pCount:number , myToken:any ):Observable<any>{
 return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${pID}` , {count:pCount} , {
    headers : {token : myToken}
  })
 }


 deleteProduct(pID:any , myToken :any):Observable<any>{
  return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${pID}` , {headers : {token:myToken}})
 }


 clearCart(myToken:any):Observable<any>{
  return this._HttpClient.delete('https://ecommerce.routemisr.com/api/v1/cart' , {headers : { token : myToken}})
 }



 onlinePayment(cartID : any , address:ShippingAddress , myToken:any):Observable<any>{
  return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}?url=http://localhost:4200`, { shippingAddress: address },
     { headers: { token: myToken } }
   );
 }
}
