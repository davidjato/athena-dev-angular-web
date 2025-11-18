import { Component, HostListener } from '@angular/core';
import { ButtonComponent } from '../button/button';

@Component({
  selector: 'app-header',
  imports: [ButtonComponent],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  scrollToSection(event: Event, sectionId: string): void {
    event.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
