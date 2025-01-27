import { Component, EventEmitter, Input, Output } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-datos-medicion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './datos-medicion.component.html',
  styleUrls: ['./datos-medicion.component.css'],
})
export class DatosMedicionComponent {
  @Input() medicionHuella = '';
  @Input() anioMedicion = '';
  @Input() unidadFuncional = '';
  @Input() nombreEmpresa = '';
  @Input() instalacionMedida = '';
  @Input() ubicacionMedidaR = '';
  @Input() ubicacionMedidaC = '';
  @Input() tipoProducto = '';
  @Input() nombreResponsable = '';
  @Input() cargoResponsable = '';
  @Input() correoResponsable = '';
  @Input() telefonoResponsable = '';

  @Output() onNextStep = new EventEmitter<void>();
  @Output() onAnioChange = new EventEmitter<void>();
  @Output() medicionHuellaChange = new EventEmitter<string>();
  @Output() anioMedicionChange = new EventEmitter<string>();
  @Output() unidadFuncionalChange = new EventEmitter<string>();
  @Output() nombreEmpresaChange = new EventEmitter<string>();
  @Output() instalacionMedidaChange = new EventEmitter<string>();
  @Output() ubicacionMedidaRChange = new EventEmitter<string>();
  @Output() ubicacionMedidaCChange = new EventEmitter<string>();
  @Output() tipoProductoChange = new EventEmitter<string>();
  @Output() nombreResponsableChange = new EventEmitter<string>();
  @Output() cargoResponsableChange = new EventEmitter<string>();
  @Output() correoResponsableChange = new EventEmitter<string>();
  @Output() telefonoResponsableChange = new EventEmitter<string>();

  nextStep() {
    this.onNextStep.emit();
  }

  anioChange() {
    this.onAnioChange.emit();
  }
}
