// Tipi TypeScript per i dati mock dello studio nutrizionale

export interface Indirizzo {
  via: string;
  citta: string;
  provincia: string;
  cap: string;
  regione: string;
  paese: string;
  lat: number;
  lng: number;
}

export interface Contatti {
  telefono: string;
  whatsapp: string;
  email: string;
  social: {
    instagram?: string;
    facebook?: string;
  };
}

export interface OrariApertura {
  lunedi: string;
  martedi: string;
  mercoledi: string;
  giovedi: string;
  venerdi: string;
  sabato: string;
  domenica: string;
}

export interface MetaSeo {
  title: string;
  description: string;
  keywords: string[];
}

export interface InfoStudio {
  ragioneSociale: string;
  nomeCommerciale: string;
  tagline: string;
  ordine: string;
  indirizzo: Indirizzo;
  contatti: Contatti;
  orari: OrariApertura;
  metaSeo: MetaSeo;
}

export interface Servizio {
  id: string;
  nome: string;
  descrizione: string;
  durata: string;
  prezzo: number;
  prezzoFormato: string;
  categoria: 'visita' | 'composizione' | 'sportiva' | 'clinica' | 'online';
  evidenceLevel: 'alto' | 'medio';
  disponibileOnline: boolean;
}

export interface ServiziData {
  servizi: Servizio[];
}

export interface Membro {
  id: number;
  nome: string;
  ruolo: string;
  qualifica: string;
  iscrizioneAlbo: string;
  bio: string;
  specializzazioni: string[];
  formazione: string[];
  image: string;
}

export interface TeamData {
  team: Membro[];
}

export interface RicettaBlog {
  id: string;
  tipo: 'ricetta';
  titolo: string;
  descrizione: string;
  tempoPreparazione: string;
  calorie: number;
  categoria: string;
  tags: string[];
  dataPublicazione: string;
}

export interface GuidaPdf {
  id: string;
  tipo: 'guida';
  titolo: string;
  descrizione: string;
  pagine: number;
  argomento: string;
  tags: string[];
  dataPublicazione: string;
}

export type RisorsaItem = RicettaBlog | GuidaPdf;

export interface RisorseData {
  risorse: RisorsaItem[];
}

export interface FaqItem {
  domanda: string;
  risposta: string;
  categoria: string;
}

export interface FaqData {
  faq: FaqItem[];
}
