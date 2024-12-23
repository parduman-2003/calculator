let str="";
let arr=[];
let ans;
let k=0;
let parastr="";
let allbtns=document.querySelectorAll(".opnum");
let para=document.querySelector(".para");
let ansbtn=document.querySelector("#ans");
textarea=document.querySelector("textarea");
let div=document.querySelector("#div");
let mod=document.querySelector("#mod");
let sum=document.querySelector("#sum");
let mul=document.querySelector("#mul");
let sub=document.querySelector("#sub");
let enter=document.querySelector("#enter");
let back=document.querySelector("#back");
let delbtn=document.querySelector(".delete-icon");
let dot=document.querySelector("#dot");
for(btn of allbtns)
{
  btn.addEventListener("click", myFunction);
}
function myFunction() { 
  console.log(this.innerText,"is clicekd");
    str=str+this.innerText;
    console.log("str:",str);
    parastr=str;
   textarea.innerText=str;
}
back.addEventListener("click",()=>{
    str=str.slice(0,str.length-1);
    console.log("str:",str);
    textarea.innerText=str;
})
ansbtn.addEventListener("click",()=> {
    str=str+ans;
    console.log("str=",str);
    parastr=str;
    textarea.innerText=str;
   })
  let clear=document.querySelector("#clear");
  clear.addEventListener("click",()=>{
   str="";
   textarea.innerText=str;
   arr=[];
   });
   function deleteChild()
   { 
     let child = para.lastElementChild;
     while (child)
       {
        para.removeChild(child);
        child = para.lastElementChild;
     }
  }
  delbtn.addEventListener("click",()=>
  {
      deleteChild();
  });
