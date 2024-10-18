import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicedbService } from 'src/app/services/servicedb.service';

@Component({
  selector: 'app-detalle-item',
  templateUrl: './detalle-item.page.html',
  styleUrls: ['./detalle-item.page.scss'],
})
export class DetalleItemPage implements OnInit {

  productoRecibido: any;
  cantidad : number = 1;

  arregloTalla: any = [
    {
      id_talla: '',
      nombre: '',
    }
  ]

  constructor(private db: ServicedbService, private router: Router, private activedroute: ActivatedRoute) { 
    this.activedroute.queryParams.subscribe(res=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.productoRecibido = this.router.getCurrentNavigation()?.extras?.state?.['productoEnviado'];
      }
    })
  }

  ngOnInit() {
    this.db.dbState().subscribe(data=>{
      if(data){
        this.db.fetchTalla().subscribe(res=>{
          this.arregloTalla = res;
        })
      }
    })
  }


  sumarCantidad() {
    this.cantidad += 1;
  }

  restarCantidad() {
    if (this.cantidad > 1) {
      this.cantidad -= 1;
    }
  }

  navigateToCarrito() {
    this.router.navigate(['/carrito']);
  }

}
