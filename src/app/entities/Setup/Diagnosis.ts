
import { IEntity } from '../interfaces/IEntity';

export class Diagnose implements IEntity {
   ID: number;
   Name: string;
   Name2: string;
   LangID: number;
   CodeingSystem: number;
   Parent: number;
   Gender: number;
   AgeFrom: number;
   AgeTo: number;
   Frequency: number;
   FrequencyUnit: number;
   IsChronic: number;
   ServiceType: number;
   IS_ICD_SERV_BEN: number;
   selected: boolean;
  IsChronicCeckbox: boolean;
}

export class Service implements IEntity {
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

export class Benefit implements IEntity {
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
export class Attribute implements IEntity {
    selected: boolean;
    ID: number;
    Name: string;
    Name2: string;
    LangID: number;
    Type: number;
}

export class AttributeGroup implements IEntity {
    selected: boolean;
    ID: number;
    Name: string;
    Name2: string;
    LangID: number;
    SRVCS_ID: number;
    ATT_GRP_ID: number;
}

