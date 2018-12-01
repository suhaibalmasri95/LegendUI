import { Questionnaire } from './../../../entities/Setup/Questionnaires';
import { LockUpService } from './../../../_services/_organization/LockUp.service';
import { AnswerService } from './../../../_services/_setup/Answer.service';
import { LineOfBusiness } from './../../../entities/Setup/lineOfBusiness';
import { CommonService } from './../../../_services/Common.service';

import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSort, MatPaginator, MatTableDataSource, MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { Questionnaire, Question , Answer } from '../../../entities/Setup/Questionnaires';
import { LockUp } from '../../../entities/organization/LockUp';
import { Currency } from '../../../entities/organization/Currency';
import { Country } from '../../../entities/organization/Country';
import { City } from '../../../entities/organization/City';
import { QuestionnairesService } from './../../../_services/_setup/Questionnaires.service';
import { QuestionService } from './../../../_services/_setup/Question.service';
import { SubLineOfBusiness } from './../../../entities/Setup/SubLineOfBusiness';


@Component({
  selector: 'app-questionnaires',
  templateUrl: './questionnaires.component.html',
  styleUrls: ['./questionnaires.component.css']
})
export class QuestionnairesComponent implements OnInit {

  questionnaireForm: Questionnaire;

  questionnaires: Questionnaire[];

  questionForm: Question;
  questions: Question[];

  answerForm: Answer;
  answers: Answer[];

  LockUps: LockUp[];
  QuestionLockUp: LockUp[];
  QuestionnaireLevel: LockUp[];
  QuestionType: LockUp[];
  LineOfBusinesses: LineOfBusiness[];
  SubLineOfBusinesses: SubLineOfBusiness[];
  currencies: Currency[];

  countries: Country[];
  cities: City[];

  submit: boolean;
  submit2: boolean;
  AddUpdateUrl: string;
  questionnaireTableColumns = ['select', 'ID', 'NAME', 'NAME2', 'APPLYON', 'LINEOFBUSINESS', 'SUBLINEOFBUSINESS', 'actions'];
  questionnairesDataSource: MatTableDataSource<Questionnaire>;

  questionTableColumns = ['select', 'ID', 'NAME', 'NAME2', 'ORDER', 'QUESTIONTYPE', 'QUESTIONNAIRE' , 'actions'];
  questionsDataSource: MatTableDataSource<Question>;

  answersTableColumns = ['select', 'ID', 'NAME', 'NAME2', 'ORDER', 'actions'];
  answersDataSource: MatTableDataSource<Answer>;

  selection: SelectionModel<Questionnaire>;
  selection2: SelectionModel<Question>;
  selection3: SelectionModel<Answer>;
  extraForm: string;

  snackPosition: MatSnackBarHorizontalPosition;

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('paginator2') paginator2: MatPaginator;
  @ViewChild('paginator3') paginator3: MatPaginator;

  @ViewChild('table', { read: MatSort }) sort: MatSort;
  @ViewChild('table2', { read: MatSort }) sort2: MatSort;
  @ViewChild('table3', { read: MatSort }) sort3: MatSort;

  constructor(public snackBar: MatSnackBar, private http: HttpClient, private route: ActivatedRoute,
    private questionnaireService: QuestionnairesService, private questionService: QuestionService,
    private commonService: CommonService , private answerService: AnswerService , private lockUpService: LockUpService) { }

  ngOnInit() {
    this.extraForm = '';
    const initialSelection = [];

    this.selection = new SelectionModel<Questionnaire>(true, initialSelection);
    this.selection2 = new SelectionModel<Question>(true, initialSelection);

    this.snackPosition = 'right';

    this.questionnaireForm = new Questionnaire();
    this.questionForm = new Question();

    this.submit = false;
    this.submit2 = false;
    this.route.data.subscribe(data => {
      this.questionnaires = data.questionnaires;
      this.QuestionnaireLevel = data.appliedOn;
      this.LineOfBusinesses = data.lineOfBusiness;
      this.SubLineOfBusinesses = data.subLineOfBusiness;
      this.LockUps = data.Status;
      this.renderQuestionnaireTable(data.questionnaires);
    });


  }


