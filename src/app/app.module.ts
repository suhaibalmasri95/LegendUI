import { ChargeTypeResolver } from './_resolvers/chargeType.resolver';
import { CoverResolver } from './_resolvers/cover-resolver.resolver';
import { BankResolver } from './_resolvers/bank.resolver';
import { CurrencyResolver } from './_resolvers/currency-reolver.resolver';
import { AreaResolver } from './_resolvers/area-reolver.resolver';
import { CountryResolver } from './_resolvers/country-reolver.resolver';
import { CityResolver } from './_resolvers/city-reolver.resolver';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { ROUTES } from './app.routes';
import { AppComponent } from './app.component';

// App views
import { AppviewsModule } from './views/appviews/appviews.module';

// App modules/components
import { LayoutsModule } from './components/common/layouts/layouts.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BankBranchResolver } from './_resolvers/BankBranch.resolver';
import { LockUpResolver } from './_resolvers/lockup-reolver.resolver';
import { MajorCodeResolver } from './_resolvers/majorCodes.resolver';
import { CompanyResolver } from './_resolvers/company-reolver.resolver';
import { CompanyBranchResolver } from './_resolvers/companyBranch-reolver.resolver';
import { UserTypesResolver } from './_resolvers/userTypes-reolver.resolver';
import { UsersResolver, GroubsResolver } from './_resolvers/users.resolver';
import { SystemsResolver } from './_resolvers/menuDetails.resolver';
import { ReportsGroupResolver } from './_resolvers/reports.resolver';
import { ModuleResolver } from './_resolvers/module.resolver';
import { ExcessFromResolver } from './_resolvers/excess-from.resolver';
import { RenisTypeResolver } from './_resolvers/reins-type.resolver';
import { SubLineOfBusinessLockUpResolver } from './_resolvers/sub-line-of-business-lock-up.resolver';
import { LineOfBusinessResolver } from './_resolvers/line-of-business.resolver';
import { LineOfBusinessLockUpResolver } from './_resolvers/line-of-business-lock-up.resolver';
import { DiagnosisResolver, CodingSystemsResolver, GendersResolver, FrequencyUnitsResolver } from './_resolvers/Diagnosis.resolver';
import { QuestionnaireResolver } from './_resolvers/questionnaires.resolver';
import { AppliedOnResolver } from './_resolvers/applied-on.resolver';
import { SubLineOfBusinessResolver } from './_resolvers/sub-line-business.resolver';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    LayoutsModule,
    AppviewsModule,
    RouterModule.forRoot(ROUTES),
    BrowserAnimationsModule,
  ],

  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy },
    LockUpResolver,
    CityResolver,
    CountryResolver,
    AreaResolver,
    CurrencyResolver,
    BankResolver,
    BankBranchResolver,
    MajorCodeResolver,
    CompanyResolver,
    CompanyBranchResolver,
    UserTypesResolver,
    UsersResolver,
    GroubsResolver,
    SystemsResolver,
    ReportsGroupResolver,
    SubLineOfBusinessLockUpResolver,
    LineOfBusinessResolver,
    LineOfBusinessLockUpResolver,
    ModuleResolver,
    ExcessFromResolver,
    RenisTypeResolver,
    CoverResolver,
    ChargeTypeResolver,
    DiagnosisResolver,
    CodingSystemsResolver,
    GendersResolver,
    FrequencyUnitsResolver,
    QuestionnaireResolver,
    AppliedOnResolver,
    SubLineOfBusinessResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
