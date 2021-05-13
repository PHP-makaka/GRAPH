const $canvas = document.getElementById("container-graph")
const ctx = $canvas.getContext('2d');
const $submitValue = document.getElementById("submit")
const arr_XY = document.getElementById('value_X_Y')


$submitValue.addEventListener("click", drowGraphCheck)

let maxValue = 500;
let maxValueX = 0;
let maxValueY = 0;

// let arr122 = [[0.50, 0.200], [-0.100,-0.140],[0.1,0.1]]


function centerOrdinat(arr) {

    let minX = {zn: NaN, mod: 0, rez: 250}
    let minY = {zn: NaN, mod: 0, rez: 250}

    let arrX = [];
    let arrY = [];

    for (let i = 0; i <= 1; i++) {
        arr.map(el => {
            if (i == 0) {
                arrX.push(el[i])
            } else if (i == 1) {
                arrY.push(el[i])
            }
        })
    }

    let miN__X = Math.min.apply(null, arrX)
    let max__X = Math.max.apply(null, arrX)

    let miN__Y = Math.min.apply(null, arrY)
    let max__Y = Math.max.apply(null, arrY)
    let byl = {
        x: '',
        y: '',
    }
    arrX.map(el => {
        if (el > 0) {
            return byl.x += "+"
        } else {
            byl.x += "-"
        }
    })
    arrY.map(el => {
        if (el > 0) {
            return byl.y += "+"
        } else {
            byl.y += "-"
        }
    })

    let sttObj = {
        plusX: byl.x.indexOf("-") < 0,
        plusY: byl.y.indexOf("-") < 0,
        minusX: byl.x.indexOf("+") < 0,
        minusY: byl.y.indexOf("+") < 0,
    }


    if (Math.abs(miN__X) > Math.abs(max__X)) {
        minX.rez = max__X
    } else {
        minX.rez = miN__X
    }

    if (Math.abs(miN__Y) > Math.abs(max__Y)) {
        minY.rez = max__Y
    } else {
        minY.rez = miN__Y
    }

    if ((Math.abs(max__X) + Math.abs(miN__X)) > (Math.abs(miN__Y) + Math.abs(max__Y))) {
        maxValue = Math.abs(max__X - miN__X)
    } else {
        maxValue = Math.abs(miN__Y - max__Y)
    }

    maxValueX = Math.abs(max__X) + Math.abs(miN__X)
    maxValueY = Math.abs(miN__Y) + Math.abs(max__Y)

    let koeffGrafX = 500 / (maxValueX)

    let koeffGrafY = 500 / (maxValueY)

    let coordZeroX = koeffGrafX * minX.rez
    let coordZeroY = koeffGrafY * minY.rez


    // console.log(maxValueX, maxValueY)


    let koeffGraf

    koeffGraf = (maxValue) / 500

    // console.log(koeffGraf)

    drowCoord(arr, minX, minY, koeffGraf, koeffGrafX, koeffGrafY, coordZeroX, coordZeroY, sttObj)
    return minX, minY
}

