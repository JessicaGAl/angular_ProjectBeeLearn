import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../model/UserLogin';
import { Usuario } from '../model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getByIdGrupo(GrupoId: number) {
    throw new Error('Method not implemented.');
  }

  constructor(

    private http: HttpClient
  ) { }

  getByIdUser(idUser: number): Observable<Usuario>{
    return this.http.get<Usuario>(`https://beelearn.herokuapp.com/${idUser}`)
  }


  entrar(userLogin: UserLogin): Observable<UserLogin>{
    return this.http.post<UserLogin>('https://beelearn.herokuapp.com/usuarios8/logar', userLogin)
  }

  cadastrar(user: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>('https://beelearn.herokuapp.com/usuarios/cadastrar', user)

  }

  logado(){
    let ok: boolean = false

    if (environment.token != ''){
      ok = true
    }

    return ok
  }


}
