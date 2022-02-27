export const validator = (type, value) => {
    let re;
    switch (type) {
        case 'email':
            re =
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(value);

        case 'password':
            return (value.length >= 5 && value.length <= 10);

        case 'name':
            return value.includes(' ');

        case 'contactNumber':
            re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
            return re.test(value);

        default:
            return value.includes(' ');
    }
}