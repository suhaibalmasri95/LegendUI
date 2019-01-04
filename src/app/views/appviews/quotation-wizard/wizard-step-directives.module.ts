import { AttachmentComponent } from './../quotation/attachment/attachment.component';
import { CountriesComponent } from './../countries/countries.component';
import { BanksComponent } from './../banks/banks.component';
import { LockupAndCurrencyComponent } from './../lockupAndCurrency/lockupAndCurrency.component';
import { CompanybranchComponent } from './../companybranch/companybranch.component';
import { UsersComponent } from './../users/users.component';
import { ReportsComponent } from './../reports/reports.component';
import { MenuDetailsComponent } from './../menuDetails/menuDetails.component';
import { GroupsComponent } from './../groups/groups.component';
import { LineOfBusinessComponent } from './../line-of-business/line-of-business.component';
import { ChargesComponent } from './../charges/charges.component';
import { DiagnosisComponent } from './../diagnosis/diagnosis.component';
import { QuestionnairesComponent } from './../questionnaires/questionnaires.component';
import { DynamicCategoriesComponent } from './../dynamicCategories/dynamicCategories.component';
import { ProductAttachmentsComponent } from './../productAttachments/productAttachments.component';
import { ProductsComponent } from './../products/products.component';
import { LoginComponent } from './../login.component';
import { TableComponent } from './../dynamic-component/table/table.component';
import { SelectComponentComponent } from './../dynamic-component/select-component/SelectComponentComponent';
import { DynamicColumnsComponent } from './../dynamic-component/dynamic-columns/dynamic-columns.component';
import { DynamicComponentComponent } from './../dynamic-component/dynamic-component.component';
import { SidenavComponent } from './../sidenav/sidenav.component';
import { SummaryComponent } from './../Summary/Summary.component';
import { RiskComponent } from './../quotation/risk/risk.component';
import { QuotationComponent } from './../quotation/quotation.component';
import { QuotationWizardComponent } from './quotation-wizard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ArchwizardModule} from 'angular-archwizard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule, MatExpansionModule, MatCheckboxModule,
  MatDividerModule, MatSidenavModule, MatAutocompleteModule, MatIconModule,
   MatSnackBarModule, MatSelectModule, MatInputModule, MatTabsModule,
   MatSortModule, MatPaginatorModule, MatTableModule, MatListModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TreeviewModule } from 'ngx-treeview';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    ArchwizardModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    HttpClientModule,
    BrowserModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTabsModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatIconModule,
    MatAutocompleteModule,
    MatSidenavModule,
    CdkTableModule,
    MatDividerModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatCardModule,
    MatListModule,
    BrowserAnimationsModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' // set defaults here
    }),
    NgMultiSelectDropDownModule.forRoot(),
    TreeviewModule.forRoot(),
    BsDatepickerModule.forRoot(),
    DataTablesModule,
    NgbModule,
  ],
  declarations: [QuotationWizardComponent, QuotationComponent, RiskComponent ,
     SummaryComponent,
    SidenavComponent,
    DynamicComponentComponent,
    DynamicColumnsComponent,
    SelectComponentComponent,
    TableComponent, LoginComponent,
    CountriesComponent,
    BanksComponent,
    LockupAndCurrencyComponent,
    CompanybranchComponent,
    UsersComponent,
    ReportsComponent,
    MenuDetailsComponent,
    GroupsComponent,
    LineOfBusinessComponent,
    ChargesComponent,
    DiagnosisComponent,
    QuestionnairesComponent,
    DynamicCategoriesComponent,
    ProductsComponent,
    ProductAttachmentsComponent, AttachmentComponent],

  exports: [QuotationWizardComponent,  LoginComponent]
})
export class WizardStepDirectivesModule { }
