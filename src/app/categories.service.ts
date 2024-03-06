import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _HttpClient:HttpClient) { }

  getCategories():Observable<any>{
   return this._HttpClient.get('https://route-ecommerce.onrender.com/api/v1/categories')
  }



  getCategoryDetails(id:any):Observable<any>{
    return this._HttpClient.get(`https://route-ecommerce.onrender.com/api/v1/categories/${id}`);
  }


  getSubCategoriesOnCategory(id:any):Observable<any>{
   return this._HttpClient.get(`https://route-ecommerce.onrender.com/api/v1/categories/${id}/subcategories`)
  }
}
