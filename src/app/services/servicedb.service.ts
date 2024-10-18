import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Rol } from './rol';
import { Talla } from './talla';
import { Producto } from './producto';
import { Usuario } from './usuario';
import { Direccion } from './direccion';

@Injectable({
  providedIn: 'root'
})
export class ServicedbService {

  public database!: SQLiteObject


  //CREAR TABLAS
  tablaRol: string = "CREATE TABLE IF NOT EXISTS rol(id_rol INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(50) NOT NULL);";

  tablaTalla: string = "CREATE TABLE IF NOT EXISTS talla(id_talla INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(10) NOT NULL);";

  tablaProducto: string = "CREATE TABLE IF NOT EXISTS producto(id_producto INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(50) NOT NULL, descripcion VARCHAR(100) NOT NULL,categoria VARCHAR(70) NOT NULL, foto BLOB, precio INTEGER NOT NULL, stock INTEGER NOT NULL);";

  tablaUsuario: string = "CREATE TABLE IF NOT EXISTS usuario(id_user INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(50) NOT NULL, apellido VARCHAR(100) NOT NULL, rut TEXT NOT NULL UNIQUE, correo TEXT NOT NULL UNIQUE, telefono TEXT NOT NULL UNIQUE, clave TEXT NOT NULL, foto TEXT, rol INTEGER NOT NULL, FOREIGN KEY(rol) REFERENCES rol(id_rol));";

  tablaRegion: string = "CREATE TABLE IF NOT EXISTS region(id_region INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(100) NOT NULL);";

  tablaComuna: string = "CREATE TABLE IF NOT EXISTS comuna(id_comuna INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(100) NOT NULL, region INTEGER NOT NULL, FOREIGN KEY(region) REFERENCES region(id_region));";

  tablaDireccion: string = "CREATE TABLE IF NOT EXISTS direccion(id_direccion INTEGER PRIMARY KEY autoincrement, descripcion TEXT NOT NULL, comuna INTEGER NOT NULL, usuario INTEGER NOT NULL, FOREIGN KEY(comuna) REFERENCES comuna(id_comuna), FOREIGN KEY(usuario) REFERENCES usuario(id_user));";

  tablaEstado: string = "CREATE TABLE IF NOT EXISTS estado(id_estado INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(50) NOT NULL);";

  tablaPedido: string = "CREATE TABLE IF NOT EXISTS pedido(id_pedido INTEGER PRIMARY KEY autoincrement, fecha_pedido TEXT NOT NULL, usuario INTEGER NOT NULL, direccion INTEGER NOT NULL, total INTEGER NOT NULL, estado INTEGER NOT NULL, carrito INTEGER NOT NULL DEFAULT 0, FOREIGN KEY(usuario) REFERENCES usuario(id_user), FOREIGN KEY(direccion) REFERENCES direccion(id_direccion), FOREIGN KEY(estado) REFERENCES estado(id_estado));";

  tablaDetalle: string = "CREATE TABLE IF NOT EXISTS detalle(id_detalle INTEGER PRIMARY KEY autoincrement, pedido INTEGER NOT NULL, producto INTEGER NOT NULL, cantidad INTEGER NOT NULL, subtotal INTEGER NOT NULL, FOREIGN KEY(pedido) REFERENCES pedido(id_pedido), FOREIGN KEY(producto) REFERENCES producto(id_producto));";

  
  //INSERTAR DATOS EN LAS TABLAS
  registroRol: string = "INSERT or IGNORE INTO rol(id_rol, nombre) VALUES (1, 'Administrador')";
  registroRol2: string = "INSERT or IGNORE INTO rol(id_rol,nombre) VALUES (2,'Cliente')";

  registroTallaXS: string = "INSERT or IGNORE INTO talla(id_talla,nombre) VALUES (1,'XS')";
  registroTallaS: string = "INSERT or IGNORE INTO talla(id_talla,nombre) VALUES (2,'S')";
  registroTallaM: string = "INSERT or IGNORE INTO talla(id_talla,nombre) VALUES (3,'M')";
  registroTallaL: string = "INSERT or IGNORE INTO talla(id_talla,nombre) VALUES (4,'L')";
  registroTallaXL: string = "INSERT or IGNORE INTO talla(id_talla,nombre) VALUES (5,'XL')";

