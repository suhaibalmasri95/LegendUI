import { Risk } from './../../../../entities/production/Risk';
import { RiskService } from './../../../../_services/_production/Risk.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-covers',
  templateUrl: './covers.component.html',
  styleUrls: ['./covers.component.css']
})
export class CoversComponent implements OnInit {
  agentCommisonTableColumn = ['select', 'Share Type', 'Line Of Business', 'Sub Line Of Business', 'action'];
  RiskSearch: FormControl = new FormControl();
  risks: Risk[] = [];
  constructor(private riskService: RiskService) { }

  ngOnInit() {
    this.RiskSearch.valueChanges.subscribe(
      term => {
        if (term !== '') {
          this.riskService.load(null, null, null).subscribe(
            data => {
              if (data.length > 0) {
                this.risks = data;
              
              } else {
            
              }
            });
        } else {
         
        }
      });
  }

}
