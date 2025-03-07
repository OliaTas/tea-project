import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';
import { SearchService } from 'src/app/shared/services/search.service';
import { ProductType } from 'src/types/product.type';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: ProductType[] = [];
  loading: boolean = false;
  searchQuery: string = '';

  constructor(private productService: ProductService, private router: Router,
    private searchService: SearchService) { }

  ngOnInit(): void {
    this.loadProducts();

    this.searchService.searchQuery$.subscribe(query => {
      this.searchQuery = query;
      this.loadProducts(query);
    });

  }

  //   if (this.searchQuery) {
  //     this.filteredProducts = this.products.filter(product =>
  //       product.title.toLowerCase().includes(this.searchQuery.toLowerCase())
  //     );
  //   } else {
  //     this.filteredProducts = this.products;
  //   }
  // }
  // Метод для загрузки товаров
  loadProducts(searchQuery?: string): void {
    this.loading = true;
    this.productService.getProducts(searchQuery).subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Ошибка при загрузке товаров:', error);
        this.loading = false;
      }
    });
  }

}
