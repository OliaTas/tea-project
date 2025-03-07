import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ShortenDescriptionPipe } from './pipes/shorten-description.pipe';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProductCardComponent,
    ShortenDescriptionPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    ProductCardComponent,
    ShortenDescriptionPipe
  ]
})
export class SharedModule { }
