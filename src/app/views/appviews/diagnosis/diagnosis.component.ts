import { LockUpService } from './../../../_services/_organization/LockUp.service';
import { Attribute, Service, Diagnose, Benefit } from './../../../entities/Setup/Diagnosis';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSort, MatPaginator, MatTableDataSource, MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { LockUp } from '../../../entities/organization/LockUp';
import { AttributesService } from '../../../_services/_setup/attributes.service';
import { DiagnosisService } from '../../../_services/_setup/diagnosis.service';
import { ServicesService } from '../../../_services/_setup/services.service';
import { BenefitService } from '../../../_services/_setup/benefit.service';

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.css']
})
export class DiagnosisComponent implements OnInit {


  extraForm: string;
  snackPosition: MatSnackBarHorizontalPosition;

  diagnoseForm: Diagnose;
  diagnosis: Diagnose[];
  parentCodes: Diagnose[];
  serviceForm: Service;
  services: Service[];

  benefitForm: Benefit;
  benefits: Benefit[];

  attributeForm: Attribute;
  attributes: Attribute[];

  LockUps: LockUp[];
  AddUpdateUrl: string;

  submit: boolean;
  submit2: boolean;
  submit3: boolean;
  submit4: boolean;

  diagnoseTableColumns = ['select', 'ID', 'NAME', 'NAME2', 'BasicLobCode', 'ParentDiagnose', 'actions'];
  diagnosisDataSource: MatTableDataSource<Diagnose>;

  serviceTableColumns = ['select', 'ID', 'NAME', 'NAME2', 'ServiceType', 'BasicLobCode', 'actions'];
  servicesDataSource: MatTableDataSource<Service>;

  attributesTableColumns = ['select', 'ID', 'NAME', 'NAME2', 'BasicLobCode', 'actions'];
  attributesDataSource: MatTableDataSource<Attribute>;

  benefitTableColumns = ['select', 'ID', 'NAME', 'NAME2',   'BasicLobCode', 'actions'];
  benefitDataSource: MatTableDataSource<Benefit>;

  selection: SelectionModel<Diagnose>;
  selection2: SelectionModel<Service>;
  selection3: SelectionModel<Attribute>;
  selection4: SelectionModel<Benefit>;


  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('paginator2') paginator2: MatPaginator;
  @ViewChild('paginator3') paginator3: MatPaginator;
  @ViewChild('paginator4') paginator4: MatPaginator;

  @ViewChild('table', { read: MatSort }) sort: MatSort;
  @ViewChild('table2', { read: MatSort }) sort2: MatSort;
  @ViewChild('table3', { read: MatSort }) sort3: MatSort;
  @ViewChild('table4', { read: MatSort }) sort4: MatSort;


  BasicLobCodes: LockUp[];
  chargeType: LockUp[];
  servicesTypes: LockUp[];
  CommisionTypes: LockUp[];

  constructor(public snackBar: MatSnackBar, private http: HttpClient, private route: ActivatedRoute,
    private attributesService: AttributesService, private diagnosisService: DiagnosisService,
    private servicesService: ServicesService, private benefitService: BenefitService, private lockUpService: LockUpService) { }

  ngOnInit() {
    this.extraForm = '';
    this.snackPosition = 'right';

    this.selection = new SelectionModel<Diagnose>(true, []);
    this.selection2 = new SelectionModel<Service>(true, []);
    this.selection3 = new SelectionModel<Attribute>(true, []);
    this.selection4 = new SelectionModel<Benefit>(true, []);


    this.diagnoseForm = new Diagnose();
    this.serviceForm = new Service();
    this.attributeForm = new Attribute();
    this.benefitForm = new Benefit();

    this.submit = false;
    this.submit2 = false;
    this.submit3 = false;
    this.submit4 = false;

    this.route.data.subscribe(data => {
      this.parentCodes = data.parentDiagnose;
      this.BasicLobCodes = data.chargeType;
      // this.chargeType = ;data.DiagnoseResolver;
      // this.servicesTypes = data.servicesTypes;
      // this.CommisionTypes = data.CommisionTypes;
      this.renderDiagnoseTable(data.parentDiagnose);
    });



  }


