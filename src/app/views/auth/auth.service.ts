import { Injectable } from '@angular/core';
import { User } from '../../_entities/User';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Credentials } from '../../_entities/Credentials';
import { environment } from '../../../environments/environment';
import { ChangePassword } from '../../_entities/ChangePassword';
import { ResetPassword } from '../../_entities/ResetPassword';
import BaseService from '../../base.service';
import { catchError } from 'rxjs/operators';
import { ChangeEmail } from '../../_entities/ChangeEmail';
import { Register } from '../../_entities/Register';
import { RequestChangeEmail } from '../../_entities/RequestChangeEmail';
import { AssignPermission } from '../../_entities/AssignPermission';
import { RefeshToken } from '../../_entities/RefreshToken';


@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  private authenticationChanged = new Subject<boolean>();
  private user = new User();
  constructor(private http: HttpClient) {
    super();
  }

  public isAuthenticated(): boolean {
    return (!(sessionStorage.getItem('token') === undefined ||
      sessionStorage.getItem('token') === null ||
      sessionStorage.getItem('token') === 'null' ||
      sessionStorage.getItem('token') === 'undefined' ||
      sessionStorage.getItem('token') === ''));
  }

  public isAuthenticationChanged(): any {
    return this.authenticationChanged.asObservable();
  }

  public getToken(): any {
    if (sessionStorage.getItem('token') === undefined ||
      sessionStorage.getItem('token') === null ||
      sessionStorage.getItem('token') === 'null' ||
      sessionStorage.getItem('token') === 'undefined' ||
      sessionStorage.getItem('token') === '') {
      return '';
    }
    return JSON.parse(sessionStorage.getItem('token'));
  }

  public setData(data: User): void {
    this.setStorageToken(JSON.stringify(data.token));
    this.setStorageUser(JSON.stringify(data));
  }

  public failToken(): void {
    this.cleanSession();
  }

  public logout(): void {
    this.cleanSession();
  }

  private setStorageToken(value: any): void {
    sessionStorage.setItem('token', value);
    this.authenticationChanged.next(this.isAuthenticated());
  }

  private setStorageUser(value: any): void {
    sessionStorage.setItem('user', value);
    this.authenticationChanged.next(this.isAuthenticated());
  }

  public cleanSession() {
    sessionStorage.clear();
  }

  public getUser(): User {
    return JSON.parse(sessionStorage.getItem('user'));
  }

  public authenticate(body: Credentials): Observable<User> {
    return this.http.post<User>(environment.API_SECURITY + '/api/Authentication/Token', body)
      .pipe(catchError(this.handleError));
  }

  public resetPassword(body: ResetPassword): Observable<any> {
    return this.http.post<any>(environment.API_SECURITY + '/api/Authentication/ReiniciarPassword', body)
      .pipe(catchError(this.handleError));
  }

  public requestPassword(email: string): Observable<any> {
    return this.http.get<any>(environment.API_SECURITY + '/api/Authentication/SolicitarReiniciarPassword/' + email)
  }
  public register(body: Register): Observable<any> {
    return this.http.post<any>(environment.API_SECURITY + '/api/Authentication/InsertarUsuario', body);
  }

  public changeEmail(body: ChangeEmail): Observable<any> {
    return this.http.post<any>(environment.API_SECURITY + '/api/Authentication/CambiarCorreo', body);
  }

  public deleteUser(userId: string): Observable<any> {
    return this.http.delete(environment.API_SECURITY + '/api/Authentication/EliminarUsuario/' + userId);
  }

  public changePassword(body: ChangePassword): Observable<any> {
    return this.http.put(environment.API_SECURITY + '/api/Authentication/cambiarPassword', body)
  }

  public requestChangeEmail(body: RequestChangeEmail): Observable<any> {
    return this.http.post<any>(environment.API_SECURITY + '/api/Authentication/SolicitarCambioCorreo', body);
  }

  public refreshToken(body: RefeshToken): Observable<any> {
    return this.http.post<any>(environment.API_SECURITY + '/api/Authentication/RefrescarToken', body);
  }

  public assignPermission(body: AssignPermission): Observable<any> {
    return this.http.post<any>(environment.API_SECURITY + '/api/Authentication/AsignarPermiso', body)
  }

  public removePermission(idUsuario: string, nombrePermiso: string): Observable<any> {
    return this.http.delete<any>(environment.API_SECURITY + '/api/Authentication/QuitarPermiso/' + idUsuario + '/' + nombrePermiso);
  }
}
