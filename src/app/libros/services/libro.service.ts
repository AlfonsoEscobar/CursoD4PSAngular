import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Libro } from '../interfaces/libro.interface';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class LibroService {

    private baseUrl: string = 'http://localhost:3000';

    constructor(private http: HttpClient) { }

    getLibros(): Observable<Libro[]>{
        return this.http.get<Libro[]>(`${this.baseUrl}/libros`);
    }

    getLibroById(id: string): Observable<Libro|undefined>{
        return this.http.get<Libro>(`${this.baseUrl}/libros/${id}`)
        .pipe(
            catchError( error => of(undefined) )
        );
    }

    getSuggestions(campo: string, query: string ): Observable<Libro[]>{
        return this.http.get<Libro[]>(`${this.baseUrl}/libros?${campo}_like=${query}&_limit=6`)
    }

    addLibro( libro: Libro): Observable<Libro>{
        return this.http.post<Libro>(`${this.baseUrl}/libros`, libro);
    }
    
    updateLibro( libro: Libro): Observable<Libro>{
        if(!libro.id) throw Error('libro id is requided')
        return this.http.patch<Libro>(`${this.baseUrl}/libros/${libro.id}`, libro);
    }

    deleteLibro( id: number): Observable<boolean>{
        return this.http.delete(`${this.baseUrl}/libros/${id}`)
        .pipe(
                map( resp => true),
                catchError(err => of(false)),
            );
    }

}