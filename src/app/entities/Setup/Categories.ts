import { IEntity } from '../interfaces/IEntity';

export class Category implements IEntity {
    ID: number;
    Name: string;
    Name2: string;
    Label: string;
    Label2: string;
    LangID: number;
    ModifiedBy: string;
    CreateBy: string;
    LineOfBusniess: number;
    SubLineOfBusniess: number;
    Status: number;
    StatusDate: Date;
    CreationDate: Date;
    ModificationDate: Date;
    CategoryLevel: number;
    MultiRecord: number;
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
