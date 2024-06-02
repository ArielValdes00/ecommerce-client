// validations.js
export const validateFirstName = (value: string) => {
    if (!value) {
        return 'Please enter a valid name';
    }
    return '';
};

export const validateLastName = (value: string) => {
    if (!value) {
        return 'Please enter a valid last name';
    }
    return '';
};

export const validateEmail = (value: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
        return 'Please enter a valid email';
    }
    return '';
};

export const validateAddress = (value: string) => {
    if (!value) {
        return 'Please enter a valid address';
    }
    return '';
};

export const validateCity = (value: string) => {
    if (!value) {
        return 'Please enter a valid city';
    }
    return '';
};

export const validatePostalCode = (value: number) => {
    if (!value) {
        return 'Please enter a valid Postal Code';
    }
    return '';
};

export const validatePhoneNumber = (value: number) => {
    if (!value) {
        return 'Please enter a valid Phone Number';
    }
    return '';
};

