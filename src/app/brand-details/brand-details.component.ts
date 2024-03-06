import { Data } from './../interface/shopping-cart';
import { Brand } from './../interface/product';
import { Component } from '@angular/core';
import { BrandsService } from '../brands.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-brand-details',
  templateUrl: './brand-details.component.html',
  styleUrls: ['./brand-details.component.css']
})
export class BrandDetailsComponent {
  brandContainer :any ;

  //for loader
  apiResponse : boolean = false;

  constructor(private _BrandsService:BrandsService , private _ActivatedRoute:ActivatedRoute){};

  ngOnInit(): void {
   let id = this._ActivatedRoute.snapshot.params['brandID']

   this._BrandsService.getBrand(id).subscribe({
    next:(response)=>{ this.brandContainer = response.data
      this.apiResponse = true ;
    },
    error:(error)=>{console.log(error)
      this.apiResponse = true ;
    }
   })
  };

}
