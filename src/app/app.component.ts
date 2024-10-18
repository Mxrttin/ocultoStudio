import { Component } from '@angular/core';
import { ServicedbService } from './services/servicedb.service';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  constructor(private router: Router,  private db: ServicedbService, public authService: AuthService) {}

  logout(){
    this.authService.logout();
    this.router.navigate(['/home'])

  }



}
