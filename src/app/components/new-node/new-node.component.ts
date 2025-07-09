import { Component, OnInit, AfterViewInit, ChangeDetectorRef, NgZone, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { CurrencyExchangeDto } from '../../models/currency-exchange.dto';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-new-node',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './new-node.component.html',
  styleUrls: ['./new-node.component.scss']
})

export class NewNodeComponent implements OnInit, AfterViewInit {
  newNodeForm!: FormGroup;

  @ViewChildren(MatInput) matInputs!: QueryList<MatInput>;

  constructor(
    private currencyService: CurrencyService,
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.newNodeForm = this.fb.group({
      newCurrency: ['', [Validators.required, Validators.maxLength(3)]],
      connectionsCount: [1, [Validators.required]],
      connections: this.fb.array([this.createConnectionGroup()]),
    });

    // Actualizar conexiones cuando cambie el número
    this.newNodeForm.get('connectionsCount')!.valueChanges.subscribe((count: number) => {
      this.setConnectionFields(count);
    });
  }

  ngAfterViewInit() {
    this.refreshMaterialInputs();
  }

  get connections(): FormArray {
    return this.newNodeForm.get('connections') as FormArray;
  }

  onValueInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    const regex = /^\d{0,9}(\.\d{0,2})?$/;

    if (!regex.test(value)) {
      // Elimina el último carácter si se pasa del patrón
      input.value = value.slice(0, -1);
    }
  }

  createConnectionGroup(): FormGroup {
    return this.fb.group({
      to: ['', [Validators.required, Validators.maxLength(3)]],
      value: [
        '',
        [
          Validators.required,
          Validators.min(0.01),
          Validators.pattern(/^\d{1,9}(\.\d{1,2})?$/), // hasta 2 decimales
        ],
      ],
    });
  }

  setConnectionFields(count: number): void {
    const connections = this.connections;
    while (connections.length < count) {
      connections.push(this.createConnectionGroup());
    }
    while (connections.length > count) {
      connections.removeAt(connections.length - 1);
    }

    // Esperar a que Angular actualice el DOM, luego refrescar visual
    this.ngZone.onStable.pipe().subscribe(() => {
      this.refreshMaterialInputs();
    });
  }

  private refreshMaterialInputs(): void {
    this.matInputs.forEach((input) => {
      input.ngAfterViewInit?.(); // Forzar inicialización del campo
    });
    this.cdRef.detectChanges();
  }

  onSubmit() {
    if (this.newNodeForm.valid) {
      const currencyExchange: CurrencyExchangeDto[] = this.mapFormToDto();
      
      this.currencyService.createNewConnectionNode(currencyExchange).subscribe({
        next: () => {
          console.log('Nodos creados correctamente');
        },
        error: (e) => {
          console.error('Error al crear el nuevo nodo:', e);
        }
      });
    }
  }

  private mapFormToDto(): CurrencyExchangeDto[] {

    const from = this.newNodeForm.value.newCurrency;

    return this.newNodeForm.value.connections.map(
      (conn: { to: string; value: string }) => ({
        from: from,
        to: conn.to,
        value: parseFloat(conn.value)
      })
    );
  }
}
