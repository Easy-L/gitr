import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AccordionModule, ConfirmDialogModule, ContextMenuModule, DataTableModule, DropdownModule, FieldsetModule, GrowlModule, InputTextModule, ScrollPanelModule, SharedModule, SplitButtonModule, ToolbarModule, TooltipModule} from 'primeng/primeng';
import {layoutRoutes} from './layout.routes';
import {LayoutComponent} from './layout.component';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {ChartModule} from 'primeng/chart';
import {TreeModule} from 'primeng/tree';
import {PanelModule} from "primeng/panel";
import {ToggleButtonModule} from 'primeng/togglebutton';
import {SpinnerModule} from 'primeng/spinner';
import {TableModule} from 'primeng/table';
import {TreeTableModule} from 'primeng/treetable';
import {RadioButtonModule} from 'primeng/radiobutton';
import {BasedatadescribeComponent} from "./basedatadescribe/basedatadescribe.component";
import {BasedatadescribeService} from "../service/basedatadescribe.service";
import { MetaSetComponent } from './meta-set/meta-set.component';
import {MetaSetClassService} from "../service/meta-set-class.service";
import {MetadataService} from "../service/metadata.service";
import {TabledataService} from "../service/tabledata.service";
import { MetadataComponent } from './metadata/metadata.component';
import { TabledataComponent } from './tabledata/tabledata.component';
import { GatewayregisterComponent } from './gatewayregister/gatewayregister.component';
import {CardModule} from 'primeng/card';
import {CalendarModule} from 'primeng/calendar';
import {InputMaskModule} from 'primeng/inputmask';
import {GatewayNodeService} from "../service/gateway-node.service";
import { GatewayConfigComponent } from './gateway-config/gateway-config.component';
import {GatewayConfigService} from "../service/gateway-config.service";
import {ModifytableinfoexceptionComponent} from "./modifytableinfoexception/modifytableinfoexception.component";
import {ModifytableinfoexceptionService} from "../service/modifytableinfoexception.service";
import { MetasetPublishComponent } from './metaset-publish/metaset-publish.component';
import { DatacheckPublishComponent } from './datacheck-publish/datacheck-publish.component';
import {PublishService} from "../service/publish.service";

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DataTableModule,
    RadioButtonModule,
    DialogModule,
    InputMaskModule,
    TableModule,
    CardModule,
    CalendarModule,
    ButtonModule,
    InputTextModule,
    TreeTableModule,
    ChartModule,
    TreeModule,
    ContextMenuModule,
    SharedModule,
    AccordionModule,
    GrowlModule,
    TooltipModule,
    ScrollPanelModule,
    SpinnerModule,
    SplitButtonModule,
    ToolbarModule,
    PanelModule,
    ToggleButtonModule,
    FieldsetModule,
    DropdownModule,
    ConfirmDialogModule,
    RouterModule.forChild(layoutRoutes)
  ],
  declarations:[
    LayoutComponent,
    BasedatadescribeComponent,
    MetaSetComponent,
    MetadataComponent,
    TabledataComponent,
    GatewayregisterComponent,
    GatewayConfigComponent,
    ModifytableinfoexceptionComponent,
    MetasetPublishComponent,
    DatacheckPublishComponent
  ],
  providers: [BasedatadescribeService,
    MetaSetClassService,
    MetadataService,
    TabledataService,
    GatewayConfigService,
    GatewayNodeService,
  ModifytableinfoexceptionService,
    PublishService
  ]
})
export class LayoutModule {
}
