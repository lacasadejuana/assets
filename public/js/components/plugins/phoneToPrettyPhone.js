export function phoneToPrettyPhone(phone) {
    if (phone && /(\+*5*6*){0,1}([1-9])(\d{4})(\d{4})/.exec(phone
        .replace(/\s/g, ''))) {
        let [_, code, prefix, group1, group2] = /(\+*5*6*){0,1}([1-9])(\d{4})(\d{4})/.exec(phone.replace(/\s/g, ''));
        phone = ['+56', prefix, group1, group2].join(' ');
    }
    return phone;
}
globalThis.phoneToPrettyPhone = phoneToPrettyPhone;
//# sourceMappingURL=phoneToPrettyPhone.js.map