import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonList,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonSearchbar,
  IonGrid,
  IonRow,
  IonCol,
  IonBadge,
  IonFooter,
  IonDatetime,
  IonModal,
  ModalController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  closeOutline,
  checkmarkOutline,
  addOutline,
  trashOutline,
  calendarOutline,
  timeOutline,
  personOutline,
  searchOutline
} from 'ionicons/icons';

/**
 * Interface para el formulario de cita
 */
export interface AppointmentFormData {
  date: Date;
  time: string;
  clientId?: number;
  clientName: string;
  staffId: number;
  services: AppointmentService[];
  isPromo: boolean;
  notes?: string;
}

/**
 * Interface para servicio en la cita
 */
export interface AppointmentService {
  serviceId: number;
  serviceName: string;
  quantity: number;
  duration: number;
  price?: number;
}

/**
 * Interface para Cliente
 */
export interface Client {
  id?: number;
  name: string;
  phone?: string;
  email?: string;
}

/**
 * Interface para Personal/Staff
 */
export interface Staff {
  id: number;
  name: string;
  active: boolean;
}

/**
 * Interface para Servicio
 */
export interface Service {
  id: number;
  name: string;
  duration: number;
  price: number;
}

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonList,
    IonItem,
    IonSelect,
    IonSelectOption,
    IonInput,
    IonSearchbar,
    IonGrid,
    IonRow,
    IonCol,
    IonBadge,
    IonFooter,
    IonDatetime,
    IonModal
  ]
})
export class AppointmentFormComponent implements OnInit {
  // Inputs del componente
  @Input() date: Date = new Date();
  @Input() mode: 'create' | 'edit' = 'create';

  // Tabs
  activeTab: 'general' | 'conceptos' = 'general';

  // Selector de fecha/hora
  showDateTimePicker = false;
  selectedDateTime: string = '';
  tempDateTime: string = '';
  minDate: string = '';
  minuteValues: number[] = [0, 30]; // Solo 00 y 30 minutos
  hourValues: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; // Todas las horas en formato 12h

  // Tab General
  clientSearchQuery = '';
  clientResults: Client[] = [];
  selectedClient: Client | null = null;
  selectedStaffId: number | null = null;

  // Tab Conceptos
  selectedServiceId: number | null = null;
  serviceQuantity: number = 1;
  serviceDuration: number = 30;
  addedServices: AppointmentService[] = [];

  // Promo
  isPromo = false;

  // Mock data (TODO: Reemplazar con datos reales desde el servicio)
  allClients: Client[] = [
    { id: 1, name: 'Juan Pérez', phone: '555-0001', email: 'juan@example.com' },
    { id: 2, name: 'María García', phone: '555-0002', email: 'maria@example.com' },
    { id: 3, name: 'Carlos López', phone: '555-0003', email: 'carlos@example.com' },
    { id: 4, name: 'Ana Martínez', phone: '555-0004', email: 'ana@example.com' },
    { id: 5, name: 'Pedro Sánchez', phone: '555-0005', email: 'pedro@example.com' }
  ];

  staffList: Staff[] = [
    { id: 1, name: 'ABILENE RICO PUENTES', active: true },
    { id: 2, name: 'Dante Ramírez', active: true },
    { id: 3, name: 'Sofia Torres', active: true },
    { id: 4, name: 'Miguel Hernández', active: true }
  ];

  services: Service[] = [
    { id: 1, name: 'Corte de Cabello', duration: 30, price: 150 },
    { id: 2, name: 'Tinte y Color', duration: 60, price: 350 },
    { id: 3, name: 'Manicure', duration: 45, price: 200 },
    { id: 4, name: 'Pedicure', duration: 60, price: 250 },
    { id: 5, name: 'Tratamiento Facial', duration: 90, price: 450 },
    { id: 6, name: 'Maquillaje', duration: 45, price: 300 }
  ];

  durationOptions = [
    { value: 15, label: '00:15 m' },
    { value: 30, label: '00:30 m' },
    { value: 45, label: '00:45 m' },
    { value: 60, label: '01:00 m' },
    { value: 90, label: '01:30 m' },
    { value: 120, label: '02:00 m' }
  ];

  constructor(private modalController: ModalController) {
    // Registrar iconos
    addIcons({
      closeOutline,
      checkmarkOutline,
      addOutline,
      trashOutline,
      calendarOutline,
      timeOutline,
      personOutline,
      searchOutline
    });
  }

  ngOnInit() {
    // Configurar fecha mínima (hoy a las 00:00 para permitir todas las horas del día)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    this.minDate = today.toISOString();

    // Redondear la fecha inicial a intervalos de 30 minutos
    const minutes = this.date.getMinutes();
    if (minutes !== 0 && minutes !== 30) {
      // Redondear al múltiplo de 30 más cercano
      this.date.setMinutes(minutes < 15 ? 0 : (minutes < 45 ? 30 : 0));
      if (minutes >= 45) {
        this.date.setHours(this.date.getHours() + 1);
      }
    }

    // Formatear fecha y hora inicial
    this.selectedDateTime = this.formatDateTime(this.date);
  }

