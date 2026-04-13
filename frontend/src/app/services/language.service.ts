import { Injectable, signal } from '@angular/core';

export type Lang = 'en' | 'es' | 'ca';

type Translations = Record<string, string>;

const EN: Translations = {
  // Navbar
  'nav.whatWeOffer': 'WHAT WE OFFER',
  'nav.reviews': 'REVIEWS',
  'nav.join': 'JOIN',
  'nav.admin': 'Admin',
  'nav.dashboard': 'Dashboard',
  'nav.profile': 'Profile',
  'nav.logout': 'Log out',
  'nav.tagline': 'LIVE GREAT EXPERIENCES',

  // Home — Hero
  'home.hero.title': 'TAKE YOUR <span>TRAVEL</span> PLANS EVEN FURTHER WITH US.',
  'home.hero.subtitle': 'A new beginning brings great experiences',
  'home.hero.placeholder': 'SEARCH YOUR DESTINATION',
  'home.modal.title': 'START PLANNING YOUR TRIP!',
  'home.modal.info': 'To start planning your next adventure, you need to choose the country you want to visit',
  'home.modal.select': 'SELECT YOUR COUNTRY',
  'home.banner.title': 'YOUR TRIP, ORGANISED BETTER THAN ANY TRAVEL AGENCY',
  'home.banner.explore': 'Explore the incredible',
  'home.banner.discover': 'Discover Europe like never before!',

  // Home — Reviews
  'home.reviews.title': 'What our users say?',
  'home.reviews.back': 'BACK',
  'home.reviews.card1': 'The management of my relocation to Europe was impeccable. Not only did they find the ideal accommodation, but the medical insurance they recommended gave us complete peace of mind from day one. A 10/10 service.',
  'home.reviews.card2': "Honestly, I didn't know where to start with the health and visa paperwork. The team handled all the bureaucracy quickly and effectively. Very grateful for the personal attention received.",
  'home.reviews.card3': 'What I value most is their reliability. Moving to another country is stressful, but having real 24/7 medical support changes everything. It has been the best decision for my family.',
  'home.reviews.card4': 'An incredibly reliable platform. The entire document management process was transparent and organised. I recommend it to anyone looking for a professional transition.',
  'home.reviews.card5': 'Excellent experience. Moving for work is usually chaotic, but thanks to their logistical and health support I felt at home from the first week. Very well organised.',
  'home.reviews.card6': 'From now on, I will handle all my international arrangements with this team. The quality of the medical and housing advice exceeds any expectation I had.',

  // Home — Footer
  'home.footer.social': 'Our social media:',
  'home.footer.legal': 'Legal',
  'home.footer.privacy': 'Privacy Policy',
  'home.footer.legalNotice': 'Legal Notice',
  'home.footer.refund': 'Refund Policy',
  'home.footer.partners': 'Partner companies:',
  'home.footer.payment': 'Payment methods:',
  'home.footer.contact': 'Contact us:',
  'home.footer.hours': 'Monday to Thursday 08:00 – 18:00\nFriday 08:00 – 14:30',
  'home.footer.copyright': '"Building memories and unforgettable adventures"',

  // Login
  'login.headline': 'A new beginning awaits you.',
  'login.subtitle': 'Sign in to manage your travel plans and personalised services.',
  'login.welcome': 'Welcome back',
  'login.enterDetails': 'Please enter your details to sign in',
  'login.password': 'Password',
  'login.passwordPlaceholder': 'Your password',
  'login.submit': 'Sign in',
  'login.noAccount': "Don't have an account?",
  'login.register': 'Register for free',
  'login.badCredentials': 'Invalid credentials',

  // Register
  'register.headline': 'Join our community.',
  'register.subtitle': 'Relocation and international medical services experts at your fingertips.',
  'register.title': 'Create your account',
  'register.start': 'Start your journey today',
  'register.username': 'Username',
  'register.usernamePlaceholder': '@your_username',
  'register.firstname': 'First name',
  'register.firstnamePlaceholder': 'Your name',
  'register.lastname': 'Last name',
  'register.lastnamePlaceholder': 'Last name',
  'register.destination': 'Destination Country (Optional)',
  'register.destinationPlaceholder': 'e.g. Germany',
  'register.password': 'Password',
  'register.passwordPlaceholder': 'Min. 6 characters',
  'register.submit': 'Register',
  'register.hasAccount': 'Already have an account?',
  'register.login': 'Sign in',
  'register.error': 'Registration error. Please check your data.',

  // Dashboard
  'dash.welcome': 'Welcome',
  'dash.summary': 'Here is a summary of your available services and travel plans.',
  'dash.services': 'Medical & Relocation Services',
  'dash.requestInfo': 'Request Information',
  'dash.plans': 'Follow-up Plans',
  'dash.choosePlan': 'Choose this Plan',
  'dash.perMonth': '/mo',

  // Profile — view
  'profile.username': 'Username',
  'profile.email': 'Email',
  'profile.firstname': 'First name',
  'profile.lastname': 'Last name',
  'profile.phone': 'Phone',
  'profile.nationality': 'Nationality',
  'profile.nationalityPlaceholder': 'Spanish, French...',
  'profile.idPassport': 'ID / Passport',
  'profile.dob': 'Date of Birth',
  'profile.emergencyContact': 'Emergency Contact',
  'profile.emergencyPlaceholder': 'Name - Phone',
  'profile.destination': 'Destination Country',
  'profile.passportExpiry': 'Passport Expiry',
  'profile.preferredLanguage': 'Preferred Language',
  'profile.address': 'Address',
  'profile.city': 'City',
  'profile.postalCode': 'Postal Code',
  'profile.gender': 'Gender',
  'profile.editBtn': 'Edit Profile',
  'profile.userList': 'User List',
  'profile.role': 'Role',
  'profile.sectionAccount': 'Account Information',
  'profile.sectionPassport': 'Passport & Travel',
  'profile.sectionPersonal': 'Personal Details',
  'profile.sectionAddress': 'Address & Location',
  // Profile — edit
  'profile.updateTitle': 'Update Profile',
  'profile.cancel': 'Cancel',
  'profile.saving': 'Saving...',
  'profile.save': 'Save Changes',
  'profile.select': 'Select option...',
  'profile.successMsg': 'Profile updated successfully!',
  'profile.sessionExpired': 'Session expired. Please log in again.',
  'profile.sessionExpiredShort': 'Your session has expired. Please log in again.',
  'profile.updateError': 'Error updating profile.',
  'profile.addUser': 'Add User',
  'profile.delete': 'Delete',
  'profile.confirmDeleteUser': 'Are you sure you want to delete this user?',
  'profile.userDeleted': 'User deleted successfully',
  'profile.registeringUser': 'Registering user...',
  'profile.userAddedSuccess': 'User registered successfully!',

  // App (root)
  'app.tagline': 'Your new life starts here. Professional services for your relocation.',
  'app.ourServices': 'Our Services',
  'app.supportPlans': 'Support Plans',
  'app.moreInfo': 'More info',
  'app.subscribe': 'Subscribe',
  'app.loadingServices': 'Loading services from the backend...',
  'app.loadingPlans': 'Loading plans from the backend...',
  'app.perMonth': '/mo',

  // Packs
  'packs.title': 'Choose your experience in',
  'packs.tagline': 'Your new life starts here. Professional relocation services.',
  'packs.accommodation': 'Accommodation Packs',
  'packs.activities': 'Activity Packs',
  'packs.medical': 'Medical Insurance Packs',
  'packs.joint': 'Joint Packs (All-in-One)',
  'packs.select': 'Select Pack',
  'packs.back': 'GO BACK',
  'packs.decor.oslo': 'SCANDI LIVING',
  'packs.decor.munich': 'BAVARIAN HEART',
  'packs.decor.london': 'BRITISH SPIRIT',
  'packs.decor.madrid': 'SPANISH SOUL',
  'packs.decor.default': 'EXPLORE MORE',

  // Pack Features
  'packs.feat.apt': 'Premium Apartments',
  'packs.feat.coliving': 'Co-living spaces',
  'packs.feat.location': 'Central locations',
  'packs.feat.tours': 'City tours',
  'packs.feat.guides': 'Nightlife guides',
  'packs.feat.culture': 'Cultural events',
  'packs.feat.support': '24/7 Support',
  'packs.feat.global': 'Global coverage',
  'packs.feat.clinics': 'Local clinics',
  'packs.feat.reloc': 'Full Relocation',
  'packs.feat.all': 'Everything included',
  'packs.feat.value': 'Best value',

  'admin.users': 'Users',
  'admin.accommodations': 'Accommodations',
  'admin.activities': 'Activities',

  // Categories
  'city': 'City',
  'country': 'Country',

  // Destinations
  'dest.oslo': 'Oslo',
  'dest.munich': 'Munich',
  'dest.london': 'London',
  'dest.madrid': 'Madrid',
  'dest.norway': 'Norway',
  'dest.germany': 'Germany',
  'dest.uk': 'United Kingdom',
  'dest.spain': 'Spain',
  'dest.france': 'France',
  'dest.berlin': 'Berlin',
  'dest.bremen': 'Bremen',
  'dest.lubeck': 'Lübeck',
  'dest.marseille': 'Marseille',
  'dest.marsella': 'Marseille',
  'dest.toulouse': 'Toulouse',
  'dest.tours': 'Tours',
};

