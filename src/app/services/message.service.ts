import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MessageService {
  private _message: string | null = null;

  set message(msg: string | null) {
    this._message = msg;
  }

  get message(): string | null {
    const msg = this._message;
    this._message = null; // Limpiar tras leerlo
    return msg;
  }
}