  applyFilter(filterValue: string) {
    switch (this.extraForm) {
      case '':
        this.questionnairesDataSource.filter = filterValue.trim().toLowerCase();
        break;
      case 'questions':
        this.questionsDataSource.filter = filterValue.trim().toLowerCase();
        break;
        case 'answers':
        this.answersDataSource.filter = filterValue.trim().toLowerCase();
        break;
    }
  }


  changeTab($event) {
    setTimeout(() => {
      switch ($event.index) {
        case 0:
          this.extraForm = '';
          this.questionnairesDataSource.paginator = this.questionnairesDataSource.paginator ?
            this.questionnairesDataSource.paginator : this.paginator;
          break;
        case 1:
          this.extraForm = 'questions';
          this.reloadQuestionTableTable(this.questionForm.ID ? this.questionForm.ID : null);
          break;
          case 2:
          this.extraForm = 'answers';
          this.reloadAnswerTableTable(this.answerForm.ID ? this.answerForm.ID : null);
          break;
      }
    });
  }

  renderQuestionnaireTable(data) {
    this.questionnaires = data;
    this.questionnairesDataSource = new MatTableDataSource<Questionnaire>(data);
    this.questionnairesDataSource.paginator = this.paginator;
    this.questionnairesDataSource.sort = this.sort;
    this.selection = new SelectionModel<Questionnaire>(true, []);
    this.questionnairesDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort.direction === 'asc' ? '3' : '1';
      }
      // tslint:disable-next-line:max-line-length
      return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();
    };
  }

  renderQuestionTable(data) {
    this.questions = data;
    this.questionsDataSource = new MatTableDataSource<Question>(data);
    this.questionsDataSource.paginator = this.paginator2;
    this.questionsDataSource.sort = this.sort2;
    this.selection2 = new SelectionModel<Question>(true, []);
    this.questionsDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort2.direction === 'asc' ? '3' : '1';
      }
      // tslint:disable-next-line:max-line-length
      return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();
    };
  }

  renderAnswerTable(data) {
    this.answers = data;
    this.answersDataSource = new MatTableDataSource<Answer>(data);
    this.answersDataSource.paginator = this.paginator3;
    this.answersDataSource.sort = this.sort3;
    this.selection3 = new SelectionModel<Answer>(true, []);
    this.answersDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort2.direction === 'asc' ? '3' : '1';
      }
      // tslint:disable-next-line:max-line-length
      return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();
    };
  }
  reloadQuestionnaireTable() {

    this.questionnaireService.load().subscribe(data => {
      this.renderQuestionnaireTable(data);
    });
  }

  reloadQuestionTableTable(questionId = null) {
    this.questionService.load(questionId, null, null, 1).subscribe(data => {
      this.renderQuestionTable(data);
    });
  }
  reloadAnswerTableTable(answerID = null) {
    this.answerService.load(answerID, null, 1).subscribe(data => {
      this.renderAnswerTable(data);
    });
  }

  onQuestionType($event) {
    if ($event.toLowerCase() === '5') {
      this.lockUpService.LoadLockUpsForQuestionnaire(1).subscribe(res => {
        this.QuestionLockUp = res;
      });
    }
  }

  // add update delete Questionnaire

  saveQuestionnaire(form) {
    if (form.invalid) {
      return;
    }
    this.questionnaireForm = this.questionnaireForm.selected ? this.questionnaireForm : Object.assign({}, form.value);
    if (this.questionnaireForm.selected) {
      this.AddUpdateUrl = this.questionnaireService.ApiUrl + 'Update';
    } else {
      this.AddUpdateUrl = this.questionnaireService.ApiUrl + 'Create';
    }
    this.http.post(this.AddUpdateUrl, this.questionnaireForm).subscribe(res => {
      this.snackBar.open('Saved successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadQuestionnaireTable();
      this.questionnaireForm = new Questionnaire();
      this.submit = false;
      form.resetForm();
    });

  }

  saveQuestion(form) {
    if (form.invalid) {
      return;
    }
    this.questionForm = this.questionForm.selected ? this.questionForm : Object.assign({}, form.value);
    if (this.questionForm.selected) {
      this.AddUpdateUrl = this.questionService.ApiUrl + 'Update';
    } else {
      this.AddUpdateUrl = this.questionService.ApiUrl + 'Create';
    }
    this.http.post(this.AddUpdateUrl, this.questionForm).subscribe(res => {
      this.snackBar.open('Saved successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadQuestionnaireTable();
      this.questionForm = new Question();
      this.submit = false;
      form.resetForm();
    });

  }
  saveAnswer(form) {
    if (form.invalid) {
      return;
    }
    this.answerForm = this.answerForm.selected ? this.answerForm : Object.assign({}, form.value);
    if (this.answerForm.selected) {
      this.AddUpdateUrl = this.answerService.ApiUrl + 'Update';
    } else {
      this.AddUpdateUrl = this.answerService.ApiUrl + 'Create';
    }
    this.http.post(this.AddUpdateUrl, this.answerForm).subscribe(res => {
      this.snackBar.open('Saved successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadAnswerTableTable();
      this.answerForm = new Answer();
      this.submit = false;
      form.resetForm();
    });

  }
  deleteQuestionnaire(id) {

    this.http.post(this.questionnaireService.ApiUrl + 'Delete', { ID: id }).subscribe(res => {
      this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadQuestionnaireTable();
    });
    /* this.http.request('DELETE', this.coreService.DeleteUrl + '/DeleteQuestionnaire?questionnaireID=' + id).subscribe(res => {
       this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
       this.reloadQuestionnaireTable();
     });*/
  }
  deleteQuestion(id) {

    this.http.post(this.questionService.ApiUrl + 'Delete', { ID: id }).subscribe(res => {
      this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadQuestionTableTable();
    });
    /* this.http.request('DELETE', this.coreService.DeleteUrl + '/DeleteQuestionnaire?questionnaireID=' + id).subscribe(res => {
       this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
       this.reloadQuestionnaireTable();
     });*/
  }
  deleteAnswer(id) {

    this.http.post(this.answerService.ApiUrl + 'Delete', { ID: id }).subscribe(res => {
      this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadAnswerTableTable();
    });
    /* this.http.request('DELETE', this.coreService.DeleteUrl + '/DeleteQuestionnaire?questionnaireID=' + id).subscribe(res => {
       this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
       this.reloadQuestionnaireTable();
     });*/
  }
  updateQuestionnaire(questionnaire: Questionnaire) {
    window.scroll(0, 0);
    this.questionnaireForm = new Questionnaire;
    this.questionnaireForm.ID = questionnaire.ID;
    this.questionnaireForm.Name = questionnaire.Name;
    this.questionnaireForm.Name2 = questionnaire.Name2;
    this.questionnaireForm.QustionnaireLevel = questionnaire.QustionnaireLevel;
    this.questionnaireForm.LineOfBusiness = questionnaire.LineOfBusiness;
    this.questionnaireForm.SubLineOfBusiness = questionnaire.SubLineOfBusiness;
    this.questionnaireForm.Status = questionnaire.Status;
    this.questionnaireForm.StatusDate = questionnaire.StatusDate;
    this.questionnaireForm.selected = true;
  }


  updateQuestion(question: Question) {
    window.scroll(0, 1000);
    this.questionForm = new Question;
    this.questionForm.ID = question.ID;
    this.questionForm.Name = question.Name;
    this.questionForm.Name2 = question.Name2;
    this.questionForm.Description = question.Description;
    this.questionForm.Description2 = question.Description2;
    this.questionForm.QustionType = question.QustionType;
    this.questionForm.QuestionnaireID = question.QuestionnaireID;
    this.questionForm.QustionOrder = question.QustionOrder;
    this.questionForm.Status = question.Status;
    this.questionForm.StatusDate = question.StatusDate;
    this.questionForm.selected = true;
  }



  updateAnswer(answer: Answer) {
    window.scroll(0, 1000);
    this.answerForm = new Answer;
    this.answerForm.ID = answer.ID;
    this.answerForm.Name = answer.Name;
    this.answerForm.Name2 = answer.Name2;
    this.answerForm.AnswerOrder = answer.AnswerOrder;
    this.questionForm.QuestionnaireID = answer.QuestionnaireID;
    this.questionForm.selected = true;
  }


  export(type, data) {
    if (data === 'Questionnaire') {
      const body = {
        'items': this.questionnairesDataSource.data,
        'FieldName': 'Setup.Questionnaire',
        'Type': type,
      };
      this.commonService.Export(body).subscribe(res => {
        window.open(res.FilePath);
      });
    }
    if (data === 'Question') {
      const body = {
        'items': this.questionsDataSource.data,
        'FieldName': 'Setup.Question',
        'Type': type,
      };
      this.commonService.Export(body).subscribe(res => {
        window.open(res.FilePath);
      });
    }
    if (data === 'Answer') {
      const body = {
        'items': this.answersDataSource.data,
        'FieldName': 'Setup.Answer',
        'Type': type,
      };
      this.commonService.Export(body).subscribe(res => {
        window.open(res.FilePath);
      });
    }
  }




  getQuestionnaireName(id: number) {
    for (let index = 0; index < this.questionnaires.length; index++) {
      if (this.questionnaires[index].ID === id) {
        return this.questionnaires[index].Name;
      }
    }
  }


  isAllSelected() {
    return this.selection.selected.length === this.questionnairesDataSource.data.length;
  }
  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.questionnairesDataSource.data.forEach(row => this.selection.select(row));
  }

  isAllSelected2() {
    return this.selection2.selected.length === this.questionsDataSource.data.length;
  }
  masterToggle2() {
    this.isAllSelected2() ? this.selection2.clear() : this.questionsDataSource.data.forEach(row => this.selection2.select(row));
  }

  isAllSelected3() {
    return this.selection3.selected.length === this.answersDataSource.data.length;
  }
  masterToggle3() {
    this.isAllSelected2() ? this.selection3.clear() : this.answersDataSource.data.forEach(row => this.selection3.select(row));
  }


  resetForm(form) {
    form.reset();
  }


  deleteSelectedData() {

    // tslint:disable-next-line:prefer-const
    let selectedData = [];
    switch (this.extraForm) {
      case '':
        for (let index = 0; index < this.selection.selected.length; index++) {
          selectedData.push(this.selection.selected[index].ID);
        }
        this.http.post(this.questionnaireService.ApiUrl + 'DeleteMultiple', { IDs: selectedData }).subscribe(res => {
          this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
          this.reloadQuestionnaireTable();
        });
        break;
      case 'questions':
        for (let index = 0; index < this.selection2.selected.length; index++) {
          selectedData.push(this.selection2.selected[index].ID);
        }

        this.http.post(this.questionService.ApiUrl + 'DeleteMultiple', { IDs: selectedData }).subscribe(res => {
          this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
          this.reloadQuestionTableTable();
        });
        break;
        case 'answers':
        for (let index = 0; index < this.selection2.selected.length; index++) {
          selectedData.push(this.selection2.selected[index].ID);
        }

        this.http.post(this.answerService.ApiUrl + 'DeleteMultiple', { IDs: selectedData }).subscribe(res => {
          this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
          this.reloadAnswerTableTable();
        });
        break;

    }

  }

}
