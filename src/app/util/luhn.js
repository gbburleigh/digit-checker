export function luhn(cardNumber){
    const checkDigit = cardNumber[cardNumber.length - 1];
    const chars = cardNumber.split('');
    let sum = 0;
    let index = 0;
    for (const char of chars) {
        if (index % 2 === 0) {
            sum += (2 * Number(char));
        }
        else {
            sum += Number(char);
        }

        index += 1;
    }

    const calculatedCheck = (10 - (sum % 10)) % 10;

    return {calculatedCheck: calculatedCheck, providedCheck: Number(checkDigit)};
}