import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { environment } from '../../environments/environments.prod';
import { CurrencyDto,  } from '../models/currency.dto';
import { CurrencyExchangeDto } from '../models/currency-exchange.dto';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllCurrencies(): Observable<CurrencyDto[]> {
    return this.http.get<CurrencyDto[]>(`${this.apiUrl}/GetAllCurrencies`);
  }

  getAllCurrenciesExchanges(): Observable<CurrencyExchangeDto[]> {
    return this.http.get<CurrencyExchangeDto[]>(`${this.apiUrl}/GetAllCurrencyExchanges`);
  }

  getNeighborNodesByCode(cod: string): Observable<CurrencyDto[]> {
    return this.http.get<CurrencyDto[]>(`${this.apiUrl}/GetNeighborNodesByCode/${cod}`);
  }

  getShortestPath(request: CurrencyExchangeDto): Observable<CurrencyExchangeDto[]> {
    return this.http.post<CurrencyExchangeDto[]>(`${this.apiUrl}/GetShortestPath`, request);
  }

  createNewConnectionNode(request: CurrencyExchangeDto[]): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/CreateNewConnectionNode`, request);
  }
}