function drowCoord(arr, minX, minY, koeffGraf, koeffGrafX, koeffGrafY, coordZeroX, coordZeroY, sttObj) {
//// y-coordinat
//     yPx = Math.abs(Math.abs(minY.rez * koeffGrafY));
    yPx = 250;
    xPx = 250;
    // xPx = Math.abs(Math.abs(minX.rez * koeffGrafX));

    /// рисую ось y относительно нуля оси х (если имеется+- значения)
    ctx.strokeStyle = "red";

    if (!sttObj.plusX && !sttObj.minusX && coordZeroX > 0) {
        ctx.moveTo(500 - Math.abs(coordZeroX), 0);
        ctx.lineTo(500 - Math.abs(coordZeroX), 0);
        ctx.lineTo(500 - Math.abs(coordZeroX), $canvas.width);
        coordZeroX = 500 - Math.abs(coordZeroX);

        // ctx.lineTo(yPx, 0);

        // ctx.lineTo(yPx, $canvas.width);
    } else if (!sttObj.plusX && !sttObj.minusX && coordZeroX < 0) {
        ctx.moveTo(Math.abs(coordZeroX), 0);
        ctx.lineTo(Math.abs(coordZeroX), 0);
        ctx.lineTo(Math.abs(coordZeroX), $canvas.width);
        coordZeroX = Math.abs(coordZeroX)
        // ctx.lineTo(yPx, 0);
        // ctx.lineTo(yPx, $canvas.width);
    } else if (sttObj.plusX) {
        ctx.moveTo(1, 0);
        ctx.lineTo(1, 0);
        ctx.lineTo(1, $canvas.width);
        coordZeroX = Math.abs(coordZeroX)
        console.log("x vse ++")

    } else if (sttObj.minusX) {
        ctx.moveTo(499, 0);
        ctx.lineTo(499, 0);
        ctx.lineTo(499, $canvas.width);
        coordZeroX = 500 - Math.abs(coordZeroX)
        console.log("x vse --")

    }

    // ctx.lineTo($canvas.height / 2 - 5, $canvas.width - 20);
    // ctx.lineTo($canvas.height / 2 + 5, $canvas.width - 20);
    // ctx.lineTo($canvas.height / 2, $canvas.width);


    /// рисую ось x относительно нуля оси y (если имеется+- значения)

    if (!sttObj.plusY && !sttObj.minusY && coordZeroY > 0) {
        ctx.moveTo(0, Math.abs(coordZeroY));
        ctx.lineTo(0, Math.abs(coordZeroY));
        ctx.lineTo($canvas.height, Math.abs(coordZeroY));

        coordZeroY = Math.abs(coordZeroY)
    } else if (!sttObj.plusY && !sttObj.minusY && coordZeroY < 0) {
        ctx.moveTo(0, 500 - Math.abs(coordZeroY));

        // for (let i =0 ;i<500;){
        //     ctx.lineTo(i, 500-Math.abs(coordZeroY));
        //     ctx.lineTo(i, 500-Math.abs(coordZeroY)+5);
        //     ctx.lineTo(i, 500-Math.abs(coordZeroY));
        //     i+=Math.abs(koeffGraf/minX.rez)+10
        // }
        ctx.lineTo(0, 500 - Math.abs(coordZeroY));
        ctx.lineTo($canvas.height, 500 - Math.abs(coordZeroY));
        coordZeroY = 500 - Math.abs(coordZeroY)
    } else if (sttObj.plusY) {
        ctx.moveTo(0, 499);

        ctx.lineTo(0, 499);
        ctx.lineTo($canvas.height, 499);
        coordZeroY = 500 - Math.abs(coordZeroY)

        console.log(" y vse ++")
    } else if (sttObj.minusY) {
        ctx.moveTo(0, 1);

        ctx.lineTo(0, 1);
        ctx.lineTo($canvas.height, 1);

        coordZeroY = Math.abs(coordZeroY)

        console.log("y vse --")
    }


    ctx.stroke();
    ctx.strokeStyle = "black";

    maxEvalGraph(arr, xPx, yPx, koeffGraf, koeffGrafX, koeffGrafY, coordZeroX, coordZeroY)
}

function point(x, y) {
    ctx.beginPath()
    ctx.moveTo(x, y);
    ctx.arc(x, y, 5, 0, Math.PI * 2,);
    ctx.strokeStyle = "blue";
    ctx.fill()
    ctx.stroke();
    ctx.strokeStyle = "black";


}


function maxEvalGraph(arr, xPx, yPx, koeffGraf, koeffGrafX, koeffGrafY, coordZeroX, coordZeroY) {
    coordZeroY = Math.ceil((coordZeroY) * 1000) / 1000
    coordZeroX = Math.ceil((coordZeroX) * 1000) / 1000
    arr.map(el => {
        el.map((num, ind) => {
/////////// 0 для значения х
            if (ind == 0) {
                if (num < 0) {
                    el[ind] = Math.abs(Math.abs((num * koeffGrafX)) - Math.abs(coordZeroX));
                    return
                } else if (num >= 0) {
                    el[ind] = (num * koeffGrafX) + coordZeroX
                    return;
                }
            } else if (ind == 1) { /////////// 1 для значения у
                if (num < 0) {
                    el[ind] = Math.abs(Math.abs((num * koeffGrafY)) + Math.abs(coordZeroY));
                    return
                } else if (num >= 0) {
                    el[ind] = (num * koeffGrafY) - coordZeroY
                    return;
                }
            }

        })
    })
    // console.log(arr)

    arr.map(el => {
        point(Math.floor(Math.abs(el[0])), Math.floor(Math.abs(el[1])))
    })
}


function drowGraphCheck(e) {

    ctx.clearRect(0, 0, $canvas.width, $canvas.height)

    maxValue = 250
    let arrNum = arr_XY.value.split('\n')
    console.log(arrNum, "asdsa1111111111", "")
    let arrNum1= []
    arrNum = arrNum.map((el, indx) => {
        if (!el) {
            return
        } else arrNum1.push(el.trim().split(' '))
    });

    arrNum1.filter(el => {
        if (el==undefined) {
            return;
        } else {
            el.map((num, ind) => {
                return    el[ind] = Number(el[ind].replace(',', '.'))

                if (Math.abs(el[ind]) > maxValue) {
                    maxValue = Math.abs(el[ind]);
                }
                // console.log(maxValue, arrNum)
            })
        }
    })
    console.log(arrNum, "asdsa1111111111")
    centerOrdinat(arrNum1)

}
