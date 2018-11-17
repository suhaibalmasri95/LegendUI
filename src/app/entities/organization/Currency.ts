import { ILocalized } from '../interfaces/ILocalized';

export class Currency implements ILocalized {
    selected: boolean;
    Name: string;    Name2: string;
    LangID: number;
    Code: string;
    DecimalPlaces: number;
    Status: number;
    Sign: string;
    IsDeleted: number;
    StatusDate: Date;
    FractName: string;
    FractName2: string;

}
