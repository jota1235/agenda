# 📱 DOCUMENTACIÓN DEL PROYECTO - AGENDA OFFLINE SYSERV

**Última actualización**: 2025-11-10
**Versión**: 0.0.1
**Estado**: En Desarrollo - Fase de Diseño UI Completo

---

## 📋 ÍNDICE

1. [Resumen Ejecutivo](#resumen-ejecutivo)
2. [Arquitectura y Tecnologías](#arquitectura-y-tecnologías)
3. [Estado Actual del Proyecto](#estado-actual-del-proyecto)
4. [Análisis de Requisitos](#análisis-de-requisitos)
5. [Estructura del Proyecto](#estructura-del-proyecto)
6. [Componentes Implementados](#componentes-implementados)
7. [Gaps y Pendientes](#gaps-y-pendientes)
8. [Roadmap de Desarrollo](#roadmap-de-desarrollo)
9. [Changelog](#changelog)
10. [Notas Técnicas](#notas-técnicas)

---

## 🎯 RESUMEN EJECUTIVO

### Objetivo
Desarrollar una aplicación móvil **offline-first** para Android e iOS que permita a los negocios registrados en SyServ consultar y gestionar su agenda de citas cuando no tienen conexión a internet.

### Alcance
- **Consulta de agenda**: Visualización de citas programadas
- **Gestión offline**: Crear, editar y cancelar citas sin internet
- **Sincronización automática**: Bidireccional cuando se recupera conectividad
- **Multi-tenant**: Soporte para múltiples empresas con aislamiento de datos

### Contexto
Esta app es un **complemento del sistema web SyServ existente**, no un reemplazo. El backend PHP ya está desarrollado y operativo. La app consume sus APIs y funciona como capa offline.

---

## 🏗️ ARQUITECTURA Y TECNOLOGÍAS

### Stack Tecnológico

| Componente | Tecnología | Versión |
|------------|------------|---------|
| Framework Principal | Angular | 20.0.0 |
| UI Framework | Ionic | 8.0.0 |
| Plataforma Nativa | Capacitor | 7.4.4 |
| Base de Datos Local | SQLite | 7.0.2 |
| Lenguaje | TypeScript | 5.8.0 |
| Gestión de Estado | RxJS Observables | 7.8.0 |

### Dependencias Clave Instaladas
```json
{
  "@capacitor-community/sqlite": "^7.0.2",
  "@capacitor/app": "7.1.0",
  "@capacitor/android": "^7.4.4",
  "@capacitor/ios": "^7.4.4",
  "@ionic/angular": "^8.0.0"
}
```

### Arquitectura de Componentes
- **Standalone Components**: Sin NgModules (arquitectura moderna de Angular)
- **Lazy Loading**: Carga bajo demanda de páginas
- **Reactive Programming**: RxJS para manejo de estado asíncrono

---

## ✅ ESTADO ACTUAL DEL PROYECTO

### Resumen General
**Progreso UI/Diseño**: 85%
**Progreso Lógica de Negocio**: 15%
**Progreso Integración APIs**: 0%
**Progreso Sistema Offline**: 5%

### Módulos Completados

#### 1. ✅ Splash Screen
- **Archivo**: `src/app/features/splash/`
- **Estado**: Completado
- **Funcionalidad**:
  - Animación de entrada con logo "S"
  - Transición automática a login después de 3s
  - Animaciones fluidas

#### 2. ✅ Login Screen
- **Archivo**: `src/app/features/auth/pages/login/`
- **Estado**: Diseño completo, lógica mock
- **Funcionalidad**:
  - Formulario email/password
  - Botones OAuth (Google, Microsoft) - preparados
  - Toggle para mostrar/ocultar contraseña
  - Validaciones básicas de formulario
  - **Modo claro forzado**: Siempre se muestra en modo claro independiente del tema global
  - **Pendiente**: Integración real con AuthService

#### 3. ⚠️ Auth Service
- **Archivo**: `src/app/core/services/auth.service.ts`
- **Estado**: Estructura base implementada
- **Funcionalidad Actual**:
  - Login mock con delay simulado
  - Manejo de usuario con BehaviorSubject
  - Persistencia en localStorage
  - Logout básico
  - Estructura para refresh token
- **Interfaces Definidas**:
  ```typescript
  interface User {
    id: number;
    email: string;
    name: string;
    companyId: number;  // ✅ Multi-tenant preparado
    token: string;
  }
  ```
- **Pendiente**:
  - Conectar con API real (`POST /api/auth/login`)
  - Implementar refresh token automático
  - Validación JWT con expiración
  - OAuth real con Google/Microsoft

#### 4. ✅ Menú Principal (Home)
- **Archivo**: `src/app/home/`
- **Estado**: Completado
- **Funcionalidad**:
  - Cards de navegación (Agenda, Perfil, Configuración)
  - Botón de cerrar sesión
  - Animaciones de entrada con delays secuenciales
  - Navegación funcional a Agenda, Perfil y Configuración
  - Soporte completo de modo oscuro
  - Espaciado optimizado entre iconos y texto (1.5rem margin-top)

#### 5. ✅ Vista Principal de Agenda
- **Archivo**: `src/app/features/agenda/pages/agenda-main/`
- **Estado**: Diseño completo, datos mock
- **Funcionalidad**:
  - **Timeline por horas**: 9 AM - 7 PM (configurable)
  - **Calendario semanal**: Selector de días con indicador de "hoy"
  - **Cards de citas**: Visualización destacada con:
    - Hora de inicio
    - Nombre del cliente
    - Servicio
    - Duración
  - **Bottom Navigation**: 5 tabs (Citas, Clientes, Reportes, Marketing, Negocio)
    - Tab "Negocio" muestra perfil del negocio integrado
  - **FAB**: Botón flotante para nueva cita
  - **Menú de opciones**: ActionSheet con:
    - Volver al Menú
    - Configuración
    - Ayuda
    - Cancelar
  - **Loading Screen**: Animación de carga inicial
  - **Soporte completo de modo oscuro** con estilos optimizados

**Ajustes Visuales Realizados**:
- Altura de slot de tiempo: 260px (optimizado para legibilidad)
- Grid slot: 65px por intervalo de 15 minutos
- Card de cita: Padding aumentado (2rem x 1.75rem)
- Tamaños de fuente en citas:
  - Cliente: 1.5rem
  - Servicio: 1.25rem
  - Hora/Duración: 1.125rem
- Etiquetas de hora: 1.125rem

**Datos Mock Actuales**:
```typescript
// Cita de ejemplo en 9:15 AM
{
  clientName: 'Juan Pérez',
  service: 'Corte de Cabello',
  duration: 45,
  status: 'confirmed'
}
```

**Contenido del Tab "Negocio"**:
- Header con avatar y descripción del negocio
- Estadísticas: 4 métricas (citas, clientes, calificación, ingresos)
- Información de contacto (dirección, teléfono, email, sitio web)
- Horarios de atención (lun-dom)
- Servicios ofrecidos (chips interactivos)
- Animaciones secuenciales por card
- Tema oscuro completo

#### 6. ✅ Página de Perfil del Negocio
- **Archivo**: `src/app/features/profile/pages/profile-main/`
- **Estado**: Completado
- **Funcionalidad**:
  - **Header del perfil**:
    - Avatar del negocio (120px)
    - Nombre y descripción
    - Badge de estado (Abierto/Cerrado)
    - Fondo degradado con animación de patrón
  - **Estadísticas del negocio**:
    - Grid 2x2 con métricas clave
    - Iconos con colores temáticos
    - Valores numéricos destacados
  - **Información de contacto**:
    - Dirección física
    - Teléfono
    - Email
    - Sitio web
    - Iconos coloridos por tipo de contacto
  - **Horario de atención**:
    - Tabla completa lun-dom
    - Destacado del día actual
    - Indicador visual de "Cerrado"
  - **Servicios ofrecidos**:
    - Grid de chips interactivos
    - Iconos por tipo de servicio
    - Hover effects
  - **Botón de acción**: "Editar Información del Negocio" (preparado)
  - **Animaciones**: Cards con delays secuenciales (0.1s-0.5s)
  - **Modo oscuro**: Soporte completo con paleta optimizada

**Datos Mock del Perfil**:
```typescript
businessInfo = {
  name: 'Salón Belleza & Estilo',
  logo: 'https://via.placeholder.com/150/3B82F6/FFFFFF?text=BE',
  description: 'Tu salón de confianza con más de 10 años...',
  address: 'Av. Principal 123, Col. Centro, Ciudad de México',
  phone: '+52 55 1234 5678',
  email: 'contacto@bellezaestilo.com',
  website: 'www.bellezaestilo.com',
  status: 'Abierto ahora'
}

stats = [
  { icon: 'calendar-outline', value: '245', label: 'Citas este mes', color: 'primary' },
  { icon: 'people-outline', value: '128', label: 'Clientes activos', color: 'secondary' },
  { icon: 'star-outline', value: '4.8', label: 'Calificación', color: 'warning' },
  { icon: 'cash-outline', value: '$45K', label: 'Ingresos del mes', color: 'success' }
]
```

#### 7. ✅ Página de Configuración
- **Archivo**: `src/app/features/settings/pages/settings-main/`
- **Estado**: Completado
- **Funcionalidad**:
  - **Apariencia**:
    - Toggle de modo oscuro (funcional con localStorage)
    - Aplicación global del tema
    - Persistencia entre sesiones
  - **Notificaciones**:
    - Toggle Push (preparado para integración)
    - Toggle Email (estático)
    - Toggle SMS (estático)
    - Toggle Recordatorios (estático)
    - Slider de volumen (0-100, persiste en localStorage)
  - **Idioma**:
    - Selector con 3 opciones (Español, English, Português)
    - Persistencia en localStorage
    - Preparado para i18n
  - **Almacenamiento**:
    - Indicador de caché usado (45 MB)
    - Botón "Limpiar Caché" (simulado)
    - Botón "Borrar Datos Locales" (preparado)
  - **Privacidad y Soporte**:
    - Enlaces a Política de Privacidad (preparado)
    - Enlaces a Términos de Servicio (preparado)
    - Contactar Soporte (preparado)
  - **Información de la App**:
    - Versión: 1.0.0
    - Botón "Acerca de" (preparado)
  - **Navegación**: Botón para volver al menú
  - **Modo oscuro**: Soporte completo

**Configuraciones Persistentes**:
```typescript
localStorage.setItem('darkMode', 'true/false');
localStorage.setItem('notificationVolume', '0-100');
localStorage.setItem('selectedLanguage', 'es/en/pt');
localStorage.setItem('notificationSettings', JSON.stringify({
  push: true,
  email: false,
  sms: true,
  reminders: true
}));
```

---

## 📊 ANÁLISIS DE REQUISITOS

### Requisitos del Documento (requisitos.txt)

#### ✅ Cumplidos Parcialmente
1. **Autenticación** (30%)
   - ✅ Estructura de login
   - ✅ Persistencia de token en localStorage
   - ❌ JWT real
   - ❌ Refresh token automático
   - ❌ OAuth real

2. **UI/UX de Agenda** (60%)
   - ✅ Vista de día con timeline
   - ✅ Selector semanal
   - ✅ Cards visuales de citas
   - ❌ Vista de semana (scroll horizontal)
   - ❌ Filtros (servicio, personal, estatus)
   - ❌ Indicadores de conectividad

#### ❌ No Implementados (CRÍTICOS)

3. **Almacenamiento Local con SQLite** (0%)
   - ❌ Inicialización de base de datos
   - ❌ Esquema de tablas:
     - `companies`, `branches`, `services`, `staff`
     - `status`, `cancel_reasons`, `settings`
     - `appointments`
     - `outbox` (cola de sincronización)
     - `sync_state` (marcas de sincronización)
   - ❌ Namespacing por tenant (company_id)

4. **Sincronización Bidireccional** (0%)
   - ❌ Detección de conectividad
   - ❌ Pull de deltas desde servidor
   - ❌ Push de outbox al servidor
   - ❌ Manejo de conflictos
   - ❌ Idempotencia con UUIDs

5. **Operativa Offline** (0%)
   - ❌ Crear citas offline con UUID v4
   - ❌ Editar citas localmente
   - ❌ Cancelar citas
   - ❌ Registro en outbox
   - ❌ Validaciones locales

6. **Consumo de APIs** (0%)
   - ❌ HttpClient configurado
   - ❌ Endpoints implementados:
     - `/api/auth/login`, `/api/auth/refresh`, `/api/auth/logout`
     - `/api/catalogs?since=timestamp`
     - `/api/agenda?from=YYYY-MM-DD&to=YYYY-MM-DD`
     - `/api/appointments` (POST/PUT/DELETE)
   - ❌ Interceptor para tokens
   - ❌ Retry con backoff exponencial

7. **Multi-tenant** (20%)
   - ✅ Campo `companyId` en User interface
   - ❌ Aislamiento de datos en BD local
   - ❌ Filtrado por tenant en todas las queries

8. **Validaciones de Negocio** (0%)
   - ❌ Disponibilidad de staff
   - ❌ Detección de solapamientos
   - ❌ Duración conforme a servicios
   - ❌ Ventana de anticipación
   - ❌ Horarios de operación

---

## 📁 ESTRUCTURA DEL PROYECTO

```
agenda/
├── android/                      # ✅ Proyecto Android nativo
├── ios/                          # ✅ Proyecto iOS nativo
├── src/
│   ├── app/
│   │   ├── core/                 # 🟡 Servicios core (Auth implementado)
│   │   │   └── services/
│   │   │       └── auth.service.ts
│   │   ├── features/             # 🟢 Módulos por funcionalidad
│   │   │   ├── auth/
│   │   │   │   └── pages/login/
│   │   │   ├── agenda/
│   │   │   │   └── pages/agenda-main/
│   │   │   └── splash/
│   │   ├── home/                 # ✅ Menú principal
│   │   └── app.routes.ts         # ✅ Rutas configuradas
│   ├── assets/                   # Recursos estáticos
│   ├── theme/                    # ✅ Variables de tema
│   └── environments/             # 🟡 Configuración por entorno
├── capacitor.config.ts           # ⚠️ Pendiente actualizar appId
├── package.json                  # ✅ Dependencias instaladas
├── requisitos.txt                # 📋 Documento de requisitos
└── DOCUMENTACION_PROYECTO.md     # 📄 Este archivo
```

### Leyenda
- ✅ Completado
- 🟢 En buen estado
- 🟡 Parcialmente implementado
- ⚠️ Requiere atención
- ❌ No implementado

---

## 🔧 COMPONENTES IMPLEMENTADOS

### Servicios

#### AuthService (`core/services/auth.service.ts`)
**Propósito**: Manejo de autenticación y sesión de usuario

**Métodos Implementados**:
- `login(email, password)`: Login mock con simulación
- `loginWithGoogle()`: Preparado, sin OAuth real
- `loginWithMicrosoft()`: Preparado, sin OAuth real
- `logout()`: Limpiar sesión
- `refreshToken()`: Mock de renovación
- `isTokenValid()`: Verificación básica

**Propiedades Observables**:
- `currentUser$`: Usuario actual
- `isAuthenticated$`: Estado de autenticación

**Estado**: Mock funcional, listo para conectar con API

---

### Páginas

#### SplashPage
- **Ruta**: `/splash`
- **Función**: Pantalla inicial con logo y animación
- **Tiempo**: 3 segundos → redirect a login
- **Estado**: ✅ Completado

#### LoginPage
- **Ruta**: `/login`
- **Función**: Autenticación de usuarios
- **Métodos de login**:
  - Email/Password
  - Google OAuth (preparado)
  - Microsoft OAuth (preparado)
- **Estado**: ✅ UI completa, lógica mock

#### HomePage (Menú)
- **Ruta**: `/menu` o `/home`
- **Función**: Menú principal de navegación
- **Opciones**: Agenda, Perfil, Configuración, Logout
- **Estado**: ✅ Completado

#### AgendaMainPage
- **Ruta**: `/agenda`
- **Función**: Vista principal de la agenda
- **Componentes visuales**:
  - Banner superior motivacional
  - Header con notificaciones
  - Calendario semanal (7 días)
  - Timeline de citas (9 AM - 7 PM)
  - FAB para nueva cita
  - Bottom navigation (5 tabs)
  - ActionSheet de opciones
- **Estado**: ✅ UI completa, datos hardcoded

---

## 🔴 GAPS Y PENDIENTES

### CRÍTICOS (Bloqueantes para funcionalidad offline)

#### 1. Database Service
**Prioridad**: 🔴 CRÍTICA
**Archivos a crear**:
- `src/app/core/services/database.service.ts`
- `src/app/core/models/db-schema.ts`

**Tareas**:
- [ ] Inicializar SQLite con Capacitor
- [ ] Definir esquema de tablas completo
- [ ] Crear migrations
- [ ] Implementar métodos CRUD base
- [ ] Soporte multi-tenant (namespace por company_id)

**Tablas Requeridas**:
```sql
-- Configuración
companies (id, name, settings_json, created_at, updated_at)
branches (id, company_id, name, address, active, deleted)
services (id, company_id, name, duration_min, price, deleted, updated_at)
staff (id, company_id, name, active, schedule_json, deleted, updated_at)
status (id, company_id, name, color, deleted)
cancel_reasons (id, company_id, reason, deleted)
settings (id, company_id, key, value, updated_at)

-- Agenda
appointments (
  id,                    -- ID del servidor (null si es local)
  uuid_local,            -- UUID v4 generado localmente
  company_id,
  branch_id,
  service_id,
  staff_id,
  client_id,
  client_name,
  date,
  start_time,
  end_time,
  status,
  notes,
  sync_status,           -- 'pending' | 'synced' | 'conflict'
  version,
  created_at,
  updated_at,
  deleted
)

-- Sincronización
outbox (
  op_id,                 -- UUID de la operación
  type,                  -- 'CREATE_APPOINTMENT' | 'UPDATE_APPOINTMENT' | 'CANCEL_APPOINTMENT'
  company_id,
  payload,               -- JSON de la operación
  created_at,
  attempts,
  status,                -- 'pending' | 'processing' | 'completed' | 'failed'
  last_error
)

sync_state (
  id,
  company_id,
  resource,              -- 'catalogs' | 'agenda'
  last_full_sync,
  last_delta_sync,
  last_window_from,
  last_window_to
)
```

#### 2. API Service
**Prioridad**: 🔴 CRÍTICA
**Archivos a crear**:
- `src/app/core/services/api.service.ts`
- `src/app/core/interceptors/auth.interceptor.ts`
- `src/app/core/models/api-responses.ts`

**Tareas**:
- [ ] Configurar HttpClient
- [ ] Crear interceptor para agregar JWT en headers
- [ ] Implementar retry con exponential backoff
- [ ] Manejo de errores centralizado
- [ ] Timeout configurado (30s)

**Endpoints a implementar**:
```typescript
// Autenticación
POST   /api/auth/login       { email, password }
POST   /api/auth/refresh     { token }
POST   /api/auth/logout      { }

// Catálogos
GET    /api/catalogs?since=ISO8601

// Agenda
GET    /api/agenda?from=YYYY-MM-DD&to=YYYY-MM-DD&since=ISO8601

// Citas
POST   /api/appointments     { ...appointment, Idempotency-Key }
PUT    /api/appointments/:id { ...appointment }
DELETE /api/appointments/:id
POST   /api/appointments/:id/cancel
```

#### 3. Sync Service
**Prioridad**: 🔴 CRÍTICA
**Archivos a crear**:
- `src/app/core/services/sync.service.ts`
- `src/app/core/services/network.service.ts`

**Tareas**:
- [ ] Detectar cambios de conectividad (Capacitor Network)
- [ ] Implementar delta-pull de catálogos
- [ ] Implementar delta-pull de agenda
- [ ] Procesar outbox (push a servidor)
- [ ] Reconciliar IDs locales con IDs de servidor
- [ ] Detectar y resolver conflictos
- [ ] Triggers automáticos de sync

**Lógica de Sincronización**:
```typescript
// Pull (Descarga)
1. Verificar conectividad
2. Obtener last_delta_sync de sync_state
3. Llamar GET /api/catalogs?since={timestamp}
4. Aplicar upserts y soft deletes en BD local
5. Actualizar sync_state

// Push (Subida)
1. Obtener operaciones pendientes de outbox
2. Ordenar por created_at (FIFO)
3. Para cada operación:
   - Agregar header Idempotency-Key: {op_id}
   - Enviar a API correspondiente
   - Si éxito:
     - Reconciliar uuid_local → id_servidor
     - Actualizar sync_status = 'synced'
     - Eliminar de outbox
   - Si error:
     - Incrementar attempts
     - Guardar last_error
     - Aplicar backoff exponencial
```

#### 4. Appointment Service
**Prioridad**: 🔴 CRÍTICA
**Archivos a crear**:
- `src/app/core/services/appointment.service.ts`
- `src/app/core/models/appointment.model.ts`

**Tareas**:
- [ ] Crear cita offline (generar UUID v4)
- [ ] Guardar en BD local con sync_status='pending'
- [ ] Agregar a outbox
- [ ] Editar cita local
- [ ] Cancelar cita local
- [ ] Validaciones locales (disponibilidad, solapamientos)
- [ ] Obtener citas por rango de fechas
- [ ] Filtrar por staff, servicio, estatus

---

### ALTOS (Funcionalidad importante)

#### 5. Formularios de Citas
**Prioridad**: 🟠 ALTA
**Archivos a crear**:
- `src/app/features/agenda/pages/appointment-form/`

**Tareas**:
- [ ] Modal/Página de crear cita
- [ ] Selección de servicio (desde catálogo local)
- [ [ ] Selección de staff disponible
- [ ] Selección de fecha y hora
- [ ] Validación de disponibilidad en tiempo real
- [ ] Detección de solapamientos
- [ ] Guardar en BD local + outbox
- [ ] Modo edición
- [ ] Cancelación con motivo

#### 6. Catalog Service
**Prioridad**: 🟠 ALTA
**Archivos a crear**:
- `src/app/core/services/catalog.service.ts`

**Tareas**:
- [ ] Obtener servicios de BD local
- [ ] Obtener staff disponible
- [ ] Obtener sucursales
- [ ] Obtener estatus de citas
- [ ] Filtrado por company_id
- [ ] Caché en memoria para performance

---

### MEDIOS (Mejoras y optimizaciones)

#### 7. Configuración de Entorno
**Prioridad**: 🟡 MEDIA
**Archivo**: `src/environments/environment.ts`

**Actualizar con**:
```typescript
export const environment = {
  production: false,
  apiUrl: 'https://api.syserv.com',
  apiTimeout: 30000,
  syncIntervalMinutes: 5,
  offlineAgendaWeeks: 6,
  retryAttempts: 3,
  retryDelayMs: 1000
};
```

#### 8. Capacitor Config
**Prioridad**: 🟡 MEDIA
**Archivo**: `capacitor.config.ts`

**Actualizar**:
```typescript
const config: CapacitorConfig = {
  appId: 'com.syserv.agenda',      // Cambiar de 'io.ionic.starter'
  appName: 'SyServ Agenda',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchShowDuration: 0  // Usamos nuestro splash custom
    }
  }
};
```

#### 9. Pantalla de Estado de Sync
**Prioridad**: 🟡 MEDIA
**Archivos a crear**:
- `src/app/features/sync/pages/sync-status/`

**Componentes**:
- Indicador online/offline
- Última sincronización exitosa
- Cola de operaciones pendientes
- Errores y conflictos
- Botón "Sincronizar ahora"
- Log de actividad de sync

---

## 🗺️ ROADMAP DE DESARROLLO

### ✅ FASE 0: Fundamentos UI (COMPLETADO)
**Duración**: 1 semana
**Estado**: ✅ 100%

- [x] Configuración inicial de Ionic + Angular
- [x] Instalación de dependencias (SQLite, Capacitor)
- [x] Splash screen
- [x] Pantalla de login (diseño)
- [x] Menú principal
- [x] Vista de agenda (diseño)
- [x] Navegación entre pantallas
- [x] AuthService base

---

### 🔄 FASE 1: Capa de Datos (EN CURSO)
**Duración estimada**: 1.5 semanas
**Prioridad**: CRÍTICA
**Estado**: 🟡 0%

#### Objetivos
Implementar la base de datos local y los servicios de persistencia.

#### Tareas
1. **DatabaseService** (3 días)
   - [ ] Inicializar SQLite
   - [ ] Crear esquema completo de tablas
   - [ ] Implementar migrations
   - [ ] Métodos CRUD genéricos
   - [ ] Testing básico

2. **AppointmentService** (2 días)
   - [ ] CRUD de citas local
   - [ ] Generación de UUIDs
   - [ ] Queries por fecha/staff/servicio
   - [ ] Manejo de sync_status

3. **CatalogService** (2 días)
   - [ ] Servicios desde BD local
   - [ ] Staff desde BD local
   - [ ] Sucursales, estatus, motivos
   - [ ] Caché en memoria

**Entregables**:
- Base de datos SQLite funcional
- Servicios de lectura/escritura local
- Tests unitarios de servicios

---

### 🚀 FASE 2: Conectividad y APIs (PENDIENTE)
**Duración estimada**: 2 semanas
**Prioridad**: CRÍTICA
**Estado**: ❌ 0%

#### Objetivos
Conectar con el backend PHP y habilitar sincronización básica.

#### Tareas
1. **ApiService + Interceptors** (3 días)
   - [ ] Configurar HttpClient
   - [ ] Interceptor de autenticación (JWT)
   - [ ] Manejo de errores HTTP
   - [ ] Retry con exponential backoff
   - [ ] Timeout configurado

2. **NetworkService** (1 día)
   - [ ] Detección de conectividad
   - [ ] Eventos de cambio online/offline
   - [ ] Indicador visual en UI

3. **SyncService** (4 días)
   - [ ] Delta-pull de catálogos
   - [ ] Delta-pull de agenda
   - [ ] Push de outbox
   - [ ] Reconciliación de IDs
   - [ ] Detección de conflictos
   - [ ] Triggers automáticos

4. **Integración con AuthService** (2 días)
   - [ ] Login real con API
   - [ ] Refresh token automático
   - [ ] Logout con API
   - [ ] Validación JWT

**Entregables**:
- Consumo completo de APIs del backend
- Sincronización bidireccional funcional
- Manejo de conflictos implementado

---

### 📱 FASE 3: UI Funcional (PENDIENTE)
**Duración estimada**: 1.5 semanas
**Prioridad**: ALTA
**Estado**: ❌ 0%

#### Objetivos
Convertir los diseños en funcionalidad completa con datos reales.

#### Tareas
1. **Formulario de Citas** (3 días)
   - [ ] Modal de crear cita
   - [ ] Selección de servicio/staff
   - [ ] Picker de fecha y hora
   - [ ] Validaciones en tiempo real
   - [ ] Modo edición
   - [ ] Cancelación

2. **Mejoras en Agenda** (2 días)
   - [ ] Datos desde BD local (no mock)
   - [ ] Filtros funcionales
   - [ ] Vista de semana
   - [ ] Refresh pull-to-refresh
   - [ ] Indicadores de sync

3. **Pantalla de Sync Status** (1 día)
   - [ ] Estado de conexión
   - [ ] Cola de operaciones
   - [ ] Botón sync manual
   - [ ] Log de errores

**Entregables**:
- CRUD completo de citas funcional
- Datos reales desde BD y API
- UX fluida offline/online

---

### 🔒 FASE 4: Seguridad y Optimización (PENDIENTE)
**Duración estimada**: 1 semana
**Prioridad**: MEDIA
**Estado**: ❌ 0%

#### Tareas
1. **Seguridad** (2 días)
   - [ ] Migrar tokens a SecureStorage
   - [ ] Validación JWT con expiración
   - [ ] HTTPS enforcement
   - [ ] Sanitización de logs

2. **Performance** (3 días)
   - [ ] Virtual scroll en listas
   - [ ] Lazy loading optimizado
   - [ ] Compresión HTTP
   - [ ] Índices en BD SQLite
   - [ ] Profiling y optimización

**Entregables**:
- App segura para producción
- Performance optimizado

---

### 🧪 FASE 5: Testing y QA (PENDIENTE)
**Duración estimada**: 1 semana
**Prioridad**: ALTA
**Estado**: ❌ 0%

#### Tareas
- [ ] Tests de modo avión
- [ ] Tests de conflictos
- [ ] Tests de idempotencia
- [ ] Tests multi-tenant
- [ ] Tests de regresión
- [ ] Casos límite y edge cases

**Entregables**:
- Suite de tests completa
- Documento de casos de prueba

---

## 📝 CHANGELOG

### [2025-11-10] - Implementación Completa de UI Principal y Modo Oscuro

#### Agregado
- ✅ **Página de Perfil del Negocio** (`src/app/features/profile/pages/profile-main/`)
  - Header con avatar y descripción del negocio
  - 4 estadísticas clave (citas, clientes, calificación, ingresos)
  - Información de contacto completa (dirección, teléfono, email, web)
  - Horarios de atención con indicador del día actual
  - Grid de servicios ofrecidos con chips interactivos
  - Animaciones secuenciales de entrada
  - Soporte completo de modo oscuro

- ✅ **Página de Configuración** (`src/app/features/settings/pages/settings-main/`)
  - Toggle de modo oscuro funcional con persistencia
  - 4 toggles de notificaciones (Push, Email, SMS, Recordatorios) con persistencia
  - Slider de volumen (0-100) con persistencia en localStorage
  - Selector de idioma (Español, English, Português) con persistencia
  - Opciones de almacenamiento (limpiar caché, borrar datos)
  - Enlaces de privacidad y soporte
  - Información de la app (versión 1.0.0)
  - Soporte completo de modo oscuro

- ✅ **Sistema de Modo Oscuro Global**
  - Implementado en `src/theme/variables.scss` (180+ líneas de estilos)
  - Aplicación automática en `app.component.ts` al iniciar
  - Persistencia en localStorage
  - Soporte en todas las páginas: Home, Agenda, Perfil, Settings
  - Login forzado a modo claro (protección especial)

- ✅ **Integración de Perfil en Agenda**
  - Tab "Negocio" en bottom navigation muestra perfil completo
  - Mismo contenido que la página de perfil standalone
  - Navegación condicional (muestra banner/header/calendario solo en tab Citas)
  - +380 líneas de estilos específicos para business content en agenda

#### Modificado
- ✅ **Menú Principal (Home)**
  - Mejorado espaciado entre iconos y texto (1.5rem margin-top)
  - Habilitada navegación a Perfil y Configuración
  - Agregado soporte completo de modo oscuro

- ✅ **Vista de Agenda**
  - Agregado contenido de perfil en tab "Negocio"
  - Optimizado display condicional de elementos según tab activo
  - Soporte completo de modo oscuro con estilos mejorados
  - Importados componentes adicionales (IonCard, IonAvatar, IonGrid, IonChip)
  - Registrados 14 iconos adicionales para el perfil

- ✅ **Login Page**
  - Protección especial contra modo oscuro
  - Forzado a modo claro siempre usando `:host-context(body.dark)` overrides
  - Solución a problema de ViewEncapsulation de Angular

- ✅ **App Component**
  - Agregado `ngOnInit()` con carga de preferencia de modo oscuro
  - Aplicación automática del tema al iniciar la app

#### Técnico
- **Persistencia en localStorage**:
  - `darkMode`: boolean (tema global)
  - `notificationVolume`: number 0-100
  - `selectedLanguage`: string ('es', 'en', 'pt')
  - `notificationSettings`: objeto JSON con 4 preferencias

- **Nuevas rutas**:
  - `/profile` → ProfileMainPage
  - `/settings` → SettingsMainPage

- **Arquitectura de estilos para modo oscuro**:
  - Estilos globales en `variables.scss` (body.dark)
  - Estilos por componente usando `:host-context(body.dark)`
  - Protección especial en login con overrides `!important`

- **Archivos modificados/creados**: 12
  - Creados: profile-main.page (ts/html/scss), settings-main.page (ts/html/scss)
  - Modificados: app.component.ts, app.routes.ts, home.page (ts/scss), agenda-main.page (ts/html/scss), login.page.scss, variables.scss

#### Progreso Actualizado
- **UI/Diseño**: 65% → 85% (+20%)
- **Lógica de Negocio**: 10% → 15% (+5%)

### [2025-11-08] - Traducción Completa al Español

#### Modificado
- ✅ Traducido todos los textos visibles al usuario:
  - Días de la semana: SUN→DOM, MON→LUN, TUE→MAR, WED→MIÉ, THU→JUE, FRI→VIE, SAT→SÁB
  - "Today" → "Hoy"
  - Mensajes de autenticación en español
  - "Login exitoso" → "Inicio de sesión exitoso"
- ✅ Actualizada documentación del proyecto

### [2025-11-08] - Diseño UI y Documentación Inicial

#### Agregado
- ✅ Splash screen con animaciones
- ✅ Login page con soporte OAuth preparado
- ✅ AuthService base con estructura completa
- ✅ Menú principal (HomePage)
- ✅ Vista de agenda con timeline y calendario semanal
- ✅ ActionSheet de opciones con "Volver al Menú"
- ✅ Bottom navigation con 5 tabs
- ✅ FAB para nueva cita
- ✅ Loading screen en agenda
- ✅ Sistema de rutas configurado
- ✅ Documento de requisitos (`requisitos.txt`)
- ✅ Este archivo de documentación

#### Modificado
- ✅ Ajustado tamaño de cards de citas:
  - Altura de slot: 260px
  - Grid slot: 65px
  - Padding de card: 2rem x 1.75rem
  - Fuentes aumentadas para mejor legibilidad
- ✅ Optimizado espaciado en timeline
- ✅ Mejorados estilos de las etiquetas de hora

#### Notas Técnicas
- Actualmente usando datos mock para demostración
- AuthService usa localStorage temporal (migrar a SecureStorage)
- SQLite instalado pero no inicializado
- Todas las APIs están preparadas con TODOs

---

## 📚 NOTAS TÉCNICAS

### Decisiones de Arquitectura

#### 1. Standalone Components
**Decisión**: Usar standalone components sin NgModules
**Razón**: Arquitectura moderna de Angular 20, mejor tree-shaking, carga más rápida
**Impacto**: Todos los componentes importan sus dependencias directamente

#### 2. Lazy Loading
**Decisión**: Cargar páginas bajo demanda con loadComponent
**Razón**: Reducir tamaño inicial del bundle
**Implementación**:
```typescript
{
  path: 'agenda',
  loadComponent: () => import('./features/agenda/pages/agenda-main/agenda-main.page')
    .then((m) => m.AgendaMainPage)
}
```

#### 3. RxJS para Estado
**Decisión**: BehaviorSubject + Observables para estado de autenticación
**Razón**: Reactive programming, fácil de subscribirse desde múltiples componentes
**Ejemplo**: `currentUser$`, `isAuthenticated$`

#### 4. LocalStorage Temporal
**Decisión actual**: localStorage para tokens (TEMPORAL)
**Plan futuro**: Migrar a Capacitor SecureStorage
**Razón**: localStorage no es seguro para tokens JWT en producción

#### 5. Sistema de Modo Oscuro
**Decisión**: Implementación manual con clase `body.dark`
**Razón**: Control total sobre el tema, mejor que `prefers-color-scheme`
**Implementación**:
- Toggle en Settings aplica/remueve clase `dark` en `<body>`
- Persistencia en localStorage con clave `darkMode`
- Carga automática en `app.component.ts` ngOnInit
- Estilos globales en `variables.scss` (body.dark)
- Estilos por componente con `:host-context(body.dark)`

**Desafío de ViewEncapsulation**:
- Angular encapsula estilos por defecto
- Selector `body.dark` no funciona dentro de componentes
- **Solución**: Usar `:host-context(body.dark)` que sí atraviesa el shadow DOM
- **Excepción Login**: Protección especial con overrides `!important` para mantenerlo siempre en claro

**Ejemplo**:
```scss
// ❌ NO FUNCIONA en componentes Angular
body.dark {
  .my-element {
    color: white;
  }
}

// ✅ FUNCIONA correctamente
:host-context(body.dark) {
  .my-element {
    color: white;
  }
}
```

---

### Convenciones de Código

#### Nomenclatura
- **Servicios**: `*.service.ts` (ej: `auth.service.ts`)
- **Páginas**: `*.page.ts` (ej: `login.page.ts`)
- **Modelos**: `*.model.ts` (ej: `appointment.model.ts`)
- **Interfaces**: PascalCase (ej: `User`, `LoginResponse`)

#### Estructura de Carpetas
```
features/
  feature-name/
    pages/
      page-name/
        page-name.page.ts
        page-name.page.html
        page-name.page.scss
    components/    # Si hay componentes reutilizables
    services/      # Si hay servicios específicos del feature
```

#### Imports
Orden recomendado:
1. Angular core
2. Ionic
3. RxJS
4. Third-party
5. App (servicios, modelos)

---

### Esquema de Base de Datos Local

#### Consideraciones Multi-Tenant
- **Todas las tablas** deben tener `company_id`
- **Queries** siempre filtrar por `company_id` del usuario actual
- **Índices** compuestos en `(company_id, ...)` para performance

#### Soft Deletes
- Campo `deleted` (boolean) en lugar de DELETE físico
- Razón: Sincronización requiere saber qué se eliminó

#### Campos de Auditoría
Todas las tablas deben tener:
- `created_at`: Timestamp de creación
- `updated_at`: Timestamp de última modificación
- `version`: Entero incremental para detección de conflictos

---

### Sincronización - Casos Especiales

#### Conflicto de Edición
**Escenario**: Usuario edita cita offline, servidor también la editó

**Resolución**:
1. Comparar `version` local vs servidor
2. Si servidor tiene version mayor:
   - Política por defecto: **Servidor Gana**
   - Marcar como 'conflict' en sync_status
   - Mostrar UI para que usuario decida
3. Usuario puede:
   - Aceptar cambios del servidor (descartar locales)
   - Mantener cambios locales (reintentar UPDATE con nueva version)

#### Cancelación vs Edición
**Escenario**: Cita cancelada en servidor, editada localmente

**Resolución**:
- **Cancelación prevalece** siempre
- Descartar edición local
- Notificar usuario

#### Citas Creadas Offline
**Flujo**:
1. Generar `uuid_local` (UUID v4)
2. Guardar con `id = null`, `sync_status = 'pending'`
3. Agregar a outbox con `type = 'CREATE_APPOINTMENT'`
4. En sync:
   - POST a `/api/appointments` con `Idempotency-Key: {uuid_local}`
   - Servidor responde con `id` definitivo
   - Actualizar `id` local y `sync_status = 'synced'`
   - Eliminar de outbox

---

### Variables de Entorno

#### Desarrollo (`environment.ts`)
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api',  // Backend local
  apiTimeout: 30000,
  syncIntervalMinutes: 5,
  offlineAgendaWeeks: 6,
  enableDebugLogs: true
};
```

#### Producción (`environment.prod.ts`)
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.syserv.com/api',
  apiTimeout: 30000,
  syncIntervalMinutes: 10,
  offlineAgendaWeeks: 4,
  enableDebugLogs: false
};
```

---

### APIs del Backend - Contrato de Datos

#### Autenticación

##### POST /api/auth/login
**Request**:
```json
{
  "email": "user@example.com",
  "password": "secreto123"
}
```

**Response (200 OK)**:
```json
{
  "success": true,
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "Usuario Demo",
    "company_id": 14
  },
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
  "expires_in": 3600
}
```

#### Catálogos

##### GET /api/catalogs?since=2025-11-04T00:00:00Z
**Response**:
```json
{
  "since": "2025-11-04T00:00:00Z",
  "services": [
    {
      "id": 64178,
      "company_id": 14,
      "name": "Corte caballero",
      "duration_min": 45,
      "price": 150.00,
      "updated_at": "2025-11-05T10:00:00Z",
      "deleted": false
    }
  ],
  "staff": [
    {
      "id": 112,
      "company_id": 14,
      "name": "Dante",
      "active": true,
      "schedule": {...},
      "updated_at": "2025-11-05T09:40:00Z",
      "deleted": false
    }
  ],
  "branches": [...],
  "status": [...],
  "cancel_reasons": [...]
}
```

#### Agenda

##### GET /api/agenda?from=2025-11-01&to=2025-11-30&since=2025-11-04T00:00:00Z
**Response**:
```json
{
  "appointments": [
    {
      "id": 2487712,
      "uuid_local": "d5e0c2f0-8a4f-4a93-9b53-2d1c0c9f9c1b",
      "company_id": 14,
      "branch_id": 3,
      "service_id": 64178,
      "staff_id": 112,
      "client_id": 55631,
      "client_name": "Juan Pérez",
      "date": "2025-11-05",
      "start_time": "15:30",
      "end_time": "16:15",
      "status": "Confirmada",
      "notes": "Primera vez",
      "version": 7,
      "updated_at": "2025-11-05T15:42:11Z",
      "deleted": false
    }
  ]
}
```

#### Crear Cita

##### POST /api/appointments
**Headers**:
```
Authorization: Bearer {token}
Idempotency-Key: {uuid_local}
```

**Request**:
```json
{
  "uuid_local": "a1b2c3d4-...",
  "company_id": 14,
  "branch_id": 3,
  "service_id": 64178,
  "staff_id": 112,
  "client_name": "Juan Pérez",
  "date": "2025-11-05",
  "start_time": "15:30",
  "notes": "Primera vez"
}
```

**Response (201 Created)**:
```json
{
  "success": true,
  "appointment": {
    "id": 2487712,
    "uuid_local": "a1b2c3d4-...",
    ...resto de campos
  }
}
```

---

### Performance - Recomendaciones

#### Índices SQLite
```sql
-- Citas por fecha y empresa
CREATE INDEX idx_appointments_date_company
ON appointments(company_id, date, start_time);

-- Citas por staff
CREATE INDEX idx_appointments_staff
ON appointments(company_id, staff_id, date);

-- Sincronización
CREATE INDEX idx_appointments_sync
ON appointments(sync_status, updated_at);

-- Outbox pendiente
CREATE INDEX idx_outbox_pending
ON outbox(status, created_at)
WHERE status = 'pending';
```

#### Virtual Scroll
Para listas de más de 50 elementos, usar `ion-virtual-scroll`:
```html
<ion-virtual-scroll [items]="appointments" approxItemHeight="100px">
  <ion-item *virtualItem="let appointment">
    <!-- Contenido -->
  </ion-item>
</ion-virtual-scroll>
```

---

### Seguridad - Checklist

- [ ] Migrar tokens de localStorage a Capacitor SecureStorage
- [ ] Validar expiración de JWT antes de cada request
- [ ] Implementar refresh token automático
- [ ] Sanitizar inputs de usuario
- [ ] No loggear información sensible en producción
- [ ] Implementar Certificate Pinning (opcional, avanzado)
- [ ] Validar permisos por tenant en cada operación
- [ ] Encriptar base de datos local (opcional, para datos muy sensibles)

---

## 🔗 RECURSOS Y REFERENCIAS

### Documentación Oficial
- [Ionic Framework](https://ionicframework.com/docs)
- [Angular](https://angular.dev)
- [Capacitor](https://capacitorjs.com/docs)
- [SQLite Plugin](https://github.com/capacitor-community/sqlite)

### Guías Útiles
- [Offline First Apps](https://offlinefirst.org/)
- [PWA Best Practices](https://web.dev/progressive-web-apps/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)

---

## 📞 CONTACTO Y SOPORTE

### Desarrollo
- **Proyecto**: Agenda Offline SyServ
- **Backend**: PHP (existente)
- **Frontend**: Ionic + Angular

### Próximos Pasos
1. Revisar y aprobar este documento
2. Iniciar Fase 1: Implementar DatabaseService
3. Configurar entornos (dev/prod)
4. Definir flujo de trabajo Git

---

**Fin del documento** | Última actualización: 2025-11-08
