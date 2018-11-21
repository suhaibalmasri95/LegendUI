import { IEntity } from '../interfaces/IEntity';


export class System implements IEntity {

    ID: number;
    LangID: number;
    selected: boolean;
    Name: string;
    Name2: string;
    Order: number;
    Type: number;
    SubMenuID: number;
    GroupRelationID: number;
    Url: string;
}


