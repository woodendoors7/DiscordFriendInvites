/*
    DiscordFriendInvites 1.0.0
    by woodendoors7
*/


var html = `
    <div id="mainWindow">
        <div id="header">DiscordFriendInvites<br>by woodendoors7<div id="closeBtn" class="closeButton-30b1gR" aria-label="Dismiss" role="button" tabindex="0"><svg aria-hidden="true" role="img" class="closeIcon-3eoP1e" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"></path></svg></div></div>
        <div class="dividing">
            <p class="sectionTitle">
                Create Invite
            </p>
            <button class="fieldButton-14lHvK button-ejjZWC lookFilled-1H2Jvj colorPrimary-2-Lusz sizeSmall-3R2P2p grow-2T4nbg" id="runCreate">Do It</button>
        </div>
    
        <div class="dividing">
            <p class="sectionTitle">
                View Invite
            </p>
            <select name="Select Invite" id="selectInvite">
    
              </select>
    
            <button class="sectionButton fieldButton-14lHvK button-ejjZWC lookFilled-1H2Jvj colorPrimary-2-Lusz sizeSmall-3R2P2p grow-2T4nbg" id="runInfo">View Info</button>
        </div>
        <div onClick="this.select();" disabled type="text" class="textOutput inputDefault-Ciwd-S input-3O04eu" id="outputCreate"><b style="margin-top: 8px;display: block;">Welcome!</b></div>
        <button style="margin-left: 32%; margin-top: 10px;" class="sectionButton fieldButton-14lHvK button-ejjZWC lookFilled-1H2Jvj colorPrimary-2-Lusz sizeSmall-3R2P2p grow-2T4nbg" id="runDelete">Delete All Invites</button>
        <a><img style="margin-top: 10px; width: 250px;" src="https://cdn.discordapp.com/attachments/1113574795540430969/1113574807611650128/pleasestar.png"></a>
        </div>`

var css = `#mainWindow {
        position: absolute;
        z-index: 9;
        background-color:  #2F3136;
        border: 1px solid #3f4147;
        color: white;
        text-align: center;
        height: 280px;
        width: 400px;
        font-family: "Century Gothic", CenturyGothic, Geneva, AppleGothic, sans-serif;
        z-index: 1000;
        border-radius: 12px;
    }
    
    #header {
        padding: 10px;
        cursor: move;
        z-index: 10;
        background-color: #5865F2;
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
    var doThis = document.createElement("div")
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

    token = await getToken()
    outputCreate.innerHTML = `<b style="margin-top: 8px;display: block;">Welcome!</b>`
    fetchInvites(false)
}



async function createElement() {
    outputCreate.innerHTML = `<b style="margin-top: 8px;display: block;">Loading . . .</b>`
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

    outputCreate.innerHTML = `<b style="margin-top: 8px;display: block;">https://discord.gg/${resultParsed.code}</b>`

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
    outputCreate.innerHTML = `<b style="margin-top: 8px;display: block;">Loading . . .</b>`
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
        "method": "DELETE",
        "mode": "cors"
    });

    selectInvite.innerHTML = ``;
    let choice = document.createElement("option");
    choice.value = "none";
    choice.innerText = "No Invites";
    selectInvite.appendChild(choice)
    outputCreate.innerHTML = `<b style="margin-top: 8px;display: block;">Invites deleted</b>`
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
    outputCreate.innerHTML = `<b style="margin-top: 8px;display: block;">Getting token...</b>`
    return await (webpackChunkdiscord_app.push([[''], {}, e => { m = []; for (let c in e.c) m.push(e.c[c]) }]), m).find(m => m?.exports?.default?.getToken !== void 0).exports.default.getToken()
}

async function uninject() {

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

}


console.log("Hello!")