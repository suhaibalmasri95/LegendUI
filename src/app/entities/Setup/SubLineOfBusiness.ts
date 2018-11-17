import { IEntity } from '../interfaces/IEntity';

export class SubLineOfBusiness implements IEntity {
 selected: boolean;
  ID: number;
  LangID: number;
  Name: string;
  Name2: string;
  Code: string;
  LineOfBusniess: number;
  BasicLineOfBusniess: number;
  ReinsType: number;
  Status: number;
  StatusDate: Date;
  CreatedBy: string;
  CreationDate: Date;
  ModifiedBy: string;
  ModificationDate: Date;
}
