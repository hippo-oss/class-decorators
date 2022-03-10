import { validateSync } from 'class-validator';

import { IsNested } from '../is-nested';

describe('IsNested', () => {
    class Child {
    }

    it('allows optional nested to be omitted', () => {
        class Fixture {
            @IsNested({
                optional: true,
                type: Child,
            })
            property!: Child;
        }

        const obj = new Fixture();
        const errors = validateSync(obj);
        expect(errors).toHaveLength(0);
    });
    it('allows nullable nested to be omitted', () => {
        class Fixture {
            @IsNested({
                nullable: true,
                type: Child,
            })
            property!: Child;
        }

        const obj = new Fixture();
        const errors = validateSync(obj);
        expect(errors).toHaveLength(0);
    });
    it('does not allow required nested to be omitted', () => {
        class Fixture {
            @IsNested({
                type: Child,
            })
            property!: Child;
        }

        const obj = new Fixture();
        const errors = validateSync(obj);
        expect(errors).toHaveLength(1);
        expect(errors).toMatchSnapshot();
    });
    it('does not allow non-nested', () => {
        class Fixture {
            @IsNested({
                type: Child,
            })
            property!: Child;
        }

        const obj = new Fixture();
        obj.property = 'foo' as unknown as Child;
        const errors = validateSync(obj);
        expect(errors).toHaveLength(1);
        expect(errors).toMatchSnapshot();
    });
    it('allows nested', () => {
        class Fixture {
            @IsNested({
                type: Child,
            })
            property!: Child;
        }

        const obj = new Fixture();
        obj.property = new Child();

        const errors = validateSync(obj);
        expect(errors).toHaveLength(0);
    });
});
