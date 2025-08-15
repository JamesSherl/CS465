import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data.service';
import { Authentication } from '../services/authentication';

import { Router } from "@angular/router";

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCardComponent, RouterModule],
  templateUrl: './trip-listing.component.html',
  styleUrl: './trip-listing.component.css',
  providers: [TripDataService]
})

export class TripListingComponent implements OnInit {

 trips!: Trip[];
  message: string = '';

  constructor(private tripDataService: TripDataService, private router: Router,
private authentication: Authentication) {console.log('trip-listing constructor');

  }

  public addTrip(): void {
      if (this.isLoggedIn()) {
    this.router.navigate(['add-trip']);
      }
      else{
        this.router.navigate(['/login']);
      }
      }
  private getStuff(): void {
    this.tripDataService.getTrips()
    .subscribe({
      next: (value: any) => {
        this.trips = value;
        if(value.length > 0)
        {
          this.message = 'There are ' + value.length + ' trips available.';
        }
        else{
          this.message = 'There were no trips retireved from the database';
        }
        console.log(this.message);
      },
      error: (error: any) => {
        console.log('Error: ' + error);
      }
    })
}

ngOnInit(): void {
  console.log('ngOnInit');
  this.getStuff();
  }

  public isLoggedIn() 
{ 
return this.authentication.isLoggedIn(); 
} 

}
