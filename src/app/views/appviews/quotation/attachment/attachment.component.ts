import { HttpClient } from '@angular/common/http';
import { ProductAttachment } from './../../../../entities/Product/Attachment';
import { ProductAttachmentService } from './../../../../_services/_products/productAttachment.service';
import { Documents } from './../../../../entities/production/Documents';
import { CommonService } from './../../../../_services/Common.service';
import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { FormControl, NgModel, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatOption } from '@angular/material';
import * as _ from 'lodash';
@Component({
  selector: 'app-attachment',
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.css']
})
export class AttachmentComponent implements  OnChanges  {
  // tslint:disable-next-line:no-input-rename
  @Input('document') document: Documents;
  @ViewChild('allSelected') private allSelected: MatOption;
  selectedItems: ProductAttachment[] = [];
  formItems: FormArray;
  allSelectedOption = '';
  isNotFromSelection = false;
  disabled = false;
  unselected = false;
  hideSeleted: boolean;
  group: FormGroup;
  attachmentForm: FormGroup;
  dropdownSettings = {};
  uploader: FileUploader;
  attachedFile: any;
  attachmetObject: any;
  selectedFile: File;
  defualSelectValue: boolean = false;
  list: ProductAttachment[] = [];
  ProductAttachments: ProductAttachment[];
  orginalAttachments: ProductAttachment[];
  filledAttachments: ProductAttachment[];
  constructor(private fb: FormBuilder, private commonService: CommonService,
    private prodAttachmentService: ProductAttachmentService, private http: HttpClient) { }

  onFileChanged(event, index: number) {
    console.log(event);
    this.selectedFile = event.target.files[0];
    this.formItems.controls[index].get('File').patchValue(this.selectedFile);
  }
  fillAttachmentValues() {

    if (this.defualSelectValue) {
      for (let x = 0 ; x < this.formItems.controls[0].get('attachments').value.length - 1 ; x ++) {
        const input = new FormData();
        input.append('DocumentID', this.document.ID.toString());
        if (this.document.DocumentType === 1 ) {
        input.append('Type', 'Policy');
      }
      if (this.document.DocumentType === 2 ) {
        input.append('Type', 'Quotation');
      }
        input.append('CreatedBy', this.document.CreatedBy);
        input.append('ProductAttachmentID', this.formItems.controls[0].get('attachments').value[x].ID.toString());
        input.append('File', this.formItems.controls[0].get('File').value);
        input.append('Serial', '1');
        input.append('RiskID', '');
        input.append('IsReceived', '1');
        input.append('Remarks', '');
        input.append('Level', '');
        // etc, etc
          if (this.formItems.controls[0].get('File').value) {
         this.http.post('https://localhost:44322/api/Attachment/Create', input).subscribe(res => {
           console.log(res);
         });
        }}
    } else {
    for (let x = 0 ; x < this.formItems.length; x ++) {
    const input = new FormData();
    input.append('DocumentID', this.document.ID.toString());
    if (this.document.DocumentType === 1 ) {
    input.append('Type', 'Policy');
  }
  if (this.document.DocumentType === 2 ) {
    input.append('Type', 'Quotation');
  }
    input.append('CreatedBy', this.document.CreatedBy);
    input.append('ProductAttachmentID', this.formItems.controls[x].get('attachments').value[0].ID.toString());
    input.append('File', this.formItems.controls[x].get('File').value);
    input.append('Serial', '1');
    input.append('RiskID', '');
    input.append('IsReceived', '1');
    input.append('Remarks', '');
    input.append('Level', '');
    // etc, etc
      if (this.formItems.controls[x].get('File').value) {
     this.http.post('https://localhost:44322/api/Attachment/Create', input).subscribe(res => {
       console.log(res);
     });
    }}
  }
  }

