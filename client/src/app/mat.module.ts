import {
  NgModule
} from '@angular/core';
import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';
import {
  MatFormFieldModule,
  MatButtonModule,
  MatTabsModule,
  MatCardModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatInputModule,
  MatChipsModule,
  MatDividerModule,
  MatList,
  MatListItem,
  MatToolbar,
  MatToolbarBase,
  MatToolbarRow,
  MatTableModule,
  MatCheckboxModule,
  MatSelectModule
} from '@angular/material';

const mats = [
  MatFormFieldModule,
  MatButtonModule,
  MatTabsModule,
  MatCardModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatInputModule,
  MatChipsModule,
  MatDividerModule,
  MatTableModule,
  MatCheckboxModule,
  MatSelectModule
]

@NgModule({
  declarations: [],
  imports: mats,
  exports: mats
})
export class MatModule {}
