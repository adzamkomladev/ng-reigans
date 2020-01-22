import { Directive, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScrollTo]',
})
export class ScrollToDirective {
  @Input('appScrollTo') elementSelector: string;

  @HostListener('click') onClick(): void {
    this.element.scrollIntoView({behavior: 'smooth'});
  }

  private get element(): HTMLElement {
    return this.renderer2.selectRootElement(this.elementSelector, true);
  }

  constructor(private renderer2: Renderer2) {}
}
