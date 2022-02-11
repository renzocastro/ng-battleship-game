import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-winner-dialog',
  templateUrl: './winner-dialog.component.html'
})
export class WinnerDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<WinnerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  onCloseClick() {
    this.dialogRef.close();
  }

}
