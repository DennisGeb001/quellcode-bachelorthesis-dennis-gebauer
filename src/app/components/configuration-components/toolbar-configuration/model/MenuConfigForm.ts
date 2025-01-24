import {FormGroup} from "@angular/forms";
import {MenuScreenSizeConfigForm} from "./MenuScreenSizeConfigForm";
import {MenuTypeScreenSizeConfigForm} from "./MenuTypeScreenSizeConfigForm";

export interface MenuConfigForm {
  menu: FormGroup<MenuScreenSizeConfigForm>
  menuType: FormGroup<MenuTypeScreenSizeConfigForm>
}
