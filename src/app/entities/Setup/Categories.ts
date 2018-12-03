import { IEntity } from '../interfaces/IEntity';

export class Category implements IEntity {
    Name: string;
    Name2: string;
    LangID: number;
    ID: number;
    Status: number;
    StatusDate: Date;
    QustionnaireLevel: number;
    LineOfBusiness: number;
    SubLineOfBusiness: number;
    selected: boolean;
}

export class Column implements IEntity {
    selected: boolean;
    Name: string;
    Name2: string;
    Description: string;
    Description2: string;
    LangID: number;
    ID: number;
    Status: number;
    StatusDate: Date;
    QustionOrder: number;
    QustionType: number;
    QuestionnaireID: number;
    LockUpID: number;

}
