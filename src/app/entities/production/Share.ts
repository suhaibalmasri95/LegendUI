import { IEntity } from './../interfaces/IEntity';
import { CustomerShare } from './CustomerShare';
export class Share implements IEntity {
    selected: boolean;
    Name: string;
    Name2: string;
    LangID: number;
    ID: number;
    Percent: number;
    SharePercent: number;
    Amount: number;
    AmountLC: number;
    Notes: string;
    CreatedBy: string;
    CreationDate: Date;
    ModifiedBy: string;
    ModificationDate: Date;
    DocumentID: number;
    CustomerId: number;
    StLOB: number;
    StSubLOB: number;
    DrCr: number;
    customer: CustomerShare[];
    LocShareType: number;
    ShareType: string;
    CommissionPercent: number;
}
