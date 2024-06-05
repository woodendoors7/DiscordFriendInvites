/*
    DiscordFriendInvites 1.1.0
    by woodendoors7
*/


var html = `
    <div id="mainWindow">
        <div id="header"><div id="closeBtn" aria-label="Dismiss" role="button" tabindex="0"><svg aria-hidden="true" role="img" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"></path></svg></div>DiscordFriendInvites<br>by woodendoors7<br></div>
        <div class="toDisable">
        <div class="dividing">
            <p class="sectionTitle">
                Create Invite
            </p>
            <button class="sectionButton" id="runCreate">Do It</button>
        </div>
    
        <div class="dividing">
            <p class="sectionTitle">
                View Invite
            </p>
            <select name="Select Invite" id="selectInvite">
    
              </select>
    
            <button class="sectionButton" id="runInfo">View Info</button>
        </div>
        </div>
        <div onClick="this.select();" disabled type="text" class="textOutput" id="outputCreate"><b style="margin-top: 5px; margin-bottom:5px; display: block;">Welcome!</b></div>
            <div class="toDisable" id="reappear">
                <button style="margin-left: 32%; margin-top: 10px;" class="sectionButton" id="runDelete">Delete All Invites</button>
            </div>
                <a href="https://github.com/woodendoors7/DiscordFriendInvites" target="_blank"><img style="margin-top: 10px; width: 250px;" src="https://images-ext-1.discordapp.net/external/2ISttgvfeo5oa4XaRdSTZJoo6F1Z3UqpRFiWCugQQJs/https/papers.floppa.hair/mcstatuspinger/pleasestar.png"></a>
        </div>`

var css = `
    #mainWindow {
        position: absolute;
        z-index: 9;
        background-color:  #2F3136;
        border: 1px solid #3f4147;
        color: white;
        text-align: center;
        height: 270px;
        width: 400px;
        z-index: 1000;
        border-radius: 12px;
        font-family: var(--font-primary);
    }

    #reappear{
        display: none;
    }

    #closeBtn{
        width: 30px;
        cursor: pointer !important;
        float:right;
    }

    .toDisable{
        opacity:0.4;
        pointer-events: none;
    }

    #header {
        padding: 10px;
        cursor: move;
        z-index: 10;
        background-color: #5865f2;
        color: #ffe8e9;
        user-select: none;
        font-weight: bold;
        border-top-left-radius:12px;
        border-top-right-radius: 12px;

    }
    
    .dividing {
        background-color: #2F3136;
        width: 100%;
        height: 50px;
        text-align: left;
        vertical-align: middle;
        white-space: nowrap;
        line-height: 50px;
    }
    
    .sectionTitle {
        vertical-align: middle;
        margin: 0px;
        font-size: 18px;
        margin-left: 15px;
    }
    
    .sectionButton {
        vertical-align: middle;
        margin-top: auto;
        margin-bottom: auto;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        background: none;
        border: none;
        border-radius: 3px;
        font-size: 14px;
        font-weight: 500;
        line-height: 16px;
        padding: 2px 16px;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
        transition: background-color 170ms ease,color 170ms ease;
        color: var(--white-500);
        background-color: var(--button-secondary-background);
            width: var(--custom-button-button-sm-width);
            height: var(--custom-button-button-sm-height);
            min-width: var(--custom-button-button-sm-width);
            min-height: var(--custom-button-button-sm-height);
            width: auto !important;
    }

    .sectionButton:hover{
        background-color: var(--button-secondary-background-hover);
        color: var(--white-500);
    }

    .dividing * {
        display: inline;
    }
    
    .textOutput {
        max-width: 93%;
        min-height: 16px;
        cursor: text;
        margin-left: 10px;
        user-select: all;
        padding: 3px;
        text-align: center;
        margin-left: 10px;
        background-color: #1e1f22;
    }`

if (document.readyState === "complete") {
    inject()
}

