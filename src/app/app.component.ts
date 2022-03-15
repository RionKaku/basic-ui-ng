import { Component, OnInit } from '@angular/core';
import { interval, Subject, Subscription } from 'rxjs';
import { SseService } from './sse.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private sseService: SseService) {}

  ngOnInit(): void {
    this.sseService.getServerSentEvent('http://localhost:3000/sse').subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (e) => {
        console.warn(e);
      },
    });

    setTimeout(() => {
      this.sseService
        .getServerSentEvent('http://localhost:3000/sse')
        .subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (e) => {
            console.warn(e);
          },
        });
    }, 5000);
  }
}
