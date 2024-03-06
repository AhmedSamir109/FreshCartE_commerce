import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  constructor(private _HttpClient:HttpClient) { }


  addToWishList(productID : any , myToken:any):Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/wishlist', { productId: productID }, { headers: { token: myToken } });
  }

  getLoggedUSerWishList(myToken:any):Observable<any>{
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/wishlist' , {headers:{token : myToken}})

  }

  deleteProductFromWishList(productID:any , myToken:any):Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productID}` , {headers:{token:myToken}})
  }

}
