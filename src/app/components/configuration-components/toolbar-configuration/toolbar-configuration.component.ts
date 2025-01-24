import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardFooter,
  MatCardHeader, MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {GuidelineService} from "../../../service/guideline.service";
import {MatList, MatListItem, MatListItemAvatar, MatListItemLine, MatListItemTitle} from "@angular/material/list";
import {MatButton, MatIconButton} from "@angular/material/button";
import {ComponentPreviewComponent} from "../../component-preview/component-preview.component";
import {MatToolbar} from "@angular/material/toolbar";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MenuConfigOption} from "./enum/MenuConfigOption";
import {ThemeColorOption} from "../../../model/enum/ThemeColorOption";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatDivider} from "@angular/material/divider";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {TitleCasePipe} from "@angular/common";
import {ReactToolbarPreviewComponent} from "./react/react-toolbar-preview/react-toolbar-preview.component";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {AvailableFramework} from "../../../model/enum/AvailableFramework";
import {AngularToolbarPreviewComponent} from "./angular/angular-toolbar-preview/angular-toolbar-preview.component";
import {ToolbarConfigForm} from "./model/ToolbarConfigForm";
import {MenuConfigForm} from "./model/MenuConfigForm";
import {ThemePickerComponent} from "../../theme-picker/theme-picker.component";
import {MatIcon} from "@angular/material/icon";
import {NewMenuLinkForm} from "./model/NewMenuLinkForm";
import {NavItem} from "./model/NavItem";
import {MatTooltip} from "@angular/material/tooltip";
import {v4 as uuidv4} from 'uuid';
import {MenuTypeConfigOption} from "./enum/MenuTypeConfigOption";
import {WindowSizeClass} from "../../../model/enum/WindowSizeClass";
import {MatCell, MatHeaderCell, MatHeaderRow, MatRow, MatTable, MatTableModule} from "@angular/material/table";
import {CdkColumnDef} from "@angular/cdk/table";
import {MatOption, MatSelect} from "@angular/material/select";
import {MenuScreenSizeConfigForm} from "./model/MenuScreenSizeConfigForm";
import {MenuTypeScreenSizeConfigForm} from "./model/MenuTypeScreenSizeConfigForm";
import {UpperSnakeCaseToCamelCasePipe} from "../../../pipe/upper-snake-case-to-camel-case.pipe";
import {UpperSnakeCaseToTitleCaseWithSpacePipe} from "../../../pipe/upper-snake-case-to-title-case-with-space.pipe";
import {GuidelineEvaluation} from "./model/GuidelineEvaluation";
import {GuidelineEvaluationType} from "../../../model/enum/GuidelineEvaluationType";
import {MatProgressBar} from "@angular/material/progress-bar";
import {MatMenuTrigger} from "@angular/material/menu";
import {ConfigurationComponent} from "../../../model/enum/ConfigurationComponent";
import {
  GuidelineEvaluationOverviewComponent
} from "../../guideline-evaluation-overview/guideline-evaluation-overview.component";

interface MenuConfigTableData {
  configType: 'menu' | 'menu-type',
  compact: MenuConfigOption | MenuTypeConfigOption,
  medium: MenuConfigOption | MenuTypeConfigOption,
  expanded: MenuConfigOption | MenuTypeConfigOption,
  large: MenuConfigOption | MenuTypeConfigOption,
  extraLarge: MenuConfigOption | MenuTypeConfigOption,
}

@Component({
  selector: 'app-toolbar-configuration',
  standalone: true,
  imports: [
    MatSidenav,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatList,
    MatListItem,
    MatButton,
    MatListItemTitle,
    MatListItemLine,
    MatListItemAvatar,
    ComponentPreviewComponent,
    MatToolbar,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatCheckbox,
    MatDivider,
    MatRadioGroup,
    MatRadioButton,
    TitleCasePipe,
    ReactToolbarPreviewComponent,
    MatButtonToggle,
    MatButtonToggleGroup,
    FormsModule,
    AngularToolbarPreviewComponent,
    ThemePickerComponent,
    MatIcon,
    MatIconButton,
    MatTooltip,
    MatTable,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    CdkColumnDef,
    MatTableModule,
    MatSelect,
    MatOption,
    UpperSnakeCaseToCamelCasePipe,
    UpperSnakeCaseToTitleCaseWithSpacePipe,
    MatProgressBar,
    MatCardFooter,
    MatCardActions,
    MatCardSubtitle,
    GuidelineEvaluationOverviewComponent
  ],
  providers: [
    CdkColumnDef,
    UpperSnakeCaseToCamelCasePipe,
    UpperSnakeCaseToTitleCaseWithSpacePipe
  ],
  templateUrl: './toolbar-configuration.component.html',
  styleUrl: './toolbar-configuration.component.scss',
})
export class ToolbarConfigurationComponent implements OnInit {
  @ViewChild('angularToolbarPreview') angularToolbarPreview?: AngularToolbarPreviewComponent;
  @ViewChild('reactToolbarPreview') reactToolbarPreview?: ReactToolbarPreviewComponent;

