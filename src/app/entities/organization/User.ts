import { IEntity } from "../interfaces/IEntity";
import { UserGroup } from "./UserGroup";

export class User implements IEntity {
    selected: boolean;
    ID: number;
    Name: string;
    Name2: string;
    LangID: number;
    UserName: string;
    EffectiveDate: Date;
    ExpiryDate: Date;
    Status: number;
    StatusDate: Date;
    Password: string;
    Email: string;
    CompanyID: number;
    BranchID: number;
    UserRelations: UserGroup[];
    BirthDate: Date;
    Picture: string;
    CountryID: number;
    Mobile: string;
    UserType: number;
    NoOfLogin: number;
    CreatedBy: string;
    CreationDate: Date;
    ModifiedBy: string;
    ModificationDate: Date;
}
