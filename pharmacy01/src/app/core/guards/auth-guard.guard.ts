import { AuthService } from './../services/auth/auth.service';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';



export const authGuardGuard: CanActivateFn = (route, state) => {


  let UserName:string | null ='';
  let  IsAdmin:any ='';

  // Implementar la lógica de autenticación aquí
  const authService = inject (AuthService);
  const router = inject (Router);

  UserName = sessionStorage.getItem('name');
  IsAdmin = sessionStorage.getItem('isAdmin');
  
  if (authService.isAuthenticated() && IsAdmin=='true' ){

    //alert('Estoy en authGuard -line 22 - IsAdmin: '+ IsAdmin);
    return true

       
  } else {

    alert('Estoy en authGuard -line 28 -IsAdmin: '+ IsAdmin);
    // Usuario no autenticado, redirige a la página de inicio de sesión
    router.navigate(['/home']);
    return false; // No permite la activación de la ruta
  }

};
