import { Component } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
import { CurrencyExchangeDto } from '../../models/currency-exchange.dto';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { NgIf, NgFor, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-path-converter',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatListModule, NgIf, NgFor, FormsModule, DecimalPipe],
  templateUrl: './path-converter.component.html',
  styleUrl: './path-converter.component.scss'
})

export class PathConverterComponent {
  request: CurrencyExchangeDto = { from: '', to: '', value: 0 };
  result: CurrencyExchangeDto[] | null = null;
  errorMessage: string | null = null;

  constructor(private currencyService: CurrencyService) {}

  convert() {
    this.errorMessage = null;
    this.result = null;
    this.currencyService.getShortestPath(this.request).subscribe({
      next: res => this.result = res,
      error: err => this.errorMessage = err?.error || 'Ruta no encontrada'
    });
  }
}
