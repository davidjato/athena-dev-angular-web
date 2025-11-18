import { Component, OnInit, OnDestroy, HostListener, ChangeDetectorRef } from '@angular/core';
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
  imports: [CommonModule],
  templateUrl: './partners.html',
  styleUrl: './partners.scss',
})
export class Partners implements OnInit, OnDestroy {
  constructor(private cdr: ChangeDetectorRef) {}
  private autoPlayInterval: any;
  private autoPlayDelay = 5000; // 5 segundos

  partners: Partner[] = [
    {
      name: "Emilio de la Guardia",
      role: "General Partner",
      bullets: [
        "Leadership across venture capital, private equity, M&A, and structured lending",
        "Senior executive at European Investment Bank, led multi-country operations and financing for major defense, aviation, and space programs (Airbus, Airane launch, Safran)",
        "Private equity investor, founder, and board advisor to multiple early-stage aerospace ventures",
        "Cross-border industrial growth, dual-use technology finance, and transatlantic investment strategy"
      ],
      image: "/assets/images/partners/1statue.png",
      thumb: "/assets/images/partners/1statue.png"
    },
    {
      name: "Sofia Keller",
      role: "Partner",
      bullets: [
        "Defense procurement expert",
        "Led EU NATO tendering programs",
        "Former COO at dual-use tech scaleup"
      ],
      image: "/assets/images/partners/2statue.png",
      thumb: "/assets/images/partners/2statue.png"
    },
    {
      name: "Ana Moreau",
      role: "Venture Partner",
      bullets: [
        "Aerospace investor, ex-Airbus",
        "Transatlantic JV structuring"
      ],
      image: "/assets/images/partners/3statue.png",
      thumb: "/assets/images/partners/3statue.png"
    },
    {
      name: "Roland Weber",
      role: "Operating Partner",
      bullets: [
        "Industrial M&A and carve-outs",
        "30+ years in defense manufacturing"
      ],
      image: "/assets/images/partners/4statue.png",
      thumb: "/assets/images/partners/4statue.png"
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
    this.autoPlayInterval = setInterval(() => {
      this.nextPartner();
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
