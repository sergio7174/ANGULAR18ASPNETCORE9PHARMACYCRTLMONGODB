import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { User } from '../../interfaces/auth';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private readonly myAppUrl: string;
  private readonly myApiUrl: string;
  private loggedInUser: any;
  
  constructor(private readonly http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/user';
  }
    getListUser(): Observable<User[]> {
     return this.http.get<User[]>(`${this.myAppUrl}${this.myApiUrl}/listAll`);
    }
    updateUser(id: any, user: User): Observable<void> {
      return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}/update-user/${id}`, user);
      
    }
    uploadImage(id: number, imageData: FormData): Observable<any> {
      const uploadUrl = `${this.myAppUrl}${this.myApiUrl}${id}/profile-image`; // Usar la ruta correspondiente
      return this.http.post(uploadUrl, imageData).pipe(
        catchError((error) => {
          console.error('Error al subir la imagen:', error);
          return throwError(() => error);
        })
      );
    }
    updateUserImage(userId: string,  user: User, imageFile: File): Observable<any> {
      const formData = new FormData();
      formData.append('data', JSON.stringify(user)); // Datos del usuario en formato JSON
  
      if (imageFile) {
        formData.append('image', imageFile); // Agregar imagen al FormData si está presente
      }
      return this.http.put<any>(`${this.myApiUrl}/uploads/profile${userId}`, formData).pipe(
        catchError((error) => {
          console.error('Error al actualizar la imagen del usuario:', error);
          return throwError(() => error);
        })
      )
       
    }

   //el siguiente metodo es para crear un nuevo usuario
    createUser(user: User): Observable<any> {
      return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`,user)
    }
    //el siguiente metodo es para obtener un solo usuario
    getUser(id: number): Observable<User> {
      return this.http.get<User>(`${this.myAppUrl}${this.myApiUrl}${id}`)
    }
    //el siguiente metodo es para eliminar un usuario
    deleteUser(id: number): Observable<void> {
      
      return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/delete-user/${id}`);;
    }

    private handleError(error: HttpErrorResponse): Observable<never> {
      
      let errorMessage;

      if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
      } else {
        errorMessage = `Error código ${error.status}: ${error.message}`;
      }
      console.error(errorMessage);
      return throwError(errorMessage);
    }

    setLoggedInUser(user: any): void {
      this.loggedInUser = user;
    }
  
    getLoggedInUserName(): string {
      return this.loggedInUser ? this.loggedInUser.username : '';
    }

    clearLoggedInUser(): void {
      this.loggedInUser = null;
    }
    getUserById(id: number): Observable<User> {
      // Lógica para obtener la información del usuario por su ID desde el servidor

      return this.http.get<User>(`${this.myAppUrl}${this.myApiUrl}/get-single-user/${id}`);
    }
}
