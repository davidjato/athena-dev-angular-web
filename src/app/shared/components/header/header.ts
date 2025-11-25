import { Component, HostListener } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ButtonComponent } from '../button/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [ButtonComponent, TranslatePipe, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  isScrolled = false;
  selectedLang = 'en';

  constructor(private translate: TranslateService) {
    this.selectedLang = translate.currentLang || 'en';
  }

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

  changeLang(event: Event): void {
    const lang = (event.target as HTMLSelectElement).value;
    this.selectedLang = lang;
    this.translate.use(lang);
  }
}
