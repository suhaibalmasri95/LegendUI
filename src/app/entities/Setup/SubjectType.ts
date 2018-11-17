
import { IEntity } from '../interfaces/IEntity';
export class SubjectType  implements IEntity  {
    selected: boolean;
    ID: number;
    Name: string;
    Name2: string;
    LangID: number;
    LineOfBusniessID: number;
    SubLineOfBusniessID: number;
    Parent: number;
    ExcessPercentage: number;
    MinExcessAmount: number;
    MaxExcessAmount: number;
    CreatedBy: string;
    CreationDate: Date;
    From: number;
    ModifiedBy: string;
    ModificationDate: Date;

}
