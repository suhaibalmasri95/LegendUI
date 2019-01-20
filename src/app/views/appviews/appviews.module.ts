
import { ProductAttachmentsComponent } from './productAttachments/productAttachments.component';
import { TableComponent } from './dynamic-component/table/table.component';
import { SelectComponentComponent } from './dynamic-component/select-component/SelectComponentComponent';
import { DynamicComponentComponent } from './dynamic-component/dynamic-component.component';
import { DynamicColumnsComponent } from './dynamic-component/dynamic-columns/dynamic-columns.component';
import { QuotationComponent } from './quotation/quotation.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CountriesComponent } from './countries/countries.component';
import { LoginComponent } from './login.component';
import { SparklineModule } from '../../components/charts/sparkline';
import { PeityModule } from '../../components/charts/peity';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatPaginatorModule, MatTabsModule, MatInputModule, MatExpansionModule, MatSidenavModule, MatRadioModule, MatDialog } from '@angular/material';
import { MatSortModule, MatSelectModule, MatSnackBarModule } from '@angular/material';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BanksComponent } from './banks/banks.component';
import { LockupAndCurrencyComponent } from './lockupAndCurrency/lockupAndCurrency.component';
import { CompanybranchComponent } from './companybranch/companybranch.component';
import { UsersComponent } from './users/users.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ReportsComponent } from './reports/reports.component';
import { MenuDetailsComponent } from './menuDetails/menuDetails.component';
import { GroupsComponent } from './groups/groups.component';
import { LineOfBusinessComponent } from './line-of-business/line-of-business.component';
import { TreeviewModule } from 'ngx-treeview';
import { ChargesComponent } from './charges/charges.component';
import { DiagnosisComponent } from './diagnosis/diagnosis.component';
import { QuestionnairesComponent } from './questionnaires/questionnaires.component';
import { DynamicCategoriesComponent } from './dynamicCategories/dynamicCategories.component';
import { ProductsComponent } from './products/products.component';
import {MatCardModule} from '@angular/material/card';
import { SummaryComponent } from './Summary/Summary.component';
import {MatIconModule} from '@angular/material';
import { SidenavComponent } from './sidenav/sidenav.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { CdkTableModule} from '@angular/cdk/table';
import { CustomersComponent } from './customers/customers.component';
import {MatDialogModule} from '@angular/material/dialog';
import { SearchCustomersComponent } from './customers/searchCustomers/search-customers.component';
import { DepartmentsResolver } from 'src/app/_resolvers/customers.resolver';

@NgModule({
  declarations: [
    LoginComponent,
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
    ProductAttachmentsComponent,
    QuotationComponent,
    SummaryComponent,
    SidenavComponent,
    DynamicComponentComponent,
    DynamicColumnsComponent,
    SelectComponentComponent,
    TableComponent,
    CustomersComponent ,
    SearchCustomersComponent
  ],
  entryComponents: [SearchCustomersComponent],
  imports: [
    RouterModule,
    PeityModule,
    SparklineModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    HttpClientModule,
    BrowserModule,
    DataTablesModule,
    NgbModule,
    BrowserAnimationsModule,
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
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' // set defaults here
    }),
    MatDividerModule,
    MatCheckboxModule,
    MatRadioModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatExpansionModule,
    TreeviewModule.forRoot(),
    MatCardModule,
    BsDatepickerModule.forRoot(),
    MatDialogModule

  ],
  exports: [
    CountriesComponent,
    LoginComponent
  ],
})

export class AppviewsModule {
}