  registroProducto: string = "INSERT or IGNORE INTO producto(id_producto,nombre,descripcion,categoria,foto,precio,stock) VALUES (1, 'Hoodie','Hoodie corteiz Uk','Poleron','assets/image/hoodie-blue.webp',80,50)";
  registroProducto2: string = "INSERT or IGNORE INTO producto(id_producto,nombre,descripcion,categoria,foto,precio,stock) VALUES (2, 'Falda','falda denin corteiz UK','Falda','assets/image/falda-denin.webp',30,50)";
  registroProducto3: string = "INSERT or IGNORE INTO producto(id_producto,nombre,descripcion,categoria,foto,precio,stock) VALUES (3, 'Short','short alcatraz','Short','assets/image/short-denin.webp',40,50)";
  registroProducto4: string = "INSERT or IGNORE INTO producto(id_producto,nombre,descripcion,categoria,foto,precio,stock) VALUES (4, 'tan top','tan top algodon','Polera','assets/image/tan-top-blanca.webp',20,50)";
  registroProducto5: string = "INSERT or IGNORE INTO producto(id_producto,nombre,descripcion,categoria,foto,precio,stock) VALUES (5, 'Skepta tshirt','Skepta Edition','Camisa','assets/image/skeptatshirt.webp',80,50)";
  registroProducto6: string = "INSERT or IGNORE INTO producto(id_producto,nombre,descripcion,categoria,foto,precio,stock) VALUES (6, 'short rosa','Short rosa','Short','assets/image/short-rosa.webp',17,50)";
  registroProducto7: string = "INSERT or IGNORE INTO producto(id_producto,nombre,descripcion,categoria,foto,precio,stock) VALUES (7, 'club america','Especial edition','Polera','assets/image/club-america.webp',90,50)";
  registroProducto8: string = "INSERT or IGNORE INTO producto(id_producto,nombre,descripcion,categoria,foto,precio,stock) VALUES (8, 'carni special','Especial edition','Polera','assets/image/carni-special.webp',80,50)";
  registroProducto9: string = "INSERT or IGNORE INTO producto(id_producto,nombre,descripcion,categoria,foto,precio,stock) VALUES (9, 'Hoodie Mirror Balenciaga','Especial edition','Poleron','assets/image/Mirror.png',80,50)";
  registroProducto10: string = "INSERT or IGNORE INTO producto(id_producto,nombre,descripcion,categoria,foto,precio,stock) VALUES (10, 'Crop balenciaga','Especial edition','Poleron','assets/image/Balenciagazip.webp',80,50)";

  registroUsuarioAdmin: string = "INSERT or IGNORE INTO usuario (id_user,nombre,apellido,rut,correo,telefono,clave,foto,rol) VALUES (1,'Admin','Admin','99.999.999-9','Admin@gmail.com',942380742,'Admin123@','',1)";
  registroUsuarioCliente: string = "INSERT or IGNORE INTO usuario (id_user,nombre,apellido,rut,correo,telefono,clave,foto,rol) VALUES (2,'Cliente','Cliente1','98.999.999-9','Cliente@gmail.com',942588742,'Cliente123@','',2)";

  registroEstadoEnProceso: string = "INSERT or IGNORE into estado(id_estado,nombre) VALUES (1,'En proceso')";
  registroEstadoEnviado: string = "INSERT or IGNORE into estado(id_estado,nombre) VALUES (2,'Enviado')";
  registroEstadoFinalizado: string = "INSERT or IGNORE into estado(id_estado,nombre) VALUES (3,'Finalizado')";

  listadoRol = new BehaviorSubject([]);

  listadoTalla = new BehaviorSubject([]);

  listadoProducto = new BehaviorSubject([]);

  listadoUsuario = new BehaviorSubject([]);

  listadoEstado = new BehaviorSubject([]);

  listadoDireccion = new BehaviorSubject([]);


