import { IBase } from "../interfaces/IBase";

export class UserGroup implements IBase {
    selected: boolean;
    ID: number;
    UserID: number;
    LangID: number;
    UserRelationID: number;
    UserName: string;
    RefrenceID: number;
}

