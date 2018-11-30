import { IEntity } from '../interfaces/IEntity';

export class Questionnaire implements IEntity {
    ID: number; LangID: number;
    selected: boolean;
    Name: string;
    Name2: string;
    PhoneCode: string;
    Phone: string;
    CurrencyCode: string;
}

export class Question implements IEntity {
    selected: boolean;
    Name: string;
    Name2: string;
    LangID: number;
    ID: number;
    BankID: number;
    CityID: number;
    CountryID: number;
}
