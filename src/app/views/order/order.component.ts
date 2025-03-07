import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/shared/services/product.service';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  public FormValues = {
    product: ''
  }

  checkoutForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern('^[a-zA-Zа-яА-ЯёЁ]+$')]], 
    last_name: ['', [Validators.required, Validators.pattern('^[a-zA-Zа-яА-ЯёЁ]+$')]], 
    phone: ['', [Validators.required, Validators.pattern(/^\+?\d{11}$/)]],
    country: ['', [Validators.required]],
    zip: ['', [Validators.required]],
    product: [{ value: '', disabled: true }],
    address: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s\/\-а-яА-ЯёЁ]+$/)]],
    comment: [''],
  });
  

  orderSuccess = false; 
  errorMessage = ''; 

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService, private fb: FormBuilder) { }
  private subscription: Subscription | null = null;
  private subscriptionOrder: Subscription | null = null;

  ngOnInit(): void {
    this.subscription = this.activatedRoute.queryParams.subscribe((params) => {
      if (params['product']) {
        this.FormValues.product = params['product'];
        this.checkoutForm.patchValue({ product: params['product'] });
      }
    })
  }

  createOrder(): void {
    if (this.checkoutForm.invalid) {
      return;
    }

    const orderData = {
      name: this.checkoutForm.get('name')?.value || '', 
      last_name: this.checkoutForm.get('last_name')?.value || '',
      phone: this.checkoutForm.get('phone')?.value || '',
      country: this.checkoutForm.get('country')?.value || '',
      zip: this.checkoutForm.get('zip')?.value || '',
      product: this.checkoutForm.get('product')?.value || '',
      address: this.checkoutForm.get('address')?.value || '',
      comment: this.checkoutForm.get('comment')?.value || '', 
    };
  

    this.subscriptionOrder = this.productService.createOrder(orderData).subscribe(
      (response) => {
        console.log('Ответ от сервера:', response);
        if (response.success) {
          this.orderSuccess = true; 
          this.errorMessage = ''; 
        } else {
          this.errorMessage = 'Произошла ошибка. Попробуйте еще раз.';
        }
      },
      (error) => {
        console.error('Ошибка:', error);
        this.errorMessage = 'Произошла ошибка. Попробуйте еще раз.';
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.subscriptionOrder) {
      this.subscriptionOrder.unsubscribe();
    }
  }

}
