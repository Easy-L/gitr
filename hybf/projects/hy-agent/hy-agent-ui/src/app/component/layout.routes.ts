import {LayoutComponent} from './layout.component';
import {DictionaryComponent} from "./dictionary/dictionary.component";
import {CompareCodeComponent} from "./dictionary/compare-code/compare-code.component";

export const layoutRoutes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path:'dictionary',component:DictionaryComponent},
      {path:'comparecode',component:CompareCodeComponent}
    ]
  }
];
