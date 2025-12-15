import { Router } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
import { ListSaleproductsComponent } from '../list-saleproducts/list-saleproducts.component';
import { BillComponent } from '../bill/bill.component';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [
              ListSaleproductsComponent,
              BillComponent,
              
           
                             ],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})
export class SalesComponent implements OnInit{


  private readonly router = inject(Router);

  ngOnInit(): void {  }

}
