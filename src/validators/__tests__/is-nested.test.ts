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
    describe('IsOneOf', () => {
        it('does not allow more parameters than expected', () => {
            class Fixture {
                @IsNested({
                    type: Child,
                    hasXPropertiesDefined: 1,
                })
                property!: Child;
            }

            const obj = new Fixture();
            obj.property = { test1: 'test', test2: 'test2' };

            const errors = validateSync(obj);
            expect(errors).toHaveLength(1);
            expect(errors).toMatchSnapshot();
        });
        it('does not allow less parameters than expected', () => {
            class Fixture {
                @IsNested({
                    type: Child,
                    hasXPropertiesDefined: 1,
                })
                property!: Child;
            }

            const obj = new Fixture();
            obj.property = { test1: undefined, test2: null };

            const errors = validateSync(obj);
            expect(errors).toHaveLength(1);
            expect(errors).toMatchSnapshot();
        });
    });
});