function para_data(final_res)
{
let divp=document.createElement("div");
divp.classList.add("divp");
para.prepend(divp);
let pa=document.createElement("p");
divp.appendChild(pa);
pa.classList.add("paclass");
let divp1=document.createElement("div");
divp1.classList.add("divp1");
para.prepend(divp1);
let p1=document.createElement("p");
p1.classList.add("p1");
divp1.appendChild(p1);
pa.innerHTML=`=${final_res}`;
p1.innerHTML=parastr;
}
enter.addEventListener("click",()=>
{ 
    console.log("str:",str);let postfix=[];
  let str2="";
  let j=0;
  let i;
 // parastr=str;
  if(str.slice(-1)!=")")
  {
    str=str+")";
    console.log("string after adding )",str);
    k++;
  }
  for( i=0;i<str.length; i++)
  { 
     str2=str2+str[i];
     console.log("str2:",str2);
     if(str[i]=="-"&&str2.length==1)
        {
         arr[j]=str2;
         j++;
         str2=""; 
        }
    else if(str[i]=="(")
     {
      arr[j]=str2;
      j++;
      str2=""; 
     }
      else if(str[i]==")"){
        arr[j]=parseFloat(str2.slice(0,-1)); 
       arr[++j]=str2.slice(-1);
        arr[++j]=str[i+1];
        j++;
        i++;
        str2=""; 
      }
     else if(str[i]=="+"||str[i]=="-"||str[i]=="*"||str[i]=="/"||str[i]=="%"||str[i]=="^")
     {
       arr[j]=parseFloat(str2.slice(0,-1));
       arr[j+1]=str2.slice(-1);;
       j=j+2;
       str2="";
     }
  }
  if(k==1)
  { 
    arr.pop();
    console.log("after after first pop",arr);
    arr.pop();
    console.log("after after sec pop",arr);
  }
  else
  {
    arr.pop();
    console.log("array after pop in else case:",arr);
  }
  console.log("final array",arr);
 postfix= InfixtoPostfix() ;
console.log("postfix after return to infix to postfix:",postfix);
let final_res=postfix_evaluation(postfix);
console.log("final result:",final_res);
str="";
str=final_res;
textarea.innerText=str;
para_data(final_res);
});
let stackarr = [];
let topp = -1;
function push(e) {
    topp++;
    stackarr[topp] = e;
}
function pop() {
    if (topp == -1)
        return 0;
    else {
        let popped_ele = stackarr[topp];
        topp--;
        return popped_ele;
    }
}
function operator(op) {
    if (op == '+' || op == '-' || 
        op == '^' || op == '*' || 
        op == '/' || op == '(' || 
        op == ')' ||  op=='%') {
        return true;
    }
    else
        return false;
}
function precedency(pre) {
    if (pre == '@' || pre == '(' || pre == ')') {
        return 1;
    }
    else if (pre == '+' || pre == '-') {
        return 2;
    }
    else if (pre == '/' || pre == '*'||pre=='%') {
        return 3;
    }
    else if (pre == '^') {
        return 4;
    }
    else
        return 0;
}
function InfixtoPostfix() {
    let postfix = [];
    let temp = 0;
    push('(');
    for (let i = 0; i < arr.length; i++) {
         let el = arr[i];
        if (operator(el)) {
            if (el == ')') {
                while (stackarr[topp] != "(") {
                    postfix[temp] =pop();
                    temp++;
                }
                pop();
            }
            else if (el == '(') {
                push(el);
            }
            else if (precedency(el) > precedency(stackarr[topp])) {
                push(el);
            }
            else {
                while (precedency(el) <= 
                    precedency(stackarr[topp]) && topp > -1) {
                    postfix[temp++] = pop();
                }
                push(el);
            }
        }
        else {
            postfix[temp++] = el;
        }
    }
    while (stackarr[topp] != '(') {
        postfix[temp++] = pop();
    }
   return postfix;
}
let tops=-1;
let stack=[0];
function operators(op)
{
    if(op=="+"||op=="-"||op=="*"||op=="/"||op=="%"||op=="^")
    {
        console.log("this is ",op,"operator ");
        return 1;
    }
    else
    return 0;
}
function power(a,b)
{    console.log("power function called");
    let i=0;
    let c=1;
    while(i<b)
    {
        c=c*a;
        i++;
    }
    return c;
}
function operation(num1,num2,op)
{  
    console.log("operation function called");
    console.log("num1 and num2 and operator",num1," ",num2," ",op);
    let res=0;
    switch(op)
    {
        case '+':
            console.log("sum perform");
            res=num1+num2;
            console.log("sum:",res);
            break;
            case '-':
                console.log("sub perform");
                res=num1-num2;
                console.log("sub:",res);
                break;
                case '*':
                    console.log("mul perform");
                    res=num1*num2;
                    console.log("mul:",res);
                    break;
                    case '/':
                        console.log("div perform");
                        res=num1/num2;
                        console.log("div:",res);
                        break;
                        case '%':
                            console.log("mod perform");
                            res=num1%num2;
                            console.log("mod:",res);
                            break;
                            case '^':
                                console.log("power perform");
                               res= power(num1,num2);
                                console.log("pow:",res);
                                break;
    }
    return res;
}
function check_operand(e)
{
    if(typeof(e)=="number")
    {  
        console.log("this is ",e,"operand");
        return 1;
    }
    else
    {  
        return 0;
    }
}
function push2(e) {
    console.log("push function called");
    tops++;
    stack[tops] = e;
    console.log("stack after push",stack);
}
function pop2() {
    if (top == -1)
        return 0;
    else {
        console.log("pop function called"); 
        let popped_ele =stack.pop();
        console.log("poped element",popped_ele);
        tops--;
        return popped_ele;
    }
}
function operation_on_one_operand(operand,op)
{   if(op=="-")
{ 
    operand=-operand;
    console.log("negative operand:",operand);
    return operand;
}
else 
{
    return operand;
}
    
}
function postfix_evaluation(expression)
{
    expression.push(")");
    console.log("expression",expression);
   for(let i=0;expression[i]!=")";i++)
   {
      let e=expression[i];
      if(check_operand(e))
      {
        push2(e);
      }
      else if(operators(e))
      {     if(stack.length==1)
            {
                let popped_ele =pop2();
                console.log("stack after pop:",stack);
               let res= operation_on_one_operand(popped_ele,e);
               console.log("res",res);
               push2(res);
               console.log("stack after operation:",stack);
            }
            else
            {
                let popped_ele =pop2();
                console.log("stack after pop1:",stack);
                let popped2_ele =pop2();
                console.log("stack after pop2:",stack);
               let res= operation(popped2_ele,popped_ele,e);
               console.log("res",res);
               push2(res);
               console.log("stack after operation:",stack);
            }
      }
   }
   let final_res=pop2();
  console.log("final result",final_res);
   ans=final_res;
   return final_res;
}