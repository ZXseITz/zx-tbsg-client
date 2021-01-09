import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private readonly apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = `http://${environment.api_url}/games`;
  }

  list(): Observable<Array<string>> {
    return this.http.get<Array<string>>(this.apiUrl).pipe(
      catchError((err) => {
        console.error(`error during fetching home: ${err.error.message}`);
        return of([]);
      })
    );
  }

  blob(game, file): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${game}/blob/${file}`, {
      responseType: 'blob'
    }).pipe(
      catchError((err) => {
        console.error(`error during fetching home: ${err.error.message}`);
        return of(null);
      })
    );
  }

  webhook(game, webhook): Observable<any> {
    return this.http.get(`${this.apiUrl}/${game}/webhooks/${webhook}`).pipe(
      catchError((err) => {
        console.error(`error during fetching home: ${err.error.message}`);
        return of();
      })
    );
  }
}
