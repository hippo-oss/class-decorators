import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

import { IsNested, IsInteger, IsString } from '../decorators';
import { pick } from '../pick';

describe('pick', () => {
    class Child {
        @IsString()
        baz!: string;

        @IsString()
        qux!: string;
    }

    class Parent {
        @IsString()
        foo!: string;

        @IsString()
        bar!: string;

        @IsNested({
            type: Child,
        })
        child!: Child;
    }

    it('picks a single field and does not validate', () => {
        const ParentFixture = pick(Parent, 'ParentFixture', ['foo']);

        const obj = plainToClass(ParentFixture, {
        });
        const errors = validateSync(obj);
        expect(errors).toHaveLength(1);
        expect(errors).toMatchSnapshot();
    });
    it('picks a single field and validates', () => {
        const ParentFixture = pick(Parent, 'ParentFixture', ['foo']);

        const obj = plainToClass(ParentFixture, {
            foo: 'foo',
        });
        const errors = validateSync(obj);
        expect(errors).toHaveLength(0);
    });
    it('picks zero fields', () => {
        const ParentFixture = pick(Parent, 'ParentFixture', []);

        const obj = plainToClass(ParentFixture, {
        });
        const errors = validateSync(obj);
        expect(errors).toHaveLength(0);
    });
    it('picks child fields and does not validate', () => {
        const ParentFixture = pick(Parent, 'ParentFixture', ['child']);

        const obj = plainToClass(ParentFixture, {
        });
        const errors = validateSync(obj);
        expect(errors).toHaveLength(1);
        expect(errors).toMatchSnapshot();
    });
    it('picks all child fields and validates', () => {
        const ParentFixture = pick(Parent, 'ParentFixture', ['child']);

        const obj = plainToClass(ParentFixture, {
            child: {
                baz: 'baz',
                qux: 'sux',
            },
        });
        const errors = validateSync(obj);
        expect(errors).toHaveLength(0);
    });
    it('picks one field and one child field and does not validate if field is omitted', () => {
        const ChildFixture = pick(Child, 'ChildFixture', ['baz']);
        const ParentBase = pick(Parent, 'ParentBase', ['foo'], ['child']);

        class ParentFixture extends ParentBase {
            @IsNested({
                type: ChildFixture,
            })
            child!: typeof ChildFixture;
        }

        const obj = plainToClass(ParentFixture, {
            child: {
                baz: 'baz',
            },
        });
        const errors = validateSync(obj);
        expect(errors).toHaveLength(1);
        expect(errors).toMatchSnapshot();
    });
    it('picks one field and one child field and does not validate if child is omitted', () => {
        const ChildFixture = pick(Child, 'ChildFixture', ['baz']);
        const ParentBase = pick(Parent, 'ParentBase', ['foo'], ['child']);

        class ParentFixture extends ParentBase {
            @IsNested({
                type: ChildFixture,
            })
            child!: typeof ChildFixture;
        }

        const obj = plainToClass(ParentFixture, {
            foo: 'foo',
        });
        const errors = validateSync(obj);
        expect(errors).toHaveLength(1);
        expect(errors).toMatchSnapshot();
    });
    it('picks one field and one child field and validates', () => {
        const ChildFixture = pick(Child, 'ChildFixture', ['baz']);
        const ParentBase = pick(Parent, 'ParentBase', ['foo'], ['child']);

        class ParentFixture extends ParentBase {
            @IsNested({
                type: ChildFixture,
            })
            child!: typeof ChildFixture;
        }

        const obj = plainToClass(ParentFixture, {
            foo: 'foo',
            child: {
                baz: 'baz',
            },
        });
        const errors = validateSync(obj);
        expect(errors).toHaveLength(0);
    });
    it('redefines a field from a grand parent', () => {
        class GrandParentFixture {
            @IsString()
            keep!: string;

            @IsString()
            redefine!: string;
        }

        const ParentFixture = pick(GrandParentFixture, 'Parent', ['keep'], ['redefine']);

        class ChildFixture extends ParentFixture {
            @IsInteger()
            redefine!: number;
        }

        const obj = plainToClass(ChildFixture, {
            keep: 'string',
            redefine: '42',
        });
        const errors = validateSync(obj);
        expect(errors).toHaveLength(0);

        expect(obj).toMatchObject({
            keep: 'string',
            redefine: 42,
        });
    });
});
