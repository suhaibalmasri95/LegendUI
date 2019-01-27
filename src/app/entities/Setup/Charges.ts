import { IEntity } from '../interfaces/IEntity';

export class Discount implements IEntity {
    selected: boolean;
    Name: string;
    Name2: string;
    LangID: number;
    ID: number;
    LineOfBusinessCode: number;
    LockUpChargeType: number;
    CreatedBy: string;
    CreationDate: Date;
    ModifiedBy: string;
    ModificationDate: Date;
    ChargeID: number;
    ChargeType: number;
}

export class Fee implements IEntity {
    selected: boolean;
    Name: string;
    Name2: string;
    LangID: number;
    ID: number;
    LineOfBusinessCode: number;
    LockUpChargeType: number;
    CreatedBy: string;
    CreationDate: Date;
    ModifiedBy: string;
    ModificationDate: Date;
    ChargeID: number;
    ChargeType: number;
}

export class Cover implements IEntity {
    selected: boolean;
    Name: string;
    Name2: string;
    LangID: number;
    ID: number;
    LineOfBusinessCode: number;
    LockUpChargeType: number;
    CreatedBy: string;
    CreationDate: Date;
    ModifiedBy: string;
    ModificationDate: Date;
    ChargeID: number;
    ChargeType: number;
}
export class Commission implements IEntity {
    selected: boolean;
    Name: string;
    Name2: string;
    LangID: number;
    ID: number;
    LineOfBusinessCode: number;
    LockUpChargeType: number;
    CreatedBy: string;
    CreationDate: Date;
    ModifiedBy: string;
    ModificationDate: Date;
    ChargeID: number;
    ChargeType: number;

    CustomerID: number;
    LocCustomerType: number;
    FinGlID: number;

    ComissionPercentage: number;
    CommissionAmount: number;
    CommissionAmountLc: number;
    ProductId: number;
    ProductDetailId: number;
    LineOfBusiness: number;
    SubLineOfBusiness: number;
    DrtCr: number;
    LocCommissionType: number;
}

