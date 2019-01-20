import { ProductsDetail, ProductSubjectType } from './../Product/Products';
import { IEntity } from '../interfaces/IEntity';

export class Risk implements IEntity {
    selected: boolean;
    LangID: number;
    ID: number;
    Serial: number;
    Name: string;
    Name2: string;
    Description: string;
    EffectiveDate: Date;
    ExpiryDate: Date;
    OurShare: number;
    MinExcessAmount: number;
    MaxExcessAmount: number;
    RefNo: string;
    StLOB: number;
    StSubLOB: number;
    UwDocumentID: number;
    SuminsuredLC: number;
    Suminsured: number;
    NetPremium: number;
    NetPremiumLc: number;
    GrossPremium: number;
    GrossPremiumLc: number;
    ProductSubjectTypeID: number;
    SubjectTypeID: number;
    ProductID: number;
    ProductDetailID: number;
    MemberID: number;
    CreatedBy: string;
    CreationDate: Date;
    ModifiedBy: string;
    ModificationDate: Date;
    UwRiskID: number;
    productDetails: ProductsDetail;
    productSubjectType: ProductSubjectType;
}
