import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IVehicle } from '../vehicle.model';
import { VehicleService } from '../service/vehicle.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './vehicle-delete-dialog.component.html',
})
export class VehicleDeleteDialogComponent {
  vehicle?: IVehicle;

  constructor(protected vehicleService: VehicleService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.vehicleService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
