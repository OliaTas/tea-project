import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchSubject = new BehaviorSubject<string>('');
  searchQuery$ = this.searchSubject.asObservable();

  setSearchQuery(query: string) {
    this.searchSubject.next(query);
  }

  getSearchQuery() {
    return this.searchSubject.value;
  }
}