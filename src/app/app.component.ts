import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isLandingPage: boolean;

  get currentYear(): number {
    return new Date().getFullYear();
  }

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        tap(event => {
          if (event instanceof NavigationStart) {
            // Don't show header and nav-bar
            this.isLandingPage = event.url === '/';
          }
        }),
      )
      .subscribe();
  }
}
