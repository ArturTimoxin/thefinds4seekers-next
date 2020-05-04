import { addMounths } from '../shared/add-months.util';

test('addMounths function exitsts', () => {
    expect(addMounths).toBeDefined();
})

test('add 2 mounth', () => {
    const date = new Date('2020-05-02');
    const expectedDate = new Date('2020-07-02');
    expect(addMounths(date, 2)).toEqual(expectedDate);
})

test('add 13 mounth', () => {
    const date = new Date('2020-05-02');
    const expectedDate = new Date('2021-06-02');
    expect(addMounths(date, 13)).toEqual(expectedDate);
})

test('add 1 mounth', () => {
    const date = new Date('2020-05-02');
    const expectedDate = new Date('2020-06-02');
    expect(addMounths(date, 1)).toEqual(expectedDate);
})