import { Component, Input, OnChanges } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
import { CurrencyDto } from '../../models/currency.dto';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-neighbor-nodes',
  standalone: true,
  imports: [MatCardModule, MatListModule, NgFor],
  templateUrl: './neighbor-nodes.component.html',
  styleUrl: './neighbor-nodes.component.scss'
})

export class NeighborNodesComponent implements OnChanges {
  @Input() currencyCode!: string;
  neighbors: CurrencyDto[] = [];

  constructor(private currencyService: CurrencyService) {}

  ngOnChanges() {
    if (this.currencyCode) {
      this.currencyService.getNeighborNodesByCode(this.currencyCode).subscribe(data => this.neighbors = data);
    }
  }
}