  /**
   * Formatear fecha/hora para mostrar
   */
  formatDateTime(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    // Convertir a formato de 12 horas
    let hours = date.getHours();
    const ampm = hours >= 12 ? 'p.m.' : 'a.m.';
    hours = hours % 12;
    hours = hours ? hours : 12; // La hora '0' debe ser '12'
    const hoursFormatted = String(hours);

    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} - ${hoursFormatted}:${minutes} ${ampm}`;
  }

  /**
   * Cambiar tab activo
   */
  onTabChange(event: any) {
    this.activeTab = event.detail.value;
  }

  /**
   * Abrir selector de fecha/hora
   */
  openDateTimePicker() {
    this.tempDateTime = this.date.toISOString();
    this.showDateTimePicker = true;
  }

  /**
   * Confirmar fecha/hora seleccionada
   */
  confirmDateTime() {
    if (this.tempDateTime) {
      this.date = new Date(this.tempDateTime);

      // Asegurar que los minutos sean 0 o 30
      const minutes = this.date.getMinutes();
      if (minutes !== 0 && minutes !== 30) {
        // Redondear al múltiplo de 30 más cercano
        this.date.setMinutes(minutes < 15 ? 0 : (minutes < 45 ? 30 : 0));
        if (minutes >= 45) {
          this.date.setHours(this.date.getHours() + 1);
        }
      }

      this.selectedDateTime = this.formatDateTime(this.date);
    }
    this.showDateTimePicker = false;
  }

  /**
   * Cancelar selección de fecha/hora
   */
  cancelDateTime() {
    this.showDateTimePicker = false;
  }

  /**
   * Cerrar modal de fecha/hora
   */
  closeDateTimePicker() {
    this.showDateTimePicker = false;
  }

  /**
   * Buscar clientes
   */
  searchClients(event: any) {
    const query = event.target.value.toLowerCase().trim();
    this.clientSearchQuery = query;

    if (query.length >= 2) {
      this.clientResults = this.allClients.filter(client =>
        client.name.toLowerCase().includes(query) ||
        (client.phone && client.phone.includes(query))
      );
    } else {
      this.clientResults = [];
    }
  }

  /**
   * Seleccionar cliente
   */
  selectClient(client: Client) {
    this.selectedClient = client;
    this.clientSearchQuery = client.name;
    this.clientResults = [];
  }

  /**
   * Limpiar selección de cliente
   */
  clearClient() {
    this.selectedClient = null;
    this.clientSearchQuery = '';
    this.clientResults = [];
  }

  /**
   * Agregar servicio a la lista
   */
  addService() {
    if (!this.selectedServiceId) {
      return;
    }

    const service = this.services.find(s => s.id === this.selectedServiceId);
    if (!service) {
      return;
    }

    const appointmentService: AppointmentService = {
      serviceId: service.id,
      serviceName: service.name,
      quantity: this.serviceQuantity,
      duration: this.serviceDuration,
      price: service.price
    };

    this.addedServices.push(appointmentService);

    // Resetear formulario de servicio
    this.selectedServiceId = null;
    this.serviceQuantity = 1;
    this.serviceDuration = 30;
  }

  /**
   * Eliminar servicio de la lista
   */
  removeService(service: AppointmentService) {
    const index = this.addedServices.indexOf(service);
    if (index > -1) {
      this.addedServices.splice(index, 1);
    }
  }

  /**
   * Calcular duración total
   */
  get totalDuration(): number {
    return this.addedServices.reduce((total, item) => {
      return total + (item.duration * item.quantity);
    }, 0);
  }

  /**
   * Calcular precio total
   */
  get totalPrice(): number {
    return this.addedServices.reduce((total, item) => {
      return total + ((item.price || 0) * item.quantity);
    }, 0);
  }

  /**
   * Validar formulario
   */
  isFormValid(): boolean {
    return (
      this.selectedClient !== null &&
      this.selectedStaffId !== null &&
      this.addedServices.length > 0
    );
  }

  /**
   * Guardar cita
   */
  async saveAppointment() {
    if (!this.isFormValid()) {
      console.log('Formulario inválido');
      // TODO: Mostrar alerta de validación
      return;
    }

    const formData: AppointmentFormData = {
      date: this.date,
      time: this.selectedDateTime,
      clientId: this.selectedClient!.id,
      clientName: this.selectedClient!.name,
      staffId: this.selectedStaffId!,
      services: this.addedServices,
      isPromo: this.isPromo
    };

    console.log('Guardando cita:', formData);

    // TODO: Guardar en SQLite y agregar a outbox
    // await this.dbService.insertAppointment(appointment);
    // await this.syncService.addToOutbox('CREATE_APPOINTMENT', appointment);

    // Cerrar modal con confirmación
    this.modalController.dismiss(formData, 'confirm');
  }

  /**
   * Cerrar modal
   */
  closeModal() {
    this.modalController.dismiss(null, 'cancel');
  }

  /**
   * Toggle promo
   */
  togglePromo() {
    this.isPromo = !this.isPromo;
  }
}
