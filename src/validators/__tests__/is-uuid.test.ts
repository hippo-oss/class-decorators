import { validateSync } from 'class-validator';

import { IsUUID } from '../is-uuid';

describe('IsUUID', () => {
    it('allows optional uuid to be omitted', () => {
        class Fixture {
            @IsUUID({
                optional: true,
            })
            property!: string;
        }

        const obj = new Fixture();
        const errors = validateSync(obj);
        expect(errors).toHaveLength(0);
    });
    it('allows nullable uuid to be omitted', () => {
        class Fixture {
            @IsUUID({
                nullable: true,
            })
            property!: string;
        }

        const obj = new Fixture();
        const errors = validateSync(obj);
        expect(errors).toHaveLength(0);
    });
    it('does not allow required uuid to be omitted', () => {
        class Fixture {
            @IsUUID({})
            property!: string;
        }

        const obj = new Fixture();
        const errors = validateSync(obj);
        expect(errors).toHaveLength(1);
        expect(errors).toMatchSnapshot();
    });
    it('does not allow a non-uuid of the wrong type', () => {
        class Fixture {
            @IsUUID({})
            property!: string;
        }

        const obj = new Fixture();
        obj.property = 'not-a-uuid';
        const errors = validateSync(obj);
        expect(errors).toHaveLength(1);
        expect(errors).toMatchSnapshot();
    });
    it('does not allow a required uuid of the wrong version', () => {
        class Fixture {
            @IsUUID({
                version: '4',
            })
            property!: string;
        }

        const obj = new Fixture();
        obj.property = 'c50318b5-a0d1-11ec-b448-8c85905fd9db';
        const errors = validateSync(obj);
        expect(errors).toHaveLength(1);
        expect(errors).toMatchSnapshot();
    });
    it('allows a required uuid of the correct version', () => {
        class Fixture {
            @IsUUID({
                version: '4',
            })
            property!: string;
        }

        const obj = new Fixture();
        obj.property = '09ea1206-495e-444b-afb1-9e35a1eb0545';
        const errors = validateSync(obj);
        expect(errors).toHaveLength(0);
    });
});
