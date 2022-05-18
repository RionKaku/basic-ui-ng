import { Component, OnInit } from '@angular/core';
import { SseService } from 'src/app/core/sse/service/sse.service';
import { StateService } from 'src/app/core/state/service/state.service';
import { RequestConst } from 'src/app/feature/request/request.state';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  constructor(
    private sseServcie: SseService,
    private stateService: StateService
  ) {}

  ngOnInit(): void {
    this.stateService.getState(RequestConst.featureKey).subscribe(console.log);

    // this.sseServcie.getServerSentEvent('http://localhost:3000/sse').subscribe({
    //   next: (res) => {
    //     console.log(res.data);
    //   },
    //   error: (e) => {
    //     console.warn(111);
    //     console.log([...this.sseServcie.getSseConnectionsMap().entries()]);
    //   },
    // });
    // this.sseServcie.getServerSentEvent('http://localhost:3000/sse').subscribe({
    //   next: (res) => {
    //     console.log(res.data);
    //   },
    //   error: (e) => {
    //     console.warn(222);
    //     console.log([...this.sseServcie.getSseConnectionsMap().entries()]);
    //   },
    // });
    // this.sseServcie
    //   .getServerSentEvent('http://localhost:3000/sse', 'sselib_message')
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res.data);
    //     },
    //     error: (e) => {
    //       console.warn(333);
    //       console.log([...this.sseServcie.getSseConnectionsMap().entries()]);
    //     },
    //   });
    // this.sseServcie
    //   .getServerSentEvent('http://localhost:3000/sse', 'sselib_message')
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res.data);
    //     },
    //     error: (e) => {
    //       console.warn(444);
    //       console.log([...this.sseServcie.getSseConnectionsMap().entries()]);
    //     },
    //   });
  }
}
