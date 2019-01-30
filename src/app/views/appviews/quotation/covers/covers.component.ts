import { Risk } from './../../../../entities/production/Risk';
import { RiskService } from './../../../../_services/_production/Risk.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SharesService } from '../../../../_services/_products/shares.service';
import { Documents } from '../../../../entities/production/Documents';
import { Share } from '../../../../entities/production/Share';
import { SearchService } from '../../../../_services/search.service';
import { HttpClient } from '@angular/common/http';
import { CoversService } from '../../../../_services/_setup/Covers.service';
import { Cover } from '../../../../entities/Setup/Charges';
import { CalculationService } from '../../../../_services/_production/Calculation.service';
import { Calculation } from '../../../../entities/production/Calculation';
import { SubBusinessService } from '../../../../_services/_setup/SubBusiness.service';
import { LineOfBusiness } from '../../../../entities/Setup/lineOfBusiness';
import { SubLineOfBusiness } from '../../../../entities/Setup/SubLineOfBusiness';
import { LineOfBusinessService } from '../../../../_services/_setup/LineOfBusiness.service';
import { InstallmentService } from '../../../../_services/_production/Installment.service';
import { Installment } from '../../../../entities/production/Installment';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-covers',
  templateUrl: './covers.component.html',
  styleUrls: ['./covers.component.css']
})
export class CoversComponent implements OnInit {
  documentRiskColumn = ['select', 'Serial', 'Effective Date', 'Expiry Date'
    , 'Line Of Business', 'Sub Line Of Business', 'Gross Amount',
    'Net Amount'];
  agentCommisonTableColumn = ['select', 'Share Type', 'Agent Name', 'Commission', 'Commission Amount',
    'Line Of Business', 'Sub Line Of Business', 'action'];

  documentCovers = ['select', 'Risk Name', 'Cover Name', 'Rate', 'Manual Amount',
    'Line Of Business', 'Sub Line Of Business', 'Sum Insured', 'Gross Amount',
    'Net Amount', 'action'];
  documentFees = ['select',
    'Line Of Business', 'Sub Line Of Business', 'Fee', 'Fee Amount', 'action'];

  documentInstallment = [ 'select',
    'DueDate', 'InstallmentPercentage', 'GrossAmount',
    'NetAmount', 'FeesAmount', 'CommissionAmount' , 'actions'];
  RiskSearch: FormControl = new FormControl();
  ChargeSearch: FormControl = new FormControl();
  FeeSearch: FormControl = new FormControl();
  NameSearch: FormControl = new FormControl();
  SerialSearch: FormControl = new FormControl();
  containSalesPerson: boolean = false;
  containAgent: boolean = false;
  containBroker: boolean = false;
  risks: Risk[] = [];
  risksTable: Risk[] = [];
  document: Documents;
  user: any;
  shares: Share[] = [];
  coverShare: Share = new Share();
  share: Share;
  selectedCover: Cover = new Cover();
  selectedFee: Cover = new Cover();
  covers: Cover[] = [];
  fees: Cover[] = [];
  Lobs: LineOfBusiness[];
  SubLobs: SubLineOfBusiness[];
  documentCover: Calculation = new Calculation();
  documentFee: Calculation = new Calculation();
  selectedRisk: Risk = new Risk();
  coverCalculation: Calculation[] = []; 
  RiskCalculation: Calculation[] = []; 
  
  Installments: Installment[] = [];
  dataSource: MatTableDataSource<Installment>;
  riskTableColumn = ['select', 'Serial', 'Effective Date', 'Expiry Date', 'Line Of Business',
    'Sub Line Of Business', 'Sum insured', 'Net Premium', 'Gross Premium', 'action'];
  constructor(private riskService: RiskService, private seracrhService: SearchService,
    private shareService: SharesService, private coverService: CoversService ,
     private http: HttpClient , private line: LineOfBusinessService, 
     private subLineService: SubBusinessService, private calculateSerivce: CalculationService ,
      private installmentService: InstallmentService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.share = new Share();
    this.line.load(null,null,null,1).subscribe(res => {
      this.Lobs = res;
    });
    this.test();
    this.RiskSearch.valueChanges.subscribe(
      term => {
        if (term !== '') {
          this.riskService.load(null, this.document.ID, null).subscribe(
            data => {
              if (data.length > 0) {
                this.risks = data;

              } else {

              }
            });
        } else {

        }
      });
      this.ChargeSearch.valueChanges.subscribe(
        term => {
          if (term !== '') {
            this.coverService.load(null, 1 , null , null , 1).subscribe(
              data => {
                if (data.length > 0) {
                  this.covers = data;
  
                } else {
  
                }
              });
          } else {
  
          }
        });

        this.FeeSearch.valueChanges.subscribe(
          term => {
            if (term !== '') {
              this.coverService.load(null, 2 , null , null , 1).subscribe(
                data => {
                  if (data.length > 0) {
                    this.fees = data;
    
                  } else {
    
                  }
                });
            } else {
    
            }
          });

          this.NameSearch.valueChanges.subscribe(
            term => {
              if (term !== '') {
                this.riskService.load(null,null , 1 , null, term).subscribe(
                  data => {
                   
                      this.risksTable = data;
      
                  
                  });
              } else {
      
              }
            });
            this.SerialSearch.valueChanges.subscribe(
              term => {
                if (term !== '') {
                  this.riskService.load(null, null , 1 , term , null).subscribe(
                    data => {
                    
                        this.risksTable = data;
        
                  
                    });
                } else {
        
                }
              });
 
  }

