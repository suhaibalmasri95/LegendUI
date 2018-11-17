import { IEntity } from '../interfaces/IEntity';

export class CompanyBranch implements IEntity {
  ID: number;
  LangID: number;
  selected: boolean;
  Name: string;
  Name2: string;
  CityID: number;
  CompanyID: number;
  Address: string;
  Address2: string;
  Email: string;
  Fax: string;
  Phone: string;
  Code: string;
  CurrencyCode: string;
  CountryCode: string;
  CountryID: number;
}
