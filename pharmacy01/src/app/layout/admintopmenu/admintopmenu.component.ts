import { Component, inject, Inject, OnInit } from '@angular/core';
import { NgClass, DOCUMENT } from '@angular/common';
import {  NavigationEnd, Router, RouterLink} from '@angular/router';
import { filter } from 'rxjs/operators';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapColumnsGap } from '@ng-icons/bootstrap-icons';
import { bootstrapCalculator} from '@ng-icons/bootstrap-icons';
import { bootstrapClipboardPlusFill} from '@ng-icons/bootstrap-icons';
import {bootstrapDatabaseFillCheck} from '@ng-icons/bootstrap-icons';
import {bootstrapArrowDownLeftSquare} from '@ng-icons/bootstrap-icons';
import {bootstrapPersonFillGear} from '@ng-icons/bootstrap-icons';
import { AuthService } from '../../core/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admintopmenu',
  standalone: true,
  imports: [ NgClass, 
             RouterLink, 
             NgIcon],
providers: [provideIcons({ 
                     bootstrapColumnsGap,
                     bootstrapCalculator,
                     bootstrapClipboardPlusFill,
                     bootstrapArrowDownLeftSquare,
                     bootstrapDatabaseFillCheck,
                     bootstrapPersonFillGear}),
                     ],
                   
  templateUrl: './admintopmenu.component.html',
  styleUrl: './admintopmenu.component.css'
})
export class AdmintopmenuComponent implements OnInit{

  UserName:string | null ='';
  IsAdmin:string  | null='';
  isAuthenticated: boolean | void = false;


  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly toast =  inject(ToastrService);

  constructor(
    // @Inject only works in constructor -  not inject
    @Inject(DOCUMENT) private readonly document: Document,
  ) {

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.currentRoute = this.getActiveRoute(this.router.url);
        this.checkActiveLinks();
      
      });

      
    }

    ngOnInit() {

      this.authService.checkAuthenticationAdmin();
      this.isAuthenticated = this.authService.isAuthenticated();
      this.IsAdmin = sessionStorage.getItem('isAdmin');
      
    }

    checkAuthenticationAdmin() {
      alert('Verificando autenticación...AdmintopmenuComponent');
      // Verificar el estado de autenticación
      if (this.authService.isAuthenticated()) {
       
        this.isAuthenticated = true;
        /*** get this data from local store if user is authenticated */
        this.UserName = sessionStorage.getItem('name');
        this.IsAdmin = sessionStorage.getItem('isAdmin');

        alert('Estoy en admintopmenu - line 72 - isAdmin: '+this.IsAdmin)
        
        this.toast.success('User Authenticated Admin', '¡ Welcome Again !');
        // Redirigir a home si el usuario no es admin
        if (this.IsAdmin=='false'){
           this.router.navigate(['/home']);
          
          
          
          } else {

        this.toast.success('User Authenticated and Admin');
        // Redirigir al login si el usuario no está autenticado
        this.router.navigate(['/homeAdmin']);


          } // End ofthis.IsAdmin=='false' 



      } else {
        //console.log('User not Authenticated.');
        this.toast.error('User Not Authenticated');
        // Redirigir al login si el usuario no está autenticado
        this.router.navigate(['/home']);
      }
      // Ocultar la pantalla de carga después de la verificación
      //this.loading = false;
    }
  
    currentRoute: string = '';

    getActiveRoute(url: string): string {
      const parts = url.split('/');
      return parts[parts.length - 1];
    }
  
    isLinkActive(route: string): boolean {
      return this.currentRoute === route;
    }
  
    loadProducts(): void {
      this.router.navigate(['/inventory']);
    }
  
    loadUsers() {
      this.router.navigate(['/users']);
    }
    loadProfile(){
      this.router.navigate(['/profile']); // Navegar al componente de perfil
    }
  
    checkActiveLinks(): void {
      const links = this.document.querySelectorAll('.nav_link');
  
      if (links && typeof links.forEach === 'function') {
        links.forEach(link => {
          const route = link.getAttribute('data-route');
          if (route && this.isLinkActive(route)) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    }
    

}

