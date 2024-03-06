import { Component } from '@angular/core';
import { BrandsService } from '../brands.service';
import { BrandDetails, Brands } from '../interface/brands';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent {

brandsContainer :Brands[] = [];

image :string = '' ;
name :string = '';

apiResponse :boolean = false ;

  constructor(private _BrandsService:BrandsService){}

  ngOnInit(): void {
    this._BrandsService.getAllBrans().subscribe({
      next:(response)=>{
        this.brandsContainer = response.data ; 
      },
      error:(error)=>{
        console.log(error)
      }
    })

    this.displayBrandDetails
  };


  displayBrandDetails(id:any){
   
    this._BrandsService.getBrand(id).subscribe({
      next:(response)=>{
          console.log('response' , response.data);
            
          this.apiResponse = true ;

          this.image=response.data.image;
          this.name=response.data.name;
      },
      error:(error)=>{
        console.log(error);
        this.apiResponse = true ;

      }
    })

    // to empty the variable after display any brand (because we don't refresh the page (which make variable empty auto))
    this.image='';
    this.name=''

  };

}
