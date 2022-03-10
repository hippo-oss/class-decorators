import { validateSync } from 'class-validator';

import { IsNumber } from '../is-number';

describe('IsNumber', () => {
    it('allows optional number to be omitted', () => {
        class Fixture {
            @IsNumber({
                optional: true,
            })
            property!: number;
        }

        const obj = new Fixture();
        const errors = validateSync(obj);
        expect(errors).toHaveLength(0);
    });
    it('allows nullable number to be omitted', () => {
        class Fixture {
            @IsNumber({
                nullable: true,
            })
            property!: number;
        }

        const obj = new Fixture();
        const errors = validateSync(obj);
        expect(errors).toHaveLength(0);
    });
    it('does not allow required number to be omitted', () => {
        class Fixture {
            @IsNumber({})
            property!: number;
        }

        const obj = new Fixture();
        const errors = validateSync(obj);
        expect(errors).toHaveLength(1);
        expect(errors).toMatchSnapshot();
    });
    it('does not allow non-number', () => {
        class Fixture {
            @IsNumber({})
            property!: number;
        }

        const obj = new Fixture();
        obj.property = '42' as unknown as number;

        const errors = validateSync(obj);
        expect(errors).toHaveLength(1);
        expect(errors).toMatchSnapshot();
    });
    it('does not allow number that is too small', () => {
        class Fixture {
            @IsNumber({
                minValue: 0,
            })
            property!: number;
        }

        const obj = new Fixture();
        obj.property = -1.25;

        const errors = validateSync(obj);
        expect(errors).toHaveLength(1);
        expect(errors).toMatchSnapshot();
    });
    it('does not allow number that is too large', () => {
        class Fixture {
            @IsNumber({
                maxValue: 0,
            })
            property!: number;
        }

        const obj = new Fixture();
        obj.property = 1.25;

        const errors = validateSync(obj);
        expect(errors).toHaveLength(1);
        expect(errors).toMatchSnapshot();
    });
    it('allows number', () => {
        class Fixture {
            @IsNumber({
                maxValue: 2,
                minValue: 0,
            })
            property!: number;
        }

        const obj = new Fixture();
        obj.property = 1.25;

        const errors = validateSync(obj);
        expect(errors).toHaveLength(0);
    });
});
