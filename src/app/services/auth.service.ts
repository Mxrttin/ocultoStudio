import { Directive, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { ServicedbService } from './servicedb.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { Platform } from '@ionic/angular'; 
import { Usuario } from './usuario';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<Usuario | null>;
  public currentUser: Observable<Usuario | null>;
  private rolSubject: BehaviorSubject<number>;
  public currentRol: Observable<number>;

  constructor(
    private db: ServicedbService, 
    private nativeStorage: NativeStorage, 
    private platform: Platform
  ){
    this.currentUserSubject = new BehaviorSubject<Usuario | null>(null);
    this.currentUser = this.currentUserSubject.asObservable();
    this.rolSubject = new BehaviorSubject<number>(0); // 0 para invitado
    this.currentRol = this.rolSubject.asObservable();
    
    this.platform.ready().then(() => {
      this.checkStoredRole();
    });
  }

  public get currentUserValue(): Usuario | null {
    return this.currentUserSubject.value;
  }

  public get currentRolValue(): number {
    return this.rolSubject.value;
  }

  private checkStoredRole() {
    from(this.nativeStorage.getItem('userRole')).pipe(
      catchError(() => from(Promise.resolve(0)))
    ).subscribe(role => {
      this.rolSubject.next(role as number);
    });
  }

  login(correo: string, password: string): Observable<boolean> {
    return this.db.fetchUsuario().pipe(
      map(usuarios => {
        const user = usuarios.find(u => u.correo === correo && u.clave === password);
        if (user) {
          this.currentUserSubject.next(user);
          this.setRole(user.rol);
          return true;
        }
        return false;
      }),
      catchError(error => {
        console.error('Error during login:', error);
        return from(Promise.resolve(false));
      })
    );
  }

  private setRole(id_rol: number) {
    from(this.nativeStorage.setItem('userRole', id_rol)).pipe(
      catchError(error => {
        return from(Promise.resolve());
      })
    ).subscribe(() => {
      this.rolSubject.next(id_rol);
    });
  }

  logout() {
    this.currentUserSubject.next(null);
    this.rolSubject.next(0); // 0 para invitado
    from(this.nativeStorage.remove('userRole')).pipe(
      catchError(error => {
        return from(Promise.resolve());
      })
    ).subscribe();
  }

}