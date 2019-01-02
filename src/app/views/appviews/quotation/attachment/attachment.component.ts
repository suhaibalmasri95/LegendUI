import { CommonService } from './../../../../_services/Common.service';
import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
@Component({
  selector: 'app-attachment',
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.css']
})
export class AttachmentComponent implements OnInit {

  selectedItems = [];
  dropdownSettings = {};
  uploader: FileUploader;
  constructor( private commonService: CommonService) { }

  ngOnInit() {
    this.uploader = new FileUploader({ url: this.commonService.uploadImageUrl });
  }

}
