import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { DetailsRoomComponent } from './components/pages/details-room/details-room.component';
import { ReservationListComponent } from './components/pages/reservation-list/reservation-list.component';

const routes: Routes = [
  {
    path:'', component:HomeComponent
  },
  {
    path:'Detalle', component:DetailsRoomComponent
  },
  {
    path:'Reservas', component:ReservationListComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
