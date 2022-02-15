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

  getAllGrupo(): Observable<Grupo[]>{
    return this.http.get<Grupo[]>('https://beelearn.herokuapp.com/grupo', this.token)
  }

  getByIdGrupo(idGrupo: number): Observable<Grupo>{
    return this.http.get<Grupo>(`https://beelearn.herokuapp.com/grupo/${idGrupo}`, this.token)
  }

  putGrupo(grupo: Grupo): Observable<Grupo>{
    return this.http.put<Grupo>('https://beelearn.herokuapp.com/grupo', grupo, this.token)
  }

  deleteGrupo(idGrupo: number) {
    return this.http.delete(`https://beelearn.herokuapp.com/grupo/${idGrupo}`, this.token)
  }

  postGrupo(grupo: Grupo): Observable<Grupo>{
    return this.http.post<Grupo>('https://beelearn.herokuapp.com/grupo', grupo, this.token)
  }
}
