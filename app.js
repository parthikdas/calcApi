const http = require('http')

let history = []

function parse(str) {
    return Function(`'use strict'; return (${str})`)();
}

http.createServer(function(req, res) {
    if(req.url === '/') {
        const demo = [
            {
                getReq:"1/plus/2/minus/3",
                question : "1+2-3",
                answer : "0"
            },
            {
                getReq:"2/into/2/divide/2",
                question : "2*2/2",
                answer : "2"
            },
            {
                getReq:"2/mod/1",
                question : "2%1",
                answer : "0"
            },
            {
                getReq:"2/divide",
                question : "2/1",
                answer : "1"
            }
            ,
            {
                getReq:"2/mod",
                question : "2%1",
                answer : "0"
            },
            {
                getReq:"2/exp/2",
                question : "2**2",
                answer : "4"
            }
            ,
            {
                getReq:"3/and/1",
                question : "3&&1",
                answer : "1"
            }
            ,
            {
                getReq:"3/or/1",
                question : "3||1",
                answer : "3"
            }
        ]
        res.writeHead(200, {"Content-Type": "text/plain"})
        res.write(JSON.stringify(demo))
        res.end()
    } else if(req.url === '/history') {
        console.log(history.length)
        res.writeHead(200, {"Content-Type": "text/plain"})
        res.write(JSON.stringify(history))
        res.end()
    } else if(req.url[1]>'0' && req.url[1]<'9'){ // check for number i.e. math exp
        let arr = req.url.split("/") // Split the string
        for(let i=0;i<arr.length;i++) {
            if(arr[i] === 'plus') arr[i] = '+'
            else if(arr[i] === 'minus') arr[i] = '-'
            else if(arr[i] === 'into') arr[i] = '*'
            else if(arr[i] === 'divide') arr[i] = '/'
            else if(arr[i] === 'mod') arr[i] = '%'
            else if(arr[i] === 'exp') arr[i] = '**'
            else if(arr[i] === 'and') arr[i] = '&&'
            else if(arr[i] === 'or') arr[i] = '||'
            // Exception if user does not gives the next number after operator
            if(!arr[i+1]) { // If operator is last index
                if(arr[i] === '+' || arr[i] === '-' || arr[i] === '||') arr.push('0')
                else if(arr[i] === '*' || arr[i] === '/' || arr[i] === '%' || arr[i] === '**' || arr[i] === '&&') arr.push(1)
            }
        }
        arr = arr.join("") // Join it without space
        let response = {question: arr, answer: parse(arr)}
        res.writeHead(200, {"Content-Type": "text/plain"})
        res.write(JSON.stringify(response))

        // Show the date also
        response.time= new Date()
        history.unshift(response) // Add the new response in 1st position
        if(history.length > 20) history.shift() // If exceeding 20 size remove last 20th index

        res.end()
    }

}).listen(3000, console.log('http://localhost:3000'))