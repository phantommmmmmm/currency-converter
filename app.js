// console.log("hello");
const base_Url="https://2024-03-06.currency-api.pages.dev/v1/currencies/";
//const base_Url="https://2024-03-06.currency-api.pages.dev/v1/currencies/inr.json";

//const dropdown=document.getElementsByClassName("dropdown select");
const dropdown=document.querySelectorAll(".dropdown select");
const formFlag=document.getElementById("fromImg");
const toFlag=document.getElementById("toImg");
const btn=document.getElementById("btn");
const message=document.getElementById("msg");

// for (code in countryList){
//     console.log(code,countryList[code]);
// }

for(let select of dropdown){
    for(let currCode in countryList){
        let newoption=document.createElement("option");
        newoption.innerText=currCode;
        newoption.value=currCode;
        select.append(newoption);

        if(select.name==="from" && newoption.value==="USD"){
            newoption.selected="selected";
            select.addEventListener("change",updateflag1.bind(select));
        }
        else if(select.name==="to" && newoption.value==="INR"){
            newoption.selected="selectet";
            select.addEventListener("change",updateflag2.bind(select));
        } 
    }
}
let currencyCodeFrom="usd";
let currencyCodeTo="inr";
function updateflag1(element){ // this.value will be used for conversion
    // console.log(this.value); 
    let currencyCode=countryList[this.value];
    // console.log(currencyCode);
    formFlag.src="https://flagsapi.com/" + currencyCode +"/shiny/64.png";
    currencyCodeFrom=this.value.toLowerCase();
    // console.log(currencyCodeFrom);
}

function updateflag2(element){
    // console.log(this.value);
    let currencyCode=countryList[this.value];
    // console.log(currencyCode);
    toFlag.src="https://flagsapi.com/" +currencyCode +"/shiny/64.png";
    currencyCodeTo=this.value.toLowerCase();
    // console.log(currencyCodeTo);
}
btn.addEventListener("click",async function(event){
    event.preventDefault();
    // console.log("clicked");
    let amount=document.querySelector(".amount input");
    // console.log(amount.value);
    if(amount.value <=0){alert("Please write an amount greater then 0");}

    let URL=base_Url + currencyCodeFrom + ".json";
    // console.log(URL);
    let resposne=await fetch(URL);
    let data= await resposne.json();
    // console.log(data[currencyCodeFrom][currencyCodeTo]);

    message.innerHTML= amount.value +" "+currencyCodeFrom.toUpperCase() + " = " + (amount.value)*(data[currencyCodeFrom][currencyCodeTo]) +" "+ currencyCodeTo.toUpperCase();
    
});


    