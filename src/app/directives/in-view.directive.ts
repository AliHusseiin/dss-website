import { Directive, ElementRef, EventEmitter, Output, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appInView]'
})
export class InViewDirective implements AfterViewInit {
  @Output() inView: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const observer = new IntersectionObserver(([entry]) => {
      this.inView.emit(entry.isIntersecting);
    }, {
      threshold: 0.2
    });

    observer.observe(this.el.nativeElement);
  }
}