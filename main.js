const Hangul = require('hangul-js');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
    
const Default_Korean = {
    jaum: ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'],
    moum: ['ㅏ', 'ㅑ', 'ㅓ', 'ㅕ', 'ㅗ', 'ㅛ', 'ㅜ', 'ㅠ', 'ㅡ', 'ㅣ', 'ㅐ' , 'ㅒ' , 'ㅔ' , 'ㅖ' , 'ㅘ' , 'ㅙ' , 'ㅚ' , 'ㅝ' , 'ㅞ' , 'ㅟ' , 'ㅢ']
}
const regex = /[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;

rl.question("초성을 입력해 주세요(최대 4개 권장)", function (first_input) {  
    if (regex.test(first_input))
        return console.log('입력이 잘못되었습니다.');

    const baseString = first_input.split("");
    var tmp = tmp_preset(baseString);
    
    baseString.forEach((baseval, index) => {
    
        Default_Korean.moum.forEach((val) => {
            tmp[index].push(Hangul.assemble(baseval + val));
        });
    
    });
    
    
    baseString.forEach((value, index) => {
    
        tmp[index].forEach((val) => {
            
            Default_Korean.jaum.forEach((v, i) => {
                tmp[index].push(Hangul.assemble(val + v));
            })
    
        })
    
    });
    
    var char_num = tmp[0].length;
    console.log('한 자리에 들어갈 수 있는 글자 : ', char_num, '개');
    
    
    var n = Array();
    for (var i = 1; i <= 3; i++)
        n[i] = i;
    
    const sz = baseString.length;
    var arr = Array(sz);
    var res = [];
    var v = 0;
    
    f(0);
    function f(idx) {
        if(idx == sz) {
            var temp = '';
            arr.forEach((value, index) => {
                temp += tmp[index][value];
                if (baseString.length-1 == index) {
                    res.push(temp);
                }
            })
            return;
        }
    
        for(var i = 0; i < char_num; i++) {
            arr[idx] = i;
            f(idx + 1);
        }
    }
    console.log(res.length, '개의 결과값');
    
    rl.question("검색할 이름을 입력하세요 : ", function (second_input) {
        if (regex.test(second_input))
            return console.log('잘못된 입력입니다.');
        
        var a = res.indexOf(second_input)
        if (a != -1)
            console.log('검색된 위치 : ', a, ', 실제 값 : ', res[a]);
        else
            console.log('검색 결과가 없습니다');

        return;
    });
    return;
})




function tmp_preset(baseString) {
    var tmp = [];
    baseString.forEach((val, i) => {
        tmp[i] = [];
    });
    return tmp;
}