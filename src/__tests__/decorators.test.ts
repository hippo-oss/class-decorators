import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import {
    IsBoolean,
    IsDate,
    IsDateString,
    IsEnum,
    IsInteger,
    IsNested,
    IsNumber,
    IsString,
    IsUUID,
} from '../decorators';

describe('decorators', () => {
    it('transforms and validates', () => {
        enum FixtureEnum {
            Foo = 'Foo',
            Bar = 'Bar',
        }

        class FixtureChild {
            @IsString({
            })
            name!: string;
        }

        class Fixture {
            @IsBoolean({
            })
            booleanValue!: boolean;

            @IsDate({
            })
            dateValue!: Date;

            @IsDateString({
            })
            dateStringValue!: string;

            @IsEnum({
                enum: FixtureEnum,
            })
            enumValue!: FixtureEnum;

            @IsInteger({
            })
            integerValue!: number;

            @IsNested({
                type: FixtureChild,
            })
            nestedValue!: FixtureChild;

            @IsNumber({
            })
            numberValue!: number;

            @IsString({
            })
            stringValue!: string;

            @IsUUID({
            })
            uuidValue!: string;
        }

        const obj = plainToClass(Fixture, {
            booleanValue: 'true',
            dateValue: '2022-03-11T00:37:19.486Z',
            dateStringValue: '2022-03-11',
            enumValue: 'Foo',
            integerValue: '42',
            nestedValue: {
                name: 'name',
            },
            numberValue: '1.21',
            stringValue: 'gigawatts',
            uuidValue: '09ea1206-495e-444b-afb1-9e35a1eb0545',
        });
        const errors = validateSync(obj);
        expect(errors).toHaveLength(0);
    });
});
