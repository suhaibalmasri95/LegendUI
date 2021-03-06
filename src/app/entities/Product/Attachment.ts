import { IEntity } from '../interfaces/IEntity';

export class ProductAttachment implements IEntity {
    selected: boolean;
    Name: string;
    Name2: string;
    LangID: number;
    ID: number;
    Status: number;
    StatusDate: Date;
    AttachmentLevel: number;
    IsRequired: number;
    IsRequiredTemp: boolean;
    AttachmentID: number;
    ProductId: number;
    ProductDetailId: number;
    LineOfBusiness: number;
    SubLineOfBusiness: number;
    File: File;

}
export class Attachment implements IEntity {
    selected: boolean;
    Name: string;
    Name2: string;
    LangID: number;
    ID: number;
    CreateBy: string;
    CreationDate: Date;
    ModifiedBy: string;
    ModificationDate: Date;
}

export class Wording implements IEntity {
    Name: string;
    Name2: string;
    Description: string;
    Description2: string;
    LangID: number;
    ID: number;
    Status: number;
    StatusDate: Date;
    LockUpType: number;
    AttachmentID: number;
    ProductId: number;
    ProductDetailId: number;
    LineOfBusiness: number;
    SubLineOfBusiness: number;
    selected: boolean;
}

export class WordingDetail implements IEntity {
    Name: string;
    Name2: string;
    LangID: number;
    ID: number;
    Status: number;
    StatusDate: Date;
    ProductId: number;
    SubLineOfBusniess: number;
    LineOfBusniess: number;
    ExpiryDate: Date;
    EffectiveDate: Date;
    CreateBy: string;
    CreationDate: Date;
    ModifiedBy: string;
    ModificationDate: Date;
    selected: boolean;
    ProductDetailId: number;
    WordType: number;
    IsAutoAdd: number;
    AutoAdd: boolean;
    WordId: number;
    ServiceID: number;
}


export class ProductReport implements IEntity {
    Name: string;
    Name2: string;
    Description: string;
    Description2: string;
    LangID: number;
    ID: number;
    Status: number;
    StatusDate: Date;
    AttachmentID: number;
    ProductId: number;
    ProductDetailId: number;
    LineOfBusiness: number;
    SubLineOfBusiness: number;
    ReportId: number;
    ReportLevel: number;
    IsRequired: number;
    TempIsRequired: boolean;
    ReportCode: string;
    CreateBy: string;
    CreationDate: Date;
    ModifiedBy: string;
    ModificationDate: Date;
    selected: boolean;

}

