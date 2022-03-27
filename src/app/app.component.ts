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
    this.animateSub.pipe(take(60)).subscribe({
      next: () => {
        this.animate.nativeElement.style.height =
          this.animate.nativeElement.offsetHeight + 1 + 'px';
      },
    });
  }

  ngOnInit(): void {}
}
