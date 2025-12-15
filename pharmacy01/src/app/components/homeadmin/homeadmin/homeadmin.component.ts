import { Component, OnInit, inject } from '@angular/core';
import { HomeadminfrontpComponent } from "../homeadminfrontp/homeadminfrontp.component";
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-homeadmin',
  standalone: true,
  imports: [HomeadminfrontpComponent],
  templateUrl: './homeadmin.component.html',
  styleUrl: './homeadmin.component.css'
})
export class HomeadminComponent implements OnInit{

  UserName:string | null ='';
  IsAdmin:string  | null='';
  isAuthenticated: boolean | void = false;


  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly toast =  inject(ToastrService);


  ngOnInit(): void{ /*this.authService.checkAuthenticationAdmin();*/ }


}
