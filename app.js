/* new changes
 - put it in projects folder
 - testing with jest or mocha
//https://www.testim.io/blog/jest-testing-a-helpful-introductory-tutorial/
https://www.testim.io/blog/node-js-unit-testing-get-started-quickly-with-examples/
*/


const http = require('http')
const fs = require('fs');
const { dirname } = require('path');

let history = []

function parse(str) {
    return Function(`'use strict'; return (${str})`)();
}

http.createServer(function(req, res) {
    if(req.url === '/') {
        // Fetch data from history.txt
        try {
            history = fs.readFileSync(__dirname + '/history.txt', 'utf8');
            history = JSON.parse(history)
        } catch (err) {
            console.error(err);
        }

        // demo response i.e. examples
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
            },
            {
                getReq:"2/mod",
                question : "2%1",
                answer : "0"
            },
            {
                getReq:"2/exp/2",
                question : "2**2",
                answer : "4"
            },
            {
                getReq:"3/and/1",
                question : "3&&1",
                answer : "1"
            },
            {
                getReq:"3/or/1",
                question : "3||1",
                answer : "3"
            },
            {
                getReq:"3/inc",
                question : "3+1",
                answer : "4"
            },
            {
                getReq:"3/dec/",
                question : "3-1",
                answer : "2"
            },
            {
                getReq:"1/inc/plus/2/divide/2",
                question : "1+1+2/2",
                answer : "3"
            }
        ]
        res.writeHead(200, {"Content-Type": "text/plain"})
        res.write(JSON.stringify(demo))
        res.end()
    } else if(req.url === '/history') {
        // console.log(history.length)
        try {
            history = fs.readFileSync(__dirname + '/history.txt', 'utf8');
            history = JSON.parse(history)
        } catch (err) {
            console.error(err);
        }
        res.writeHead(200, {"Content-Type": "text/plain"})
        res.write(JSON.stringify(history))
        res.end()
    } else if(req.url[1]>'0' && req.url[1]<'9'){ // check for number i.e. math exp
        let arr = req.url.split("/") // Split the string
        console.log(arr)
        for(let i=0;i<arr.length;i++) {
            if(arr[i] === 'plus') arr[i] = '+'
            else if(arr[i] === 'minus') arr[i] = '-'
            else if(arr[i] === 'into') arr[i] = '*'
            else if(arr[i] === 'divide') arr[i] = '/'
            else if(arr[i] === 'mod') arr[i] = '%'
            else if(arr[i] === 'exp') arr[i] = '**'
            else if(arr[i] === 'and') arr[i] = '&&'
            else if(arr[i] === 'or') arr[i] = '||'
            else if(arr[i] === 'inc') {
                arr[i] = '+'
                if(arr[i+1]) arr.splice(i+1,0,'1')  // If after inc or dec there is more arguments then add 1 after -
                else arr[i+1]='1' // Else push next val as 1
            }
            else if(arr[i] === 'dec') {
                arr[i] = '-'
                if(arr[i+1]) arr.splice(i+1,0,'1')  // If after inc or dec there is more arguments then add 1 after -
                else arr[i+1]='1' // Else push next val as 1
            }
            // Exception if user does not gives the next number after operator
            if(!arr[i+1]) { // If operator is last index
                if(arr[i] === '+' || arr[i] === '-' || arr[i] === '||') arr.push('0')
                else if(arr[i] === '*' || arr[i] === '/' || arr[i] === '%' || arr[i] === '**' || arr[i] === '&&') arr.push(1)
            }
        }
        arr = arr.join("") // Join it without space
        let response = {question: arr, answer: parse(arr)}

        // send response
        res.writeHead(200, {"Content-Type": "text/plain"})
        res.write(JSON.stringify(response))

        // Show the date also
        response.time= new Date()
        history.unshift(response) // Add the new response in 1st position
        if(history.length > 20) history.pop() // If exceeding 20 size remove last 20th index

        // update history.txt
        fs.writeFileSync(__dirname + '/history.txt', JSON.stringify(history), err => {
            if (err) {
                console.error(err);
            }            
        })
        res.end()
    }

}).listen(3000, console.log('http://localhost:3000'))