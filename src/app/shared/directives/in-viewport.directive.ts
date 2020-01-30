import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appInViewport]',
})
export class InViewportDirective {
  @Output() inViewport: EventEmitter<boolean>;

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (this.isInViewport()) {
      this.inViewport.emit(true);
    }
  }

  constructor(private elementRef: ElementRef, private window: Window) {
    this.inViewport = new EventEmitter<boolean>();
  }

  private isInViewport(): boolean {
    const element = this.elementRef.nativeElement as HTMLElement;
    const bounding = element.getBoundingClientRect();

    return (
      bounding.top >= 0 &&
      bounding.left >= 0 &&
      bounding.right <= this.window.innerWidth &&
      bounding.bottom <= this.window.innerHeight
    );
  }
}
