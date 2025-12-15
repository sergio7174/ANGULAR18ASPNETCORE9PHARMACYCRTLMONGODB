import { Component, EventEmitter, input, Output } from '@angular/core';
import { CartItem } from '../../../../core/services/cart/cart.service';
import { QuantityStepperComponent } from '../quantity-stepper/quantity-stepper.component';

@Component({
  selector: 'app-bill-item-card',
  standalone: true,
  imports: [QuantityStepperComponent],
  templateUrl: './bill-item-card.component.html',
  styleUrl: './bill-item-card.component.css'
})
export class BillItemCardComponent {

  //@Input() item!: CartItem;

  item = input<CartItem>();
  @Output() itemQuantityUpdate = new EventEmitter<number>();
  @Output() removeItem = new EventEmitter<void>();

  onQuantityChange(quantity: any) {
    this.itemQuantityUpdate.next(quantity);
  }

  onRemoveItem() {
    this.removeItem.next();
  }
}