const ES: Translations = {
  // Navbar
  'nav.whatWeOffer': '¿QUÉ OFRECEMOS?',
  'nav.reviews': 'VALORACIONES',
  'nav.join': 'ÚNETE',
  'nav.admin': 'Admin',
  'nav.dashboard': 'Panel',
  'nav.profile': 'Perfil',
  'nav.logout': 'Salir',
  'nav.tagline': 'VIVE GRANDES EXPERIENCIAS',

  // Home — Hero
  'home.hero.title': 'MEJORA AÚN MÁS TUS <span>PLANES</span> DE VIAJE CON NOSOTROS.',
  'home.hero.subtitle': 'Un nuevo comienzo, conlleva grandes experiencias',
  'home.hero.placeholder': 'BUSCA TU DESTINO',
  'home.modal.title': '¡COMIENZA A PLANEAR TU VIAJE!',
  'home.modal.info': 'Para poder empezar a planificar tu próxima aventura, deberás escoger el país al que quieres visitar',
  'home.modal.select': 'SELECCIONA TU PAÍS',
  'home.banner.title': 'TU VIAJE, ORGANIZADO MEJOR QUE POR UNA AGENCIA',
  'home.banner.explore': 'Explora lo increíble',
  'home.banner.discover': '¡Descubre Europa como nunca antes!',

  // Home — Reviews
  'home.reviews.title': '¿Qué dicen nuestros usuarios?',
  'home.reviews.back': 'VOLVER',
  'home.reviews.card1': 'La gestión de mi traslado a Europa fue impecable. No solo encontraron el alojamiento ideal, sino que el seguro médico que nos recomendaron nos dio total tranquilidad desde el primer día. Un servicio de 10.',
  'home.reviews.card2': 'Sinceramente, no sabía por dónde empezar con los trámites de salud y visados. El equipo se encargó de toda la burocracia de forma rápida y efectiva. Muy agradecida por el trato personal recibido.',
  'home.reviews.card3': 'Lo que más valoro es la seriedad. Mudarse de país es estresante, pero tener un soporte médico real disponible 24/7 lo cambia todo. Ha sido la mejor decisión para mi familia.',
  'home.reviews.card4': 'Una plataforma increíblemente confiable. Todo el proceso de administración de mis documentos fue transparente y organizado. La recomiendo a cualquiera que busque una transición profesional.',
  'home.reviews.card5': 'Experiencia excelente. Mudarse por trabajo suele ser caótico, pero gracias a su apoyo logístico y sanitario me sentí como en casa desde la primera semana. Muy buena organización.',
  'home.reviews.card6': 'A partir de ahora, todas mis gestiones internacionales las haré con este equipo. La calidad del asesoramiento médico y de vivienda supera cualquier expectativa que tuviera.',

  // Home — Footer
  'home.footer.social': 'Nuestras redes sociales:',
  'home.footer.legal': 'Temas Legales',
  'home.footer.privacy': 'Política de privacidad',
  'home.footer.legalNotice': 'Aviso Legal',
  'home.footer.refund': 'Política de Devoluciones',
  'home.footer.partners': 'Compañías asociadas:',
  'home.footer.payment': 'Métodos de pago:',
  'home.footer.contact': 'Contacta con nosotros:',
  'home.footer.hours': 'Lunes a jueves de 08:00 a 18:00\nViernes de 08:00 a 14:30',
  'home.footer.copyright': '"Construyendo recuerdos y aventuras inolvidables"',

  // Login
  'login.headline': 'Un nuevo comienzo te espera.',
  'login.subtitle': 'Inicia sesión para gestionar tus planes de viaje y servicios personalizados.',
  'login.welcome': 'Bienvenido',
  'login.enterDetails': 'Por favor, introduce tus datos para entrar',
  'login.password': 'Contraseña',
  'login.passwordPlaceholder': 'Tu contraseña',
  'login.submit': 'Entrar',
  'login.noAccount': '¿No tienes cuenta?',
  'login.register': 'Regístrate gratis',
  'login.badCredentials': 'Credenciales incorrectas',

  // Register
  'register.headline': 'Únete a nuestra comunidad.',
  'register.subtitle': 'Expertos en reubicación y servicios médicos internacionales a tu alcance.',
  'register.title': 'Crea tu cuenta',
  'register.start': 'Empieza tu proceso hoy mismo',
  'register.username': 'Nombre de Usuario',
  'register.usernamePlaceholder': '@tu_usuario',
  'register.firstname': 'Nombre',
  'register.firstnamePlaceholder': 'Tu nombre',
  'register.lastname': 'Apellidos',
  'register.lastnamePlaceholder': 'Apellidos',
  'register.destination': 'País de Destino (Opcional)',
  'register.destinationPlaceholder': 'Ej: Alemania',
  'register.password': 'Contraseña',
  'register.passwordPlaceholder': 'Mín. 6 caracteres',
  'register.submit': 'Registrarse',
  'register.hasAccount': '¿Ya tienes cuenta?',
  'register.login': 'Inicia sesión',
  'register.error': 'Error en el registro. Verifica los datos.',

  // Dashboard
  'dash.welcome': 'Bienvenido',
  'dash.summary': 'Aquí tienes un resumen de tus servicios y planes de viaje disponibles.',
  'dash.services': 'Servicios Médicos y Reubicación',
  'dash.requestInfo': 'Solicitar Información',
  'dash.plans': 'Planes de Seguimiento',
  'dash.choosePlan': 'Elegir este Plan',
  'dash.perMonth': '/mes',

  // Profile — view
  'profile.username': 'Usuario',
  'profile.email': 'Email',
  'profile.firstname': 'Nombre',
  'profile.lastname': 'Apellidos',
  'profile.phone': 'Teléfono',
  'profile.nationality': 'Nacionalidad',
  'profile.nationalityPlaceholder': 'Español, Francés...',
  'profile.idPassport': 'DNI / Pasaporte',
  'profile.dob': 'Fecha de Nacimiento',
  'profile.emergencyContact': 'Contacto de Emergencia',
  'profile.emergencyPlaceholder': 'Nombre - Tel',
  'profile.destination': 'País de Destino',
  'profile.passportExpiry': 'Expiración Pasaporte',
  'profile.preferredLanguage': 'Idioma de Preferencia',
  'profile.address': 'Dirección',
  'profile.city': 'Ciudad',
  'profile.postalCode': 'Código Postal',
  'profile.gender': 'Género',
  'profile.editBtn': 'Editar Perfil',
  'profile.userList': 'Lista de Usuarios',
  'profile.role': 'Rol',
  'profile.sectionAccount': 'Información de Cuenta',
  'profile.sectionPassport': 'Pasaporte y Viaje',
  'profile.sectionPersonal': 'Datos Personales',
  'profile.sectionAddress': 'Dirección y Localización',
  // Profile — edit
  'profile.updateTitle': 'Actualizar Perfil',
  'profile.cancel': 'Cancelar',
  'profile.saving': 'Guardando...',
  'profile.save': 'Guardar Cambios',
  'profile.select': 'Selecciona una opción...',
  'profile.successMsg': '¡Perfil actualizado correctamente!',
  'profile.sessionExpired': 'Sesión expirada. Por favor, inicia sesión de nuevo.',
  'profile.sessionExpiredShort': 'Tu sesión ha caducado. Vuelve a entrar.',
  'profile.updateError': 'Error al actualizar el perfil.',
  'profile.addUser': 'Añadir Usuario',
  'profile.delete': 'Eliminar',
  'profile.confirmDeleteUser': '¿Estás seguro de que deseas eliminar este usuario?',
  'profile.userDeleted': 'Usuario eliminado correctamente',
  'profile.registeringUser': 'Registrando usuario...',
  'profile.userAddedSuccess': '¡Usuario registrado con éxito!',

  // App (root)
  'app.tagline': 'Tu nueva vida comienza aquí. Servicios profesionales para tu reubicación.',
  'app.ourServices': 'Nuestros Servicios',
  'app.supportPlans': 'Planes de Apoyo',
  'app.moreInfo': 'Más información',
  'app.subscribe': 'Suscribirse',
  'app.loadingServices': 'Cargando servicios desde el backend...',
  'app.loadingPlans': 'Cargando planes desde el backend...',
  'app.perMonth': '/mes',

  // Packs
  'packs.title': 'Elige tu experiencia en',
  'packs.tagline': 'Tu nueva vida comienza aquí. Servicios profesionales para tu reubicación.',
  'packs.accommodation': 'Packs de Alojamiento',
  'packs.activities': 'Packs de Actividades',
  'packs.medical': 'Packs de Seguro Médico',
  'packs.joint': 'Packs Conjuntos',
  'packs.select': 'Seleccionar Pack',
  'packs.back': 'VOLVER',
  'packs.decor.oslo': 'ESTILO ESCANDINAVO',
  'packs.decor.munich': 'CORAZÓN BÁVARO',
  'packs.decor.london': 'ESPÍRITU BRITÁNICO',
  'packs.decor.madrid': 'ALMA ESPAÑOLA',
  'packs.decor.default': 'EXPLORA MÁS',

  // Pack Features
  'packs.feat.apt': 'Apartamentos Premium',
  'packs.feat.coliving': 'Espacios de Co-living',
  'packs.feat.location': 'Ubicaciones céntricas',
  'packs.feat.tours': 'Tours por la ciudad',
  'packs.feat.guides': 'Guías nocturnos',
  'packs.feat.culture': 'Eventos culturales',
  'packs.feat.support': 'Soporte 24/7',
  'packs.feat.global': 'Cobertura global',
  'packs.feat.clinics': 'Clínicas locales',
  'packs.feat.reloc': 'Reubicación completa',
  'packs.feat.all': 'Todo incluido',
  'packs.feat.value': 'Mejor relación calidad-precio',

  'admin.users': 'Usuarios',
  'admin.accommodations': 'Alojamientos',
  'admin.activities': 'Actividades',

  // Categories
  'city': 'Ciudad',
  'country': 'País',

  // Destinations
  'dest.oslo': 'Oslo',
  'dest.munich': 'Múnich',
  'dest.london': 'Londres',
  'dest.madrid': 'Madrid',
  'dest.norway': 'Noruega',
  'dest.germany': 'Alemania',
  'dest.uk': 'Reino Unido',
  'dest.spain': 'España',
  'dest.france': 'Francia',
  'dest.berlin': 'Berlín',
  'dest.bremen': 'Bremen',
  'dest.lubeck': 'Lübeck',
  'dest.marseille': 'Marsella',
  'dest.marsella': 'Marsella',
  'dest.toulouse': 'Toulouse',
  'dest.tours': 'Tours',
};

