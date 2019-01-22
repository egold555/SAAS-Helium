import { NgModule } from '@angular/core';
import { MapsComponent } from './maps/maps';
import { DestAddressComponent } from './dest-address/dest-address';
@NgModule({
	declarations: [MapsComponent,
    DestAddressComponent],
	imports: [],
	exports: [MapsComponent,
    DestAddressComponent]
})
export class ComponentsModule {}
