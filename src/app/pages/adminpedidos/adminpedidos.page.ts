import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminpedidos',
  templateUrl: './adminpedidos.page.html',
  styleUrls: ['./adminpedidos.page.scss'],
})
export class AdminpedidosPage implements OnInit {

  pedidos = [

    {
      numeroPedido: '#1',
      producto: 'assets/image/carni-special.webp',
      precio: '80',
      estado: 'Finalizado',
      cliente: 'Raul Miranda'


    },
    {
      numeroPedido: '#2',
      producto: 'assets/image/carni-special.webp',
      precio: '80',
      estado: 'Finalizado',
      cliente: 'Raul Miranda'


    },
    {
      numeroPedido: '#3',
      producto: 'assets/image/carni-special.webp',
      precio: '80',
      estado: 'Finalizado',
      cliente: 'Raul Miranda'


    },



  ]

  constructor() { }

  ngOnInit() {
  }

}
