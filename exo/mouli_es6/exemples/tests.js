

// Array Structuration
let array = [1, 2, 3,];

// Array Copy
let arrayCopy = [...array, 4, 5]

// Array destructuration
let [first, second] = array


// Obj structuration
let obj = {
  message: "Hello world",
  code: 201
}

// Obj copy
let objCopy = {
  ...obj,
  code: 404,
}


function varTest() {
  var x = 1
  if (true) {
    var x = 2
    console.log(x) // 2
  }
  console.log(x) // 2
}

function varTest() {
  let x = 1
  if (true) {
    let x = 2
    console.log(x) // 2
  }
  console.log(x) // 1
}


// From this
function foo() {
  console.log("foo")
}

// To this
const bar = () => { console.log("bar") }
const bar2 = () => console.log("bar 2")
const bar3 = name => console.log("Name : ", name)


// 
const foreachArray = [1, 2, 3, 4];


//  from
// for (let i = 0; i < foreachArray.length; i++) {
//   const element = foreachArray[i];
//   console.log(element)
// }


// array . map, filter, reduce, forEach ...

// foreachArray.map((value) => {
//   console.log(value)
// })


// 


const user = {
  name: "Jhon",
  age: 48,
  role: {
    isAdmin: true
  }
}

// console.log(user?.role?.isAdmin)
// console.log(user.roles.isAdmin ) // type error
// console.log(user?.roles?.isAdmin ) // undefined


const firstname = "Jhon"
const lastname = "Doe"

// const fullname = 'Name : "' + firstname + " " + lastname + "\""
const fullname = `Name : "${firstname} ${lastname}"`



const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))



const sync = () => {
  console.log("start")
  sleep(3000)
  console.log("end")
}

const asyncFunction = async () => {
  console.log("start")
  await sleep(3000)
  console.log("end")
}

const asyncFunction2 = () => {
  console.log("start")
  sleep(3000).then(() => {
    console.log("resolved")
  })
  console.log("end")
}

// asyncFunction2()



const myPromise = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const randomNumber = Math.random()
      if (randomNumber > 0.001) {
        resolve(randomNumber)
      } else {
        reject(new Error("Une erreur s'est produite"))
      }
    }, 1000)

  })
}

const usePromise = () => {

  myPromise().then((value) => {
    console.log("Resolved : " + value)
  }).catch((err) => {
    console.log(err.message)
  })

}


const useSleep = async () => {

  const [res1, res2, res3] = await Promise.all([
    myPromise(),
    myPromise(),
    myPromise(),
  ])

  console.log(res1, res2, res3)
}

useSleep()


// usePromise()




