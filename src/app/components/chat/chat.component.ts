import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
type ChatMessageButton =
  | { label: string; url: string; external?: boolean; question?: string }
  | { label: string; action: string; question?: string };

type ChatMessage = {
  sender: 'user' | 'bot';
  text: string;
  suggestions?: boolean;
  buttons?: ChatMessageButton[];
};

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent {
  @Input() showChat = false;
  @Output() closeChat = new EventEmitter<void>();
  @Output() questionSelected = new EventEmitter<string>();
  @ViewChild('chatBody') chatBody!: ElementRef<HTMLDivElement>;
  constructor(private router: Router) {}

  messages: ChatMessage[] = [
    {
      sender: 'bot',
      text: '👋 ¡Hola! ¿En qué te puedo ayudar? Elegí una pregunta:',
    },
    { sender: 'bot', text: '', suggestions: true },
  ];

  // Separar preguntas en 2 grupos para "cambiar"
  faqGroups = [
    [
      {
        question: '¿Venden autos usados y 0km?',
        answer:
          'Sí, contamos con autos usados seleccionados y 0km, todos con garantía.',
      },
      {
        question: '¿Qué tipos de financiación ofrecen?',
        answer:
          'Trabajamos con financiación a través de Bancor, Santander, Supervielle y más.',
      },
      {
        question: '¿Puedo entregar mi auto como parte de pago?',
        answer: 'Sí, recibimos autos usados como parte de pago.',
      },
      {
        question: '¿Cuánto demoran en entregar el vehículo?',
        answer: 'La entrega es inmediata una vez finalizados los trámites.',
      },
    ],
    [
      {
        question: '¿Qué valores destacan a la agencia?',
        answer: 'Transparencia, agilidad, confianza, cercanía y resolución.',
      },
      {
        question: '¿Tienen servicio postventa?',
        answer: 'Sí, ofrecemos servicio postventa y mantenimiento.',
      },
      {
        question: '¿Cuáles son los horarios de atención?',
        answer:
          'Atendemos de lunes a viernes de 9 a 18 hs y sábados de 9 a 13 hs.',
      },
      {
        question: '¿Hacen envíos a domicilio?',
        answer: 'Sí, realizamos entregas a domicilio dentro de la ciudad.',
      },
    ],
  ];

  currentFaqIndex = 0; // controla qué grupo mostrar

  get faq() {
    // Devuelve el grupo actual más la opción "Otras preguntas..."
    return [
      ...this.faqGroups[this.currentFaqIndex],
      {
        question: 'Otras preguntas (cambiar y mostrar otras 4 preguntas)',
        answer: '',
      },
    ];
  }
  handleButtonClick(btn: ChatMessageButton) {
  if (this.isAction(btn)) {
    this.handleAction(btn.action, btn.question);
  } else if (btn.external) {
    window.open(btn.url, '_blank');
  } else {
    this.router.navigate([btn.url]);
  }
}

  handleAction(action: string, question?: string) {
    if (action === 'form') {
      if (question) {
        this.questionSelected.emit(question); // sigue emitiendo si quieres
        this.router.navigate(['/form'], { queryParams: { question } });
      } else {
        this.router.navigate(['/form']);
      }
    }
  }

  isLink(btn: any): btn is { label: string; url: string; external?: boolean } {
    return 'url' in btn;
  }

  isAction(btn: any): btn is { label: string; action: string } {
    return 'action' in btn;
  }

  selectQuestion(item: { question: string; answer: string }) {
    // Si la pregunta es "Otras preguntas", NO agregamos mensaje del usuario,
    // sólo cambiamos las opciones y actualizamos el mensaje de opciones.
    if (
      item.question === 'Otras preguntas (cambiar y mostrar otras 4 preguntas)'
    ) {
      this.currentFaqIndex = (this.currentFaqIndex + 1) % this.faqGroups.length;

      // Buscar mensaje con opciones actuales y reemplazar su texto
      const suggestionsIndex = this.messages.findIndex(
        (msg) => msg.suggestions
      );
      if (suggestionsIndex !== -1) {
        // Actualizar texto con nuevas preguntas (puedes poner el texto que quieras)
        this.messages[suggestionsIndex].text =
          'Aquí tenés otras preguntas para elegir:';
        // Si tenés que actualizar las opciones específicas, acá lo harías también.
      } else {
        // Si no hay mensaje con opciones, agregar uno nuevo
        this.messages.push({
          sender: 'bot',
          text: 'Aquí tenés otras preguntas para elegir:',
          suggestions: true,
        });
      }
      this.scrollToBottom();
      return; // Terminamos acá, no seguimos para no agregar más mensajes
    }

    // Si es una pregunta normal (no "Otras preguntas"):
    // Agregamos el mensaje del usuario con la pregunta elegida
    this.messages.push({ sender: 'user', text: item.question });
    this.scrollToBottom();

    setTimeout(() => {
      // Antes de mostrar la respuesta, eliminar todos los mensajes con opciones viejas
      // para que quede sólo uno (el último o ninguno si ya no se va a mostrar)
      for (let i = this.messages.length - 1; i >= 0; i--) {
        if (this.messages[i].suggestions) {
          this.messages.splice(i, 1);
        }
      }

      // Mostrar la respuesta de la pregunta
      this.messages.push({
        sender: 'bot',
        text: `${item.answer}<br><br>¿Querés avanzar con esta consulta?`,
        buttons: [
          {
            label: 'Contactar por WhatsApp',
            url: `https://wa.me/5493516348790?text=${encodeURIComponent(
              `Hola ${item.question}`
            )}`,
            external: true,
            question: item.question, // <== aquí
          },
          {
            label: 'Envianos un correo',
            action: 'form',
            question: item.question, // <== aquí también
          },
        ],
      });

      this.scrollToBottom();

      // Mostrar mensaje con opciones (solo uno) al final
      // Como ya borramos todas las opciones anteriores, solo agregamos esta
      setTimeout(() => {
        this.messages.push({
          sender: 'bot',
          text: '💬 ¿Tenés otra pregunta?',
          suggestions: true,
        });
        this.scrollToBottom();
      }, 700);
    }, 500);
  }
  goTo(ruta: string) {
    this.router.navigate([`${ruta}`]);
  }
  handleClose() {
    this.messages = [
      {
        sender: 'bot',
        text: '👋 ¡Hola! ¿En qué te puedo ayudar? Elegí una pregunta:',
      },
      { sender: 'bot', text: '', suggestions: true },
    ];
    this.currentFaqIndex = 0;
    this.closeChat.emit();
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.chatBody) {
        this.chatBody.nativeElement.scrollTop =
          this.chatBody.nativeElement.scrollHeight;
      }
    }, 100);
  }
}
