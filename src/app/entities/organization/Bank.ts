import { IEntity } from '../interfaces/IEntity';

export class Bank implements IEntity {
    ID: number;    LangID: number;
    selected: boolean;
    Name: string;
    Name2: string;
    PhoneCode: string;
    Phone: string;
    CurrencyCode: string;
}
