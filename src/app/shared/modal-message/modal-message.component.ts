import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-modal-message',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './modal-message.component.html',
})
export class ModalMessageComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {}
}
