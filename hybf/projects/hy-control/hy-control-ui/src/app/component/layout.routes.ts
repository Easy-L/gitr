import {LayoutComponent} from './layout.component';
import {BasedatadescribeComponent} from "./basedatadescribe/basedatadescribe.component";
import {MetaSetComponent} from "./meta-set/meta-set.component";
import {MetadataComponent} from "./metadata/metadata.component";
import {GatewayregisterComponent} from "./gatewayregister/gatewayregister.component";
import {GatewayConfigComponent} from "./gateway-config/gateway-config.component";
import {ModifytableinfoexceptionComponent} from "./modifytableinfoexception/modifytableinfoexception.component";
import {TabledataComponent} from "./tabledata/tabledata.component";
import {MetasetPublishComponent} from "./metaset-publish/metaset-publish.component";
import {DatacheckPublishComponent} from "./datacheck-publish/datacheck-publish.component";

export const layoutRoutes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: BasedatadescribeComponent
      },
      {
        path: 'basedatadescribe',
        component: BasedatadescribeComponent
      },
      {
        path: 'metaSet',
        component: MetaSetComponent
      },
      {
        path: 'metadata',
        component: MetadataComponent
      },
      {
        path: 'tabledata',
        component: TabledataComponent
      },
      {
        path: 'gatewayregister',
        component: GatewayregisterComponent
      },
      {
        path: 'gatewayconfig',
        component: GatewayConfigComponent
      },
      {
        path: 'modifytableinfoexception',
        component: ModifytableinfoexceptionComponent
      },
      {
        path: 'metasetpublishcomponent',
        component: MetasetPublishComponent
      },
      {
        path: 'DatacheckPublishComponent',
        component: DatacheckPublishComponent
      }
    ]
  }
];
