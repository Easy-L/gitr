import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  AccordionModule,
  CalendarModule,
  ConfirmDialogModule,
  ContextMenuModule,
  DataTableModule,
  DropdownModule,
  FieldsetModule,
  GrowlModule,
  InputTextModule,
  MultiSelectModule,
  ScrollPanelModule,
  SharedModule,
  SplitButtonModule,
  ToolbarModule,
  TooltipModule
} from 'primeng/primeng';
import {DialogModule} from 'primeng/dialog';
import {Button, ButtonModule} from 'primeng/button';
import {ChartModule} from 'primeng/chart';
import {TreeModule} from 'primeng/tree';
import {PanelModule} from "primeng/panel";
import {ToggleButtonModule} from 'primeng/togglebutton';
import {SpinnerModule} from 'primeng/spinner';
import {TableModule} from 'primeng/table';
import {PanelMenuModule} from 'primeng/panelmenu';
import {TabViewModule} from 'primeng/tabview';
import {CardModule} from "primeng/card";
import {FileUploadModule} from 'primeng/fileupload';
import {layoutRoutes} from './layout.routes';
import {LayoutComponent} from './layout.component';
import {DictionaryComponent} from "./dictionary/dictionary.component";
import {CodeService} from "../service/code.service";
import { CompareCodeComponent } from './dictionary/compare-code/compare-code.component';
import {CheckCodeService} from "../service/check-code.service";

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DataTableModule,
    DialogModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    ChartModule,
    TreeModule,
    ContextMenuModule,
    SharedModule,
    AccordionModule,
    GrowlModule,
    TooltipModule,
    FileUploadModule,
    ScrollPanelModule,
    SpinnerModule,
    SplitButtonModule,
    ToolbarModule,
    PanelModule,
    ToggleButtonModule,
    FieldsetModule,
    DropdownModule,
    MultiSelectModule,
    TabViewModule,
    PanelMenuModule,
    ConfirmDialogModule,
    CalendarModule,
    CardModule,
    MultiSelectModule,
    RouterModule.forChild(layoutRoutes)
  ],
  declarations:[
    LayoutComponent,
    DictionaryComponent,
    CompareCodeComponent,
    // TabComponent
  ],
  entryComponents:[Button],
  providers: [CodeService,CheckCodeService]
})
export class LayoutModule {
}
