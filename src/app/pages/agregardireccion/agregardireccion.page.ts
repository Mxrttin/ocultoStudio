import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ServicedbService } from 'src/app/services/servicedb.service';

@Component({
  selector: 'app-agregardireccion',
  templateUrl: './agregardireccion.page.html',
  styleUrls: ['./agregardireccion.page.scss'],
})
export class AgregardireccionPage implements OnInit {

  arregloDireccion: any = [

    {
      id_direccion: '',
      comuna: '',
      region: '',
      nombre: '',
      descripcion: '',
    }

  ]

  constructor(private router: Router, private db: ServicedbService) { }

  ngOnInit() {
    this.db.dbState().subscribe(data=>{
      if(data){
        this.db.fetchDireccion().subscribe(res=>{
          this.arregloDireccion = res
        })
      }
    })
  }


  guardar(){

  }

}
