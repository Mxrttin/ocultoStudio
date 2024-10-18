import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ServicedbService } from 'src/app/services/servicedb.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements OnInit {

  arregloUsuario: any;
  

  constructor(private auth: AuthService, private db: ServicedbService) { }

  ngOnInit() {

    this.guardarUsuarioEnArreglo();
  }

  guardarUsuarioEnArreglo() {
    const usuarioActual = this.auth.currentUserValue;
    if (usuarioActual) {
      this.arregloUsuario = [usuarioActual];
    }
  }  



}


