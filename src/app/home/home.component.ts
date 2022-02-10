import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Grupo } from '../model/Grupo';
import { Usuario } from '../model/Usuario';
import { GrupoService } from '../service/grupo.service';

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


  constructor(  
    
    private authService: AuthService,
    private router: Router
    private grupoService: GrupoService

  ) { }

  ngOnInit() {
    
    this.findAllTemas()

  }

  entrar(){
   
  }

  findAllTemas(){
    this.grupoService.getAllGrupo().subscribe((resp: Grupo[])=>{
      this.listaGrupo = resp
    })
  }

  cadastrar(){
    this.grupoService.postGrupo(this.grupo).subscribe((resp:Grupo)=>{
      this.grupo = resp
      this.findAllTemas()
      alert('Grupo cadastrado com sucesso!')
      this.grupo = new Grupo()
      
    })
  }
  }
