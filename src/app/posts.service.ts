import { Injectable } from '@angular/core';
import { Post } from './post.interface';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(private http: HttpClient) {}

  fetchPosts(): Observable<Post[]> {
    const url = environment.apiUrl + 'posts.json';
    return this.http.get<{ [key: string]: Post }>(url).pipe(
      map(responseData => {
        const postsArray: Post[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postsArray.push({ ...responseData[key], id: key });
          }
        }
        return postsArray;
      })
    );
  }

  createAndStorePosts(title: string, content: string) {
    const postData: Post = { title: title, content: content };
    const url = environment.apiUrl + 'posts.json';
    this.http.post<{ name: string }>(url, postData).subscribe(responseData => {
      console.log(responseData);
    });
  }

  deletePosts() {
    const url = environment.apiUrl + 'posts.json';
    return this.http.delete(url);
  }
}
