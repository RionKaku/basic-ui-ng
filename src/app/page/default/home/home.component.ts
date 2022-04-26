import { Component, OnInit } from '@angular/core';
import { SseService } from 'src/app/service/sse.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private sseServcie: SseService) {}

  ngOnInit(): void {
    this.sseServcie.getServerSentEvent('http://localhost:3000/sse').subscribe({
      next: (res) => {
        console.log(res.data);
      },
      error: (e) => {
        console.warn(111);
        console.log([...this.sseServcie.getSseConnectionsMap().entries()]);
      },
    });
    this.sseServcie.getServerSentEvent('http://localhost:3000/sse').subscribe({
      next: (res) => {
        console.log(res.data);
      },
      error: (e) => {
        console.warn(222);
        console.log([...this.sseServcie.getSseConnectionsMap().entries()]);
      },
    });

    this.sseServcie
      .getServerSentEvent('http://localhost:3000/sse', 'sselib_message')
      .subscribe({
        next: (res) => {
          console.log(res.data);
        },
        error: (e) => {
          console.warn(333);
          console.log([...this.sseServcie.getSseConnectionsMap().entries()]);
        },
      });
    this.sseServcie
      .getServerSentEvent('http://localhost:3000/sse', 'sselib_message')
      .subscribe({
        next: (res) => {
          console.log(res.data);
        },
        error: (e) => {
          console.warn(444);
          console.log([...this.sseServcie.getSseConnectionsMap().entries()]);
        },
      });
  }
}
