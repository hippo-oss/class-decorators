import { DTODecoratorFactories } from '@hippo-oss/dto-decorators';

import { IsBoolean } from './is-boolean';
import { IsDate } from './is-date';
import { IsDateString } from './is-date-string';
import { IsEnum } from './is-enum';
import { IsInteger } from './is-integer';
import { IsNested } from './is-nested';
import { IsNumber } from './is-number';
import { IsString } from './is-string';
import { IsUUID } from './is-uuid';

export const TRANSFORMER_DECORATORS: DTODecoratorFactories = {
    IsBoolean,
    IsDate,
    IsDateString,
    IsEnum,
    IsInteger,
    IsNested,
    IsNumber,
    IsString,
    IsUUID,
};

export * from './pick';
