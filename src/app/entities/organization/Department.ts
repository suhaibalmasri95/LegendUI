import { IEntity } from '../interfaces/IEntity';

export class Department implements IEntity {
    ID: number;
    LangID: number;
    selected: boolean;
    Name: string;
    Name2: string;
    CompanyID: number;
    Address: string;
    Email: string;
}
