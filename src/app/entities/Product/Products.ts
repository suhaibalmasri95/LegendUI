import { IEntity } from '../interfaces/IEntity';

export class Product implements IEntity {
    selected: boolean;
    Name: string;
    Name2: string;
    LangID: number;
    ID: number;
    Status: number;
    StatusDate: Date;
    Logo: string;
    Code: string;
    LockIndvGroup: number;
    ExpiryDate: Date;
    EffectiveDate: Date;
    ModificationDate: Date;
    CreationDate: Date;
    ModifiedBy: string;
    CreateBy: string;
    CompanyID: number;
    FCustomerID: number;
}

export class ProductsDetail implements IEntity {
    Name: string;
    Name2: string;
    LangID: number;
    ID: number;
    Status: number;
    StatusDate: Date;
    ProductID: number;
    SubLineOfBusniess: number;
    LineOfBusniess: number;
    ExpiryDate: Date;
    EffectiveDate: Date;
    ModificationDate: Date;
    CreationDate: Date;
    ModifiedBy: string;
    CreateBy: string;
    SubjectTypeDesc: string;
    selected: boolean;
}


export class ProductQuestionnaire implements IEntity {
    selected: boolean;
    ID: number;
    Name: string;
    Name2: string;
    LangID: number;
    Status: number;
    StatusDate: Date;
    ModificationDate: Date;
    CreationDate: Date;
    ModifiedBy: string;
    CreateBy: string;
    ProductID: number;
    ProductDetailedID: number;
    SubLineOfBusniess: number;
    LineOfBusniess: number;
    QuestionnaireID: number;


}
export class ProductSubjectType implements IEntity {
    selected: boolean;
    ID: number;
    Name: string;
    Name2: string;
    LangID: number;
    CreateBy: string;
    CreationDate: Date;
    ModifiedBy: string;
    ModificationDate: Date;
    LineOfBusniess: number;
    SubLineOfBusniess: number;
    ProductID: number;
    ProductDetailsID: number;
    SubjectTypeID: number;
    SubjectTypeParentID: number;
    ExcessPerc: number;
    MinExcess: number;
    MaxExcess: number;
    ExcessFrom: number;
    SubjectTypeDesc: string;
    QuestionnaireID: number;

}
