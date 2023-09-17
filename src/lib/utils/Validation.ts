export class Validators {

    static required(value: any, label = 'Field') {
        console.log(value, label)
        if (value !== undefined && value !== null && value !== '') {
            return null;
        }
        return `The ${label} is required`;
    }

    static email(value: any, label = 'Field') {
        // Email regex
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (regex.test(value) || value === '') {
            return null;
        }
        return `The ${label} is not a valid email`;
    }

    static minLength(number: number) {
        return function (p1: any, p2: string) {
            return p1.length >= number ? null : `The ${p2} must be at least ${number} characters long`;
        };
    }
}
