import { Component, OnInit } from '@angular/core';
import { CurrencyListComponent } from '../currency-list/currency-list.component';
import { ExchangeListComponent } from '../exchange-list/exchange-list.component';
import { PathConverterComponent } from '../path-converter/path-converter.component';
import { NeighborNodesComponent } from '../neighbor-nodes/neighbor-nodes.component';
import { MatCardModule } from '@angular/material/card';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalMessageComponent } from '../../shared/modal-message/modal-message.component';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgIf, MatCardModule, CurrencyListComponent, ExchangeListComponent, PathConverterComponent, NeighborNodesComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent implements OnInit {
  selectedCurrency: string | null = null;

  constructor(private router: Router,
    private dialog: MatDialog,
    private messageService: MessageService) { }

  onCurrencySelected(code: string) {
    this.selectedCurrency = code;
  }

  ngOnInit(): void {
    const msg = this.messageService.message;
    if (msg) {
      this.dialog.open(ModalMessageComponent, {
        data: { message: msg },
        width: '350px',
        closeOnNavigation: true
      });
    }
  }
}
