function fn(num1, num2) {
    try {
        if (num1 % 2 == 0 && num1 % num2 == 0) {
            return num1 % num2;
        } else {
            throw new Error("incompatible types");
        }
    } catch (err) {
        return err;
    }
}

console.log(fn(1, 2));
