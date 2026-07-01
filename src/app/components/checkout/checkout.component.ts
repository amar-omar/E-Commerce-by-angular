import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  checkoutForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private cartService: CartService,
    private router: Router
  ) {
    this.checkoutForm = this.fb.group({
      details: ['', [Validators.required, Validators.minLength(10)]],
      city: ['', Validators.required],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^01[0125][0-9]{8}$/),
        ],
      ],
      paymentMethod: ['cash', Validators.required],
    });
  }

  submitOrder(): void {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();

      this.toastr.error(
        'Please fill in all required fields.',
        'Invalid Form'
      );
      return;
    }

    // Demo: Clear cart after placing order
    this.cartService.clearCart().subscribe({
      next: () => {
        // Update cart count in navbar
        this.cartService.cartCount.next(0);

        this.toastr.success(
          'Your order has been placed successfully! 🎉',
          'Success'
        );

        // Redirect to home page
        this.router.navigate(['/home']);
      },

      error: (err) => {
        console.error(err);

        this.toastr.error(
          'Failed to clear cart.',
          'Error'
        );
      },
    });
  }
}