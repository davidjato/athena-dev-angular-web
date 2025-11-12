import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appParallax]',
  standalone: true
})
export class ParallaxDirective {
  @Input() speed = 0.3; // ajusta la velocidad

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:scroll')
  onScroll() {
    const offset = window.scrollY * this.speed;
    this.renderer.setStyle(
      this.el.nativeElement,
      'transform',
      `translateY(${offset}px)`
    );
  }
}
