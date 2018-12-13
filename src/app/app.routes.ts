import { SubLineOfBusinessResolver } from './_resolvers/sub-line-business.resolver';
import { AppliedOnResolver } from './_resolvers/applied-on.resolver';
import { QuestionnaireResolver } from './_resolvers/questionnaires.resolver';
import { CoverResolver } from './_resolvers/cover-resolver.resolver';

import { BankResolver } from './_resolvers/bank.resolver';
import { CountryResolver } from './_resolvers/country-reolver.resolver';
import { Routes } from '@angular/router';
import { CountriesComponent } from './views/appviews/countries/countries.component';
import { LoginComponent } from './views/appviews/login.component';
import { BlankLayoutComponent } from './components/common/layouts/blankLayout.component';
import { BasicLayoutComponent } from './components/common/layouts/basicLayout.component';
import { CurrencyResolver } from './_resolvers/currency-reolver.resolver';
import { BanksComponent } from './views/appviews/banks/banks.component';
import { LockupAndCurrencyComponent } from './views/appviews/lockupAndCurrency/lockupAndCurrency.component';
import { BankBranchResolver } from './_resolvers/BankBranch.resolver';
import { MajorCodeResolver } from './_resolvers/majorCodes.resolver';
import { LockUpResolver } from './_resolvers/lockup-reolver.resolver';

import { CityResolver } from './_resolvers/city-reolver.resolver';
import { CompanyResolver } from './_resolvers/company-reolver.resolver';
import { CompanybranchComponent } from './views/appviews/companybranch/companybranch.component';
import { CompanyBranchResolver } from './_resolvers/companyBranch-reolver.resolver';
import { UsersComponent } from './views/appviews/users/users.component';
import { ReportsComponent } from './views/appviews/reports/reports.component';
import { MenuDetailsComponent } from './views/appviews/menuDetails/menuDetails.component';
import { GroupsComponent } from './views/appviews/groups/groups.component';
import { GroubsResolver, UsersResolver } from './_resolvers/users.resolver';
import { UserTypesResolver } from './_resolvers/userTypes-reolver.resolver';
import { LineOfBusinessComponent } from './views/appviews/line-of-business/line-of-business.component';
import { SystemsResolver } from './_resolvers/menuDetails.resolver';
import { ReportsGroupResolver } from './_resolvers/reports.resolver';
import { ModuleResolver } from './_resolvers/module.resolver';
import { LineOfBusinessLockUpResolver } from './_resolvers/line-of-business-lock-up.resolver';
import { RenisTypeResolver } from './_resolvers/reins-type.resolver';
import { ExcessFromResolver } from './_resolvers/excess-from.resolver';
import { LineOfBusinessResolver } from './_resolvers/line-of-business.resolver';
import { SubLineOfBusinessLockUpResolver } from './_resolvers/sub-line-of-business-lock-up.resolver';
import { ChargesComponent } from './views/appviews/charges/charges.component';
import { ChargeTypeResolver } from './_resolvers/chargeType.resolver';
import { DiagnosisComponent } from './views/appviews/diagnosis/diagnosis.component';
import { DiagnosisResolver, CodingSystemsResolver, GendersResolver, FrequencyUnitsResolver } from './_resolvers/Diagnosis.resolver';
import { QuestionnairesComponent } from './views/appviews/questionnaires/questionnaires.component';
import { DynamicCategoriesComponent } from './views/appviews/dynamicCategories/dynamicCategories.component';
import { CategoriesResolver, ColumnTypesResolver, CategoriesLevelsResolver } from './_resolvers/categories.resolver';
import { ProductsComponent } from './views/appviews/products/products.component';
import { AuthGuard } from './_guards/auth.guard';

