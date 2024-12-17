const sleep = () => new Promise((resolve, reject) => setTimeout(resolve, 2000))




// console.log("start")

sleep().then(() => {
  sleep().then(() => {
    sleep().then(() => {

    })
  })
  console.log("Hello")
}).catch(() => {
  console.log("Catch")
})


const usingAsyncCode = async () => {

  console.log("Start")
  await sleep()
  await sleep()
  await sleep()
  console.log("End")
}

// console.log("end")


usingAsyncCode()