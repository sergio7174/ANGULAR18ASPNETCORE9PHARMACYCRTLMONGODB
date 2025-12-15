import { Component } from '@angular/core';
import { UsertopmenuComponent } from '../../../layout/usertopmenu/usertopmenu.component';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { CommonModule } from '@angular/common';
import {  Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { LoginComponent } from "../../auth/login/login.component";
import { FrontPageComponent } from '../front-page/front-page.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
             
             LoadingComponent, 
             LoginComponent,
             UsertopmenuComponent,
             FrontPageComponent],
  providers: [ToastrService],          
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  title = 'farmacia-santa-rosita-app';
  hideSidebar: boolean = false;
  loading: boolean = true;
  isAuthenticated: boolean = false;
  
  constructor(
              private router: Router,
              private authService: AuthService,
              private toast: ToastrService) {
  
  }

  ngOnInit() {
    this.checkAuthentication();
  }

  checkAuthentication(): void {
    console.log('Verificando autenticación...');
    // Verificar el estado de autenticación
    if (this.authService.isAuthenticated()) {
      console.log('Usuario autenticado.');
      this.isAuthenticated = true;
      this.toast.success('Usuario autenticado', '¡Bienvenido de nuevo!');
      // Redirigir al dashboard si el usuario está autenticado
      this.router.navigate(['/home']);
    } else {
      console.log('Usuario no autenticado.');
      // Redirigir al login si el usuario no está autenticado
      this.router.navigate(['/login']);
    }
    // Ocultar la pantalla de carga después de la verificación
    this.loading = false;
  }
}