  updateDueDate(el: Installment, DueDate: Date) {
    if (DueDate == null) { return; }
    // copy and mutate
    const copy = this.dataSource.data.slice()
     el.DueDate = DueDate;
   this.dataSource = new MatTableDataSource<Installment>(copy);
   this.http.post(this.installmentService.ApiUrl + 'Create' , el).subscribe(res => {
    console.log(res);
   });
  }

  updateInstallmentPercent(el: Installment, installmentPercent: number) {
    if (installmentPercent == null) { return; }
    //copy and mutate
    const copy = this.dataSource.data.slice()
   el.Percent = installmentPercent;
 
    this.dataSource = new MatTableDataSource<Installment>(copy);
    this.http.post(this.installmentService.ApiUrl + 'Create' , el).subscribe(res => {
      console.log(res);
     });
  }
  switchTabs(event) {
    setTimeout(() => {
    switch (event.index) {
      case 0:
   
        break;
      case 1:
      this.shareService.load(null, null, this.document.ID, null, null, null, 1).subscribe(shares => {
        this.shares = shares;

        this.getCustomerDependsOnShareType();
      });
        break;
      case 2:
      this.calculateSerivce.load(null, 1, this.document.ID, 
        this.selectedRisk.ID ? this.selectedRisk.ID : null, 1).subscribe(cal => {
        this.coverCalculation = cal;

        
      });
        break;
        case 3:
        this.calculateSerivce.load(null, 2, this.document.ID, 
          this.selectedRisk.ID ? this.selectedRisk.ID : null, 1).subscribe(cal => {
          this.RiskCalculation = cal;
  
          
        });
        break;
        case 4:
        this.installmentService.load(null, this.document.ID, 1).subscribe(res => {
          this.Installments = res;
          this.renderCountryTable(res);
        })
        break;
    }
  });
    console.log(event);
  }

  getCustomerDependsOnShareType() {
    this.shares.forEach(element => {
      this.seracrhService.search(element.CustomerId, null, null, null, null,
        null, null, 1, element.LocShareType).subscribe(res => {
          if (element.LocShareType === 1 || element.LocShareType === 2) {
            this.share = element;
          }
          if (element.LocShareType === 3) {
            this.containAgent = true;
          }
          if (element.LocShareType === 4) {
            this.containBroker = true;
          }
          if (element.LocShareType === 5) {
            this.containSalesPerson = true;
          }
        });
    });

  }
  displayRisk(risk: Risk): string | undefined {
    return risk ? risk.Name : undefined;
  }
  displayCharge(cvoer: Cover): string | undefined {
    return cvoer ? cvoer.Name : undefined;
  }
  displayFee(cvoer: Cover): string | undefined {
    return cvoer ? cvoer.Name : undefined;
  }
  setRisk(risk: Risk){
    this.RiskSearch.patchValue(risk);
    this.selectedRisk = risk;
    this.coverShare.StLOB = this.selectedRisk.StLOB ? this.selectedRisk.StLOB : null;
    this.coverShare.StSubLOB = this.selectedRisk.StSubLOB? this.selectedRisk.StSubLOB : null;
  }
  setRiskAutoComplete(){
    this.selectedRisk =  this.RiskSearch.value;
  
    this.coverShare.StLOB = this.selectedRisk.StLOB ? this.selectedRisk.StLOB : null;
    this.coverShare.StSubLOB = this.selectedRisk.StSubLOB? this.selectedRisk.StSubLOB : null;
  }
  setChargeAutoComplete(){
   this.selectedCover = this.ChargeSearch.value;
   this.documentCover.Name = this.selectedCover.Name;
   this.documentCover.Name2 = this.selectedCover.Name2;
   this.documentCover.ProductChargeID = this.selectedCover.ID
 
  }
  setFeeAutoComplete() {
    this.selectedFee = this.FeeSearch.value;
    this.documentFee.Name = this.selectedFee.Name;
    this.documentFee.Name2 = this.selectedFee.Name2;
    this.documentFee.ProductChargeID = this.selectedFee.ID
  }

