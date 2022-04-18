import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { animationFrameScheduler, interval, take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('animate') animate!: ElementRef;

  animateSub = interval(0, animationFrameScheduler);

  constructor() {}

  ngAfterViewInit() {
    let a = performance.now();
    this.animateSub.pipe(take(60)).subscribe({
      next: () => {
        this.animate.nativeElement.style.height =
          this.animate.nativeElement.offsetHeight + 1 + 'px';
      },
      complete: () => {
        console.log(performance.now() - a);
      },
    });
  }

  ngOnInit(): void {}
}
