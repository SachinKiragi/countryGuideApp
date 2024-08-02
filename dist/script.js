let url = `https://restcountries.com/v3.1/name/{name}?fullText=true`;

let result = document.getElementById('result');

window.addEventListener('keyup', (e)=>{
    if(e.key=="Enter") getCountry();
})

document.getElementById('btn').addEventListener('click', getCountry);

function getCountry(){

    let country = document.getElementById('input-country').value;
    
    if(country){
        country = country.split(' ').join('');
        showCountryInfo(country);
    }
}

async function showCountryInfo(country){
    let finalUrl = `https://restcountries.com/v3.1/name/${country}?fullText=true`

    try{
        let data = await fetch(finalUrl);
        data = await data.json();
        showResult(data);    
    } catch(e){
        showError();
    }
    


}


function showResult(data){
    result.style.textAlign = "initial";
    let m = data[0].currencies;
    result.innerHTML = `
    
        <!-- Flag image container -->
            <div class="h-[10rem] w-[100%]  flex flex-col justify-center items-center gap-2">
                <img src="${data[0].flags['png']}" alt="" class="h-[6rem] w-[10rem] border-black border-2">
                <h2>${data[0].name.common}</h2>
            </div>

            <!-- #Information -->
            <div class="flex flex-col gap-2">

                    <!-- capital -->
                    <h2 class="font-bold tracking-wide">Capital : <span class="font-normal text-sm">${data[0].capital[0]}</span></h2>

                    <!-- Continent -->
                    <h2 class="font-bold tracking-wide">Continent : <span class="font-normal text-sm">${data[0].continents[0]}</span></h2>

                    <!-- capital -->
                    <h2 class="font-bold tracking-wide">Population : <span class="font-normal text-sm">${data[0].population}</span></h2>

                    <!-- capital -->
                    <h2 class="font-bold tracking-wide">Currenecy : <span class="font-normal text-sm">${Object.keys(m)[0]}, ${m[Object.keys(m)].name}</span></h2>

                    <!-- capital -->
                    <h2 class="font-bold tracking-wide">Common Language : <span class="font-normal text-sm">${Object.values(data[0].languages).toString().split(",").join(", ")}</span></h2>
            </div>

    `
}

function showError(){
    result.style.textAlign = "center";
    result.innerHTML = `
        <h2 id="error"> Couldn't find country </h2>
    `;

   let error =  document.getElementById('error');
    error.style.color = "red";
    error.style.fontSize = "1.5rem"
    error.style.fontWeight = "700"
}