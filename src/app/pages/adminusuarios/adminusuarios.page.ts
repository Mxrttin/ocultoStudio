import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ServicedbService } from 'src/app/services/servicedb.service';

@Component({
  selector: 'app-adminusuarios',
  templateUrl: './adminusuarios.page.html',
  styleUrls: ['./adminusuarios.page.scss'],
})
export class AdminusuariosPage implements OnInit {

  arregloUsuarios: any = [

    {
      nombre : ''

    }
  ]

  arregloSoloUsuario: any = [
    {
      nombre : ''
    }
  ]

  constructor(private router: Router, private db: ServicedbService) { }

  ngOnInit() {
    this.db.dbState().subscribe(data=>{
      if(data){
        this.db.fetchUsuario().subscribe(res=>{
          this.arregloUsuarios = res;
        })
      }
    })

    this.db.dbState().subscribe(data=>{
      if(data){
        this.db.fetchUsuario().subscribe(res=>{
          this.arregloSoloUsuario = res;
        })
      }
    })
  }

  visualizarUsuario(usuario: any){
    let navigationExtras: NavigationExtras = {

      state:{
        usuarioEnviado: usuario
      }
    }
    this.router.navigate(['/infousuario'],navigationExtras)
  }


  eliminar(usuario:any){
    this.db.eliminarUsuario(usuario.id_user)

  }


}


