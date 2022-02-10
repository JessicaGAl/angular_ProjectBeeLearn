import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../model/UserLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  userLogin: UserLogin = new UserLogin()


  constructor(
    private auth: AuthService,
    private router: Router
  ) { }


  ngOnInit(){
  }



  logar() {
    this.auth.entrar(this.userLogin).subscribe((resp: UserLogin)=>{
      this.userLogin = resp
  
      environment.idUser = this.userLogin.id
      environment.email = this.userLogin.email
      environment.nome = this.userLogin.nome
      environment.tipo = this.userLogin.tipo
      environment.token = this.userLogin.token
      environment.foto  = this.userLogin.foto
      environment.idUser = this.userLogin.id
  
      console.log(environment.bio)
      console.log(environment.email)
      console.log(environment.idUser)
      console.log(environment.foto)
      console.log(environment.nome)
      console.log(environment.tipo)
      console.log(environment.token)
  
  
     this.router.navigate(['/home'])
    }, erro =>{
      if(erro.status == 500){
        alert('Usúario ou senha incorretos!')
      }
  })

  }
}