const CA: Translations = {
  // Navbar
  'nav.whatWeOffer': 'QUÈ OFERIM?',
  'nav.reviews': 'VALORACIONS',
  'nav.join': 'UNEIX-TE',
  'nav.admin': 'Admin',
  'nav.dashboard': 'Tauler',
  'nav.profile': 'Perfil',
  'nav.logout': 'Sortir',
  'nav.tagline': 'VIU GRANS EXPERIÈNCIES',

  // Home — Hero
  'home.hero.title': "MILLORA ENCARA MÉS ELS TEUS <span>PLANS</span> DE VIATGE AMB NOSALTRES.",
  'home.hero.subtitle': 'Un nou començament porta grans experiències',
  'home.hero.placeholder': 'CERCA LA TEVA DESTINACIÓ',
  'home.modal.title': 'COMENÇA A PLANIFICAR EL TEU VIATGE!',
  'home.modal.info': "Per poder començar a planificar la teva propera aventura, hauràs d'escollir el país que vols visitar",
  'home.modal.select': 'SELECCIONA EL TEU PAÍS',
  'home.banner.title': "EL TEU VIATGE, ORGANITZAT MILLOR QUE PER UNA AGÈNCIA",
  'home.banner.explore': "Explora l'increïble",
  'home.banner.discover': 'Descobreix Europa com mai!',

  // Home — Reviews
  'home.reviews.title': 'Què diuen els nostres usuaris?',
  'home.reviews.back': 'TORNAR',
  'home.reviews.card1': "La gestió del meu trasllat a Europa va ser impecable. No només van trobar l'allotjament ideal, sinó que l'assegurança mèdica que ens van recomanar ens va donar total tranquil·litat des del primer dia. Un servei de 10.",
  'home.reviews.card2': "Sincerament, no sabia per on començar amb els tràmits de salut i visats. L'equip es va encarregar de tota la burocràcia de manera ràpida i efectiva. Molt agraïda pel tracte personal rebut.",
  'home.reviews.card3': "El que més valoro és la seriositat. Canviar de país és estressant, però tenir un suport mèdic real disponible 24/7 ho canvia tot. Ha estat la millor decisió per a la meva família.",
  'home.reviews.card4': "Una plataforma increïblement fiable. Tot el procés d'administració dels meus documents va ser transparent i organitzat. La recomano a qualsevol que busqui una transició professional.",
  'home.reviews.card5': "Experiència excel·lent. Traslladar-se per feina sol ser caòtic, però gràcies al seu suport logístic i sanitari em vaig sentir com a casa des de la primera setmana. Molt bona organització.",
  'home.reviews.card6': "A partir d'ara, tots els meus tràmits internacionals els faré amb aquest equip. La qualitat de l'assessorament mèdic i d'habitatge supera qualsevol expectativa que tingués.",

  // Home — Footer
  'home.footer.social': 'Les nostres xarxes socials:',
  'home.footer.legal': 'Legal',
  'home.footer.privacy': 'Política de privadesa',
  'home.footer.legalNotice': 'Avís Legal',
  'home.footer.refund': 'Política de Devolucions',
  'home.footer.partners': 'Empreses associades:',
  'home.footer.payment': 'Mètodes de pagament:',
  'home.footer.contact': "Contacta'ns:",
  'home.footer.hours': 'Dilluns a dijous de 08:00 a 18:00\nDivendres de 08:00 a 14:30',
  'home.footer.copyright': '"Construint records i aventures inoblidables"',

  // Login
  'login.headline': "Un nou començament t'espera.",
  'login.subtitle': 'Inicia sessió per gestionar els teus plans de viatge i serveis personalitzats.',
  'login.welcome': 'Benvingut',
  'login.enterDetails': 'Si us plau, introdueix les teves dades per entrar',
  'login.password': 'Contrasenya',
  'login.passwordPlaceholder': 'La teva contrasenya',
  'login.submit': 'Entrar',
  'login.noAccount': 'No tens compte?',
  'login.register': "Registra't gratis",
  'login.badCredentials': 'Credencials incorrectes',

  // Register
  'register.headline': 'Uneix-te a la nostra comunitat.',
  'register.subtitle': 'Experts en reubicació i serveis mèdics internacionals al teu abast.',
  'register.title': 'Crea el teu compte',
  'register.start': 'Comença el teu procés avui mateix',
  'register.username': "Nom d'Usuari",
  'register.usernamePlaceholder': '@el_teu_usuari',
  'register.firstname': 'Nom',
  'register.firstnamePlaceholder': 'El teu nom',
  'register.lastname': 'Cognoms',
  'register.lastnamePlaceholder': 'Cognoms',
  'register.destination': 'País de Destinació (Opcional)',
  'register.destinationPlaceholder': 'Ex: Alemanya',
  'register.password': 'Contrasenya',
  'register.passwordPlaceholder': 'Mín. 6 caràcters',
  'register.submit': 'Registrar-se',
  'register.hasAccount': 'Ja tens compte?',
  'register.login': 'Inicia sessió',
  'register.error': 'Error en el registre. Verifica les dades.',

  // Dashboard
  'dash.welcome': 'Benvingut',
  'dash.summary': 'Aquí tens un resum dels teus serveis i plans de viatge disponibles.',
  'dash.services': 'Serveis Mèdics i Reubicació',
  'dash.requestInfo': "Sol·licitar Informació",
  'dash.plans': 'Plans de Seguiment',
  'dash.choosePlan': 'Escull aquest Pla',
  'dash.perMonth': '/mes',

  // Profile — view
  'profile.username': 'Usuari',
  'profile.email': 'Email',
  'profile.firstname': 'Nom',
  'profile.lastname': 'Cognoms',
  'profile.phone': 'Telèfon',
  'profile.nationality': 'Nacionalitat',
  'profile.nationalityPlaceholder': 'Català, Francès...',
  'profile.idPassport': 'DNI / Passaport',
  'profile.dob': 'Data de Naixement',
  'profile.emergencyContact': "Contacte d'Emergència",
  'profile.emergencyPlaceholder': 'Nom - Tel',
  'profile.destination': 'País de Destinació',
  'profile.passportExpiry': 'Expiració Passaport',
  'profile.preferredLanguage': 'Idioma de Preferència',
  'profile.address': 'Adreça',
  'profile.city': 'Ciutat',
  'profile.postalCode': 'Codi Postal',
  'profile.gender': 'Gènere',
  'profile.editBtn': 'Editar Perfil',
  'profile.userList': "Llista d'Usuaris",
  'profile.role': 'Rol',
  'profile.sectionAccount': 'Informació de Compte',
  'profile.sectionPassport': 'Passaport i Viatge',
  'profile.sectionPersonal': 'Dades Personals',
  'profile.sectionAddress': 'Adreça i Localització',
  // Profile — edit
  'profile.updateTitle': 'Actualitzar Perfil',
  'profile.cancel': "Cancel·lar",
  'profile.saving': 'Desant...',
  'profile.save': 'Desar Canvis',
  'profile.select': 'Selecciona una opció...',
  'profile.successMsg': 'Perfil actualitzat correctament!',
  'profile.sessionExpired': 'Sessió expirada. Si us plau, inicia sessió de nou.',
  'profile.sessionExpiredShort': 'La teva sessió ha caducat. Torna a entrar.',
  'profile.updateError': 'Error en actualitzar el perfil.',
  'profile.addUser': 'Afegir Usuari',
  'profile.delete': 'Eliminar',
  'profile.confirmDeleteUser': 'Estàs segur que vols eliminar aquest usuari?',
  'profile.userDeleted': 'Usuari eliminat correctament',
  'profile.registeringUser': 'Registrant usuari...',
  'profile.userAddedSuccess': 'Usuari registrat amb èxit!',

  // App (root)
  'app.tagline': 'La teva nova vida comença aquí. Serveis professionals per a la teva reubicació.',
  'app.ourServices': 'Els Nostres Serveis',
  'app.supportPlans': 'Plans de Suport',
  'app.moreInfo': 'Més informació',
  'app.subscribe': "Subscriure's",
  'app.loadingServices': 'Carregant serveis del backend...',
  'app.loadingPlans': 'Carregant plans del backend...',
  'app.perMonth': '/mes',

  // Packs
  'packs.title': 'Tria la teva experiència a',
  'packs.tagline': 'La teva nova vida comença aquí. Serveis professionals per a la teva reubicació.',
  'packs.accommodation': "Packs d'Allotjament",
  'packs.activities': "Packs d'Activitats",
  'packs.medical': "Packs d'Assegurança Mèdica",
  'packs.joint': 'Packs Conjunts',
  'packs.select': 'Seleccionar Pack',
  'packs.back': 'TORNAR',
  'packs.decor.oslo': 'ESTIL ESCANDINAU',
  'packs.decor.munich': 'COR BAVARÈS',
  'packs.decor.london': 'ESPERIT BRITÀNIC',
  'packs.decor.madrid': 'ÀNIMA ESPANYOLA',
  'packs.decor.default': 'EXPLORA MÉS',

  // Pack Features
  'packs.feat.apt': 'Apartaments Premium',
  'packs.feat.coliving': 'Espais de Co-living',
  'packs.feat.location': 'Ubicacions cèntriques',
  'packs.feat.tours': 'Tours per la ciutat',
  'packs.feat.guides': 'Guies nocturns',
  'packs.feat.culture': 'Esdeveniments culturals',
  'packs.feat.support': 'Suport 24/7',
  'packs.feat.global': 'Cobertura global',
  'packs.feat.clinics': 'Clíniques locals',
  'packs.feat.reloc': 'Reubicació completa',
  'packs.feat.all': 'Tot inclòs',
  'packs.feat.value': 'Millor relació qualitat-preu',

  'admin.users': 'Usuaris',
  'admin.accommodations': 'Allotjaments',
  'admin.activities': 'Activitats',

  // Categories
  'city': 'Ciutat',
  'country': 'País',

  // Destinations
  'dest.oslo': 'Oslo',
  'dest.munich': 'Munic',
  'dest.london': 'Londres',
  'dest.madrid': 'Madrid',
  'dest.norway': 'Noruega',
  'dest.germany': 'Alemanya',
  'dest.uk': 'Regne Unit',
  'dest.spain': 'Espanya',
  'dest.france': 'França',
  'dest.berlin': 'Berlín',
  'dest.bremen': 'Bremen',
  'dest.lubeck': 'Lübeck',
  'dest.marseille': 'Marsella',
  'dest.marsella': 'Marsella',
  'dest.toulouse': 'Tolosa',
  'dest.tours': 'Tours',
};

const TRANSLATIONS: Record<Lang, Translations> = {
  en: EN,
  es: ES,
  ca: CA
};

@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly currentLang = signal<Lang>(this.detectLanguage());

  private detectLanguage(): Lang {
    const saved = localStorage.getItem('lang') as Lang;
    if (saved && (saved === 'en' || saved === 'es' || saved === 'ca')) return saved;

    const browser = navigator.language.toLowerCase();
    if (browser.startsWith('ca')) return 'ca';
    if (browser.startsWith('es')) return 'es';
    return 'ca'; // Per defecte a català com s'ha demanat
  }

  setLanguage(lang: Lang) {
    this.currentLang.set(lang);
    localStorage.setItem('lang', lang);
  }

  t(key: string): string {
    const lang = this.currentLang();
    const translations = TRANSLATIONS[lang];
    return translations[key] ?? key;
  }
}
