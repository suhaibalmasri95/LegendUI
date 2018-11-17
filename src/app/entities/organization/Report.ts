
import { IEntity } from '../interfaces/IEntity';
export class Report implements IEntity {
    ID: number;
    LangID: number;
    selected: boolean;
    Name: string;
    Name2: string;
    Code: number;
    Order: number;
    ReportGroupID: number;
}
