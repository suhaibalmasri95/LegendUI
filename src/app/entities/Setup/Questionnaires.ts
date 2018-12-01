import { IEntity } from '../interfaces/IEntity';

export class Questionnaire implements IEntity {
        Name: string;
        Name2: string;
        LangID: number;
        ID: number;
        Status: number;
        StatusDate: Date;
        QustionnaireLevel: number;
        LineOfBusiness: number;
        SubLineOfBusiness: number;
        selected: boolean;
}

export class Question implements IEntity {
    selected: boolean;
    Name: string;
    Name2: string;
    Description: string;
    Description2: string;
    LangID: number;
    ID: number;
    Status: number;
    StatusDate: Date;
    QustionOrder: number;
    QustionType: number;
    QuestionnaireID: number;
    LockUpID: number;

}
export class Answer implements IEntity {
    selected: boolean;
    Name: string;
    Name2: string;
    LangID: number;
    ID: number;
    AnswerOrder: number;
    QuestionnaireID: number;

}
