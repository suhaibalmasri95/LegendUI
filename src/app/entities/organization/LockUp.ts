import { IEntity } from '../interfaces/IEntity';

export class LockUp implements IEntity {
  ID: number;
  LangID: number;
  selected: boolean;
  Name: string;
  Name2: string;
  MajorCode: number;
  MinorCode: number;
  LockUpID: number;
  CreatedBy: string;
  CreationDate: Date;
  ModifiedBy: string;
  ModificationDate: Date;
  LockUpType: number;
  ReferenceNo: string;
}
