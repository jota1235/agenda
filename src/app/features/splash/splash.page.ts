import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone: true,
  imports: [IonContent]
})
export class SplashPage implements OnInit {
  showContent = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Mostrar el contenido con animación
    setTimeout(() => {
      this.showContent = true;
    }, 100);

    // Navegar al login después de 3 segundos
    setTimeout(() => {
      this.navigateToLogin();
    }, 3000);
  }

  /**
   * Navegar al login con animación
   */
  navigateToLogin() {
    this.router.navigate(['/login'], {
      replaceUrl: true // No guardar en historial
    });
  }
}
