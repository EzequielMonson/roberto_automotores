import {
  AfterViewInit,
  Component,
  OnDestroy,
  Renderer2,
  HostListener,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faRotate,
  faBank,
  faCarSide,
  faComments,
  faShield,
  faBolt,
  faSearch,
  faHandHoldingHand,
  faTools,
  faArrowUp,
  faCheck,
  faCreditCard
} from '@fortawesome/free-solid-svg-icons';
import { ChatComponent } from '../../components/chat/chat.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ChatComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  showScrollButton = false;
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    const windowHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    this.showScrollButton = scrollTop > windowHeight / 2;
  }
  entregas: string[] = [];
  faCreditCard= faCreditCard;
  faCheck = faCheck;
  faArrowUp = faArrowUp;
  faHandHoldingHand = faHandHoldingHand;
  faTools = faTools;
  faSearch = faSearch;
  faShield = faShield;
  faBolt = faBolt;
  faComments = faComments;
  faRotate = faRotate;
  faBank = faBank;
  faCarSide = faCarSide;
  isChatOpen = false;

  autos = [
    {
      modelo: 'Onix',
      marca: 'Chevrolet',
      version: 'LS Joy 1.4',
      anio: 2017,
      combustible: 'Nafta',
      color: 'Rojo',
      aptoBancor: true,
      imagenes: this.generarImagenes('CHEVROLET_ONIX_LS_', 12),
    },
    {
      modelo: 'Meriva',
      marca: 'Chevrolet',
      version: 'GL Plus 1.8',
      anio: 2012,
      combustible: 'GNC',
      color: 'Plata',
      aptoBancor: true,
      imagenes: this.generarImagenes('CHEVROLET_MERIVA_GL_PLUS_1_', 7),
    },
    {
      modelo: 'Palio Fire',
      marca: 'Fiat',
      version: '1.4',
      anio: 2011,
      combustible: 'Nafta',
      color: 'Rojo',
      aptoBancor: true,
      imagenes: this.generarImagenes('FIAT_PALIO_FIRE_1,4_', 8),
    },
    {
      modelo: 'Ka Viral',
      marca: 'Ford',
      version: 'Fly Viral 1.0',
      anio: 2014,
      combustible: 'Nafta',
      color: 'Blanco',
      aptoBancor: true,
      imagenes: this.generarImagenes('FORD_KA_FLY_VIRAL_1,0_', 9),
    },
    {
      modelo: 'Fiesta Ambiente',
      marca: 'Ford',
      version: 'Ambiente 5 ptas',
      anio: 2013,
      combustible: 'Nafta',
      color: 'Beige',
      aptoBancor: true,
      imagenes: this.generarImagenes('FORD_FIESTA_AMBIENTE_5_PTAS_', 8),
    },
    {
      modelo: 'Fiesta S 5ptas',
      marca: 'Ford',
      version: 'S 5 ptas',
      anio: 2015,
      combustible: 'Nafta',
      color: 'Plata',
      aptoBancor: true,
      imagenes: this.generarImagenes('FORD_FIESTA_S_5_PTAS_', 19),
    },
    {
      modelo: 'Focus S',
      marca: 'Ford',
      version: 'S 5 ptas',
      anio: 2015,
      combustible: 'Nafta',
      color: 'Azul',
      aptoBancor: true,
      imagenes: this.generarImagenes('FORD_FOCUS_S_5_PTAS_', 13),
    },
    {
      modelo: '206',
      marca: 'Peugeot',
      version: '3 ptas. 1.9 Diesel',
      anio: 1999,
      combustible: 'Diesel',
      color: 'Plata',
      aptoBancor: true,
      imagenes: this.generarImagenes('PEUGEOT_206_3_PTAS._1,9_DIESEL_', 8),
    },
    {
      modelo: '208',
      marca: 'Peugeot',
      version: 'Allure Touchscreen',
      anio: 2015,
      combustible: 'Nafta',
      color: 'Blanco',
      aptoBancor: false,
      imagenes: this.generarImagenes('PEUGEOT_208_ALLURE_TOUCHSCREEN_', 11),
    },
    {
      modelo: '308',
      marca: 'Peugeot',
      version: 'Allure 1.6',
      anio: 2018,
      combustible: 'Nafta',
      color: 'Blanco',
      aptoBancor: true,
      imagenes: this.generarImagenes('308_ALLURE_1.6_', 9),
    },
    {
      modelo: 'Kangoo II',
      marca: 'Renault',
      version: 'Life 5 Asientos SCE 1.6',
      anio: 2020,
      combustible: 'Nafta',
      color: 'Gris Oscuro',
      aptoBancor: false,
      imagenes: this.generarImagenes(
        'RENAULT_KANGOO_II_LIFE_5_AS._SCE_1,6_',
        7
      ),
    },
    {
      modelo: 'KWID',
      marca: 'Renault',
      version: 'Iconic Bitono',
      anio: 2025,
      combustible: 'Nafta',
      color: 'Gris Etoile',
      aptoBancor: false,
      imagenes: this.generarImagenes('RENAULT_KWID_ICONIC_BITONO_', 12),
    },
    {
      modelo: 'KWID Zen',
      marca: 'Renault',
      version: 'Zen 1.0',
      anio: 2020,
      combustible: 'Nafta',
      color: 'Naranja',
      aptoBancor: true,
      imagenes: this.generarImagenes('KWID_ZEN_1_', 5),
    },
    {
      modelo: 'KWID Iconic',
      marca: 'Renault',
      version: 'Iconic 1.0',
      anio: 2020,
      combustible: 'Nafta',
      color: 'Blanco',
      aptoBancor: true,
      imagenes: this.generarImagenes('KWID_ICONIC_', 9),
    },
    {
      modelo: 'Fluence',
      marca: 'Renault',
      version: '1.6 Dynamique Pack',
      anio: 2017,
      combustible: 'GNC',
      color: 'Gris Oscuro',
      aptoBancor: true,
      imagenes: this.generarImagenes('RENAULT_FLUENCE_1,6_DINAMYQUE_PACK_', 8),
    },
    {
      modelo: 'Koleos',
      marca: 'Renault',
      version: 'PH3 Exp. 4x2 MT',
      anio: 2015,
      combustible: 'GNC',
      color: 'Azul',
      aptoBancor: true,
      imagenes: this.generarImagenes('KOLEOS_PH3_EXP._4X2_MT_', 8),
    },
    {
      modelo: 'Kicks',
      marca: 'Nissan',
      version: '1.6 Exclusive CVT',
      anio: 2018,
      combustible: 'Nafta',
      color: 'Blanco',
      aptoBancor: true,
      imagenes: this.generarImagenes('NISSAN_KICKS_1.6_EXLUSIVE_CVT_', 12),
    },
    {
      modelo: 'Saveiro',
      marca: 'Volkswagen',
      version: 'D/Cab. Power',
      anio: 2015,
      combustible: 'Nafta',
      color: 'Blanco',
      aptoBancor: true,
      imagenes: this.generarImagenes('VW_SAVEIRO_DCAB._POWER_', 13),
    },
    {
      modelo: 'Vento',
      marca: 'Volkswagen',
      version: 'Luxury TDI',
      anio: 2007,
      combustible: 'Diesel',
      color: 'Plata',
      aptoBancor: true,
      imagenes: this.generarImagenes('VENTO_LUXURY_TDI_', 8),
    },
    {
      modelo: 'Captiva',
      marca: 'Chevrolet',
      version: 'LT 2.4',
      anio: 2017,
      combustible: 'Diesel',
      color: 'Gris',
      aptoBancor: true,
      imagenes: this.generarImagenes('CAPTIVA_', 10),
    },
  ];

  overlayAbierto = false;
  autoSeleccionado: any = null;
  imagenActual = 0;
  autosPorPagina = 5;
  indiceInicio = 0;
  

  isDragging = false;
  startX = 0;
  scrollLeft = 0;

  startDrag(event: MouseEvent) {
    this.isDragging = true;
    this.startX = event.pageX - this.scrollContainer.nativeElement.offsetLeft;
    this.scrollLeft = this.scrollContainer.nativeElement.scrollLeft;
  }

  onDrag(event: MouseEvent) {
    if (!this.isDragging) return;
    event.preventDefault();
    const x = event.pageX - this.scrollContainer.nativeElement.offsetLeft;
    const walk = (x - this.startX) * 1.5;
    this.scrollContainer.nativeElement.scrollLeft = this.scrollLeft - walk;
  }

  stopDrag() {
    this.isDragging = false;
  }

  startTouch(event: TouchEvent) {
    this.isDragging = true;
    this.startX = event.touches[0].pageX;
    this.scrollLeft = this.scrollContainer.nativeElement.scrollLeft;
  }

  onTouchMove(event: TouchEvent) {
    if (!this.isDragging) return;
    const x = event.touches[0].pageX;
    const walk = (x - this.startX) * 1.5;
    this.scrollContainer.nativeElement.scrollLeft = this.scrollLeft - walk;
  }

  abrirOverlay(auto: any) {
    this.autoSeleccionado = auto;
    this.imagenActual = 0;
    this.overlayAbierto = true;
  }

  cerrarOverlay() {
    this.overlayAbierto = false;
  }

  imagenAnterior() {
    if (this.autoSeleccionado) {
      this.imagenActual =
        (this.imagenActual - 1 + this.autoSeleccionado.imagenes.length) %
        this.autoSeleccionado.imagenes.length;
    }
  }

  imagenSiguiente() {
    if (this.autoSeleccionado) {
      this.imagenActual =
        (this.imagenActual + 1) % this.autoSeleccionado.imagenes.length;
    }
  }
  agruparAutos(lista: any[]): any[][] {
    const ancho = window.innerWidth;
    const cantidad = ancho <= 768 ? 2 : 5; // Cambia 4 por lo que uses normalmente en desktop
    const resultado = [];

    for (let i = 0; i < lista.length; i += cantidad) {
      resultado.push(lista.slice(i, i + cantidad));
    }

    return resultado;
  }

  paginaAnterior() {
    if (this.indiceInicio >= this.autosPorPagina) {
      this.indiceInicio -= this.autosPorPagina;
    }
  }

  paginaSiguiente() {
    if (this.indiceInicio + this.autosPorPagina < this.autos.length) {
      this.indiceInicio += this.autosPorPagina;
    }
  }

  consultarDisponibilidad(auto: any) {
    const telefono = '5493516348790'; // Reemplazar con tu número
    const mensaje = `Buenas Tardes! Quería saber la disponibilidad de este auto: ${auto.marca} ${auto.modelo} ${auto.version}`;
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  }
  generarImagenes(base: string, cantidad: number): string[] {
    const baseUpper = base.toUpperCase();
    return Array.from(
      { length: cantidad },
      (_, i) => `assets/img/autos/${baseUpper}(${i + 1}).WEBP`
    );
  }

  constructor(private renderer: Renderer2, private router: Router) {
    for (let i = 1; i <= 17; i++) {
      this.entregas.push(`assets/img/entregas/Clientes(${i}).jpg`);
    }
  }
  openChat() {
    this.isChatOpen = true;
    document.documentElement.classList.add('no-scroll'); // <html>
  }

  closeChat() {
    this.isChatOpen = false;
    document.documentElement.classList.remove('no-scroll'); // <html>
  }
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  goTo(ruta: string) {
    this.router.navigate([`${ruta}`]);
  }
  ngAfterViewInit(): void {
    const elements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const animationClass =
              el.getAttribute('data-animation') || 'animate__fadeIn';
            this.renderer.addClass(el, 'animate__animated');
            this.renderer.addClass(el, animationClass);
            this.renderer.addClass(el, 'visible'); // opcional, para efectos personalizados
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));
  }
  ngOnDestroy() {
    document.documentElement.classList.remove('no-scroll'); // <html>
  }
}