  applyFilter(filterValue: string) {
    switch (this.extraForm) {
      case '':
        this.diagnosisDataSource.filter = filterValue.trim().toLowerCase();
        break;
      case 'services':
        this.servicesDataSource.filter = filterValue.trim().toLowerCase();
        break;
      case 'attributes':
        this.attributesDataSource.filter = filterValue.trim().toLowerCase();
        break;
      case 'benefit':
        this.benefitDataSource.filter = filterValue.trim().toLowerCase();
        break;

    }
  }
  loadServicesType() {
    this.lockUpService.LoadLockUpsByMajorCode(8).subscribe(res => {
      this.servicesTypes = res;
    });
  }
  loadBenefitType() {
    this.lockUpService.LoadLockUpsByMajorCode(9).subscribe(res => {
      this.CommisionTypes = res;
    });
  }

  changeTab($event) {
    setTimeout(() => {
      switch ($event.index) {
        case 0:
          this.extraForm = '';
          this.renderDiagnoseTable(this.diagnosis);
          break;
        case 1:
          this.loadServicesType();
          this.extraForm = 'services';
          this.reloadServiceTable();
          break;
        case 2:
          this.extraForm = 'attributes';
          this.reloadAttributesTable();
          break;
        case 3:
          this.loadBenefitType();
          this.extraForm = 'benefit';
          this.reloadBenefitTable();
          break;
      }
    });
  }

