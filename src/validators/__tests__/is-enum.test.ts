import { validateSync } from 'class-validator';

import { IsEnum } from '../is-enum';

describe('IsEnum', () => {
    enum FixtureEnum {
        Foo = 'Foo',
        Bar = 'Bar',
    }

    it('allows optional enum to be omitted', () => {
        class Fixture {
            @IsEnum({
                enum: FixtureEnum,
                optional: true,
            })
            property!: FixtureEnum;
        }

        const obj = new Fixture();
        const errors = validateSync(obj);
        expect(errors).toHaveLength(0);
    });
    it('allows nullable enum to be omitted', () => {
        class Fixture {
            @IsEnum({
                enum: FixtureEnum,
                nullable: true,
            })
            property!: FixtureEnum;
        }

        const obj = new Fixture();
        const errors = validateSync(obj);
        expect(errors).toHaveLength(0);
    });
    it('does not allow required enum to be omitted', () => {
        class Fixture {
            @IsEnum({
                enum: FixtureEnum,
            })
            property!: FixtureEnum;
        }

        const obj = new Fixture();
        const errors = validateSync(obj);
        expect(errors).toHaveLength(1);
        expect(errors).toMatchSnapshot();
    });
    it('does not allow non enum', () => {
        class Fixture {
            @IsEnum({
                enum: FixtureEnum,
            })
            property!: FixtureEnum;
        }

        const obj = new Fixture();
        obj.property = 'baz' as unknown as FixtureEnum;
        const errors = validateSync(obj);
        expect(errors).toHaveLength(1);
        expect(errors).toMatchSnapshot();
    });
    it('allows enum', () => {
        class Fixture {
            @IsEnum({
                enum: FixtureEnum,
            })
            property!: FixtureEnum;
        }

        const obj = new Fixture();
        obj.property = FixtureEnum.Foo;

        const errors = validateSync(obj);
        expect(errors).toHaveLength(0);
    });
});
