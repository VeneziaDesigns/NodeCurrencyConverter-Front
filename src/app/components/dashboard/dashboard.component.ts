import { Component } from '@angular/core';
import { CurrencyListComponent } from '../currency-list/currency-list.component';
import { ExchangeListComponent } from '../exchange-list/exchange-list.component';
import { PathConverterComponent } from '../path-converter/path-converter.component';
import { NeighborNodesComponent } from '../neighbor-nodes/neighbor-nodes.component';
import { MatCardModule } from '@angular/material/card';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgIf, MatCardModule, CurrencyListComponent, ExchangeListComponent, PathConverterComponent, NeighborNodesComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  selectedCurrency: string | null = null;

  onCurrencySelected(code: string) {
    this.selectedCurrency = code;
  }
}
