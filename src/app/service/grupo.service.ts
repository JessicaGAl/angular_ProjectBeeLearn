import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Grupo } from '../model/Grupo';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  postGrupo(grupo: Grupo): Observable<Grupo>{
    return this.http.post<Grupo>('http://localhost:8080/grupo', grupo, this.token)
  }

  getAllGrupo(): Observable<Grupo[]>{
    return this.http.get<Grupo[]>('http://localhost:8080/grupo', this.token)
  }

  getByIdGrupo(idGrupo: number): Observable<Grupo>{
    return this.http.get<Grupo>(`http://localhost:8080/grupo/${idGrupo}`, this.token)
  }

  postgrupo(grupo: Grupo): Observable<Grupo>{
    return this.http.post<Grupo>('http://localhost:8080/grupo', grupo, this.token)
  }


  putGrupo(grupo: Grupo): Observable<Grupo>{
    return this.http.put<Grupo>('http://localhost:8080/grupo', grupo, this.token)
  }

  deleteGrupo(idGrupo: number) {
    return this.http.delete(`http://localhost:8080/grupo/${idGrupo}`, this.token)
  }
}
