import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Interface para el usuario autenticado
 */
export interface User {
  id: number;
  email: string;
  name: string;
  companyId: number;
  token: string;
}

/**
 * Interface para la respuesta de login
 */
export interface LoginResponse {
  success: boolean;
  user?: User;
  token?: string;
  message?: string;
}

/**
 * Servicio de Autenticación
 * Por ahora es un mock, pero está preparado para conectar con APIs reales
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Estado del usuario actual
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;

  // Estado de autenticación
  private isAuthenticatedSubject: BehaviorSubject<boolean>;
  public isAuthenticated$: Observable<boolean>;

  constructor() {
    // Inicializar desde localStorage si existe sesión previa
    const storedUser = this.getStoredUser();
    this.currentUserSubject = new BehaviorSubject<User | null>(storedUser);
    this.currentUser$ = this.currentUserSubject.asObservable();

    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(!!storedUser);
    this.isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  }

  /**
   * Obtener el usuario actual
   */
  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Verificar si está autenticado
   */
  get isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  /**
   * Login con email y password
   * TODO: Conectar con API real
   */
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      // Simular delay de red
      await this.delay(1000);

      // TODO: Reemplazar con llamada a API real
      // const response = await this.http.post<LoginResponse>('/api/auth/login', { email, password }).toPromise();

      // Mock de respuesta exitosa
      const mockUser: User = {
        id: 1,
        email: email,
        name: 'Usuario Demo',
        companyId: 14,
        token: 'mock-jwt-token-' + Date.now()
      };

      // Guardar usuario en memoria y localStorage
      this.setCurrentUser(mockUser);

      return {
        success: true,
        user: mockUser,
        token: mockUser.token,
        message: 'Inicio de sesión exitoso'
      };

    } catch (error) {
      console.error('Error en login:', error);
      return {
        success: false,
        message: 'Error al iniciar sesión'
      };
    }
  }

  /**
   * Login con Google OAuth
   * TODO: Implementar OAuth con Google
   */
  async loginWithGoogle(): Promise<LoginResponse> {
    try {
      // TODO: Implementar autenticación con Google
      console.log('Login con Google - Por implementar');

      // Mock de respuesta
      await this.delay(500);

      const mockUser: User = {
        id: 2,
        email: 'user@gmail.com',
        name: 'Usuario Google',
        companyId: 14,
        token: 'mock-google-token-' + Date.now()
      };

      this.setCurrentUser(mockUser);

      return {
        success: true,
        user: mockUser,
        token: mockUser.token,
        message: 'Inicio de sesión con Google exitoso'
      };

    } catch (error) {
      console.error('Error en login con Google:', error);
      return {
        success: false,
        message: 'Error al iniciar sesión con Google'
      };
    }
  }

  /**
   * Login con Microsoft OAuth
   * TODO: Implementar OAuth con Microsoft
   */
  async loginWithMicrosoft(): Promise<LoginResponse> {
    try {
      // TODO: Implementar autenticación con Microsoft
      console.log('Login con Microsoft - Por implementar');

      // Mock de respuesta
      await this.delay(500);

      const mockUser: User = {
        id: 3,
        email: 'user@outlook.com',
        name: 'Usuario Microsoft',
        companyId: 14,
        token: 'mock-microsoft-token-' + Date.now()
      };

      this.setCurrentUser(mockUser);

      return {
        success: true,
        user: mockUser,
        token: mockUser.token,
        message: 'Inicio de sesión con Microsoft exitoso'
      };

    } catch (error) {
      console.error('Error en login con Microsoft:', error);
      return {
        success: false,
        message: 'Error al iniciar sesión con Microsoft'
      };
    }
  }

  /**
   * Logout - Cerrar sesión
   */
  async logout(): Promise<void> {
    try {
      // TODO: Llamar a API de logout si es necesario
      // await this.http.post('/api/auth/logout', {}).toPromise();

      // Limpiar sesión
      this.clearSession();

    } catch (error) {
      console.error('Error en logout:', error);
      // Limpiar sesión de todas formas
      this.clearSession();
    }
  }

  /**
   * Refresh token
   * TODO: Implementar renovación de token
   */
  async refreshToken(): Promise<boolean> {
    try {
      const currentUser = this.currentUserValue;
      if (!currentUser) {
        return false;
      }

      // TODO: Llamar a API de refresh token
      // const response = await this.http.post<any>('/api/auth/refresh', { token: currentUser.token }).toPromise();

      // Mock: renovar token
      await this.delay(300);
      currentUser.token = 'refreshed-token-' + Date.now();
      this.setCurrentUser(currentUser);

      return true;

    } catch (error) {
      console.error('Error al renovar token:', error);
      return false;
    }
  }

  /**
   * Verificar si el token es válido
   */
  isTokenValid(): boolean {
    const user = this.currentUserValue;
    if (!user || !user.token) {
      return false;
    }

    // TODO: Verificar expiración del JWT real
    // const decoded = jwtDecode(user.token);
    // return decoded.exp > Date.now() / 1000;

    // Por ahora, siempre válido
    return true;
  }

  /**
   * Establecer usuario actual
   */
  private setCurrentUser(user: User): void {
    // Guardar en localStorage
    localStorage.setItem('currentUser', JSON.stringify(user));

    // Actualizar subjects
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  /**
   * Obtener usuario almacenado en localStorage
   */
  private getStoredUser(): User | null {
    try {
      const userJson = localStorage.getItem('currentUser');
      if (userJson) {
        return JSON.parse(userJson);
      }
    } catch (error) {
      console.error('Error al obtener usuario almacenado:', error);
    }
    return null;
  }

  /**
   * Limpiar sesión
   */
  private clearSession(): void {
    // Remover de localStorage
    localStorage.removeItem('currentUser');

    // Actualizar subjects
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  /**
   * Utilidad para simular delay
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
