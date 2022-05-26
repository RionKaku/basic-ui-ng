import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, map, of, Subject } from 'rxjs';
import { SseService } from 'src/app/core/sse/service/sse.service';
import { StateService } from 'src/app/core/state/service/state.service';
import { RequestService } from 'src/app/feature/request/service/request.service';
import { ReservationService } from 'src/app/feature/reservation/service/reservation.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  constructor(
    private sseServcie: SseService,
    private requestService: RequestService,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    this.requestService.request$.subscribe(console.warn);
    this.requestService.requestList$.subscribe(console.warn);
    this.requestService.requestAll$.subscribe(console.log);
    this.requestService.update('hellooo');
    // let aa = of([
    //   {
    //     a: 1,
    //     b: 'adsf',
    //   },
    //   {
    //     a: 2,
    //     b: 'adsf',
    //   },
    //   {
    //     a: 3,
    //     b: 'adsf',
    //   },
    // ]);
    // aa.pipe(
    //   map((obj) => {
    //     let cc;
    //     Object.entries(obj).forEach(([k, v]) => {
    //       if (k == '1') {
    //         cc = v;
    //       }
    //     });
    //     return cc;
    //   })
    // ).subscribe(console.log);
    // this.requestService.update();
    // this.stateService.createState('abc', this.abc);
    // this.stateService.states$.subscribe((res: DataModel) => {
    //   console.log(res);
    // });
    // this.stateService.getState('abc', 'id').subscribe({
    //   next: (res) => {
    //     console.log(res);
    //   },
    //   error: (e) => {
    //     console.warn(e);
    //   },
    // });
    // this.stateService.createState('abc', this.abc);
    // this.stateService.states$.subscribe(console.log);
    // this.stateService.state$.id.subscribe(console.log);
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
