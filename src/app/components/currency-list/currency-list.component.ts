import { Component } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
import { CurrencyDto } from '../../models/currency.dto';
import { MatListModule } from '@angular/material/list';
import { NgFor } from '@angular/common';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-currency-list',
  standalone: true,
  imports: [MatListModule, NgFor],
  templateUrl: './currency-list.component.html',
  styleUrl: './currency-list.component.scss'
})

export class CurrencyListComponent {
  currencies: CurrencyDto[] = [];
  selectedCurrency: string | null = null;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit() {
    this.currencyService.getAllCurrencies().subscribe(data => this.currencies = data);
  }

@Output() currencySelected = new EventEmitter<string>();

  selectCurrency(code: string) {
    this.selectedCurrency = code;
      this.currencySelected.emit(code);
  }
}
