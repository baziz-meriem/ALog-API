const { validateId, validateEmail, validatePassword, validateInput, validatePhoneNumber } = require('../../src/api/v1/validators/inputValidation');

describe('validate phone Number', () => {
    it('should return null if the phone number is not a string', () => {
        const num = 123;
        const result = validatePhoneNumber(num);
        expect(result).toBeNull();
    });
    it('should return null if the phone number is not a valid phone number', () => {
        const num = '123';
        const result = validatePhoneNumber(num);
        expect(result).toBeNull();
    });
    it('should return the phone number if it is valid', () => {
        const num = '0123456789';
        const result = validatePhoneNumber(num);
        expect(result).toBe(num);
    });

});

describe('validate input', () => {
    it('should return the input', () => {
        const input = 'test';
        const result = validateInput(input);
        expect(result).toBe(input);
    });
    it('should return null if the input is null', () => {
        const input = null;
        const result = validateInput(input);
        expect(result).toBeNull();
    });
});

describe('validate email', () => {
    it('should return null if the email is not a string', () => {
        const email = 123;
        const result = validateEmail(email);
        expect(result).toBeNull();
    });
    it('should return null if the email is longer than 255 characters', () => {
        const email = 'a'.repeat(256);
        const result = validateEmail(email);
        expect(result).toBeNull();
    });
    it('should return null if the email is not a valid email', () => {
        const email = 'test';
        const result = validateEmail(email);
        expect(result).toBeNull();
    });
    it('should return the email if it is valid', () => {
        const email = 'ja_aiteur@esi.dz';
        const result = validateEmail(email);
        expect(result).toBe(email);
    });
});

describe('validate password', () => {
    it('should return null if the password is not a string', () => {
        const password = 123;
        const result = validatePassword(password);
        expect(result).toBeNull();
    });
    it('should return null if the password is shorter than 6 characters', () => {
        const password = 'a'.repeat(5);
        const result = validatePassword(password);
        expect(result).toBeNull();
    });
    it('should return the password if it is valid', () => {
        const password = 'a'.repeat(6);
        const result = validatePassword(password);
        expect(result).toBe(password);
    });
});

describe('validate id', () => {
    it('should return null if the id is not a number', () => {
        const id = '123';
        const result = validateId(id);
        expect(result).toBeNull();
    });
    it('should return the id if it is valid', () => {
        const id = 123;
        const result = validateId(id);
        expect(result).toBe(id);
    });
});