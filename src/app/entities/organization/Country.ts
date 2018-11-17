import { IEntity } from '../interfaces/IEntity';

export class Country implements IEntity {
  selected: boolean;
  ID: number;
  Name: string;
  Name2: string;
  LangID: number;
  Nationality: string;
  CurrencyCode: string;
  ReferenceNo: string;
  Status: number;
  StatusDate: Date;
  PhoneCode: string;
  Flag: string;
}
