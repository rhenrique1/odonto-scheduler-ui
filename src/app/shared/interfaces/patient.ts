import { Address } from './address';

export interface Patient {
  id?: string;
  fullName: string;
  document: string;
  telephone: string;
  email: string;
  birthDate: Date;
  address: Address;
  gender: string;
  notes: string;
}
