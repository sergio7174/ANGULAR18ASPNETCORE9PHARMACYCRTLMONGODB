import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapPhoneFlip,
         bootstrapLaptopFill,
         bootstrapBatteryCharging,
         bootstrapPersonFillGear,
         bootstrapPeopleFill
 } from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-homeadminfrontp',
  standalone: true,
  imports: [NgIcon],
  providers: [provideIcons({ bootstrapPhoneFlip,
    bootstrapLaptopFill,
    bootstrapBatteryCharging,
    bootstrapPersonFillGear,
    bootstrapPeopleFill
})],
  templateUrl: './homeadminfrontp.component.html',
  styleUrl: './homeadminfrontp.component.css'
})
export class HomeadminfrontpComponent {

     // this is the way to get data from login to save it , to local storage, then you could share it in any component
     UserName = sessionStorage.getItem('name');
     IsAdmin = sessionStorage.getItem('isAdmin');

}
