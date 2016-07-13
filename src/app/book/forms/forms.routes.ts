import { RouterConfig } from '@angular/router';
import { Forms }     from './forms.component';
import { DemoFormSku }    from './demo_form_sku';
import { SkuWithBuilder } from './sku_with_builder';
import { ValidationsExplicit} from './validations_explicit';
import { ValidationsShorthand } from './validations_shorthand';
import { CustomValidations } from './custom_validations';
import { WithEvents } from './with_events';
import { WithNgModel } from './with_ngModel';

export const FormRoutes: RouterConfig = [
    {
        path: 'book/forms',
        component: Forms,
        children: [
            { path: 'demo_form_sku',        component: DemoFormSku },
            { path: 'sku_with_builder',     component: SkuWithBuilder },
            { path: 'validations_explicit', component: ValidationsExplicit },
            { path: 'validations_shorthand',component: ValidationsShorthand },
            { path: 'custom_validations',   component: CustomValidations },
            { path: 'with_events',          component: WithEvents },
            { path: 'with_ngModel',         component: WithNgModel }

        ]
    }
];
