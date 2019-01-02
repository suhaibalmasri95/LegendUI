import { DocumentService } from './../../../_services/DocumentService.service';
import { Documents } from './../../../entities/production/Documents';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quotation-wizard',
  templateUrl: './quotation-wizard.component.html',
  styleUrls: ['./quotation-wizard.component.css']
})
export class QuotationWizardComponent implements OnInit {
  isDocumentInserted: boolean;
  document: Documents;
  constructor() { }

  ngOnInit() {
    this.isDocumentInserted  = false;
    this.document = new Documents();
  }

}
