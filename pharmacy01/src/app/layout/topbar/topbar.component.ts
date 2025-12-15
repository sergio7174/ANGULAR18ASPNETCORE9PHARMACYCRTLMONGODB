import { Component, inject, computed } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterLink, Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapTwitter, 
         bootstrapFacebook, 
         bootstrapInstagram,
         bootstrapLinkedin,
         bootstrapEnvelope,
         bootstrapPhoneVibrateFill,
   } from '@ng-icons/bootstrap-icons';

import { AuthService } from '../../core/services/auth/auth.service';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule,
            RouterLink, 
            NgIcon,
            ButtonModule,
            NgIcon,
            DecimalPipe,],
providers: [provideIcons({ bootstrapTwitter, 
                           bootstrapFacebook, 
                           bootstrapInstagram,
                           bootstrapLinkedin,
                           bootstrapEnvelope,
                           bootstrapPhoneVibrateFill }),ToastrService],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {

// I need the router lib to navigate to login in logout function
private readonly router = inject(Router);
private readonly authService = inject(AuthService);
private readonly cartService = inject(CartService);

total = computed(() => this.cartService.cart().total);
count = computed(() => this.cartService.cart().count);

 UserName = sessionStorage.getItem('name');
 IsAdmin = sessionStorage.getItem('isAdmin');

login(){ this.router.navigate(['login']);}
  

  logout(){
  sessionStorage.clear();  
  this.authService.logout();  
  window.location.reload();
  }

  onGoCart(){this.router.navigate(['/bill']);}
 
}