  private isDBReady : BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private platform: Platform, private alertController: AlertController) { 
    this.crearDB();
  }

  fetchRol(): Observable<Rol[]>{
    return this.listadoRol.asObservable();
  }

  fetchTalla(): Observable<Talla[]>{
    return this.listadoTalla.asObservable();
  }

  fetchProducto(): Observable<Producto[]>{
    return this.listadoProducto.asObservable();
  }

  fetchUsuario(): Observable<Usuario[]>{
    return this.listadoUsuario.asObservable();
  }

  fetchDireccion(): Observable<Direccion[]>{
    return this.listadoDireccion.asObservable();
  }


  dbState(){
    return this.isDBReady.asObservable();
  }

  async presentAlert(titulo:string,msj:string){
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['OK'],
    })
    await alert.present();
  }

  crearDB(){
    this.platform.ready().then(()=>{
      this.sqlite.create({
        name: 'ocultoStudio.db',
        location: 'default'
      }).then((db: SQLiteObject)=>{
        this.database = db;

        //llamar a la funcion de creacion de tablas
        this.crearTablas();
        this.consultarProducto();
        this.consultarUsuario();

        //modificar el observable del status de la base de datos
        this.isDBReady.next(true);
      }).catch(e=>{
        this.presentAlert("Creacion de base de datos", "Error creando la BD: " + JSON.stringify(e));
      })
    })
  }

  async crearTablas(){
    try{

      await this.database.executeSql(this.tablaRol,[]);
      await this.database.executeSql(this.tablaTalla,[]);

      await this.database.executeSql(this.tablaProducto,[]);
      await this.database.executeSql(this.tablaUsuario,[]);

      await this.database.executeSql(this.tablaDetalle,[]);
      await this.database.executeSql(this.tablaEstado,[]);


      //generamos los insert en caso que existan
      await this.database.executeSql(this.registroRol,[]);
      await this.database.executeSql(this.registroRol2,[]);

      await this.database.executeSql(this.registroTallaXS,[]);
      await this.database.executeSql(this.registroTallaS,[]);
      await this.database.executeSql(this.registroTallaM,[]);
      await this.database.executeSql(this.registroTallaL,[]);
      await this.database.executeSql(this.registroTallaXL,[]);

      await this.database.executeSql(this.registroProducto,[]);
      await this.database.executeSql(this.registroProducto2,[]);
      await this.database.executeSql(this.registroProducto3,[]);
      await this.database.executeSql(this.registroProducto4,[]);
      await this.database.executeSql(this.registroProducto5,[]);
      await this.database.executeSql(this.registroProducto6,[]);
      await this.database.executeSql(this.registroProducto7,[]);
      await this.database.executeSql(this.registroProducto8,[]);
      await this.database.executeSql(this.registroProducto9,[]);
      await this.database.executeSql(this.registroProducto10,[]);

      await this.database.executeSql(this.registroUsuarioAdmin,[]);
      await this.database.executeSql(this.registroUsuarioCliente,[]);

      await this.database.executeSql(this.registroEstadoEnProceso,[]);
      await this.database.executeSql(this.registroEstadoEnviado,[]);
      await this.database.executeSql(this.registroEstadoFinalizado,[]);

    }catch(e){
      this.presentAlert("Creacion de tablas","Error creando las tablas: " + JSON.stringify(e));
    }
  }

  consultarProducto(){
    return this.database.executeSql('SELECT * FROM producto',[]).then(res=>{
      let items: Producto[] = [];

      if(res.rows.length > 0){

        for (var i = 0 ; i < res.rows.length ; i++){

          items.push({
            id_producto: res.rows.item(i).id_producto,
            nombre: res.rows.item(i).nombre,
            descripcion: res.rows.item(i).descripcion,
            categoria: res.rows.item(i).categoria, 
            foto: res.rows.item(i).foto,
            precio: res.rows.item(i).precio,
            stock: res.rows.item(i).stock,
          })
        }
      }
      this.listadoProducto.next(items as any);
    })
  }

  ModificarProducto( id:string, nombre:string, descripcion:string, precio:string, stock:string ){
    return this.database.executeSql('UPDATE producto SET nombre = ?, descripcion = ?, precio = ? , stock = ? WHERE id_producto=?.',[nombre,descripcion,precio,stock,id]).then(res=>{
      this.presentAlert("Modificar producto","Producto Modificado"),
      this.consultarProducto;
    }).catch(e=>{
      this.presentAlert("Modificar","Producto modificado ");
    })
  }

   //TERMINADO Y FUNCIONANDO (PAGINA PRINCIPAL)
  visualizarProducto(){
    return this.database.executeSql('SELECT * FROM producto WHERE id_producto = ?',[]).then(res=>{

    }).catch(e=>{
      this.presentAlert("Visualizar","Error: " + JSON.stringify(e));
    })
  }

  //TERMINADO Y funcionando
  insertarProducto(nombre:string, descripcion:string, categoria:string, foto:string, precio:string, stock:string){
    return this.database.executeSql('INSERT INTO producto(nombre,descripcion,categoria,foto,precio,stock) VALUES (?,?,?,?,?,?)',[nombre,descripcion,categoria,foto,precio,stock]).then(res=>{
      this.presentAlert("Insertar","Producto insertado")
      this.consultarProducto();
    }).catch(e=>{
      this.presentAlert("Insertar", "Error: " + JSON.stringify(e));
    })
  }

  eliminarProducto(id: string){
    return this.database.executeSql('DELETE FROM producto WHERE id_producto = ?',[id]).then(res=>{
      this.presentAlert("Eliminar","Producto Eliminado");
      this.consultarProducto();
    }).catch(e=>{
      this.presentAlert("Eliminar", "Error: " + JSON.stringify(e));
    })
  }

  consultarUsuario(){
    return this.database.executeSql('SELECT * FROM usuario',[]).then(res=>{
      let users: Usuario[] = [];

      if(res.rows.length > 0){

        for(var i = 0; i < res.rows.length ; i++){

          users.push({

            id_user: res.rows.item(i).id_user,
            nombre: res.rows.item(i).nombre,
            apellido: res.rows.item(i).apellido,
            rut: res.rows.item(i).rut,
            correo: res.rows.item(i).correo,
            telefono: res.rows.item(i).telefono,
            clave: res.rows.item(i).clave,
            foto: res.rows.item(i).foto,
            rol: res.rows.item(i).rol,
          })
        }
      }
      this.listadoUsuario.next(users as any)
    })
  }

  visualizarUsuario(){
    return this.database.executeSql('SELECT * FROM usuario WHERE id_user = ? ',[]).then(res=>{

    }).catch(e=>{
      this.presentAlert("Visualizar Usuario","Error: " + JSON.stringify(e));
    })
  }

  insertarUsuario(nombre:string, apellido:string, rut:string, correo:string, telefono:number,clave:string,rol:number){
    return this.database.executeSql("INSERT INTO usuario (nombre,apellido,rut,correo,telefono,clave,rol) VALUES (?,?,?,?,?,?,?)",[nombre,apellido,rut,correo,telefono,clave,rol]).then(res=>{
      this.presentAlert("Insertar","Usuario Insertado");
      this.consultarUsuario()
    }).catch(e=>{
      this.presentAlert("Insertar", "Error: " + JSON.stringify(e));
    })
  }

  eliminarUsuario(id:string){
    return this.database.executeSql('DELETE FROM usuario WHERE id_user = ?',[id]).then(res=>{
      this.presentAlert("Eliminar","Usuario Eliminado");
      this.consultarUsuario();
    }).catch(e=>{
      this.presentAlert("Eliminar", "Error: " + JSON.stringify(e));
    })
  }

  insertarDireccion(descripcion: string, comuna: number, usuario: number){
    return this.database.executeSql('INSERT INTO direccion(descripcion,comuna,usuario) VALUES (?,?,?)',[descripcion,comuna,usuario]).then(res=>{
      this.presentAlert('Insertar','Direccion Insertada')
    }).catch(e=>{
      this.presentAlert("Insertar", "Error: " + JSON.stringify(e));
    })
  }

  modificarDireccion(id:string){

  }

}
