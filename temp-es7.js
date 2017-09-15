/* ES7 */

const trigger = true;

//Promise

const isOutcome = new Promise(
     (resolve, reject) => {
        if (trigger) {
            const obj = {
                pr1: 'Val1',
                pr2: 'Val2'
            };
            resolve(obj); //fulfilled
            } else {
                const reason = new Error('no condition');
                reject(reason); //reject
            }
        }
    );

//2nd promise

async function showOff(obj) {
     return new Promise(
         (reslove, reject) => {
            var res =  "That\'s what we\'ve got: " + obj.pr1 + ' ' + obj.pr2;
            resolve(message);
         }
     )
}

//promise call

async function checkOutcome() {
    try {
        console.log('Before');

        let obj = await isOutcome;
        let message = await showOff(obj);

        console.log(message);
        console.log('after');
    }
    catch(error){
        console.log(error.message)
    }
};

(async() => {await checkOutcome()})();