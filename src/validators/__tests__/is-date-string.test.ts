import { validateSync } from 'class-validator';

import { IsDateString } from '../is-date-string';

describe('IsDateString', () => {
    it('allows optional date string to be omitted', () => {
        class Fixture {
            @IsDateString({
                optional: true,
            })
            property!: string;
        }

        const obj = new Fixture();
        const errors = validateSync(obj);
        expect(errors).toHaveLength(0);
    });
    it('allows nullable date string to be omitted', () => {
        class Fixture {
            @IsDateString({
                nullable: true,
            })
            property!: string;
        }

        const obj = new Fixture();
        const errors = validateSync(obj);
        expect(errors).toHaveLength(0);
    });
    it('does not allow required date string to be omitted', () => {
        class Fixture {
            @IsDateString({})
            property!: string;
        }

        const obj = new Fixture();
        const errors = validateSync(obj);
        expect(errors).toHaveLength(1);
        expect(errors).toMatchSnapshot();
    });
    it('does not allow non-date string', () => {
        class Fixture {
            @IsDateString({})
            property!: string;
        }

        const obj = new Fixture();
        obj.property = 'foo';

        const errors = validateSync(obj);
        expect(errors).toHaveLength(1);
        expect(errors).toMatchSnapshot();
    });
    it('allows date string', () => {
        class Fixture {
            @IsDateString({})
            property!: string;
        }

        const obj = new Fixture();
        obj.property = '2022-03-10';
        const errors = validateSync(obj);
        expect(errors).toHaveLength(0);
    });
    it('allows date time string', () => {
        class Fixture {
            @IsDateString({})
            property!: string;
        }

        const obj = new Fixture();
        obj.property = '2022-03-11T00:37:19.486Z';
        const errors = validateSync(obj);
        expect(errors).toHaveLength(0);
    });
});
