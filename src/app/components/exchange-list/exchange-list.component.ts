import { Component } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
import { CurrencyExchangeDto } from '../../models/currency-exchange.dto';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule, MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'app-exchange-list',
  standalone: true,
  imports: [MatTableModule, MatCardModule, MatCardTitle],
  templateUrl: './exchange-list.component.html',
  styleUrl: './exchange-list.component.scss'
})

export class ExchangeListComponent {
  exchanges: CurrencyExchangeDto[] = [];
  displayedColumns = ['from', 'to', 'value'];

  constructor(private currencyService: CurrencyService) { }

  ngOnInit() {
    this.currencyService.getAllCurrenciesExchanges().subscribe(
      data => this.exchanges = data.sort((a, b) => a.from.localeCompare(b.from))
    );
  }
}
