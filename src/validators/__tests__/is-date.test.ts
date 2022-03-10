import { validateSync } from 'class-validator';

import { IsDate } from '../is-date';

describe('IsDate', () => {
    it('allows optional date to be omitted', () => {
        class Fixture {
            @IsDate({
                optional: true,
            })
            property!: Date;
        }

        const obj = new Fixture();
        const errors = validateSync(obj);
        expect(errors).toHaveLength(0);
    });
    it('allows nullable date to be omitted', () => {
        class Fixture {
            @IsDate({
                nullable: true,
            })
            property!: Date;
        }

        const obj = new Fixture();
        const errors = validateSync(obj);
        expect(errors).toHaveLength(0);
    });
    it('does not allow required date to be omitted', () => {
        class Fixture {
            @IsDate({})
            property!: Date;
        }

        const obj = new Fixture();
        const errors = validateSync(obj);
        expect(errors).toHaveLength(1);
        expect(errors).toMatchSnapshot();
    });
    it('does not allow non-date', () => {
        class Fixture {
            @IsDate({})
            property!: Date;
        }

        const obj = new Fixture();
        obj.property = 'foo' as unknown as Date;

        const errors = validateSync(obj);
        expect(errors).toHaveLength(1);
        expect(errors).toMatchSnapshot();
    });
    it('allows date', () => {
        class Fixture {
            @IsDate({})
            property!: Date;
        }

        const obj = new Fixture();
        obj.property = new Date('2022-03-11T00:37:19.486Z');

        const errors = validateSync(obj);
        expect(errors).toHaveLength(0);
    });
});