var outputCreate
var selectInvite;
var token;
var div;
var closeBtn;

async function inject() {
    let doThis = document.createElement("div")
    doThis.innerHTML = html;
    doThis.innerHTML += `\n\n<style>${css}</style>`
    document.body.appendChild(doThis)

    div = document.getElementById('mainWindow');

    div.style.top = "100px";
    div.style.left = "100px";


    window.addEventListener('mousemove', divMove, true);
    document.getElementById('header').addEventListener('mousedown', mouseDown, false);
    window.addEventListener('mouseup', mouseUp, false);


    document.getElementById("runCreate").addEventListener("click", createElement)
    document.getElementById("runInfo").addEventListener("click", checkTheInfo)
    document.getElementById("runDelete").addEventListener("click", deleteInvites)

    closeBtn = document.getElementById("closeBtn")
    outputCreate = document.getElementById("outputCreate")
    selectInvite = document.getElementById("selectInvite")
    expireAfterCreate = document.getElementById("expireAfterCreate")
    maxUsesCreate = document.getElementById("maxUsesCreate")

    closeBtn.addEventListener("click", uninject)

    token = await getToken();
    console.log("Got token!")
    document.querySelector("#reappear").style = "display:block;"

    let enableIt = document.querySelectorAll('.toDisable');

    enableIt.forEach(element => {
        element.style.opacity = "1"
        element.style.pointerEvents = "auto"
    });

    outputCreate.innerHTML = `<b style="margin-top: 5px; margin-bottom: 5px; display: block;">Welcome!</b>`

    fetchInvites(false);
}



async function createElement() {
    outputCreate.innerHTML = `<b style="margin-top: 5px;display: block;">Loading . . .</b>`
    let result = await fetch("https://discord.com/api/v9/users/@me/invites", {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; rv:103.0) Gecko/20100101 Firefox/103.0",
            "Accept": "*/*",
            "Accept-Language": "en,sk;q=0.8,cs;q=0.5,en-US;q=0.3",
            "Content-Type": "application/json",
            "Authorization": token,
            "X-Discord-Locale": "en-US",
            "X-Debug-Options": "bugReporterEnabled",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
            "Sec-GPC": "1"
        },
        "referrer": "https://discord.com/channels/@me",
        "body": "{}",

        "method": "POST",
        "mode": "cors"
    });

    let resultParsed = await result.json();
    console.log(resultParsed)
    outputCreate.innerHTML = `<b style="margin-top: 5px; margin-bottom: 5px; display: block;">https://discord.gg/${resultParsed.code}</b>`

    if (selectInvite.firstChild.innerText == "No Invites") {
        selectInvite.innerHTML = ``;
    }
    let choice = document.createElement("option");
    choice.value = resultParsed.code;
    choice.innerText = `discord.gg/${resultParsed.code}`;
    selectInvite.appendChild(choice)
}


async function fetchInvites(returnTrue) {
    let result = await fetch("https://discord.com/api/v9/users/@me/invites", {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; rv:103.0) Gecko/20100101 Firefox/103.0",
            "Accept": "*/*",
            "Accept-Language": "en,sk;q=0.8,cs;q=0.5,en-US;q=0.3",
            "Content-Type": "application/json",
            "Authorization": token,
            "X-Discord-Locale": "en-US",
            "X-Debug-Options": "bugReporterEnabled",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
            "Sec-GPC": "1"
        },
        "referrer": "https://discord.com/channels/@me",
        "method": "GET",
        "mode": "cors"
    });
    let resultParsed = await result.json();
    selectInvite.innerHTML = ``;

    if (resultParsed.length == 0) {
        let choice = document.createElement("option");
        choice.value = "none";
        choice.innerText = "No Invites";
        selectInvite.appendChild(choice)
        return resultParsed
    }

    for (let count = 0; count < resultParsed.length; count++) {
        let choice = document.createElement("option");
        choice.value = resultParsed[count].code;
        choice.innerText = `discord.gg/${resultParsed[count].code}`;
        selectInvite.appendChild(choice)
    }
    if (returnTrue == true) {
        return resultParsed
    }
}

