function buyCoke() {
    if (cokesInStore > 0) { //we can buy something! 
        if (valueFromCoinCounts(coinsInserted) >= 25 ) { //cola price == 25, and coins inserted sum should be 25+
            removeInsertedCoinsLogic();
            cokesInStore--;
            isCokeInDelivery = true;
            updateView();
        }
    }
}

function insertCoin(value) {
    // let index
    // if value === 5, index = 1
    // 1 , 5 , 10 , 20
    let coinIndex;
    if (value == 1) {
        coinIndex = 0;
    }
    else if (value == 5) {
        coinIndex = 1;
    }
    else if (value == 10) {
        coinIndex = 2;
    }
    else if (value == 20) {
        coinIndex = 3;
    }
    coinsInserted[coinIndex]++;
    updateView();
}

function returnCoins() {
    coinsReturned = [...coinsInserted];
    coinsInserted = [0, 0, 0, 0];
    updateView();
}

function takeCoins() {
    coinsReturned = [0, 0, 0, 0];
    updateView();
}

function removeInsertedCoinsLogic() {
    let temporaryInsertedCoins = [...coinsInserted];
    let temporaryMachineCoins = [...coinsInMachine];

    let priceOfCola = 25;
    let sumOfCoins = valueFromCoinCounts(temporaryInsertedCoins); 
    let change = sumOfCoins - priceOfCola; 

    temporaryInsertedCoins = proceedMoneyInAnyArray(temporaryInsertedCoins, priceOfCola, temporaryMachineCoins);
    temporaryMachineCoins = proceedMoneyInAnyArray(temporaryMachineCoins, change - (valueFromCoinCounts(temporaryInsertedCoins)), temporaryInsertedCoins); //change minus what is left in the insertedCoins. 
    //coins returned
    coinsReturned = [...temporaryInsertedCoins]; 
    coinsInserted = [0,0,0,0]; // - I like it when the change goes back to the machine instead of spilling out somewhere. Maybe I want another bottle of cola?!
    coinsInMachine = [...temporaryMachineCoins]; 
}
    //arrayFrom = coinsInserted || coinsInMachine. arrayTo - vice versa
function proceedMoneyInAnyArray(arrayFrom, amountOfmoneyToProceed, arrayTo) {
    
    while (amountOfmoneyToProceed > 0) {
        console.log(amountOfmoneyToProceed)
        //taking max at the moment. 
        if (amountOfmoneyToProceed >= 20 && arrayFrom[3] > 0)  { //20
            arrayFrom[3]--;
            arrayTo[3]++; 
            amountOfmoneyToProceed -= coinValueFromIndex(3);
        }
        else if (amountOfmoneyToProceed >= 10 && arrayFrom[2] > 0) { //10
            arrayFrom[2]--;
            arrayTo[2]++; 
            amountOfmoneyToProceed -= coinValueFromIndex(2);
        }
        else if (amountOfmoneyToProceed >= 5 && arrayFrom[1] > 0) { //5
            arrayFrom[1]--;
            arrayTo[1]++; 
            amountOfmoneyToProceed -= coinValueFromIndex(1);
        }
        else if (amountOfmoneyToProceed >= 1 && arrayFrom[0] > 0) { //1
            arrayFrom[0]--;
            arrayTo[0]++; 
            amountOfmoneyToProceed -= coinValueFromIndex(0);
        }
        //if we didn't take anything, but still have some coins - let's take them! 
        //here we have probably a bug - if there are no coins in machine, that passes, it would give back the max available. 
        else if ( amountOfmoneyToProceed > 0 && (arrayFrom[3]> 0 || arrayFrom[2] > 0 || arrayFrom[1] > 0 || arrayFrom[0] > 0 )){
            let availableCoin = getIndexWithCoin(arrayFrom); 
            arrayFrom[availableCoin]--;
            arrayTo[availableCoin]++
            amountOfmoneyToProceed -= coinValueFromIndex(availableCoin);
        }
    }
    return arrayFrom; 
}
function getIndexWithCoin(arr){
    //from biggest to lowest
    for (let i = arr.length - 1; i > 0; i--){
        if (arr[i] != 0 ){
            return[i]
        }
    }
}

function takeCoke(){
    console.log(isCokeInDelivery);
    isCokeInDelivery = false; 
    updateView();
}