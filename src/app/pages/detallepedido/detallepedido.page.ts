import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detallepedido',
  templateUrl: './detallepedido.page.html',
  styleUrls: ['./detallepedido.page.scss'],
})
export class DetallepedidoPage implements OnInit {

  pedidos = [

    {
      numeroPedido: '#1',
      producto: 'assets/image/carni-special.webp',
      precio: '80',
      estado: 'Finalizado',
      cliente: 'Raul Miranda',
      cantidad: 1,
      nombre: 'carni special',
      talla: 'L',
    },
  ]

  constructor() { }

  ngOnInit() {
  }

}