  displayedColumns: string[] = ['configType', 'compact', 'medium', 'expanded', 'large', 'extraLarge'];
  tableData: MenuConfigTableData[] = [
    {
      configType: 'menu',
      compact: MenuConfigOption.MENU,
      medium: MenuConfigOption.MENU,
      expanded: MenuConfigOption.MENU,
      large: MenuConfigOption.MENU,
      extraLarge: MenuConfigOption.MENU
    },
    {
      configType: 'menu-type',
      compact: MenuTypeConfigOption.DROPDOWN,
      medium: MenuTypeConfigOption.DROPDOWN,
      expanded: MenuTypeConfigOption.DROPDOWN,
      large: MenuTypeConfigOption.DROPDOWN,
      extraLarge: MenuTypeConfigOption.DROPDOWN
    }
  ];
  guidelineEvaluations = new Map<string, GuidelineEvaluation>;
  selectedFramework: AvailableFramework = AvailableFramework.ANGULAR;
  selectedWindowSize?: WindowSizeClass;
  evaluationPending = false;


  newMenuLinkForm = new FormGroup<NewMenuLinkForm>({
    name: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    link: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]})
  });
  toolbarConfigurationForm = new FormGroup<ToolbarConfigForm>({
    title: new FormControl<string>('', {nonNullable: true}),
    menuConfig: new FormGroup<MenuConfigForm>({
      menu: new FormGroup<MenuScreenSizeConfigForm>({
        compact: new FormControl<MenuConfigOption>(MenuConfigOption.MENU, {nonNullable: true}),
        medium: new FormControl<MenuConfigOption>(MenuConfigOption.MENU, {nonNullable: true}),
        expanded: new FormControl<MenuConfigOption>(MenuConfigOption.MENU, {nonNullable: true}),
        large: new FormControl<MenuConfigOption>(MenuConfigOption.MENU, {nonNullable: true}),
        extraLarge: new FormControl<MenuConfigOption>(MenuConfigOption.MENU, {nonNullable: true}),
      }),
      menuType: new FormGroup<MenuTypeScreenSizeConfigForm>({
        compact: new FormControl<MenuTypeConfigOption>(MenuTypeConfigOption.DROPDOWN, {nonNullable: true}),
        medium: new FormControl<MenuTypeConfigOption>(MenuTypeConfigOption.DROPDOWN, {nonNullable: true}),
        expanded: new FormControl<MenuTypeConfigOption>(MenuTypeConfigOption.DROPDOWN, {nonNullable: true}),
        large: new FormControl<MenuTypeConfigOption>(MenuTypeConfigOption.DROPDOWN, {nonNullable: true}),
        extraLarge: new FormControl<MenuTypeConfigOption>(MenuTypeConfigOption.DROPDOWN, {nonNullable: true}),
      })
    }),
    navItems: new FormControl<NavItem[]>([], {nonNullable: true}),
    showLoginButton: new FormControl<boolean>(false, {nonNullable: true}),
    showProfileButton: new FormControl<boolean>(false, {nonNullable: true}),
    color: new FormControl<ThemeColorOption>(ThemeColorOption.PRIMARY, {nonNullable: true}),
  });

  protected readonly WindowSizeClass = WindowSizeClass;
  protected readonly ThemeColorOption = ThemeColorOption;
  protected readonly MenuConfigOption = MenuConfigOption;
  protected readonly MenuTypeConfigOption = MenuTypeConfigOption;
  protected readonly Object = Object;
  protected readonly AvailableFramework = AvailableFramework;
  protected readonly GuidelineEvaluationType = GuidelineEvaluationType;

  constructor(private readonly guidelineService: GuidelineService, private readonly enumLowercasePipe: UpperSnakeCaseToCamelCasePipe) {
    Object.values(WindowSizeClass).forEach(windowSizeClass => {
      this.toggleMenuTypeBasedOnMenuOption(windowSizeClass)
    })
  }

  ngOnInit(): void {
    this.guidelineEvaluations = new Map<string, GuidelineEvaluation>(
      this.guidelineService.getGuidelinesForComponent(ConfigurationComponent.TOOLBAR).map(guideline => [guideline.id, {guideline}])
    );
  }

  addMenuLink() {
    const navItems = this.toolbarConfigurationForm.controls.navItems.value;
    navItems.push({
      id: uuidv4(),
      name: this.newMenuLinkForm.controls.name.value,
      link: this.newMenuLinkForm.controls.link.value,
    })

    this.toolbarConfigurationForm.controls.navItems.setValue(navItems)

    this.newMenuLinkForm.reset();
  }

  removeLink(item: NavItem) {
    const navItems = this.toolbarConfigurationForm.controls.navItems.value;
    const newItems = navItems.filter(navItem => navItem.id !== item.id);

    this.toolbarConfigurationForm.controls.navItems.setValue(newItems);
  }

  async evaluateGuidelines() {
    this.evaluationPending = true;

    if (this.selectedFramework === AvailableFramework.ANGULAR) {
      await this.prepareAngularPreview();
    } else {
      await this.prepareReactPreview();
    }

    const toolbarPreviewElement = document.getElementById('previewToolbar');
    const sidenavPreviewElement = document.getElementById('previewSidenav') ?? undefined;

    if (toolbarPreviewElement) {
      const evaluationResult = new Map<string, GuidelineEvaluation>;

      const userInputGuidelineEvaluations: Map<string, boolean> = new Map(
        Array.from(this.guidelineEvaluations.entries())
          .filter(([_, guidelineEvaluation]) => guidelineEvaluation.guideline.evaluationType === GuidelineEvaluationType.USER_INPUT)
          .map(([guidelineId, guidelineEvaluation]) => [guidelineId, guidelineEvaluation.evaluationResult ? guidelineEvaluation.evaluationResult.success : false])
      );

      this.guidelineService.evaluateToolbarGuidelines({
        toolbarElement: toolbarPreviewElement,
        sidenavElement: sidenavPreviewElement,
        userInputGuidelineEvaluations,
      }).forEach((value, key) => {
        const currentEval = this.guidelineEvaluations.get(key)!;
        currentEval.evaluationResult = value;

        evaluationResult.set(key, currentEval);
      });
      this.guidelineEvaluations = evaluationResult;

      this.evaluationPending = false;
    }
  }

  private async prepareAngularPreview(): Promise<void> {
    if (!this.angularToolbarPreview) return;

    this.toolbarConfigurationForm.disable();

    const sidenavPreviewElement = this.angularToolbarPreview.sideNav;
    const sidenavPromise = (sidenavPreviewElement && !sidenavPreviewElement.opened)
      ? await (sidenavPreviewElement as unknown as MatSidenav).open()
      : await Promise.resolve();

    const menuTriggerElement = this.angularToolbarPreview.menuTrigger;
    const menuTriggerPromise = (menuTriggerElement && !menuTriggerElement.menuOpen)
      ? (menuTriggerElement as unknown as MatMenuTrigger).openMenu()
      : await Promise.resolve();

    await Promise.all([sidenavPromise, menuTriggerPromise]);

    // wait for next frame to assure that the DOM has been refreshed
    await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));

    this.toolbarConfigurationForm.enable();
  }

  private toggleMenuTypeBasedOnMenuOption(windowSizeClass: WindowSizeClass) {
    const formKey = this.enumLowercasePipe.transform(windowSizeClass);

    this.toolbarConfigurationForm.controls.menuConfig.controls.menu.get(formKey)?.valueChanges.subscribe((value) => {
      if (value === MenuConfigOption.MENU) {
        this.toolbarConfigurationForm.controls.menuConfig.controls.menuType.get(formKey)?.enable();
      } else {
        this.toolbarConfigurationForm.controls.menuConfig.controls.menuType.get(formKey)?.disable();
      }
    });
  }

  private async prepareReactPreview(): Promise<void> {
    if (!this.reactToolbarPreview) return;

    this.toolbarConfigurationForm.disable();

    const toolbarPreviewComponent = this.reactToolbarPreview.toolbarPreviewComponent?.current;

    const drawerPromise = (toolbarPreviewComponent && !toolbarPreviewComponent.drawerOpen)
      ? toolbarPreviewComponent.toggleDrawer()
      : await Promise.resolve();

    const menuTriggerPromise = (toolbarPreviewComponent && !toolbarPreviewComponent.menuOpen)
      ? toolbarPreviewComponent.toggleMenu()
      : await Promise.resolve();

    await Promise.all([drawerPromise, menuTriggerPromise]);

    // wait for next frame to assure that the DOM has been refreshed
    await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));

    this.toolbarConfigurationForm.enable();
  }

}
