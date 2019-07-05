export function rotateIn(e, a, ...multiTrans) {
    if (!multiTrans.length) e.target.style.transform = `rotate(${a}deg)`;
    console.log(multiTrans);
    if (multiTrans.length) {
        setTimeout(() => {
            multiTrans.forEach((val, index) => {
                e.target.style.transform = `rotate(${multiTrans[index + 1]}deg)`;
            });
        }, multiTrans[0]/(multiTrans.length + 1));
    }
}

export function rotateOut(e, a = 0) {
    e.target.style.transform = `rotate(${a}deg)`;
}