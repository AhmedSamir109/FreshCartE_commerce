import { Component } from '@angular/core';
import { CategoriesService } from '../categories.service';
import { category  } from '../interface/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {

  categories :category[]=[]

  getCategoriesSubscription = new Subscription();

  constructor(private _CategoriesService:CategoriesService){}

  ngOnInit(): void {
    this._CategoriesService.getCategories().subscribe({
      next : (response) =>{
        this.categories = response.data ;
        console.log(response)
      }
    })
  }



  ngOnDestroy(): void {
    this.getCategoriesSubscription.unsubscribe();
  }
}
