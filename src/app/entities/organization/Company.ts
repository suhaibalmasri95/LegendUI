import { IEntity } from '../interfaces/IEntity';

export class Company implements IEntity {
  ID: number;
  LangID: number;
  selected: boolean;
  Name: string;
  Name2: string;
  Mobile: string;
  Website: string;
  ContactPerson: string;
  PasswordMinLength: number;
  PasswordMinUpperCase: number;
  PasswordMinLowerCase: number;
  PasswordMinNumbers: number;
  PasswordMinSpecialCharacters: number;
  PasswordExpiryDays: number;
  PasswordFailedLoginAttempts: number;
  PasswordRepeats: number;
  Logo: string;
  Fax: string;
  Phone: string;
  Address: string;
  Address2: string;
  Code: string;
  CurrencyCode: string;
  CountryCode: string;
  CountryID: number;
  Email: string;
}
