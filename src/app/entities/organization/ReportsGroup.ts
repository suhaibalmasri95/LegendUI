import { IEntity } from '../interfaces/IEntity';

export class ReportsGroup implements IEntity {
  ID: number;
  LangID: number;
  selected: boolean;
  Name: string;
  Name2: string;
  OrderBy: string;
}
