import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ButtonComponent } from '../../../../shared/components/button/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ButtonComponent, CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact implements AfterViewInit {
  topicOptions = [
    { value: 'investment', label: 'Investment' },
    { value: 'partnerships', label: 'Partnerships' },
    { value: 'careers', label: 'Careers' },
    { value: 'other', label: 'Other' }
  ];
  selectedTopic: string = '';
  selectedTopicLabel: string = '';
  selectOpen = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  toggleSelect() {
    this.selectOpen = !this.selectOpen;
  }

  closeSelect() {
    this.selectOpen = false;
  }

  selectTopic(opt: { value: string, label: string }) {
    this.selectedTopic = opt.value;
    this.selectedTopicLabel = opt.label;
    this.selectOpen = false;
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Cargar Google Maps JS API si no está ya cargado
      if (!(window as any).google || !(window as any).google.maps) {
        const script = document.createElement('script');
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAGRjZKpPkGKbzZyBTFJTT_XfzhOrO084g&callback=initAthenaMap';
        script.async = true;
        (window as any).initAthenaMap = this.initMap.bind(this);
        document.body.appendChild(script);
      } else {
        this.initMap();
      }
    }
  }

  initMap() {
    const map = new (window as any).google.maps.Map(document.getElementById('athena-map'), {
      center: { lat: 49.6113, lng: 6.1322 }, // 75–51 Grand-Rue, 1661 Ville-Haute Luxembourg
      zoom: 16,
      disableDefaultUI: true,
      styles: [
        { elementType: 'geometry', stylers: [{ color: '#0d1f2e' }] },
        { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#001B31' }] },
        { featureType: 'road.highway', stylers: [{ visibility: 'off' }] },
        { featureType: 'road.arterial', elementType: 'geometry', stylers: [{ color: '#1a3547' }, { visibility: 'on' }] },
        { featureType: 'road.arterial', elementType: 'labels.text.fill', stylers: [{ color: '#6b8296' }, { visibility: 'on' }] },
        { featureType: 'road.arterial', elementType: 'labels.text.stroke', stylers: [{ color: '#0d1f2e' }, { visibility: 'on' }] },
        { featureType: 'road.local', elementType: 'geometry', stylers: [{ color: '#1a3547' }, { visibility: 'on' }] },
        { featureType: 'road.local', elementType: 'labels.text.fill', stylers: [{ color: '#6b8296' }, { visibility: 'on' }] },
        { featureType: 'road.local', elementType: 'labels.text.stroke', stylers: [{ color: '#0d1f2e' }, { visibility: 'on' }] },
        { featureType: 'administrative', elementType: 'geometry', stylers: [{ color: '#1a3547' }] },
        { featureType: 'administrative.country', elementType: 'labels.text.fill', stylers: [{ color: '#8a9daf' }] },
        { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#b9944f' }] },
        { elementType: 'labels.text.fill', stylers: [{ color: '#8a9daf' }] },
        { elementType: 'labels.text.stroke', stylers: [{ color: '#0d1f2e' }] },
        { featureType: 'poi', stylers: [{ visibility: 'off' }] },
        { featureType: 'transit', stylers: [{ visibility: 'off' }] }
      ]
    });
    // Añadir marcador en la dirección
    new (window as any).google.maps.Marker({
      position: { lat: 49.6113, lng: 6.1322 },
      map,
      title: '75–51 Grand-Rue, 1661 Ville-Haute Luxembourg, Luxembourg',
      icon: {
        url: '/assets/icons/marker.png', // Asegúrate de colocar el PNG en esta ruta
        scaledSize: new (window as any).google.maps.Size(64, 80), // Ajusta el tamaño si es necesario
        anchor: new (window as any).google.maps.Point(32, 80)
      }
    });
  }
}
