import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ServicedbService } from 'src/app/services/servicedb.service';
import { Usuario } from 'src/app/services/usuario';

interface Loginusuario {
  id_user: number;
  nombre: string;
  correo: string;
  clave: string;
  rol: number;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  arregloUsuarios: Usuario[] = [];
  loginUser: string = '';
  passwordUser: string = '';

  constructor(private router: Router, private alertController: AlertController, private db: ServicedbService, private authService: AuthService){}

  ngOnInit() {
    this.db.dbState().subscribe((data) => {
      if (data) {
        this.db.fetchUsuario().subscribe((res) => {
          this.arregloUsuarios = res;
        });
      }
    });
  }

  iniciar() {
    if (this.loginUser === '' || this.passwordUser === '') {
      this.mostrarAlerta('Falta rellenar un campo', 'Rellene todos los campos');
      return;
    }
    this.authService.login(this.loginUser, this.passwordUser).subscribe(
      success => {
        if (success) {
          this.limpiarCampos()
          this.navigateBasedOnRole();
        } else {
          this.mostrarAlerta('Error', 'Usuario o contraseña incorrectos');
        }
      },
      error => {
        this.mostrarAlerta('Error', 'Ocurrió un error durante el inicio de sesión');
      }
    );
  }
  
  private navigateBasedOnRole() {
    const roleId = this.authService.currentRolValue;
    console.log('Current role ID:', roleId); // Para debugging

    switch (roleId) {
      case 1: // Administrador
        this.router.navigate(['/adminprincipal']);
        break;
      case 2: // Cliente
        this.router.navigate(['/home']);
        break;
      case 0: // Invitado
      default:
        this.router.navigate(['/home']);
        break;
    }
  }
  
  private async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  limpiarCampos(){
    this.loginUser = '';
    this.passwordUser = '';
  }
}