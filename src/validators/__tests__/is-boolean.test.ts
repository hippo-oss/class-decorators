import { validateSync } from 'class-validator';

import { IsBoolean } from '../is-boolean';

describe('IsBoolean', () => {
    it('allows optional boolean to be omitted', () => {
        class Fixture {
            @IsBoolean({
                optional: true,
            })
            property!: boolean;
        }

        const obj = new Fixture();
        const errors = validateSync(obj);
        expect(errors).toHaveLength(0);
    });
    it('allows nullable boolean to be omitted', () => {
        class Fixture {
            @IsBoolean({
                nullable: true,
            })
            property!: boolean;
        }

        const obj = new Fixture();
        const errors = validateSync(obj);
        expect(errors).toHaveLength(0);
    });
    it('does not allow required boolean to be omitted', () => {
        class Fixture {
            @IsBoolean({})
            property!: boolean;
        }

        const obj = new Fixture();
        const errors = validateSync(obj);
        expect(errors).toHaveLength(1);
        expect(errors).toMatchSnapshot();
    });
    it('does not allow non-boolean', () => {
        class Fixture {
            @IsBoolean({})
            property!: boolean;
        }

        const obj = new Fixture();
        obj.property = 'string' as unknown as boolean;

        const errors = validateSync(obj);
        expect(errors).toHaveLength(1);
        expect(errors).toMatchSnapshot();
    });
    it('allows boolean', () => {
        class Fixture {
            @IsBoolean({})
            property!: boolean;
        }

        const obj = new Fixture();
        obj.property = true;

        const errors = validateSync(obj);
        expect(errors).toHaveLength(0);
    });
});
