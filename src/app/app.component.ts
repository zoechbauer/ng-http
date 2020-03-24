import { Component, OnInit } from '@angular/core';
import { Post } from './post.interface';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isLoading = false;

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.loadPosts();
  }

  onCreatePost(postData: Post) {
    this.postsService
      .createAndStorePosts(postData.title, postData.content)
      .subscribe(response => {
        // console.log(response);
        this.loadedPosts.push(postData);
      });
  }

  onFetchPosts() {
    this.loadPosts();
  }

  onClearPosts() {
    this.postsService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
      console.log('all posts deleted');
    });
  }

  loadPosts() {
    this.isLoading = true;
    this.postsService.fetchPosts().subscribe((posts: Post[]) => {
      this.loadedPosts = posts;
      this.isLoading = false;
    });
  }
}
