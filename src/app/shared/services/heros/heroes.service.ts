import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Hero } from '../../models/hero';

@Injectable({
  providedIn: 'root'
})
export class HeroeService {
  private apiUrl = 'http://localhost:3000/allHeroes';

  constructor(private http: HttpClient) { }

  getHeroes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addNewHero(heroData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, heroData);
  }

  login(email: string, password: string): Observable<any | null> {
    return this.http.get<any[]>(`${this.apiUrl}?email=${email}`).pipe(
      map(users => {
        const user = users.length > 0 ? users[0] : null;
        if (user && user.password === password) {
          return user;
        }
        return null;
      })
    );
  }

  updateHero(id: any, heroData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, heroData);
  }

  getHeroProfile(id: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}?id=${id}`)
      .pipe(
        map(users => users.length ? users[0] : null)
      );
  }
}
