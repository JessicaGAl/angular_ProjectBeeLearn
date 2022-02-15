import { AlertasService } from './../service/alertas.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Grupo } from '../model/Grupo';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';
import { GrupoService } from '../service/grupo.service';
import { Postagem } from '../model/Postagem';
import { PostagemService } from '../service/postagem.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: Usuario = new Usuario
  nome = environment.nome
  foto = environment.foto
  idUser = environment.idUser
  tipUser: string
  confiSenha: string

  grupo: Grupo = new Grupo()
  listaGrupo: Grupo[]
  listaPost: Postagem []
  postagem: Postagem = new Postagem
  GrupoId: number


  constructor(  

    private authService: AuthService,
    private router: Router,
    private grupoService: GrupoService,
    private postagemService: PostagemService,
    private alertas: AlertasService

  ) { }

  ngOnInit() {
    
    window.scroll(0,0)
    
    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }

    this.findByIdUser(this.idUser)
    this.getAllPostagem()
    this.findByIdUserPost()
    this.getAllGrupo()
  }

  getAllGrupo(){
    this.grupoService.getAllGrupo().subscribe((resp: Grupo[])=>{
      this.listaGrupo = resp
    })
  }

  getAllPostagem(){
    this.postagemService.getAllPostagem().subscribe((resp: Postagem[]) => {
      this.listaPost = resp
    })
  }

  findByIdUserPost(){
    this.authService.getByIdUser(this.idUser).subscribe((resp:Usuario)=>{
      this.user = resp
    })
  }

  findByIdGrupo(){
    this.grupoService.getAllGrupo().subscribe((resp: Grupo[])=>{
      this.grupo
    })
  }

  findByIdUser(id: number){
    this.authService.getByIdUser(id).subscribe((resp: Usuario)=> {
      this.user = resp
    })
  }

  

    confirmSenha(event: any){
      this.confiSenha = event.target.value
    }

    tipoUser(event: any){
      this.tipUser = event.target.value
    }

    cadastrar(){
      this.grupoService.postGrupo(this.grupo).subscribe((resp:Grupo)=>{
        this.grupo = resp
        this.getAllGrupo()
        this.alertas.showAlertSuccess ('Grupo cadastrado com sucesso!')
        this.grupo = new Grupo()
        
      
  
      })
    }

    atualizar(){
      this.user.tipo = this.tipUser

      if (this.user.senha != this.confiSenha) {
        this.alertas.showAlertDanger('As senhas estão incorretas, tente novamente!')
        this.router.navigate(['/entrar'])

      } else {
        this.authService.cadastrar(this.user).subscribe((resp: Usuario)=> {
          this.user = resp
          this.router.navigate(['/entrar'])
          
          this.alertas.showAlertSuccess('Usuário atualizado com sucesso, se logue novamente!')
            
        })
      }
  
    }

  
}