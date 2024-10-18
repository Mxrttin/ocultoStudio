import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-recuperarpassword',
  templateUrl: './recuperarpassword.page.html',
  styleUrls: ['./recuperarpassword.page.scss'],
})
export class RecuperarpasswordPage implements OnInit {

  constructor(private toastController : ToastController, private router: Router) { }

  ngOnInit() {
  }

  enviar(){

    this.envairToast('bottom')
    this.router.navigate(['/cambiarpassword'])


  }

  async envairToast(position:'bottom') {
    const toast = await this.toastController.create({
      message: 'Correo enviado con exito',
      icon: 'checkmark-outline',
      duration: 2500,
      position: position,
    });

    await toast.present();
  }

}
