import { Customer } from './../Financial/Customer';
import { ProductDynmicCategory } from './../Dynamic/ProductDynmicCategory';
import { Risk } from './Risk';
import { IEntity } from '../interfaces/IEntity';
import { Share } from './Share';

export class Documents implements IEntity {
    selected: boolean;
    DocumentType: number;
    DocumentNo: number;
    LangID: number;
    Name: string;
    Name2: string;
    ID: number;
    TrnSerial: number;
    UwYear: number;
    DocumentSegment: string;
    IssueDate: Date;
    EffectiveDate: Date;
    ExpiryDate: Date;
    ReferenceNo: string;
    DocumentShare: number;
    Exrate: number;
    CurrencyCode: string;
    Notes: string;
    Notes2: string;
    AccountedFor: number;
    IsClaimed: number;
    IsPrinted: number;
    IsReinsured: number;
    IsPosted: number;
    IsCancelled: number;
    OpenCoverType: number;
    Status: number;
    StatusDate: Date;
    CreatedBy: string;
    CreationDate: Date;
    ModifiedBy: string;
    ModificationDate: Date;
    UwDocId: number;
    ProductId: number;
    PaymentId: number;
    LocBustId: number;
    LocEndtId: number;
    StComId: number;
    StBrnId: number;
    QutValidity: number;
    FyrYear: number;
    FinancialDate: Date;
    CalcBases: number;
    LocDistChnales: number;
    NetAmount: number;
    NetAmountLc: number;
    LoadingAmount: number;
    LoadingAmountLc: number;
    DiscountAmount: number;
    DiscountAmountLc: number;
    ChargesAmount: number;
    ChargesAmountLc: number;
    CommAmount: number;
    CommAmountLc: number;
    GrossAmmount: number;
    GrossAmountLc: number;
    Risks: Risk[];
    DynamicCategories: ProductDynmicCategory[];
    share: Share;
    NewCustomer: Customer;
    UpdateMode: boolean;
}
