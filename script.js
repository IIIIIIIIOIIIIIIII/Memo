var START = document.getElementById('start');
var OK = document.getElementById('ok');
var LEFT = document.getElementById('leftTriangle');
var RIGHT = document.getElementById('rightTriangle');
var countsForAnswer = '';
var countsForQuestion = '';
var memoSettings = {
    time: null,
    countsQuantity: 4,
    set: function (val) {
        this.countsQuantity = val;
    }
};
(function getCountsForAnswer() {
    var counts = document.getElementById('counts');
    counts.addEventListener('click', function (event) {
        var clickedCount = event.target;
        var answer = document.getElementById('answer');
        answer.style.color = 'blue';
        if (clickedCount.className === 'count') {
            countsForAnswer += clickedCount.textContent;
            answer.textContent += clickedCount.textContent;
            console.log(countsForAnswer);
        }
        else
            return null;
    });
})();
(function addHandlersToSettings() {
    var spans = document.getElementsByTagName('span');
    for (var i = 0; i < spans.length; i++) {
        if (spans[i].dataset.setstime) {
            spans[i].addEventListener('click', getSetTimeValueAndHighlight);
        }
    }
})();
function getSetTimeValueAndHighlight() {
    var spans = document.getElementsByTagName('span');
    for (var i = 0; i < spans.length; i++) {
        if (spans[i].dataset.setstime) {
            spans[i].style.color = '#c1bfbf';
        }
    }
    if (this.dataset.setstime == '1' || this.dataset.setstime == '2' || this.dataset.setstime == '3') {
        memoSettings.time = Number(this.dataset.setstime);
        switch (this.dataset.setstime) {
            case '3':
                this.style.color = 'green';
                break;
            case '2':
                this.style.color = 'yellow';
                break;
            case '1':
                this.style.color = 'red';
                break;
        }
    }
    ;
    console.log(memoSettings);
}
function increaseQuantityValue() {
    var quantity = document.getElementById('quantityValue');
    var newQuantityValue = quantity.textContent;
    var newValue = Number(newQuantityValue);
    if (newValue <= 11) {
        newValue++;
        memoSettings.set(newValue);
        var increasedValue = String(newValue);
        quantity.textContent = increasedValue;
    }
    else
        return null;
}
function decreaseQuantityValue() {
    var quantity = document.getElementById('quantityValue');
    var newQuantityValue = quantity.textContent;
    var newValue = Number(newQuantityValue);
    if (newValue > 4) {
        newValue--;
        memoSettings.set(newValue);
        var increasedValue = String(newValue);
        quantity.textContent = increasedValue;
    }
    else
        return null;
}
function createAndShowQuestion() {
    countsForAnswer = '';
    countsForQuestion = '';
    var questionField = document.getElementById('question');
    var counts = document.getElementById('counts');
    counts.style.visibility = 'hidden';
    if (memoSettings.time === null) {
        questionField.textContent = 'Choose a "Time!"';
        questionField.style.color = 'red';
        setTimeout(function () { questionField.textContent = ''; }, 3000);
    }
    else {
        var answer = document.getElementById('answer');
        answer.textContent = '';
        var quantity = memoSettings.countsQuantity;
        var time = memoSettings.time * 1000;
        for (var i = 0; i < quantity; i++) {
            var count = String(Math.floor(Math.random() * 10));
            countsForQuestion += count;
        }
        ;
        questionField.textContent = countsForQuestion;
        questionField.style.color = 'orange';
        setTimeout(function () {
            questionField.textContent = '';
            counts.style.visibility = 'visible';
        }, time);
    }
    //console.log(this.time);
    //console.log('Counts Quantity: ' + this.countsQuantity);
    console.log(countsForQuestion);
    //console.log(time);
}
function compareCountsCombinations() {
    if (countsForAnswer.length == 0 && countsForQuestion.length == 0) {
        return null;
    }
    var win = document.getElementById('win');
    var fail = document.getElementById('fail');
    var winValue = Number(win.textContent);
    var failValue = Number(fail.textContent);
    var result = (countsForAnswer == countsForQuestion);
    if (result) {
        winValue++;
        var winToWrite = String(winValue);
        win.textContent = winToWrite;
        win.style.color = 'green';
    }
    else {
        failValue++;
        var failToWrite = String(failValue);
        fail.textContent = failToWrite;
        fail.style.color = 'red';
    }
}
RIGHT.addEventListener('click', increaseQuantityValue);
LEFT.addEventListener('click', decreaseQuantityValue);
START.addEventListener('click', createAndShowQuestion.bind(memoSettings));
OK.addEventListener('click', compareCountsCombinations);
