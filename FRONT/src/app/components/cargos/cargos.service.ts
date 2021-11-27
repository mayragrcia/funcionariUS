import { Cargos } from './cargos.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CargosService {

  baseUrl = "https://localhost:7288/Cargo"

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  errorHandler(e: any) : Observable<any> {
    this.showMessage('Ocorreu um erro!', true)
    return EMPTY
  }

  create(cargo: Cargos): Observable<Cargos> {
    return this.http.post<Cargos>(this.baseUrl, cargo).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  read(): Observable<Cargos[]> {
    return this.http.get<Cargos[]>(this.baseUrl).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  readById(id: string): Observable<Cargos> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Cargos>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  update(cargo: Cargos): Observable<Cargos> {
    return this.http.put<Cargos>(this.baseUrl, cargo).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  delete(id: any): Observable<Cargos> {
    const url = `${this.baseUrl}/${id}`
    return this.http.delete<Cargos>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }
}
