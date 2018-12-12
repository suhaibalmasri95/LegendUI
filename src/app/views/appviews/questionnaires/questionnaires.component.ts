import { LockUpService } from './../../../_services/_organization/LockUp.service';
import { AnswerService } from './../../../_services/_setup/Answer.service';
import { LineOfBusiness } from './../../../entities/Setup/lineOfBusiness';
import { CommonService } from './../../../_services/Common.service';

import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSort, MatPaginator, MatTableDataSource, MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { Questionnaire, Question, Answer } from '../../../entities/Setup/Questionnaires';
import { LockUp } from '../../../entities/organization/LockUp';
import { Currency } from '../../../entities/organization/Currency';
import { QuestionnairesService } from '../../../_services/_setup/Questionnaires.service';
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
  minor: LockUp;

  submit: boolean;
  submit2: boolean;
  submit3: boolean;
  AddUpdateUrl: string;
  questionnaireTableColumns = ['select', 'ID', 'Name', 'Name2', 'APPLYON', 'LINEOFBUSINESS', 'SUBLINEOFBUSINESS', 'actions'];
  questionnairesDataSource: MatTableDataSource<Questionnaire>;

  questionTableColumns = ['select', 'ID', 'Name', 'Name2', 'ORDER', 'QUESTIONTYPE', 'QUESTIONNAIRE', 'actions'];
  questionsDataSource: MatTableDataSource<Question>;

  answersTableColumns = ['select', 'ID', 'Name', 'Name2', 'ORDER', 'actions'];
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
    private commonService: CommonService, private answerService: AnswerService, private lockUpService: LockUpService) { }

  ngOnInit() {
    this.extraForm = '';
    const initialSelection = [];

    this.selection = new SelectionModel<Questionnaire>(true, initialSelection);
    this.selection2 = new SelectionModel<Question>(true, initialSelection);

    this.snackPosition = 'right';

    this.questionnaireForm = new Questionnaire();
    this.questionForm = new Question();
    this.answerForm = new Answer();

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

    this.minor = new LockUp();
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
          this.renderQuestionnaireTable(this.questionnaires);
          break;
        case 1:
          this.extraForm = 'questions';
          this.loadQuestType();
          this.reloadQuestionTable(this.questionnaireForm.ID ? this.questionnaireForm.ID : null);
        //  this.reloadAnswerTableTable(this.questionForm.ID ? this.questionForm.ID : null);
          break;

      }
    });
  }

  loadQuestType() {
    this.lockUpService.LoadLockUpsByMajorCode(18).subscribe(res => {
      this.QuestionType = res;
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
    this.questionnaireService.load(null, null, null, null, 1).subscribe(data => {
      this.renderQuestionnaireTable(data);
    });
  }

  reloadQuestionTable(questionId = null) {
    this.questionService.load(null, null, questionId, 1).subscribe(data => {
      this.renderQuestionTable(data);
    });
  }
  reloadAnswerTableTable(question = null) {
    if (question === null) {
      this.renderAnswerTable([]);
    }
    this.answerService.load(null, question, 1).subscribe(data => {
      this.renderAnswerTable(data);
    });
  }


  onQuestionType(questionType) {
    for (let index = 0; index < this.QuestionType.length; index++) {
      if (this.QuestionType[index].ID === questionType) {
        this.minor = this.QuestionType[index];
      }
    }
    if (this.minor.MinorCode === 5) {
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
      this.reloadQuestionTable(this.questionnaireForm.ID ? this.questionnaireForm.ID : null);
      this.questionForm = new Question();
      this.submit2 = false;
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
    this.answerForm.QuestionnaireID = this.questionForm.ID;
    this.http.post(this.AddUpdateUrl, this.answerForm).subscribe(res => {
      this.snackBar.open('Saved successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadAnswerTableTable(this.questionForm.ID);
      this.answerForm = new Answer();
      this.submit3 = false;
      form.resetForm();
    });

  }
  deleteQuestionnaire(id) {

    this.http.post(this.questionnaireService.ApiUrl + 'Delete', { ID: id }).subscribe(res => {
      this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadQuestionnaireTable();
    });
  }

  deleteQuestion(id) {
    this.http.post(this.questionService.ApiUrl + 'Delete', { ID: id }).subscribe(res => {
      this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadQuestionTable(this.questionnaireForm.ID ? this.questionnaireForm.ID : null);
    });
  }

  deleteAnswer(id) {
    this.http.post(this.answerService.ApiUrl + 'Delete', { ID: id }).subscribe(res => {
      this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadAnswerTableTable(this.questionForm.ID);
    });
  }

  updateQuestionnaire(questionnaire: Questionnaire) {
    window.scroll(0, 0);
    this.questionnaireForm = new Questionnaire;
    this.questionnaireForm = questionnaire;
    this.questionnaireForm.selected = true;
  }


  updateQuestion(question: Question) {
    window.scroll(0, 1000);
    this.questionForm = new Question;
    this.questionForm = question;
    this.questionForm.selected = true;

    this.reloadAnswerTableTable(this.questionForm.ID);
  }



  updateAnswer(answer: Answer) {
    window.scroll(0, 0);
    this.answerForm = new Answer;
    this.answerForm = answer;
    this.answerForm.selected = true;
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
    this.questionnaireForm = new Questionnaire();
    this.submit = false;
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
          this.reloadQuestionTable();
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
