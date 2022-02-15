import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Grupo } from '../model/Grupo';
import { Postagem } from '../model/Postagem';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { GrupoService } from '../service/grupo.service';
import { PostagemService } from '../service/postagem.service';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css'],
 
})
export class GrupoComponent implements OnInit {
  postagem: Postagem = new Postagem()
  grupo: Grupo = new Grupo()
  user: Usuario = new Usuario

  listaGrupo: Grupo[]
  listaPost: Postagem[]

  PostId: number
  GrupoId: number
  UserId = environment.idUser

  constructor(
    private grupoService: GrupoService,
    private postagemService: PostagemService,

    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private alertas: AlertasService

  ) {}

  ngOnInit() {
    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }
//GRUPO EDITAR
    let idGrupo = this.route.snapshot.params ['idGrupo']
    this.findByIdGrupo(idGrupo)

//GRUPO DELETE//

this.GrupoId = this.route.snapshot.params['idGrupo']
//+this.findByIdGrupo(idGrupo)
   

//POSTAGEM EDITAR E DELETE//

  this.findAllGrupo()

//CRIAR POSTAGEM//
  this.getAllGrupo()
  this.getAllPostagem()

  
  this.findByIdUser()
  }


//FUNÇÕES GRUPO //

  findByIdGrupo(idGrupo: number){
    this.grupoService.getByIdGrupo(idGrupo).subscribe((resp: Grupo) => {
      this.grupo = resp
    })
  }

  atualizar(){
    this.grupoService.putGrupo(this.grupo).subscribe((resp: Grupo)=>{
      this.grupo = resp
      this.alertas.showAlertSuccess('Grupo atualizado com sucesso!')
      this.router.navigate(['/grupo/:idGrupo'])
    })
  }

  apagar(){
    this.grupoService.deleteGrupo(this.GrupoId).subscribe(()=>{
      this.alertas.showAlertSuccess('Grupo apagado com sucesso!')
      this.router.navigate(['/home'])
    })
  }

  


  //FUNÇÕES DE POSTAGEM//

  //EDITAR E DELETE//

  findByIdPostagem(idPost: number){
    this.postagemService.getByIdPost(idPost).subscribe((resp: Postagem) => {
      this.postagem = resp
    })
  }

  findByIdPostGrupo(){
    this.grupoService.getByIdGrupo(this.GrupoId).subscribe((resp: Grupo) =>{
      this.grupo = resp
    })
  }

  findAllGrupo(){
    this.grupoService.getAllGrupo().subscribe((resp: Grupo[]) => {
      this.listaGrupo = resp
    })
  }

  atualizarPost(){
    this.postagemService.putPostagem(this.postagem).subscribe((resp: Postagem)=>{
      this.postagem = resp

      this.alertas.showAlertSuccess('Postagem atualizada com sucesso!')
      this.router.navigate(['/home'])


    })
  }

  apagarPost(){
    this.postagemService.deletePostagem(this.PostId).subscribe(()=>{
      this.alertas.showAlertSuccess('Postagem apagada com sucesso!')
      this.router.navigate(['/home'])
    })
  }

  //

getAllGrupo(){
    this.grupoService.getAllGrupo().subscribe((resp: Grupo[]) => {
      this.listaGrupo = resp
    })
  }

   

  getAllPostagem(){
    this.postagemService.getAllPostagem().subscribe((resp: Postagem[]) => {
      this.listaPost = resp
    })
  }

  

  

  findByIdUser(){
    this.authService.getByIdUser(this.UserId).subscribe((resp: Usuario) => {
      this.user = resp
    })
  }

  

  publicar(){
    this.grupo.idGrupo = this.GrupoId
    this.postagem.grupo = this.grupo

    this.user.idUser = this.UserId
    this.postagem.usuario = this.user

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      
      this.alertas.showAlertSuccess('Postagem realizada com sucesso!')
      this.router.navigate(['/home'])

      this.postagem = new Postagem()
      
    })
  }
 

 

}
