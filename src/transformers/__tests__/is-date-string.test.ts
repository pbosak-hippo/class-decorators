import { plainToClass } from 'class-transformer';

import { IsDateString } from '../is-date-string';

describe('IsDateString', () => {
    it('ignores properties that are not exposed', () => {
        class Fixture {
            property!: string;
        }

        const obj = plainToClass(Fixture, {});
        expect(obj).not.toHaveProperty('property');
    });
    it('populates missing required fields with undefined', () => {
        class Fixture {
            @IsDateString()
            property!: string;
        }

        const obj = plainToClass(Fixture, {});
        expect(obj).toHaveProperty('property', undefined);
    });
    it('populates null optional fields with undefined', () => {
        class Fixture {
            @IsDateString({
                optional: true,
            })
            property!: string;
        }

        const obj = plainToClass(Fixture, {
            property: null,
        });
        expect(obj).toHaveProperty('property', undefined);
    });
    it('populates undefined required fields with undefined', () => {
        class Fixture {
            @IsDateString()
            property!: string;
        }

        const obj = plainToClass(Fixture, {
            property: undefined,
        });
        expect(obj).toHaveProperty('property', undefined);
    });
    it('populates null nullable fields with null', () => {
        class Fixture {
            @IsDateString({
                nullable: true,
            })
            property!: string;
        }

        const obj = plainToClass(Fixture, {
            property: null,
        });
        expect(obj).toHaveProperty('property', null);
    });
    it('populates required fields with value', () => {
        class Fixture {
            @IsDateString()
            property!: string;
        }

        const obj = plainToClass(Fixture, {
            property: '2022-03-10',
        });
        expect(obj).toHaveProperty('property', '2022-03-10');
    });
    it('converts single items to arrays if isArray is true', () => {
        class Fixture {
            @IsDateString({
                isArray: true,
            })
            property!: string[];
        }

        const obj = plainToClass(Fixture, {
            property: '2022-03-10',
        });
        expect(obj).toHaveProperty('property', ['2022-03-10']);
    });
    it('handles multiple values if isArray is true', () => {
        class Fixture {
            @IsDateString({
                isArray: true,
            })
            property!: string[];
        }

        const obj = plainToClass(Fixture, {
            property: ['2022-03-10', '2022-03-11'],
        });
        expect(obj).toHaveProperty('property', ['2022-03-10', '2022-03-11']);
    });
});