  ngOnChanges() {
    this.hideSeleted = false;
    this.list = [];
    this.attachmentForm = this.fb.group({
      formItems: this.fb.array([
        this.createSubForm()])
    });
    this.prodAttachmentService.load(null, this.document.ProductId, null, this.document.DocumentType).subscribe(res => {
      this.ProductAttachments = res;
      this.orginalAttachments = _.cloneDeep(res);
      this.formItems = this.attachmentForm.get('formItems') as FormArray;
      this.formItems.controls[0].get('attachmetValues').patchValue(res);

    });
  }
  removeImage(index: number) {
    this.formItems.controls[index].get('File').patchValue('');
  }
  remove(index: number) {
    this.formItems = this.attachmentForm.get('formItems') as FormArray;
    this.formItems.removeAt(index);   this.formItems.removeAt(index);
    }
toggleAllSelection(i: number) {
 
  if (this.formItems.controls[i].get('defaultSelect').value === false && this.formItems.controls[i].get('attachments').value.length > 0) {
    this.defualSelectValue = true;
    if (this.formItems.length === 1) {
      this.formItems.controls[i].get('defaultSelect').patchValue(true);
      this.filledAttachments = this.formItems.controls[i].get('attachmetValues').value;
      this.formItems = this.attachmentForm.get('formItems') as FormArray;
      this.formItems.controls[i].get('attachments').patchValue([... this.filledAttachments.map(item => item),
        false]);
    } else {
      this.formItems.controls[i].get('defaultSelect').patchValue(true);
      this.filledAttachments = this.formItems.controls[i].get('attachmetValues').value;
      this.formItems = this.attachmentForm.get('formItems') as FormArray;
      this.formItems.controls[i].get('attachments').patchValue([...this.filledAttachments.map(item => item),
        false]);
    }
    this.disabled = true;

  } else {
    this.defualSelectValue = false;
    this.formItems.controls[i].get('defaultSelect').patchValue(false);
    this.disabled = false;
    this.formItems = this.attachmentForm.get('formItems') as FormArray;
    this.formItems.controls[i].get('attachments').patchValue([]);
  }
}
addItem( index: number) {

  if (!this.disabled) {
  if ( this.ProductAttachments.length === 0 ) {
    this.ProductAttachments = _.cloneDeep(this.orginalAttachments);
  }
  this.formItems = this.attachmentForm.get('formItems') as FormArray;


  // tslint:disable-next-line:max-line-length
    if (this.formItems.controls[index].get('attachments').value.length !==  this.orginalAttachments.length + 1 ) {
    if (this.formItems.controls[index].get('attachments').value.length === 0) {
      this.hideSeleted = false;
      this.list = [];
      this.list.push(this.formItems.controls[index].get('attachmetValues').value[0]);
      for (let x = 0 ; x < this.formItems.length; x ++) {
     if ( this.formItems.length > 1) {
      this.formItems.controls[x].get('enableMultiSelect').patchValue(false);
        // tslint:disable-next-line:max-line-length
     this.formItems.controls[x].get('attachmetValues').patchValue([...this.formItems.controls[x].get('attachmetValues').value, ...this.list]);
    }
    }
      if ( this.formItems.length > 1) {
      this.formItems.removeAt(index); }
    } else {
      this.formItems.controls[index].get('attachmetValues').patchValue(this.formItems.controls[index].get('attachments').value);
      this.formItems.controls[index].get('enableMultiSelect').patchValue(true);

      this.group = this.createSubForm();
        this.hideSeleted = true;
        this.list = [];
        this.list = this.ProductAttachments;
        for (let i = 0 ; i < this.ProductAttachments.length; i ++) {
          if (this.formItems.controls[index].get('attachments').value[0].ID === this.ProductAttachments[i].ID) {
            this.list.splice(i, 1);
          }
        }
        if (this.list.length > 0) {
          if (this.list.length > 1) {
            this.group.get('enableMultiSelect').patchValue(false);
          } else {
            this.group.get('enableMultiSelect').patchValue(true);
          }
        this.group.get('attachmetValues').patchValue(this.list);
        this.formItems.push(this.group);
      }
        }

    }}
      }



      arrayUnique(array) {
        const a = array.concat();
        for (let i = 0; i < a.length; ++i) {
          for (let j = i + 1; j < a.length; ++j) {
            if (a[i].ID === a[j].ID ) {
              a.splice(j--, 1);
            }
          }
        }

        return a;
      }

submit() {
}

createSubForm(): FormGroup {

  return this.fb.group({

    attachments: new FormControl(''),
    DocumentID: new FormControl(''),
    CreatedBy: new FormControl(''),
    CreationDate: new FormControl(new Date()),
    RiskID: new FormControl(''),
    IsReceived: new FormControl(''),
    ReceivedDate: new FormControl(''),
    Remarks: new FormControl(''),
    ProductAttachmentID: new FormControl(''),
    ClaimID: new FormControl(''),
    Level: new FormControl(''),
    Type: new FormControl(''),
    File: new FormControl(''),
    attachmetValues: new FormControl(''),
    enableMultiSelect: new FormControl(false),
    defaultSelect: new FormControl(false),
  });

}

}
