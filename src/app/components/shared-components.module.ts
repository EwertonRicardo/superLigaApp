import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

const components = [
    HeaderComponent
];

@NgModule({
    imports: [
        CommonModule,
        IonicModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [...components],
    exports: [...components],
})
export class SharedComponentsModule {}
