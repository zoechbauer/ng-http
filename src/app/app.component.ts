import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from './post.interface';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isLoading = false;
  error = null;
  private errorSub: Subscription;

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.errorSub = this.postsService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });
    this.loadPosts();
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }

  onCreatePost(postData: Post) {
    this.postsService.createAndStorePosts(postData.title, postData.content);
    // comment because of testing error subject
    // .subscribe(response => {
    //   // console.log(response);
    //   this.loadedPosts.push(postData);
    // });
    if (this.error === null) {
      this.loadedPosts.push(postData);
    }
    console.log(this.loadedPosts, this.error);
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
    this.postsService.fetchPosts().subscribe(
      (posts: Post[]) => {
        this.loadedPosts = posts;
        this.isLoading = false;
      },
      errors => {
        this.isLoading = false;
        console.log(errors);
        // this is allways available
        this.error = errors.message;
        // the errorObject depends on your api
        const errObj = errors.error;
        if (errObj) {
          if (errObj.error) {
            this.error = errObj.error;
          }
        }
      }
    );
  }

  onHandleError() {
    this.error = null;
  }
}
