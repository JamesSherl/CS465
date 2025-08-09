import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.html',
  styleUrls: ['./edit-trip.css'] // fixed typo
})
export class EditTripComponent implements OnInit {

  public editForm!: FormGroup;
  public trip!: Trip;
  public submitted = false;
  public message: string = '';

  constructor(
    private tripDataService: TripDataService, // renamed to match usage below
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // Retrieve stashed tripCode
    const tripCode = localStorage.getItem("tripCode");
    if (!tripCode) {
      alert("Something went wrong");
      this.router.navigate(['']);
      return;
    }

    console.log('EditTripComponent::ngOnInit');
    console.log('tripCode:', tripCode);

    // Initialize form
    this.editForm = this.formBuilder.group({
      _id: [],
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
    });

    // Load trip details
    this.tripDataService.getTrip(tripCode).subscribe({
      next: (value: Trip[]) => {
        if (!value || value.length === 0) {
          this.message = 'No Trip Retrieved!';
        } else {
          this.trip = value[0];
          this.editForm.patchValue(this.trip);
          this.message = `Trip: ${tripCode} retrieved`;
        }
        console.log(this.message);
      },
      error: (error: any) => {
        console.error('Error: ', error);
      }
    });
  }

    get f() {
    return this.editForm.controls;
  }
  
  public onSubmit(): void {
    this.submitted = true;

    if (this.editForm.valid) {
      this.tripDataService.updateTrip(this.editForm.value).subscribe({
        next: (value: any) => {
          console.log(value);
          this.router.navigate(['']);
        },
        error: (error: any) => {
          console.error('Error: ', error);
        }
      });
    }
  }
}

