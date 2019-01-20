import { WizardStepDirectivesModule } from './quotation-wizard/wizard-step-directives.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

 
  


@NgModule({
  declarations: [
  ],
 imports: [
   RouterModule,
  WizardStepDirectivesModule

 ],
  exports: [
    WizardStepDirectivesModule
  ],
})

export class AppviewsModule {
}
