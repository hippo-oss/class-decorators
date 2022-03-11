import { validateSync } from 'class-validator';

import { IsInteger } from '../is-integer';

describe('IsInteger', () => {
    it('allows optional integer to be omitted', () => {
        class Fixture {
            @IsInteger({
                optional: true,
            })
            property!: number;
        }

        const obj = new Fixture();
        const errors = validateSync(obj);
        expect(errors).toHaveLength(0);
    });
    it('allows nullable integer to be omitted', () => {
        class Fixture {
            @IsInteger({
                nullable: true,
            })
            property!: number;
        }

        const obj = new Fixture();
        const errors = validateSync(obj);
        expect(errors).toHaveLength(0);
    });
    it('does not allow required integer to be omitted', () => {
        class Fixture {
            @IsInteger({})
            property!: number;
        }

        const obj = new Fixture();
        const errors = validateSync(obj);
        expect(errors).toHaveLength(1);
        expect(errors).toMatchSnapshot();
    });
    it('does not allow non-integer', () => {
        class Fixture {
            @IsInteger({})
            property!: number;
        }

        const obj = new Fixture();
        obj.property = '42' as unknown as number;

        const errors = validateSync(obj);
        expect(errors).toHaveLength(1);
        expect(errors).toMatchSnapshot();
    });
    it('does not allow float', () => {
        class Fixture {
            @IsInteger({})
            property!: number;
        }

        const obj = new Fixture();
        obj.property = 42.1;

        const errors = validateSync(obj);
        expect(errors).toHaveLength(1);
        expect(errors).toMatchSnapshot();
    });
    it('does not allow integer that is too small', () => {
        class Fixture {
            @IsInteger({
                minValue: 0,
            })
            property!: number;
        }

        const obj = new Fixture();
        obj.property = -1;

        const errors = validateSync(obj);
        expect(errors).toHaveLength(1);
        expect(errors).toMatchSnapshot();
    });
    it('does not allow integer that is too large', () => {
        class Fixture {
            @IsInteger({
                maxValue: 0,
            })
            property!: number;
        }

        const obj = new Fixture();
        obj.property = 1;

        const errors = validateSync(obj);
        expect(errors).toHaveLength(1);
        expect(errors).toMatchSnapshot();
    });
    it('allows integer', () => {
        class Fixture {
            @IsInteger({
                maxValue: 2,
                minValue: 0,
            })
            property!: number;
        }

        const obj = new Fixture();
        obj.property = 1;

        const errors = validateSync(obj);
        expect(errors).toHaveLength(0);
    });
});