export const ROUTES: Routes = [
  // Main redirect

  { path: '', redirectTo: 'organizations', pathMatch: 'full' },
  {
    path: '', component: BlankLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
    ]
  },
  { path: '',
  runGuardsAndResolvers: 'always' ,
  canActivate: [AuthGuard] ,

    children: [
      {
        path: 'organizations', component: BasicLayoutComponent,
      },
      {
        path: 'countries', component: CountriesComponent,
        resolve: {
          lockUp: LockUpResolver,
          country: CountryResolver,
          currencies: CurrencyResolver
        }
      },
      {
        path: 'banks', component: BanksComponent,
        resolve: {
          banks: BankResolver,
          bankBranch: BankBranchResolver,
          country: CountryResolver,
          lockUp: LockUpResolver,
          currencies: CurrencyResolver
        }
      },
      {
        path: 'lockupAndCurrency', component: LockupAndCurrencyComponent,
        resolve: {
          lockUp: LockUpResolver,
          majorCode: MajorCodeResolver,
          currencies: CurrencyResolver
        }
      },
      {
        path: 'companies', component: CompanybranchComponent,
        resolve: {
          currencies: CurrencyResolver,
          country: CountryResolver,
          company: CompanyResolver,
          city: CityResolver,
          branches: CompanyBranchResolver
        }
      },
      {
        path: 'users', component: UsersComponent,
        resolve: {
          users: UsersResolver,
          lockUp: LockUpResolver,
          company: CompanyResolver,
          country: CountryResolver,
          userTypes: UserTypesResolver,
          // groups: GroubsResolver
        }
      },
      {
        path: 'reports', component: ReportsComponent,
        resolve: {
          reportsGroup: ReportsGroupResolver,
        }
      },
      {
        path: 'menuDetails', component: MenuDetailsComponent,
        resolve: {
          systems: SystemsResolver
        }
      },
      {
        path: 'groups', component: GroupsComponent,
        resolve: {
          lockUp: LockUpResolver,
          country: CountryResolver,
          groups: GroubsResolver
        }
      }


    ]
  },
  {
    path: '',
  runGuardsAndResolvers: 'always' ,
  canActivate: [AuthGuard] ,
    children: [
      { path: 'setup', component: BasicLayoutComponent},
      {
        path: 'lineOfBusiness', component: LineOfBusinessComponent,
        resolve: {
          lockUp: LockUpResolver,
          module: ModuleResolver,
          lineOfBusiness: LineOfBusinessResolver,
          lineOfBusinessLockUp: LineOfBusinessLockUpResolver,
          subLineOfBusinessLockUp: SubLineOfBusinessLockUpResolver,
          renisType: RenisTypeResolver,
          excessFrom: ExcessFromResolver
        }
      },
      {
        path: 'charges', component: ChargesComponent,
        resolve: {
          parentCover: CoverResolver,
          chargeType: ChargeTypeResolver
        }
      },
      {
        path: 'diagnosis', component: DiagnosisComponent,
        resolve: {
          Diagnosis: DiagnosisResolver,
          CodingSystems: CodingSystemsResolver,
          Genders: GendersResolver,
          FrequencyUnits: FrequencyUnitsResolver
        }
      },
      {
        path: 'questionnaires', component: QuestionnairesComponent,
        resolve: {
          questionnaires: QuestionnaireResolver,
          appliedOn: AppliedOnResolver,
          lineOfBusiness: LineOfBusinessResolver,
          subLineOfBusiness: SubLineOfBusinessResolver,
          Status: LockUpResolver,
        }
      },
      {
        path: 'dynamicCategories', component: DynamicCategoriesComponent,
        resolve: {
          category: CategoriesResolver,
          Levels: CategoriesLevelsResolver,
          ColumnTypes: ColumnTypesResolver,
          lineOfBusiness: LineOfBusinessResolver,
          subLineOfBusiness: SubLineOfBusinessResolver,
          Status: LockUpResolver,
        }
      }
    ]
  },
  {
    path: 'products-setup', component: BasicLayoutComponent,
    children: [
      {
        path: 'products', component: ProductsComponent,
        resolve: {
          category: CategoriesResolver,
          Levels: CategoriesLevelsResolver,
          ColumnTypes: ColumnTypesResolver,
          lineOfBusiness: LineOfBusinessResolver,
          subLineOfBusiness: SubLineOfBusinessResolver,
          Status: LockUpResolver,
        }
      }
    ]
  },


  // Handle all other routes
  { path: '**', redirectTo: 'organizations', pathMatch: 'full' },


];
