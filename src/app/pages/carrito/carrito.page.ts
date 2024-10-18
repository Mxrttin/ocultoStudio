import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

item = {
  name: 'Hoodie',
  price:40.00,
  total:40.00,
  cantidad:1,
  cover: 'assets/image/hoodie-blue.webp',
  Size: 'M'
};


calcularTotalCarrito() {
  return this.item.total;
}

  items: any [] = [

    {
      id: '1',
      name: 'Hoodie',
      price: 40,
      status: true,
      cover: 'assets/image/hoodie-blue.webp',
      description: 'Hoodie corteiz Uk',
    },
    {
      id: '2',
      name: 'falda',
      price: 30,
      status: true,
      cover: 'assets/image/falda-denin.webp',
      description: 'falda denin corteiz UK',
    },
    {
      id: '3',
      name: 'short',
      price: 40,
      status: true,
      cover: 'assets/image/short-denin.webp',
      description: 'short alcatraz',
    },
    {
      id: '4',
      name: 'tan top',
      price: 20,
      status: true,
      cover: 'assets/image/tan-top-blanca.webp',
      description: 'tan top algodon',
    },
    {
      id: '5',
      name: 'Skepta tshirt',
      price: 80,
      status: true,
      cover: 'assets/image/skepta tshirt.webp',
      description: 'Skepta Edition',
    },
    {
      id: '6',
      name: 'short rosa',
      price: 17,
      status: true,
      cover: 'assets/image/short rosa.webp',
      description: 'Short rosa',
    },
    {
      id: '7',
      name: 'club america',
      price: 90,
      status: true,
      cover: 'assets/image/club america.webp',
      description: 'Especial edition',
    },
    {
      id: '8',
      name: 'carni special',
      price: 80,
      status: true,
      cover: 'assets/image/carni special.webp',
      description: 'Especial edition',
    },
    {
      id: '9',
      name: 'Chandal Corteiz',
      price: 150,
      status: true,
      cover: 'assets/image/Balenciago.webp',
      description: 'Especial edition',
    },
    {
      id: '10',
      name: 'Hoodie Mirror Balenciaga',
      price: 80,
      status: true,
      cover: 'assets/image/Mirror.webp',
      description: 'Especial edition',
    },
    {
      id: '11',
      name: 'Hoodie Mirror Balenciaga',
      price: 80,
      status: true,
      cover: 'assets/image/Mirror.webp',
      description: 'Especial edition',
    },

    
  ];



  constructor(private alertController: AlertController) {}

  ngOnInit() {
  }

  async pagar() {
    const alert = await this.alertController.create({
      header: 'Compra Realizada Exitosamente',
      message: '!Gracias por tu Compra!',
      buttons: ['OK']
    });

    await alert.present();
  }
}
