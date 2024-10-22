import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { GoogleSheetsService } from '../services/google-sheets.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-huella-hidrica',
  templateUrl: './huella-hidrica.component.html',
  styleUrls: ['./huella-hidrica.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class HuellaHidricaComponent implements OnInit {
  huellaHidricaForm!: FormGroup;
  regiones: string[] = ['Araucanía'];
  comunas: string[] = [];
  comunasAraucania: string[] = ['Temuco', 'Villarrica', 'Pucón', 'Padre Las Casas', 'Angol'];

  constructor(private fb: FormBuilder, private router: Router, private googleSheetsService: GoogleSheetsService) {}

  navigateToHuella(){
    this.router.navigate(['']);
  }

  handleAuthClick() {
    this.googleSheetsService.handleAuthClick(); // Llama a la función del servicio
  }

  navigateToCalculo(){
    this.router.navigate(['calcularHuella']);
  }

  ngOnInit(): void {
    this.huellaHidricaForm = this.fb.group({
      nombreEmpresa: ['', Validators.required],
      instalacion: ['', Validators.required],
      region: ['', Validators.required],
      comuna: [{ value: '', disabled: true }, Validators.required] 
    });

    this.huellaHidricaForm.get('region')!.valueChanges.subscribe(region => {
      console.log('Región seleccionada:', region);
      if (region === 'Araucanía') {
        this.comunas = this.comunasAraucania;
      } else {
        this.comunas = [];
      }
      
      this.huellaHidricaForm.get('comuna')!.enable();
      this.huellaHidricaForm.get('comuna')!.setValue('');
      console.log('Comunas disponibles:', this.comunas);
    });
  }

  onSubmit(): void {
    console.log(this.huellaHidricaForm.value);
  }
}
