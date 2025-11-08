import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { calendarOutline, personOutline, settingsOutline, logOutOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent
  ],
})
export class HomePage {
  constructor(private router: Router) {
    // Registrar iconos
    addIcons({ calendarOutline, personOutline, settingsOutline, logOutOutline });
  }

  /**
   * Navegar a la agenda
   */
  goToAgenda() {
    this.router.navigate(['/agenda']);
  }

  /**
   * Navegar a perfil (próximamente)
   */
  goToProfile() {
    console.log('Ir a Perfil - Próximamente');
    // TODO: this.router.navigate(['/profile']);
  }

  /**
   * Navegar a configuración (próximamente)
   */
  goToSettings() {
    console.log('Ir a Configuración - Próximamente');
    // TODO: this.router.navigate(['/settings']);
  }

  /**
   * Cerrar sesión y volver al login
   */
  logout() {
    // TODO: Limpiar sesión con authService
    this.router.navigate(['/login']);
  }
}
