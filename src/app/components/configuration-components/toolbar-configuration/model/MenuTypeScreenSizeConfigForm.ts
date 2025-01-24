import {FormControl} from "@angular/forms";
import {MenuTypeConfigOption} from "../enum/MenuTypeConfigOption";

export interface MenuTypeScreenSizeConfigForm {
  compact: FormControl<MenuTypeConfigOption>,
  medium: FormControl<MenuTypeConfigOption>,
  expanded: FormControl<MenuTypeConfigOption>,
  large: FormControl<MenuTypeConfigOption>,
  extraLarge: FormControl<MenuTypeConfigOption>,
}
