import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions } from '@angular/material/dialog';
import { MatSelectionListChange, MatSelectionList, MatListOption } from '@angular/material/list';
import { BarcodeFormat } from '@zxing/library';
import { formatNames, formatsAvailable } from '../barcode-formats';

import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-formats-dialog',
    templateUrl: './formats-dialog.component.html',
    styleUrls: ['./formats-dialog.component.scss'],
    imports: [MatSelectionList, MatListOption, MatDialogActions, MatButton]
})
export class FormatsDialogComponent {

  formatsAvailable = formatsAvailable;

  formatsEnabled: BarcodeFormat[];

  readonly formatNames = formatNames;

  constructor(
    @Inject(MAT_DIALOG_DATA) readonly data: any,
    private readonly _dialogRef: MatDialogRef<FormatsDialogComponent>) {
    this.formatsEnabled = data.formatsEnabled || [];
  }

  close() {
    this._dialogRef.close(this.formatsEnabled);
  }

  isEnabled(format: BarcodeFormat) {
    return this.formatsEnabled.find(x => x === format);
  }

  onSelectionChange(event: MatSelectionListChange) {
    this.formatsEnabled = event.source.selectedOptions.selected.map(selected => selected.value);
  }
}
