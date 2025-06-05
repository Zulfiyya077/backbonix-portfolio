// src/types/index.ts
export interface Service {
  title: string;
  description: string;
}

export interface Project {
  title: string;
  description: string;
}

export interface Vendor {
  name: string;
  logo: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
}

export interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

export type Theme = 'light' | 'dark';


// src/types.ts
export type Language = 'az' | 'en' | 'es';

