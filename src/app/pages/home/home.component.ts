import {
  AfterViewInit,
  Component,
  OnDestroy,
  Renderer2,
  HostListener,
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
    this.router.navigate([`${ruta}`])
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
