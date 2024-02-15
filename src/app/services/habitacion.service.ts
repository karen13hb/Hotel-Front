import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs/operators';
import { Habitacion } from '../interfaces/IHabitaciones';


@Injectable({
  providedIn: 'root'
})
export class HabitacionService {
  private ApiURL;

  constructor(private http: HttpClient) {
    this.ApiURL = environment.apiUrl;
   }

   obtenerHabitaciones(){
    return this.http.get<Habitacion[]>(`${this.ApiURL}/Room`).pipe(
			retry(2)
		);
   }
}
