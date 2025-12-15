import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { TopbarComponent } from './layout/topbar/topbar.component';
import { ToastModule } from 'primeng/toast';
import { UsertopmenuComponent } from "./layout/usertopmenu/usertopmenu.component";
import { AdmintopmenuComponent } from './layout/admintopmenu/admintopmenu.component';
import { AuthService } from './core/services/auth/auth.service';
import { MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { FooterComponent } from './layout/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ToastModule,
    TopbarComponent,
    RouterOutlet,
    UsertopmenuComponent,
    FooterComponent,
    AdmintopmenuComponent,
],
  providers: [MessageService, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  UserName:string | null ='';
  IsAdmin:string | null = 'false';
  isAuthenticated: any = false;

private readonly authService = inject(AuthService);
private readonly toast =  inject(ToastrService);
private readonly router =  inject(Router);

  /*constructor(private router: Router,
  private authService: AuthService,
  private toast: ToastrService) {
  
  }*/

  ngOnInit() {

    this.authService.checkAuthenticationAdmin();
    this.isAuthenticated = this.authService.isAuthenticated();
    this.IsAdmin = sessionStorage.getItem('isAdmin');
    
  }

}

 