async function checkTheInfo() {
    let value = selectInvite.value;
    outputCreate.innerHTML = `<b style="margin-top: 5px; margin-bottom: 5px; display: block;">Loading . . .</b>`
    let result = await fetchInvites(true)
    let thing;
    for (let count = 0; count < result.length; count++) {
        if (result[count].code == value) {
            thing = result[count];
        }
    }
    if (!thing) {
        outputCreate.innerHTML = "Invite not found!"
    } else {
        outputCreate.innerHTML = `<b>Uses:</b> ${thing.uses}/${thing.max_uses}, <b>Expires in:</b> ${Math.round((thing.max_age / 60) / 60)} hours,</br> <i>https://discord.gg/${thing.code}</i>`
    }
}

async function deleteInvites() {
    await fetch("https://discord.com/api/v9/users/@me/invites", {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; rv:103.0) Gecko/20100101 Firefox/103.0",
            "Accept": "*/*",
            "Accept-Language": "en,sk;q=0.8,cs;q=0.5,en-US;q=0.3",
            "Content-Type": "application/json",
            "Authorization": token,
            "X-Discord-Locale": "en-US",
            "X-Debug-Options": "bugReporterEnabled",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
            "Sec-GPC": "1"
        },
        "referrer": "https://discord.com/channels/@me",
        "method": "DELETE",
        "mode": "cors"
    });

    selectInvite.innerHTML = ``;
    let choice = document.createElement("option");
    choice.value = "none";
    choice.innerText = "No Invites";
    selectInvite.appendChild(choice)
    outputCreate.innerHTML = `<b style="margin-top: 5px; margin-bottom: 5px; display: block;">Invites deleted</b>`
}

var offsetLeft;
var offsetTop;
var clicked = false;

async function mouseUp() {
    clicked = false;
}

async function mouseDown(e) {
    clicked = true;
    offsetLeft = div.offsetLeft - e.clientX;
    offsetTop = div.offsetTop - e.clientY;
}

function divMove(e) {
    if (!clicked) return;
    div.style.position = 'absolute';
    div.style.top = (e.clientY + offsetTop) + 'px';
    div.style.left = (e.clientX + offsetLeft) + 'px';
}



async function getToken() {
    return new Promise(function (resolve) {
        outputCreate.innerHTML = `<b style="margin-top: 5px; margin-bottom: 5px; display: block;">Getting token...</b><p>Please, switch to a random channel on Discord to obtain token!</p>`
        outputCreate.innerHTML = `<div style="margin-top: 10px; margin-bottom: 10px;"><b>Getting token...</b></br> <i>Please, switch to a random channel on Discord to obtain token!</i></div>`

        // New token script, a request interceptor, courtesy of Caltrop256
        window.__request = window.XMLHttpRequest;
        window.XMLHttpRequest = class __Interceptor extends window.__request {
            constructor() {
                super(...arguments);
                this._reqHead = this.setRequestHeader;
                this.setRequestHeader = function (name, body) {
                    this._reqHead(name, body);
                    if (name === "Authorization") {
                        window.XMLHttpRequest = window.__request;
                        
                        resolve(body);
                    }
                }.bind(this);
            };

        }
    })
}

async function uninject() {
    window.XMLHttpRequest = window.__request;


    window.removeEventListener('mousemove');
    document.getElementById('header').removeEventListener('mousedown')
    window.removeEventListener('mouseup')
    document.getElementById("mainWindow").remove();
    inject = null;
    createElement = null;
    inject = null;
    fetchInvites = null;
    checkTheInfo = null;
    deleteInvites = null;
    removeEventListener("mouseMove", window)
    console.log("Goodbye!")
}


console.log("Hello!")