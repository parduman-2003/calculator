let str = "", arr = [], ans, parastr = "";
const allbtns = document.querySelectorAll(".opnum"),
      para = document.querySelector(".para"),
      ansbtn = document.querySelector("#ans"),
      textarea = document.querySelector("textarea"),
      enter = document.querySelector("#enter"),
      back = document.querySelector("#back"),
      delbtn = document.querySelector(".delete-icon"),
      clear = document.querySelector("#clear");

allbtns.forEach(btn => btn.addEventListener("click", () => {
    str += btn.innerText;
    parastr = str;
    textarea.innerText = str;
}));

back.addEventListener("click", () => {
    str = str.slice(0, -1);
    textarea.innerText = str;
});

ansbtn.addEventListener("click", () => {
    str += ans;
    parastr = str;
    textarea.innerText = str;
});

clear.addEventListener("click", () => {
    str = "";
    textarea.innerText = "";
    arr = [];
});

delbtn.addEventListener("click", () => {
    while (para.lastChild) {
        para.removeChild(para.lastChild);
    }
});

function para_data(final_res) {
    let divp = document.createElement("div");
    divp.classList.add("divp");
    para.prepend(divp);
    let pa = document.createElement("p");
    pa.classList.add("paclass");
    pa.innerHTML = `=${final_res}`;
    divp.appendChild(pa);
    let divp1 = document.createElement("div");
    divp1.classList.add("divp1");
    para.prepend(divp1);
    let p1 = document.createElement("p");
    p1.classList.add("p1");
    p1.innerHTML = parastr;
    divp1.appendChild(p1);
}

enter.addEventListener("click", () => {
    if (!str.endsWith(")")) str += ")";
    arr = tokenize(str);
    let postfix = InfixtoPostfix();
    let final_res = postfix_evaluation(postfix);
    str = final_res;
    textarea.innerText = str;
    para_data(final_res);
});

function tokenize(expression) {
    let tokens = [], temp = "";
    for (let char of expression) {
        if ("+-*/%^()".includes(char)) {
            if (temp) tokens.push(parseFloat(temp));
            tokens.push(char);
            temp = "";
        } else {
            temp += char;
        }
    }
    return tokens;
}

let stackarr = [];
function push(e) { stackarr.push(e); }
function pop() { return stackarr.pop(); }

function precedency(op) {
    return { "^": 4, "*": 3, "/": 3, "%": 3, "+": 2, "-": 2, "(": 1 }[op] || 0;
}

function InfixtoPostfix() {
    let postfix = [], stack = [];
    for (let token of arr) {
        if (typeof token === "number") {
            postfix.push(token);
        } else if (token === "(") {
            stack.push(token);
        } else if (token === ")") {
            while (stack.length && stack[stack.length - 1] !== "(") {
                postfix.push(stack.pop());
            }
            stack.pop();
        } else {
            while (stack.length && precedency(token) <= precedency(stack[stack.length - 1])) {
                postfix.push(stack.pop());
            }
            stack.push(token);
        }
    }
    return postfix.concat(stack.reverse());
}

function postfix_evaluation(expression) {
    let stack = [];
    for (let token of expression) {
        if (typeof token === "number") {
            stack.push(token);
        } else {
            let b = stack.pop(), a = stack.pop();
            stack.push(perform_operation(a, b, token));
        }
    }
    ans = stack[0];
    return stack[0];
}

function perform_operation(a, b, op) {
    return { "+": a + b, "-": a - b, "*": a * b, "/": a / b, "%": a % b, "^": Math.pow(a, b) }[op];
}
