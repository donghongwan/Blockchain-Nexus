const bigInt = require("big-integer");
const crypto = require("crypto");

class HomomorphicEncryption {
    constructor() {
        this.n = null; // Modulus
        this.g = null; // Generator
        this.lambda = null; // Private key component
        this.mu = null; // Private key component
    }

    generateKeyPair(bitLength = 2048) {
        const p = this.generateLargePrime(bitLength);
        const q = this.generateLargePrime(bitLength);
        this.n = p.multiply(q);
        this.lambda = this.lcm(p.subtract(1), q.subtract(1));
        this.g = this.n.add(1); // g = n + 1
        this.mu = this.modInverse(this.lambda, this.n);
        console.log("Key pair generated successfully.");
        return { publicKey: { n: this.n, g: this.g }, privateKey: { lambda: this.lambda, mu: this.mu } };
    }

    generateLargePrime(bitLength) {
        while (true) {
            const primeCandidate = bigInt(crypto.randomBytes(bitLength / 8)).nextPrime();
            if (this.isProbablePrime(primeCandidate)) {
                return primeCandidate;
            }
        }
    }

    isProbablePrime(num, k = 10) {
        if (num.lesser(2)) return false;
        if (num.equals(2) || num.equals(3)) return true;
        if (num.isEven()) return false;

        const s = num.subtract(1).divide(2);
        for (let i = 0; i < k; i++) {
            const a = bigInt.randBetween(2, num.subtract(2));
            if (this.modularExponentiation(a, s, num).notEquals(1) && this.modularExponentiation(a, num.subtract(1), num).notEquals(1)) {
                return false;
            }
        }
        return true;
    }

    modularExponentiation(base, exponent, modulus) {
        let result = bigInt(1);
        base = base.mod(modulus);
        while (exponent.greater(0)) {
            if (exponent.isOdd()) {
                result = result.multiply(base).mod(modulus);
            }
            exponent = exponent.divide(2);
            base = base.multiply(base).mod(modulus);
        }
        return result;
    }

    modInverse(a, m) {
        let m0 = m, t, q;
        let x0 = bigInt(0), x1 = bigInt(1);
        if (m.equals(1)) return bigInt(0);
        while (a.greater(1)) {
            q = a.divide(m);
            t = m;
            m = a.mod(m);
            a = t;
            t = x0;
            x0 = x1.subtract(q.multiply(x0));
            x1 = t;
        }
        if (x1.lesser(0)) x1 = x1.add(m0);
        return x1;
    }

    encrypt(value) {
        const r = bigInt.randBetween(1, this.n.subtract(1));
        const c1 = this.modularExponentiation(this.g, bigInt(value), this.n);
        const c2 = this.modularExponentiation(bigInt(r), this.n, this.n).multiply(this.modularExponentiation(bigInt(1), bigInt(value), this.n)).mod(this.n);
        return { c1, c2 };
    }

    decrypt(ciphertext) {
        const { c1, c2 } = ciphertext;
        const u = this.modularExponentiation(c1, this.lambda, this.n);
        const l = this.modularExponentiation(u.subtract(1), this.n, this.n).multiply(this.mu).mod(this.n);
        return l;
    }

    add(ciphertext1, ciphertext2) {
        const { c1: c1_1, c2: c2_1 } = ciphertext1;
        const { c1: c1_2, c2: c2_2 } = ciphertext2;
        const c1 = c1_1.multiply(c1_2).mod(this.n);
        const c2 = c2_1.multiply(c2_2).mod(this.n);
        return { c1, c2 };
    }

    serializeKey(key) {
        return JSON.stringify(key);
    }

    deserializeKey(keyString) {
        return JSON.parse(keyString);
    }

    serializeCiphertext(ciphertext) {
        return JSON.stringify(ciphertext);
    }

    deserializeCiphertext(ciphertextString) {
        return JSON.parse(ciphertextString);
    }
}

module.exports = HomomorphicEncryption;
