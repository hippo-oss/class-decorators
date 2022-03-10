import { plainToClass } from 'class-transformer';

import { IsDate } from '../is-date';

describe('IsDate', () => {
    it('ignores properties that are not exposed', () => {
        class Fixture {
            property!: Date;
        }

        const obj = plainToClass(Fixture, {});
        expect(obj).not.toHaveProperty('property');
    });
    it('populates missing required fields with undefined', () => {
        class Fixture {
            @IsDate({})
            property!: Date;
        }

        const obj = plainToClass(Fixture, {});
        expect(obj).toHaveProperty('property', undefined);
    });
    it('populates null required fields with undefined', () => {
        class Fixture {
            @IsDate({})
            property!: Date;
        }

        const obj = plainToClass(Fixture, {
            property: null,
        });
        expect(obj).toHaveProperty('property', undefined);
    });
    it('populates undefined required fields with undefined', () => {
        class Fixture {
            @IsDate({})
            property!: Date;
        }

        const obj = plainToClass(Fixture, {
            property: undefined,
        });
        expect(obj).toHaveProperty('property', undefined);
    });
    it('populates null nullable fields with null', () => {
        class Fixture {
            @IsDate({
                nullable: true,
            })
            property!: Date;
        }

        const obj = plainToClass(Fixture, {
            property: null,
        });
        expect(obj).toHaveProperty('property', null);
    });
    it('populates Date required fields with value', () => {
        class Fixture {
            @IsDate({})
            property!: Date;
        }

        const value = new Date();
        const obj = plainToClass(Fixture, {
            property: value,
        });
        expect(obj).toHaveProperty('property', value);
    });
    it('populates ISO string required fields with Date', () => {
        class Fixture {
            @IsDate({})
            property!: Date;
        }

        const value = new Date();
        const obj = plainToClass(Fixture, {
            property: value.toISOString(),
        });
        expect(obj).toHaveProperty('property', value);
    });
});
