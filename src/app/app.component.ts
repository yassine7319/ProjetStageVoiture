import { Component , ViewChild, HostListener, OnInit} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from './user/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ProjetStage';
  opened = true;
  @ViewChild('sidenav' , {static : true}) sidenav: MatSidenav;
  constructor(public authService: AuthService){
  }
  ngOnInit() {
 
    if (window.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55;
      this.opened = true;
    }
  
}

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55
      this.opened = true;
    }
  }

  isBiggerScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width < 768) {
      return true;
    } else {
      return false;
    }
  }

  Signout(){
    this.authService.SignOut();
  }

  estConnecte() : boolean{
    return this.authService.isLoggedIn;
  }
} 

