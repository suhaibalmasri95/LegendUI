

import { IEntity } from '../interfaces/IEntity';

export class Group implements IEntity {
    ID: number;
    LangID: number;
    selected: boolean;
    Name: string;
    Name2: string;
    Email: string;
    Status: number;
    IsPdf: number;
    IsWord: number;
    IsRef: number;
    IsExcel: number;
    IsExcelRecord: number;
    IsPdfTemp: boolean;
    IsWordTemp: boolean;
    IsRefTemp: boolean;
    IsExcelTemp: boolean;
    IsExcelRecordTemp: boolean;
}




