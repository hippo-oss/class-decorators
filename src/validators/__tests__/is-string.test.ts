import { validateSync } from 'class-validator';

import { IsString } from '../is-string';

describe('IsString', () => {
    it('allows optional string to be omitted', () => {
        class Fixture {
            @IsString({
                optional: true,
            })
            property!: string;
        }

        const obj = new Fixture();
        const errors = validateSync(obj);
        expect(errors).toHaveLength(0);
    });
    it('allows nullable string to be omitted', () => {
        class Fixture {
            @IsString({
                nullable: true,
            })
            property!: string;
        }

        const obj = new Fixture();
        const errors = validateSync(obj);
        expect(errors).toHaveLength(0);
    });
    it('does not allow required string to be omitted', () => {
        class Fixture {
            @IsString({})
            property!: string;
        }

        const obj = new Fixture();
        const errors = validateSync(obj);
        expect(errors).toHaveLength(1);
        expect(errors).toMatchSnapshot();
    });
    it('does not allow non-string', () => {
        class Fixture {
            @IsString({})
            property!: string;
        }

        const obj = new Fixture();
        obj.property = 42 as unknown as string;
        const errors = validateSync(obj);
        expect(errors).toHaveLength(1);
        expect(errors).toMatchSnapshot();
    });
    it('does not allow required string of too short a length', () => {
        class Fixture {
            @IsString({
                minLength: 1,
            })
            property!: string;
        }

        const obj = new Fixture();
        obj.property = '';
        const errors = validateSync(obj);
        expect(errors).toHaveLength(1);
        expect(errors).toMatchSnapshot();
    });
    it('does not allow required string of too great of a length', () => {
        class Fixture {
            @IsString({
                maxLength: 1,
            })
            property!: string;
        }

        const obj = new Fixture();
        obj.property = 'foo';
        const errors = validateSync(obj);
        expect(errors).toHaveLength(1);
        expect(errors).toMatchSnapshot();
    });
    it('does not allow required string that does not match a pattern', () => {
        class Fixture {
            @IsString({
                pattern: /foo/,
            })
            property!: string;
        }

        const obj = new Fixture();
        obj.property = 'bar';
        const errors = validateSync(obj);
        expect(errors).toHaveLength(1);
        expect(errors).toMatchSnapshot();
    });
    it('allow required string', () => {
        class Fixture {
            @IsString({
                maxLength: 3,
                minLength: 1,
                pattern: /foo/,
            })
            property!: string;
        }

        const obj = new Fixture();
        obj.property = 'foo';
        const errors = validateSync(obj);
        expect(errors).toHaveLength(0);
    });
    it('does not allow string for string[]', () => {
        class Fixture {
            @IsString({
                isArray: true,
            })
            property!: string[];
        }

        const obj = new Fixture();
        obj.property = 'foo' as unknown as string[];
        const errors = validateSync(obj);
        expect(errors).toHaveLength(1);
        expect(errors).toMatchSnapshot();
    });
    it('does not allow string[] that is too small', () => {
        class Fixture {
            @IsString({
                isArray: {
                    minItems: 1,
                },
            })
            property!: string[];
        }

        const obj = new Fixture();
        obj.property = [];
        const errors = validateSync(obj);
        expect(errors).toHaveLength(1);
        expect(errors).toMatchSnapshot();
    });
    it('does not allow string[] that is too large', () => {
        class Fixture {
            @IsString({
                isArray: {
                    maxItems: 0,
                },
            })
            property!: string[];
        }

        const obj = new Fixture();
        obj.property = ['foo'];
        const errors = validateSync(obj);
        expect(errors).toHaveLength(1);
        expect(errors).toMatchSnapshot();
    });
    it('allows string[]', () => {
        class Fixture {
            @IsString({
                isArray: {
                    maxItems: 2,
                    minItems: 0,
                },
            })
            property!: string[];
        }

        const obj = new Fixture();
        obj.property = ['foo'];
        const errors = validateSync(obj);
        expect(errors).toHaveLength(0);
    });
    it('does not allow required string failing custom validation', () => {
        class Fixture {
            @IsString({
                validate: (value: string): boolean => value === 'foo',
            })
            property!: string;
        }

        const obj = new Fixture();
        obj.property = 'bar';
        const errors = validateSync(obj);
        expect(errors).toHaveLength(0);
    });
    it('sallow required string passing custom validation', () => {
        class Fixture {
            @IsString({
                validate: (value: string): boolean => value === 'foo',
            })
            property!: string;
        }

        const obj = new Fixture();
        obj.property = 'foo';
        const errors = validateSync(obj);
        expect(errors).toHaveLength(0);
    });
});
