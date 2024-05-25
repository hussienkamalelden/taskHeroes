import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Heros {
  private apiUrl = 'http://localhost:3000/allHeros';

  constructor(private http: HttpClient) { }

  getHeros(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
