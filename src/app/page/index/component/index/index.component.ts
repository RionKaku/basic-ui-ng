import { Component, OnInit } from '@angular/core';
import { SseService } from 'src/app/core/sse/service/sse.service';
import { StateService } from 'src/app/core/state/service/state.service';

interface DataModel {
  id: string;
  isGood: boolean;
  message: string;
  json: {
    name: string;
    age: number;
  };
}

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

  add() {
    // this.stateService.add();
  }

  show() {
    // console.warn(this.stateService.state);
  }

  abc: DataModel = {
    id: 'data id',
    isGood: true,
    message: 'data message',
    json: {
      name: 'my name',
      age: 20,
    },
  };

  aa = 'aaaa';

  ngOnInit(): void {
    this.stateService.createState('abc', this.abc);
    // this.stateService.states$.subscribe((res: DataModel) => {
    //   console.log(res);
    // });
    this.stateService.getState('abc', 'id').subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (e) => {
        console.warn(e);
      },
    });

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
