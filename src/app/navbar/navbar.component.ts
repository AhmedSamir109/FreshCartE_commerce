import { Component } from '@angular/core';
import { AuthenService } from '../authen.service';
import { ShoppingCartService } from '../shopping-cart.service';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  enableNavbar : any ;
  loggedUserName :any ;

  isScroll : boolean = false ;

  cartItemsNumber :any ;

  constructor(private _AuthenService :AuthenService , private _ShoppingCartService:ShoppingCartService){}

  

  ngOnInit(): void {

    

    window.addEventListener('scroll' , () => {
      if (window.scrollY > 150){
        this.isScroll =true ; 
      }else{
        this.isScroll=false ;
      }
    })

    this._AuthenService.isLogin.subscribe({
      next: (behaviorSubValue) =>{ this.enableNavbar = behaviorSubValue }
    })

    
    this._AuthenService.userName.subscribe({
      next: (value)=>{ this.loggedUserName = value.split(" ")} //Array
    })

    this._ShoppingCartService.cartItemsNumber.subscribe({
      next : (value) =>{this.cartItemsNumber = value }
    })


    let myToken = localStorage.getItem('token')
    
    this._ShoppingCartService.getLoggedUserCart(myToken).subscribe({

      next : (response)=>{
        this.cartItemsNumber = response.numOfCartItems;
      }

    })

  }



  logOut(){
    this._AuthenService.logOut()
  }


  
}
