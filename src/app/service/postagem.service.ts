import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllPostagem(): Observable<Postagem[]>{
    return this.http.get<Postagem[]>('https://beelearn.herokuapp.com/postagens', this.token)
  }

  getByIdPost(idPost: number): Observable<Postagem>{
    return this.http.get<Postagem>(`https://beelearn.herokuapp.com/postagens/${idPost}`, this.token)
  }

  postPostagem(postagem: Postagem) : Observable<Postagem>{
    return this.http.post<Postagem>('https://beelearn.herokuapp.com/postagens', postagem, this.token)
  }

  putPostagem(grupo: Postagem): Observable<Postagem>{
    return this.http.put<Postagem>('https://beelearn.herokuapp.com/postagens', grupo, this.token)
  }

  deletePostagem(idPost: number) {
    return this.http.delete(`https://beelearn.herokuapp.com/${idPost}`, this.token)
  }
}