  updateShare(share: Share) {
    this.coverShare = share;
    this.coverShare.StLOB = this.selectedRisk.StLOB;
    this.coverShare.StSubLOB = this.selectedRisk.StSubLOB;

  }
  loadSubLinesOfBusiness(lob) {
    this.subLineService.load(null, lob ? lob : null, null, 1).subscribe(data => {
      this.SubLobs = data;
    });
 
  }
  updateCover(cal: Calculation) {
    this.documentCover = cal;
    this.documentCover.StLOB = this.selectedRisk.StLOB;
    this.documentCover.StSubLOB = this.selectedRisk.StSubLOB;

  }
  deleteCover(index: number) {
    this.http.post(this.calculateSerivce.ApiUrl + 'Delete' , {ID : index}).subscribe(res => {
      this.calculateSerivce.load(null, 1 , this.document.ID, this.selectedRisk.ID, 1).subscribe(cal => {
        this.coverCalculation = cal;
        this.documentCover = new Calculation();
        
      });
    });
   
  }
  SaveCover() {
    if(this.documentCover && (this.documentCover.ID === undefined || this.documentCover.ID === null)  ) {
      
      this.documentCover.CreatedBy = this.user.Name;
      this.documentCover.CreationDate = new Date();
     }  else{
      this.documentCover.ModifiedBy = this.user.Name;
      this.documentCover.ModificationDate = new Date();
     }
     this.documentCover.UwDocumentID = this.document.ID;
     this.documentCover.UwRiskID = this.selectedRisk.ID;
     this.documentCover.ChargeType = 1;
     this.http.post(this.calculateSerivce.ApiUrl + 'Create', this.documentCover).subscribe(shareResult => {
      console.log(shareResult);
      this.calculateSerivce.load(null, 1, this.document.ID, this.selectedRisk.ID, 1).subscribe(cal => {
        this.coverCalculation = cal;
        this.documentCover = new Calculation();
        
      });
    });
  }

  updateFee(cal: Calculation) {
    this.documentFee = cal;
    this.documentFee.StLOB = this.selectedRisk.StLOB;
    this.documentFee.StSubLOB = this.selectedRisk.StSubLOB;

  }
  deleteFee(index: number) {
    this.http.post(this.calculateSerivce.ApiUrl + 'Delete' , {ID : index}).subscribe(res => {
      this.calculateSerivce.load(null, 2, this.document.ID, this.selectedRisk.ID, 1).subscribe(cal => {
        this.coverCalculation = cal;
        this.documentFee = new Calculation();
        
      });
    });
   
  }
  SaveFee() {
    if(this.documentFee && (this.documentFee.ID === undefined || this.documentFee.ID === null)  ) {

      this.documentFee.CreatedBy = this.user.Name;
      this.documentFee.CreationDate = new Date();
     }  else{
      this.documentFee.ModifiedBy = this.user.Name;
      this.documentFee.ModificationDate = new Date();
     }
     this.documentFee.UwDocumentID = this.document.ID;
     this.documentFee.UwRiskID = this.selectedRisk.ID;
     this.documentCover.ChargeType = 2;
     this.http.post(this.calculateSerivce.ApiUrl + 'Create', this.documentFee).subscribe(shareResult => {
      console.log(shareResult);
      this.calculateSerivce.load(null, 2, this.document.ID, this.selectedRisk.ID, 1).subscribe(cal => {
        this.coverCalculation = cal;
        this.documentFee = new Calculation();
        
      });
    });
  }

  deleteShare(index: number) {
    this.http.post(this.shareService.ApiUrl + 'Delete' , {ID : index}).subscribe(res => {
      this.shareService.load(null, 1, this.document.ID, null, null, null, 1).subscribe(shares => {
        this.shares = shares;
        this.getCustomerDependsOnShareType();
      });
    });
   
  }
  

  test() {
    this.document = new Documents();
    this.http.get<Documents[]>('http://localhost:5000/api/Documents/Load?ID=' + 201).subscribe(doc => {
      this.document = doc[0];
      this.document.EffectiveDate = new Date(this.document.EffectiveDate);
      this.document.ExpiryDate = new Date(this.document.ExpiryDate);
      this.riskService.load(null, this.document.ID, 1).subscribe(response => {
        this.risksTable = response;
      });
    
    });

  }
  resetCoverShare(){
    this.coverShare = new Share();
  }
  resetDocumentCover() {
    this.documentCover = new Calculation();
  }

  saveShare(){
   
   // this.coverShare.CustomerId = customerID;
   if(this.coverShare && (this.coverShare.ID === undefined || this.coverShare.ID === null)  ) {

    this.coverShare.CreatedBy = this.user.Name;
    this.coverShare.CreationDate = new Date();
   }  else{
    this.coverShare.ModifiedBy = this.user.Name;
    this.coverShare.ModificationDate = new Date();
   }
   this.coverShare.DocumentID = this.document.ID;
    this.http.post(this.shareService.ApiUrl + 'Create', this.coverShare).subscribe(shareResult => {
      console.log(shareResult);
      this.shareService.load(null, null, this.document.ID, null, null, null, 1).subscribe(shares => {
        this.shares = shares;
        this.getCustomerDependsOnShareType();
      });
    });
  }


  renderCountryTable(data) {
   
    this.dataSource = new MatTableDataSource<Installment>(data);

  }
}

