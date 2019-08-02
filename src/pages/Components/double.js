function doubleChar (string){
    let newString = '';
    for(let i  = 0; i < string.length; i++){
        let char = string[i];
        if(char !== ' ') newString += char+char;
        if(char === ' ') newString += char;
    }
    return newString;
}
