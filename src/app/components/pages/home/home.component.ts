import { Component } from '@angular/core';
import { Habitacion } from 'src/app/interfaces/IHabitaciones';
import { HabitacionService } from 'src/app/services/habitacion.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public habitaciones:Habitacion[]=[];
  
  constructor(private habitacionService: HabitacionService,private router: Router) { }

  ngOnInit(): void {
    this.obtenerHabitaciones();
  }

  public obtenerHabitaciones():void {
    this.habitacionService.obtenerHabitaciones().subscribe(
      (response) => {
        console.log(response)        
        this.habitaciones = response;
      },
      error => {
        console.error('Error al obtener las habitaciones:', error);
      }
    );
  }

  public detalleHabitacion(habitacion: Habitacion):void {
    this.router.navigate(['/Detalle'], { state: { habitacion: habitacion } });
  }


  

}
