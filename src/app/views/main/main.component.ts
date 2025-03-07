import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, timer } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  private popupTimer$: Observable<number> = timer(10000); 
  private popupSubscription: Subscription = new Subscription(); 

  constructor(private router: Router) { }

  ngOnInit(): void {
    $("#accordion").accordion({
      collapsible: true
    });

    this.popupSubscription = this.popupTimer$.subscribe(() => {
      this.showPopup();
    });

    $('#view-collections').on('click', () => {
      this.router.navigate(['/catalog']);
    });
  }

  ngOnDestroy(): void {
    if (this.popupSubscription) {
      this.popupSubscription.unsubscribe();
    }
  }

  private showPopup(): void {
    $('#popup').fadeIn();
  }

}