  renderDiagnoseTable(data) {
    this.diagnosis = data;
    this.diagnosisDataSource = new MatTableDataSource<Diagnose>(data);
    this.diagnosisDataSource.paginator = this.paginator;
    this.diagnosisDataSource.sort = this.sort;
    this.selection = new SelectionModel<Diagnose>(true, []);
    this.diagnosisDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort.direction === 'asc' ? '3' : '1';
      }
      // tslint:disable-next-line:max-line-length
      return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();
    };
  }

  renderServiceTable(data) {
    this.services = data;
    this.servicesDataSource = new MatTableDataSource<Service>(data);
    this.servicesDataSource.paginator = this.paginator2;
    this.servicesDataSource.sort = this.sort2;
    this.selection2 = new SelectionModel<Service>(true, []);

    this.servicesDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort2.direction === 'asc' ? '3' : '1';
      }
      // tslint:disable-next-line:max-line-length
      return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();
    };
  }

  renderAttributesTable(data) {
    this.attributes = data;
    this.attributesDataSource = new MatTableDataSource<Attribute>(data);
    this.attributesDataSource.paginator = this.paginator3;
    this.attributesDataSource.sort = this.sort3;
    this.selection3 = new SelectionModel<Attribute>(true, []);
    this.attributesDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort3.direction === 'asc' ? '3' : '1';
      }
      // tslint:disable-next-line:max-line-length
      return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();
    };
  }

  renderBenefitTable(data) {
    this.benefits = data;
    this.benefitDataSource = new MatTableDataSource<Benefit>(data);
    this.benefitDataSource.paginator = this.paginator4;
    this.benefitDataSource.sort = this.sort4;
    this.selection3 = new SelectionModel<Benefit>(true, []);
    this.benefitDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort3.direction === 'asc' ? '3' : '1';
      }
      // tslint:disable-next-line:max-line-length
      return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();
    };
  }

  reloadDiagnoseTable(LineOfBusinessCode?) {
    this.diagnosisService.load(null, 1, LineOfBusinessCode, null, 1).subscribe(data => {
      this.renderDiagnoseTable(data);
    });
  }


  reloadServiceTable(LineOfBusinessCode?, ChargeID?) {
    this.servicesService.load(null, 2, LineOfBusinessCode, ChargeID, 1).subscribe(data => {
      this.renderServiceTable(data);

    });
  }

  reloadAttributesTable(LineOfBusinessCode?) {
    this.attributesService.load(null, 3, LineOfBusinessCode, null, 1).subscribe(data => {
      this.renderAttributesTable(data);
    });
  }

  reloadBenefitTable(LineOfBusinessCode?) {
    this.attributesService.load(null, 4, LineOfBusinessCode, null, 1).subscribe(data => {
      this.renderBenefitTable(data);
    });
  }


  // add update delete Diagnose

  saveDiagnose(form) {
    if (form.invalid) {
      return;
    }
    this.diagnoseForm = this.diagnoseForm.selected ? this.diagnoseForm : Object.assign({}, form.value);
    this.diagnoseForm.CreatedBy = 'Admin';
    this.diagnoseForm.LockUpChargeType = 1;
    // this.diagnoseForm.LockUpType = 2;

    if (this.diagnoseForm.selected) {
      this.AddUpdateUrl = this.diagnosisService.ApiUrl + 'Update';
    } else {
      this.AddUpdateUrl = this.diagnosisService.ApiUrl + 'Create';
    }

    this.http.post(this.AddUpdateUrl, this.diagnoseForm).subscribe(res => {
      this.snackBar.open('Saved successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadDiagnoseTable();
      this.diagnoseForm = new Diagnose();
      this.submit = false;
      form.resetForm();
    });

  }

  deleteDiagnose(id) {
    this.http.post(this.diagnosisService.ApiUrl + 'Delete', { ID: id }).subscribe(res => {
      this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadDiagnoseTable();
    });
  }

  updateDiagnose(diagnose: Diagnose) {
    window.scroll(0, 0);
    this.diagnoseForm = new Diagnose;
    this.diagnoseForm = diagnose;
    this.diagnoseForm.selected = true;
  }


  // add update delete Service

  saveService(form) {

    if (form.invalid) { return; }
    this.serviceForm = this.serviceForm.selected ? this.serviceForm : Object.assign({}, form.value);
    this.serviceForm.CreatedBy = 'Admin';
    // this.serviceForm.LockUpType = 2;
    this.serviceForm.LockUpChargeType = 2;
    if (this.serviceForm.selected) {
      this.AddUpdateUrl = this.servicesService.ApiUrl + 'Update';
    } else {
      this.AddUpdateUrl = this.servicesService.ApiUrl + 'Create';
    }
    this.http.post(this.AddUpdateUrl, this.serviceForm).subscribe(res => {
      this.snackBar.open('Saved successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadServiceTable();
      this.serviceForm = new Service;
      this.submit2 = false;
      form.resetForm();
    });

  }

  deleteService(id) {
    this.http.post(this.servicesService.ApiUrl + 'Delete', { ID: id }).subscribe(res => {
      this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadServiceTable();
    });
  }

  updateService(service: Service) {
    window.scroll(0, 0);
    this.serviceForm = new Service;
    this.serviceForm = service;
    this.serviceForm.selected = true;
  }


  // add update delete Attribute

  saveAttribute(form) {
    if (form.invalid) { return; }
    this.attributeForm = this.attributeForm.selected ? this.attributeForm : Object.assign({}, form.value);
    this.attributeForm.LockUpChargeType = 3;
    if (this.attributeForm.selected) {
      this.AddUpdateUrl = this.attributesService.ApiUrl + 'Update';
    } else {
      this.AddUpdateUrl = this.attributesService.ApiUrl + 'Create';
    }
    this.http.post(this.AddUpdateUrl, this.attributeForm).subscribe(res => {
      this.snackBar.open('Saved successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadAttributesTable();
      this.attributeForm = new Attribute;
      this.submit3 = false;
      form.resetForm();
    });

  }

  deleteAttribute(id) {
    this.http.post(this.attributesService.ApiUrl + 'Delete', { ID: id }).subscribe(res => {
      this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadAttributesTable();
    });

  }

  updateAttribute(attributes: Attribute) {
    window.scroll(0, 0);
    this.attributeForm = new Attribute;
    this.attributeForm = attributes;
    this.attributeForm.selected = true;
  }

  // add update delete Benefit

  saveBenefit(form) {
    if (form.invalid) { return; }
    this.benefitForm = this.benefitForm.selected ? this.benefitForm : Object.assign({}, form.value);
    this.benefitForm.LockUpChargeType = 4;
    if (this.benefitForm.selected) {
      this.AddUpdateUrl = this.benefitService.ApiUrl + 'Update';
    } else {
      this.AddUpdateUrl = this.benefitService.ApiUrl + 'Create';
    }
    this.http.post(this.AddUpdateUrl, this.benefitForm).subscribe(res => {
      this.snackBar.open('Saved successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadBenefitTable();
      this.benefitForm = new Benefit;
      this.submit4 = false;
      form.resetForm();
    });

  }

  deleteBenefit(id) {
    this.http.post(this.benefitService.ApiUrl + 'Delete', { ID: id }).subscribe(res => {
      this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadAttributesTable();
    });

  }

  updateBenefit(benefit: Benefit) {
    window.scroll(0, 0);
    this.benefitForm = new Benefit;
    this.benefitForm = benefit;
    this.benefitForm.selected = true;
  }


  loadServices(type = 2, lineofBusiness = null) {
    this.servicesService.load(null, type, lineofBusiness, null, 1).subscribe(data => {
      this.services = data;
      this.servicesDataSource = new MatTableDataSource<Service>(this.services);
    });
  }



  export(type, data) {
    switch (type) {
      case 'pdf':
        // this.coreService.ExportToPdf(data, data);
        break;
      case 'csv':
        // this.coreService.ExportToCsv(data, data);
        break;
      case 'excel':
        // this.coreService.ExportToExcel(data, data);
        break;
    }
  }

  getServiceName(id: number) {
    if (this.servicesTypes) {
      for (let index = 0; index < this.servicesTypes.length; index++) {
        if (this.servicesTypes[index].ID === id) {
          return this.servicesTypes[index].Name;
        }
      }
    }
  }


  getDiagnoseName(id: number) {
    for (let index = 0; index < this.diagnosis.length; index++) {
      if (this.diagnosis[index].ID === id) {
        return this.diagnosis[index].Name;
      }
    }
  }

  getLineOfBusinessName(id: number) {
    for (let index = 0; index < this.BasicLobCodes.length; index++) {
      if (this.BasicLobCodes[index].ID === id) {
        return this.BasicLobCodes[index].Name;
      }
    }
  }

  getCommisionTypeName(id: number) {
    for (let index = 0; index < this.CommisionTypes.length; index++) {
      if (this.CommisionTypes[index].ID === id) {
        return this.CommisionTypes[index].Name;
      }
    }
  }


  isAllSelected() {
    return this.selection.selected.length === this.diagnosisDataSource.data.length;
  }
  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.diagnosisDataSource.data.forEach(row => this.selection.select(row));
  }

  isAllSelected2() {
    return this.selection2.selected.length === this.servicesDataSource.data.length;
  }
  masterToggle2() {
    this.isAllSelected2() ? this.selection2.clear() : this.servicesDataSource.data.forEach(row => this.selection2.select(row));
  }

  isAllSelected3() {
    return this.selection3.selected.length === this.attributesDataSource.data.length;
  }
  masterToggle3() {
    this.isAllSelected3() ? this.selection3.clear() : this.attributesDataSource.data.forEach(row => this.selection3.select(row));
  }
  isAllSelected4() {
    return this.selection4.selected.length === this.benefitDataSource.data.length;
  }
  masterToggle4() {
    this.isAllSelected4() ? this.selection4.clear() : this.benefitDataSource.data.forEach(row => this.selection4.select(row));
  }


  resetForm(form) {
    form.reset();
  }







  deleteSelectedData() {

    const selectedData = [];
    switch (this.extraForm) {
      case '':
        for (let index = 0; index < this.selection.selected.length; index++) {
          selectedData.push(this.selection.selected[index].ID);
        }
        this.http.post(this.diagnosisService.ApiUrl + 'DeleteMultiple', { IDs: selectedData }).subscribe(res => {
          this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
          this.reloadDiagnoseTable();
        });
        break;
      case 'services':
        for (let index = 0; index < this.selection2.selected.length; index++) {
          selectedData.push(this.selection2.selected[index].ID);
        }
        this.http.post(this.servicesService.ApiUrl + 'DeleteMultiple', { IDs: selectedData }).subscribe(res => {
          this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
          this.reloadServiceTable();
        });
        break;
      case 'attributes':
        for (let index = 0; index < this.selection3.selected.length; index++) {
          selectedData.push(this.selection3.selected[index].ID);
        }
        this.http.post(this.attributesService.ApiUrl + 'DeleteMultiple', { IDs: selectedData }).subscribe(res => {
          this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
          this.reloadAttributesTable();
        });
        break;
    }


  }

}
