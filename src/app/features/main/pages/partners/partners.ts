import { Component, OnInit, OnDestroy, HostListener, ChangeDetectorRef } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

interface Partner {
  name: string;
  role: string;
  bullets: string[];
  image: string;
  thumb: string;
}

@Component({
  selector: 'app-partners',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './partners.html',
  styleUrl: './partners.scss',
})
export class Partners implements OnInit, OnDestroy {
  constructor(private cdr: ChangeDetectorRef) { }
  private autoPlayInterval: any;
  private autoPlayDelay = 5000; // 5 segundos

  partners: Partner[] = [
    {
      name: 'partners.emilio.name',
      role: 'partners.emilio.role',
      bullets: [
        'partners.emilio.bullets.0',
        'partners.emilio.bullets.1',
        'partners.emilio.bullets.2',
        'partners.emilio.bullets.3'
      ],
      image: '/assets/images/partners/1statue.png',
      thumb: '/assets/images/partners/1statue.png'
    },
    {
      name: 'partners.sofia.name',
      role: 'partners.sofia.role',
      bullets: [
        'partners.sofia.bullets.0',
        'partners.sofia.bullets.1',
        'partners.sofia.bullets.2'
      ],
      image: '/assets/images/partners/2statue.png',
      thumb: '/assets/images/partners/2statue.png'
    },
    {
      name: 'partners.ana.name',
      role: 'partners.ana.role',
      bullets: [
        'partners.ana.bullets.0',
        'partners.ana.bullets.1'
      ],
      image: '/assets/images/partners/3statue.png',
      thumb: '/assets/images/partners/3statue.png'
    },
    {
      name: 'partners.roland.name',
      role: 'partners.roland.role',
      bullets: [
        'partners.roland.bullets.0',
        'partners.roland.bullets.1'
      ],
      image: '/assets/images/partners/4statue.png',
      thumb: '/assets/images/partners/4statue.png'
    }
  ];

  activeIndex = 0;

  ngOnInit(): void {
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  private startAutoPlay(): void {
    this.stopAutoPlay(); // Evita duplicar intervalos
    this.autoPlayInterval = setInterval(() => {
      this.nextPartner();
      this.cdr.detectChanges();
    }, this.autoPlayDelay);
  }

  private stopAutoPlay(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  private resetAutoPlay(): void {
    this.stopAutoPlay();
    this.startAutoPlay();
  }

  get currentPartner(): Partner {
    return this.partners[this.activeIndex];
  }

  selectPartner(index: number): void {
    if (index === this.activeIndex) return;
    this.activeIndex = index;
    this.resetAutoPlay();
    this.cdr.detectChanges();
  }

  nextPartner(): void {
    this.activeIndex = (this.activeIndex + 1) % this.partners.length;
  }

  prevPartner(): void {
    this.activeIndex = (this.activeIndex - 1 + this.partners.length) % this.partners.length;
  }

  getSlideStyle(index: number): any {
    // Calcular posición fija en el carrusel (0-3)
    let position = (index - this.activeIndex + this.partners.length) % this.partners.length;

    // Las 4 posiciones fijas: 0 (primera/activa adelante), 1, 2, 3 (última atrás)
    // Diagonal hacia la izquierda con espaciado más uniforme
    const tx = -position * 22; // Espaciado horizontal más uniforme
    const tz = position * -80; // Profundidad reducida para mejor distribución
    const scale = 1 - position * 0.18; // Escala más uniforme
    const brightness = position === 0 ? 1 : Math.max(0.15, 1 - position * 0.5);
    const grayscale = position === 0 ? 0 : Math.min(0.95, 0.65 + position * 0.2);

    return {
      transform: `translateX(${tx}%) translateZ(${tz}px) scale(${scale})`,
      filter: `brightness(${brightness}) grayscale(${grayscale}) contrast(${position === 0 ? 1 : 0.78})`,
      zIndex: 10 - position,
      opacity: 1
    };
  }

  isActive(index: number): boolean {
    return index === this.activeIndex;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'ArrowRight') {
      this.activeIndex = (this.activeIndex + 1) % this.partners.length;
    } else if (event.key === 'ArrowLeft') {
      this.activeIndex = (this.activeIndex - 1 + this.partners.length) % this.partners.length;
    }
  }
}
