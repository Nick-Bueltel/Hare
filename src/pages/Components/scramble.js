
function scramble(input){
    var shuffled = input.split('').sort(function(){return 0.5-Math.random()}).join('');

    return shuffled

}

export default scramble 