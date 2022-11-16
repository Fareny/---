const arrData = document.querySelectorAll(".cell");
const restartBtn = document.querySelector('.restart');
const winText = document.querySelector('.winText');
const area = document.querySelector('.area');

let arr = [null, null, null, null, null, null, null, null, null]
let stop = false

const concat = (a, b, c) => {
    let result = arr[a] + arr[b] + arr[c]

    if (result === "xxx" || result === "ooo") {
        return result
    }

    switch (result) {
        case "xxnull":
            return ["x", c]

        case "xnullx":
            return ["x", b]

        case "nullxx":
            return ["x", a]

        case "oonull":
            return ["o", c]

        case "onullo":
            return ["o", b]

        case "nulloo":
            return ["o", a]
    }
}

const changeColorAndStop = (a, b, c, howWin) => {
    arrData[a].style.color = "#ff4040"
    arrData[b].style.color = "#ff4040"
    arrData[c].style.color = "#ff4040"

    winText.classList.add('winActive');
    winText.innerHTML = 'Победил: ' + howWin;
    stop = true
}

const checkWin = () => {
    for (let i = 0; i < 3; i++) {
        let result = concat(i, i + 3, i + 6)

        if (result === "xxx") {
            changeColorAndStop(i, i + 3, i + 6, howWin = 'x')
        } else if (result === "ooo") {
            changeColorAndStop(i, i + 3, i + 6, howWin = 'o')
        }
    }

    for (let i = 0; i <= 6; i += 3) {
        let result = concat(i, i + 1, i + 2)

        if (result === "xxx") {
            changeColorAndStop(i, i + 1, i + 2, howWin = 'x')
        } else if (result === "ooo") {
            changeColorAndStop(i, i + 1, i + 2, howWin = 'o')
        }
    }

    result = concat(0, 4, 8)
    if (result === "xxx") {
        changeColorAndStop(0, 4, 8, howWin = 'x')
    } else if (result === "ooo") {
        changeColorAndStop(0, 4, 8, howWin = 'o')
    }

    result = concat(2, 4, 6)
    if (result === "xxx") {
        changeColorAndStop(2, 4, 6, howWin = 'x')
    } else if (result === "ooo") {
        changeColorAndStop(2, 4, 6, howWin = 'o')
    }

    if (!arr.includes(null) && !stop) {
        winText.classList.add('winActive');
        winText.innerHTML = 'Ничья'
        stop = true;
    }
}

const botZero = () => {

    for (let i = 0; i < 3; i++) {
        let result = concat(i, i + 3, i + 6)

        if (typeof (result) === "object" && result[0] === "o") {
            arrData[result[1]].innerHTML = "o"
            arr[result[1]] = "o"
            return
        }
    }

    for (let i = 0; i <= 6; i += 3) {
        let result = concat(i, i + 1, i + 2)

        if (typeof (result) === "object" && result[0] === "o") {
            arrData[result[1]].innerHTML = "o"
            arr[result[1]] = "o"
            return
        }
    }

    result = concat(0, 4, 8)
    if (typeof (result) === "object" && result[0] === "o") {
        arrData[result[1]].innerHTML = "o"
        arr[result[1]] = "o"
        return
    }

    result = concat(2, 4, 6)
    if (typeof (result) === "object" && result[0] === "o") {
        arrData[result[1]].innerHTML = "o"
        arr[result[1]] = "o"
        return
    }

    for (let i = 0; i < 3; i++) {
        let result = concat(i, i + 3, i + 6)

        if (typeof (result) === "object" && result[0] === "x") {
            arrData[result[1]].innerHTML = "o"
            arr[result[1]] = "o"
            return
        }
    }

    for (let i = 0; i <= 6; i += 3) {
        let result = concat(i, i + 1, i + 2)

        if (typeof (result) === "object" && result[0] === "x") {
            arrData[result[1]].innerHTML = "o"
            arr[result[1]] = "o"
            return
        }
    }

    result = concat(0, 4, 8)
    if (typeof (result) === "object" && result[0] === "x") {
        arrData[result[1]].innerHTML = "o"
        arr[result[1]] = "o"
        return
    }

    result = concat(2, 4, 6)
    if (typeof (result) === "object" && result[0] === "x") {
        arrData[result[1]].innerHTML = "o"
        arr[result[1]] = "o"
        return
    }

    let tempArr = []

    for (let i = 0; i < 9; i++) {
        if (arr[i] === null) {
            tempArr.push(i)
        }
    }

    try {
        let randIndexTempArr = Math.floor(Math.random() * tempArr.length)
        let randNull = tempArr[randIndexTempArr]

        arrData[randNull].innerHTML = "o"
        arr[randNull] = "o"
    } catch (e) { }
}

area.addEventListener("click", (event) => {
    if (stop === true) { return }

    if (event.target.textContent !== "") {
        winText.classList.add('winActive');
        winText.innerHTML = 'Эта ячейка занята!';
    } else {
        winText.classList.remove('winActive');
    }

    if (event.target.className === "cell" && event.target.textContent === "") {
        event.target.style.color = '#f5f5dc';
        event.target.innerHTML = "x";

        arr[event.target.dataset.num] = "x";
    } else {
        return
    }

    checkWin()

    if (stop === true) { return }

    botZero();

    checkWin();
})

restartBtn.addEventListener("click", () => {
    arr = [null, null, null, null, null, null, null, null, null];
    for (let i = 0; i < arrData.length; i++) {
        arrData[i].innerHTML = '';
        arrData[i].style.color = '#f5f5dc';
    }
    winText.classList.remove('winActive');
    stop = false;
});
