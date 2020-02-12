import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly categoriesUrl: string;

  constructor(private http: HttpClient) {
    this.categoriesUrl = `${environment.apiUrl}product-categories`;
  }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl).pipe(share());
  }
}
