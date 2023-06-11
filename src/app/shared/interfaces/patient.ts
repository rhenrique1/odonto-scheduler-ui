import { Address } from './address';

export interface Patient {
  id?: string;
  fullName: string;
  document: string;
  phoneNumber: string;
  gender: string;
  notes?: string;
  email: string;
  birthDate: Date;
  address: Address;
}
