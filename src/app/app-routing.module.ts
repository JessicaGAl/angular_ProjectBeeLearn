import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CadastroComponent } from "./cadastro/cadastro.component";
import { ContatoComponent } from "./contato/contato.component";
import { EntrarComponent } from "./entrar/entrar.component";
import { GrupoComponent } from "./grupo/grupo.component";
import { HomeComponent } from "./home/home.component";
import { PageComponent } from "./page/page.component";
import { SobreComponent } from "./sobre/sobre.component";


const routes: Routes = [

  {path: '', redirectTo: 'page', pathMatch: 'full'},
  {path: 'grupo/:idGrupo', component: GrupoComponent},
  {path: 'page', component: PageComponent},
  {path: 'cadastro', component: CadastroComponent},
  {path: 'entrar', component: EntrarComponent},
  {path: 'home', component: HomeComponent},
  {path:'contato', component: ContatoComponent},
  {path:'grupo', component: GrupoComponent},
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
