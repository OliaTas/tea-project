import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { ProductType } from 'src/app/types/product.type';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: ProductType[] = [];
  
  constructor(private productService: ProductService, private router: Router) { }
  loading: boolean = false;

  ngOnInit(): void {

    this.loading = true;
    this.productService.getProducts()
    .subscribe({
      next: (data) => {
        this.loading = false;
        this.products = data;
      },
      error: (error) => {
        this.loading = false;
        console.log(error)
        this.router.navigate(['/']);
      }
    }
    )
  }

  
}


