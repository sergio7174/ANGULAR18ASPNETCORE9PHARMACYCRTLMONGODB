import { Component, OnInit, inject, Inject } from '@angular/core';
import { NgClass, DOCUMENT } from '@angular/common';
import {  NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapListColumns } from '@ng-icons/bootstrap-icons';
import { bootstrapCalculator} from '@ng-icons/bootstrap-icons';
import { bootstrapLayoutTextWindowReverse} from '@ng-icons/bootstrap-icons';

import {bootstrapArrowDownLeftSquare} from '@ng-icons/bootstrap-icons';
import { AuthService } from '../../core/services/auth/auth.service';



@Component({
  selector: 'app-usertopmenu',
  standalone: true,
  imports: [
            NgClass, 
            RouterLink,
            RouterLinkActive, 
            NgIcon],
  providers: [provideIcons({ bootstrapListColumns,
                             bootstrapCalculator,
                             bootstrapLayoutTextWindowReverse,
                             bootstrapArrowDownLeftSquare})],
  templateUrl: './usertopmenu.component.html',
  styleUrl: './usertopmenu.component.css'
})
export class UsertopmenuComponent implements OnInit{

  // vars to handle auth state to admin user or user
  IsAdmin:string | null = 'false';
  isAuthenticated: any = false;

  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

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
