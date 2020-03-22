import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    const url = environment.apiUrl + 'posts.json';
    this.http.post(url, postData).subscribe(responseData => {
      console.log(responseData);
    });
  }

  onFetchPosts() {
    // Send Http request
    this.getPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private getPosts() {
    const url = environment.apiUrl + 'posts.json';
    this.http.get(url).subscribe(posts => {
      console.log(posts);
    });
  }
}
