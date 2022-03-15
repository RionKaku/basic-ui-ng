import { Component, OnInit } from '@angular/core';
import { SseService } from './sse.service';
import { NgSseService } from '@rionkj/ng-sse';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private sseService: NgSseService) {}

  ngOnInit(): void {
    this.sseService.getServerSentEvent('http://localhost:3000/sse').subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (e) => {
        console.warn(e);
      },
    });

    this.sseService
      .getServerSentEvent('http://localhost:3000/sse', 'sselib_message')
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => {
          console.warn(e);
        },
      });

    this.sseService
      .getServerSentEvent('http://localhost:3000/sse', 'sselib_error')
      .subscribe({
        next: (res) => {
          console.log('from error res');
          console.log(res);
        },
        error: (e) => {
          console.warn(e);
        },
      });
  }
}
