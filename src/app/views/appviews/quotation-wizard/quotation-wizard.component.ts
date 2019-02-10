import { DocumentService } from './../../../_services/DocumentService.service';
import { Documents } from './../../../entities/production/Documents';
import { Component, OnInit } from '@angular/core';
import { Risk } from '../../../entities/production/Risk';
import { RiskListenerService } from '../../../_services/RiskListener.service';

@Component({
  selector: 'app-quotation-wizard',
  templateUrl: './quotation-wizard.component.html',
  styleUrls: ['./quotation-wizard.component.css']
})
export class QuotationWizardComponent implements OnInit {
  isDocumentInserted: boolean;
  document: Documents;
  risks: Risk[] = [];
  constructor( private _docService: DocumentService , private _riskSerivce: RiskListenerService) { }

  ngOnInit() {
    this.isDocumentInserted  = false;
    this._docService.currentDocument.subscribe(res => {
      this.document = res;
    });
    this._riskSerivce.currentRisks.subscribe(res=>{
      this.risks = res;
    });
  }

}
