import { IEntity } from '../interfaces/IEntity';
export class LineOfBusiness implements IEntity {
  selected: boolean;
  ID: number;
  Name: string;
  Name2: string;
  LangID: number;
  Code: string;
  LineOfBusiness: number;
  Module: number;
  StatusDate: Date;
  Status: number;
  CreatedBy: string;
  CreationDate: Date;
  ModifiedBy: string;
  ModificationDate: Date;
}
