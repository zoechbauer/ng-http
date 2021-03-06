import { Injectable } from '@angular/core';
import { Post } from './post.interface';
import { environment } from 'src/environments/environment';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpEventType
} from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  fetchPosts(): Observable<Post[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('print', 'pretty');
    queryParams = queryParams.append('custom', 'key');
    const url = environment.apiUrl + 'posts.json';
    return this.http
      .get<{ [key: string]: Post }>(url, {
        headers: new HttpHeaders({
          'Custom-Header': 'Hello'
        }),
        // params: new HttpParams().set('print', 'pretty')
        params: queryParams
      })
      .pipe(
        map(
          responseData => {
            const postsArray: Post[] = [];
            for (const key in responseData) {
              if (responseData.hasOwnProperty(key)) {
                postsArray.push({ ...responseData[key], id: key });
              }
            }
            return postsArray;
          },
          catchError(errorRes => {
            // send to Analytics Server
            return throwError(errorRes);
          })
        )
      );
  }

  createAndStorePosts(title: string, content: string) {
    const postData: Post = { title: title, content: content };
    const url = environment.apiUrl + 'posts.json';
    this.http
      .post<{ name: string }>(url, postData, {
        observe: 'response'
      })
      .subscribe(
        responseData => {
          console.log(responseData);
        },
        error => {
          this.error.next(error.message);
        }
      );
  }

  deletePosts() {
    const url = environment.apiUrl + 'posts.json';
    return this.http
      .delete(url, {
        observe: 'events'
      })
      .pipe(
        tap(event => {
          console.log(event);
          if (event.type === HttpEventType.Sent) {
            // ....
          }
          if (event.type === HttpEventType.Response) {
            console.log(event.body);
          }
        })
      );
  }
}
