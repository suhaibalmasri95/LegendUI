import { Component, Input, Optional, Host } from '@angular/core';
import { SatPopover } from '@ncstate/sat-popover';
import { filter } from 'rxjs/operators/filter';

@Component({
  selector: 'inline-edit-date',
  styleUrls: ['inlineEditDate.component.scss'],
  template: `
    <form (ngSubmit)="onSubmit()">
      <div class="mat-subheading-2">Due Date</div>
      
      <mat-form-field>
        <input matInput  name="comment"   bsDatepicker [(ngModel)]="comment">
        <mat-hint align="end"> </mat-hint>
      </mat-form-field>

      <div class="actions">
        <button mat-button type="button" color="primary" (click)="onCancel()">Cancel</button>
        <button mat-button type="submit" color="primary">Save</button>
      </div>
    </form>
  `
})
export class InlineEditDateComponent {

  /** Overrides the comment and provides a reset value when changes are cancelled. */
  @Input()
  get value(): Date { return this._value; }
  set value(x: Date) {
    this.comment = this._value =  new Date (x);
  }
  private _value: Date = new Date;

  /** Form model for the input. */
  comment: Date = new Date();

  constructor(@Optional() @Host() public popover: SatPopover) { }

  ngOnInit() {
    // subscribe to cancellations and reset form value
    if (this.popover) {
      this.popover.closed.pipe(filter(val => val == null))
        .subscribe(() => this.comment = this.value || null);
    }
  }

  onSubmit() {
    if (this.popover) {
      this.popover.close(this.comment);
    }
  }

  onCancel() {
    if (this.popover) {
      this.popover.close();
    }
  }
}