const trigger = true;

//Promise
const isOutcome = new Promise(
    function (resolve, reject) {
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
        });


const showOff = function (obj) {
    const res =  "That\'s what we\'ve got: " + obj.pr1 + ' ' + obj.pr2;
    return Promise.resolve(res);
}

const checkOutcome = function() {
    isOutcome
    .then(showOff)
    .then(fulfilled => console.log(fulfilled))
    .catch(error => console.log(error.message))
};

checkOutcome();

