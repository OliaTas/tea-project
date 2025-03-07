import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/shared/services/search.service';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  searchQuery: string = '';

  constructor(private searchService: SearchService, private router: Router) {
    this.searchService.searchQuery$.subscribe(query => {
      this.searchQuery = query;
    });
  }

  onSearch() {
    this.searchService.setSearchQuery(this.searchQuery);
    this.router.navigate(['/products']);
  }

  resetSearch(): void {
    this.searchQuery = '';
    this.searchService.setSearchQuery('');
    this.router.navigate(['/products']);
  }

}
