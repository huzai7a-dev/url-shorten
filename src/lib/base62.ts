const CHARSET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const BASE = 62;

export const encodeBase62 = (num : number): string => {
    if(num === 0) return CHARSET[0];

    let encoded = '';
    while(num > 0){
        encoded = CHARSET[num % BASE] + encoded;
        num = Math.floor(num / BASE);
    }
    return encoded;
}

export const decodeBase62 = (str: string): number => {
    let decoded = 0;
    for(const char of str){
        decoded = decoded * BASE + CHARSET.indexOf(char);
    }
    return decoded;
}