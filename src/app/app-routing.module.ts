import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { BrandsComponent } from './brands/brands.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { pathGuard } from './path.guard';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { BrandDetailsComponent } from './brand-details/brand-details.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { WishListComponent } from './wish-list/wish-list.component';

const routes: Routes = [
  {path:'' , redirectTo:'home' , pathMatch:'full'},
  {path:'login' , component:LoginComponent , title:'Login'},
  {path:'register' , component:RegisterComponent , title:'Sign UP' },
  {path:'home' , component:HomeComponent , canActivate:[pathGuard] ,title:'Home'},
  {path:'product-details/:productID/:pName' , component:ProductDetailsComponent , canActivate:[pathGuard] , title:'Product-Details'},
  {path:'cart' , component:CartComponent , canActivate:[pathGuard] , title:'Shopping Cart'},
  {path:'checkOut' , component:CheckOutComponent , canActivate:[pathGuard] , title:'Check OUT'},
  {path:'brands' , component:BrandsComponent , canActivate:[pathGuard] , title:'Brands'},
  {path:'brand-details/:brandID/:brandName ' , component:BrandDetailsComponent , canActivate:[pathGuard] , title:'Brand Details'},
  {path:'categories' , component:CategoriesComponent , canActivate:[pathGuard] , title:'Categories'},
  {path:'category-details/:categoryID/:cName' , component:CategoryDetailsComponent , canActivate:[pathGuard] , title:'Category-Details'},
  {path:'wishList' , component:WishListComponent , canActivate:[pathGuard] , title:'Wish List'},
  
  {path:'settings' ,

   loadChildren:()=>import('./settings/settings.module').then( m => m.SettingsModule)  

  },

  {path:'**' , component:NotfoundComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
