import { Component } from '@angular/core';
import { AuthenService } from '../authen.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  isLogin : boolean = false;
  constructor(private _AuthenService:AuthenService){}

  // ngOnInit(): void {
  //   this.isLogin = this._AuthenService.isLogin.value ;
    
  // }

  ngOnInit(): void {
    this._AuthenService.isLogin.subscribe({
      next: (value)=>{ this.isLogin = value}
    })
  }
}

