import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
import { APIResponse, Game } from '../models';
import { environment as env } from '../../environements/environement';
// import { environment } from '../../environements/environement';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  public params: HttpParams;
  constructor(private http: HttpClient) {}
  getGameList(
    ordering: string,
    search?: string
  ): Observable<APIResponse<Game>> {
    this.params = new HttpParams()
      .set('key', '0ec3c702f56441e193353b93c3949f43')
      .set('ordering', ordering);
    console.log('Params1', this.params);
    if (search) {
      this.params = new HttpParams()
        .set('ordering', ordering)
        .set('search', search);
    }
    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}`, {
      params: this.params,
    });
  }
  getGameDetails(id: string): Observable<Game> {
    const gameInfoRequest = this.http.get(
      `${env.BASE_URL}/${id}?key=0ec3c702f56441e193353b93c3949f43`
    );
    const gameTrailersRequest = this.http.get(
      `${env.BASE_URL}/${id}/movies?key=0ec3c702f56441e193353b93c3949f43`
    );
    const gameScreenshotsRequest = this.http.get(
      `${env.BASE_URL}/${id}/screenshots?key=0ec3c702f56441e193353b93c3949f43`
    );
    return forkJoin({
      gameInfoRequest,
      gameScreenshotsRequest,
      gameTrailersRequest,
    }).pipe(
      map((resp: any) => {
        console.log("resp is:",resp)
        return {
          ...resp['gameInfoRequest'],
          screenshots: resp['gameScreenshotsRequest']?.results,
          trailers: resp['gameTrailersRequest']?.results,
        };
      })
    );
  }
}
