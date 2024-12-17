import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-produccion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './produccion.component.html',
  styleUrls: ['./produccion.component.css'],
})
export class ProduccionComponent {
  produccion: { [key: string]: number } = {
    enero: 0,
    febrero: 0,
    marzo: 0,
    abril: 0,
    mayo: 0,
    junio: 0,
    julio: 0,
    agosto: 0,
    septiembre: 0,
    octubre: 0,
    noviembre: 0,
    diciembre: 0,
  };
  total: number = 0;
  promedio: number = 0;

  @Input() producto = '';
  @Output() productoChange = new EventEmitter<string>();

  @Input() descripcion = '';
  @Output() descripcionChange = new EventEmitter<string>();

  @Input() set enero(value: number) {
    this.produccion['enero'] = value;
    this.calcularTotales();
  }
  @Output() eneroChange = new EventEmitter<number>();

  @Input() set febrero(value: number) {
    this.produccion['febrero'] = value;
    this.calcularTotales();
  }
  @Output() febreroChange = new EventEmitter<number>();

  @Input() set marzo(value: number) {
    this.produccion['marzo'] = value;
    this.calcularTotales();
  }
  @Output() marzoChange = new EventEmitter<number>();

  @Input() set abril(value: number) {
    this.produccion['abril'] = value;
    this.calcularTotales();
  }
  @Output() abrilChange = new EventEmitter<number>();

  @Input() set mayo(value: number) {
    this.produccion['mayo'] = value;
    this.calcularTotales();
  }
  @Output() mayoChange = new EventEmitter<number>();

  @Input() set junio(value: number) {
    this.produccion['junio'] = value;
    this.calcularTotales();
  }
  @Output() junioChange = new EventEmitter<number>();

  @Input() set julio(value: number) {
    this.produccion['julio'] = value;
    this.calcularTotales();
  }
  @Output() julioChange = new EventEmitter<number>();

  @Input() set agosto(value: number) {
    this.produccion['agosto'] = value;
    this.calcularTotales();
  }
  @Output() agostoChange = new EventEmitter<number>();

  @Input() set septiembre(value: number) {
    this.produccion['septiembre'] = value;
    this.calcularTotales();
  }
  @Output() septiembreChange = new EventEmitter<number>();

  @Input() set octubre(value: number) {
    this.produccion['octubre'] = value;
    this.calcularTotales();
  }
  @Output() octubreChange = new EventEmitter<number>();

  @Input() set noviembre(value: number) {
    this.produccion['noviembre'] = value;
    this.calcularTotales();
  }
  @Output() noviembreChange = new EventEmitter<number>();

  @Input() set diciembre(value: number) {
    this.produccion['diciembre'] = value;
    this.calcularTotales();
  }
  @Output() diciembreChange = new EventEmitter<number>();

  @Input() set produccionTotal(value: number) {
    this.total = value;
  }
  @Output() produccionTotalChange = new EventEmitter<number>();

  @Input() set produccionPromedio(value: number) {
    this.promedio = value;
  }
  @Output() produccionPromedioChange = new EventEmitter<number>();

  @Output() previous = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();

  calcularTotales() {
    const values = Object.values(this.produccion);
    this.total = values.reduce((acc, val) => acc + (val || 0), 0);
    this.promedio = this.total / values.length;
    this.produccionPromedioChange.emit(this.promedio);
    this.produccionTotalChange.emit(this.total);
  }

  // Métodos para emitir eventos al componente padre
  onPrevious() {
    this.previous.emit();
  }

  onNext() {
    this.next.emit();
  }
}
