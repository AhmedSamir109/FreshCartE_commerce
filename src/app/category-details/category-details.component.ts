import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../categories.service';
import { category, subCaregories } from '../interface/product';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent {

  categoryDetails :any ;

  subCaregories:subCaregories[]=[] ;

  //for loading 
  apiResponce :boolean = false ;


  constructor(private _CategoriesService:CategoriesService ,private _ActivatedRoute:ActivatedRoute){}


  ngOnInit(): void {

  let id = this._ActivatedRoute.snapshot.params['categoryID']

  console.log(this._ActivatedRoute.snapshot)

  this._CategoriesService.getCategoryDetails(id).subscribe({
    next:(response) => {
      
      this.categoryDetails = response.data ; },

    error:(error)=>{console.log(error)}
    
  });



  this._CategoriesService.getSubCategoriesOnCategory(id).subscribe({
        next:(response)=>{ this.subCaregories = response.data;
  
            console.log(this.subCaregories)

            //for loading
            this.apiResponce=true ;
        },
        error:(error)=>{
          console.log(error)
        
          //for loading
          this.apiResponce=true;
        }
      })



  };

  // getSubCategoriesOnCategory(){

  //   let id = this._ActivatedRoute.snapshot.params['categoryID'];

  //   this._CategoriesService.getSubCategoriesOnCategory(id).subscribe({
  //     next:(response)=>{ this.subCats = response.data

  //         console.log(this.subCats)
  //     },
  //     error:(error)=>{console.log(error)}
  //   })
  // }

}
