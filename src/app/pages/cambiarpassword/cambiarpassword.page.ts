import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cambiarpassword',
  templateUrl: './cambiarpassword.page.html',
  styleUrls: ['./cambiarpassword.page.scss'],
})
export class CambiarpasswordPage implements OnInit {


  nombreUsuario: string = '';
  password: string = '';
  confirmarPassword: string = '';

  constructor(private router : Router , private alertController: AlertController , private toastController : ToastController) { }

  ngOnInit() {
  }

  cambiar(){


    if(this.nombreUsuario == '' || this.password == '' || this.confirmarPassword == ''){
      
      this.rellenarAlert()

    }else if (this.password != this.confirmarPassword){

      this.contraAlert()

    }else{

      this.modificarToast('bottom')
      this.router.navigate(['/login'])
    }

  }

  async rellenarAlert() {
    const alert = await this.alertController.create({
      header: "Falta rellenar un campo",
      message: "Rellene todos los campos",
      buttons: ['OK'],
    });

    await alert.present();
  }

  async contraAlert() {
    const alert = await this.alertController.create({
      header: "Datos no coinciden",
      message: "Las contraseñas son diferentes",
      buttons: ['OK'],
    });

    await alert.present();
  }

  async modificarToast(position:'bottom') {
    const toast = await this.toastController.create({
      message: 'Contraseña modificada con exito',
      icon: 'checkmark-outline',
      duration: 2500,
      position: position,
    });

    await toast.present();
  }

}
