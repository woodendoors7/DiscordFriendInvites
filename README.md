[<img src="https://woodendoors7.github.io/DiscordFriendInvites/invites.png" href="https://www.youtube.com/watch?v=qIU5jx4gup8">](https://www.youtube.com/watch?v=qIU5jx4gup8)


# Create a Discord Friend Invite link with user friendly GUI | DiscordFriendInvites
### A simple tool for generating Discord friend invite links that allows you to send friend requests via a link.

<hr></hr>

<img src="https://woodendoors7.github.io/DiscordFriendInvites/newimage.png" alt="a discord friend invite">

<b>Discord Friend Invite links, a relic of the past that Discord never removed. How do you generate a friend invite?</b>
<br>
The code automatically generates a link that lasts 7 days and has the limit of 5 uses, afterwards using the link 1 use, it expires. The cool thing is, you don't even need to accept the person's friend request, upon clicking the link, the user is automatically added as a friend without you confirming.

This is a feature of Discord, and in fact, as far as I know it's [still in Discord's code.](https://github.com/doggybootsy/hidden-disc-docs/blob/main/snippets/createFriendInvite.js) 
As to my knowledge, you cannot change the use or time limit on the invites, nor you can delete individual invites, only all invites at once. 


<hr></hr>

### How to use:
1. Open https://discord.com/
2. Wait until Discord is **fully** loaded
3. Copy this code: 
```js
(async function () {
    let outputCreate, token;

    function injectUI() {
        const html = `
            <div id="mainWindow" style="position: absolute; top: 100px; left: 100px; z-index: 9999; padding: 10px; background: #2F3136; color: #fff; border: 1px solid #3f4147; border-radius: 8px; font-family: sans-serif; text-align: center;">
                <b>Discord Friend Invites</b>
                <button id="createInvite" style="display: block; margin: 10px auto; padding: 5px 10px; background: #5865f2; color: white; border: none; border-radius: 4px;">Create Invite</button>
                <div id="outputCreate" style="margin-top: 10px; padding: 5px; background: #1e1f22; border-radius: 4px; cursor: text;">Output will appear here...</div>
                <button id="closeBtn" style="margin-top: 10px; background: #f04747; color: white; border: none; padding: 5px 10px; border-radius: 4px;">Close</button>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', html);

        document.getElementById('createInvite').addEventListener('click', createInvite);
        document.getElementById('closeBtn').addEventListener('click', () => {
            document.getElementById('mainWindow').remove();
        });
        outputCreate = document.getElementById('outputCreate');
    }

    async function getToken() {
        return new Promise((resolve) => {
            outputCreate.textContent = "Switch to a Discord channel to grab the token!";
            const interceptor = XMLHttpRequest.prototype.setRequestHeader;
            XMLHttpRequest.prototype.setRequestHeader = function (header, value) {
                if (header === "Authorization") {
                    XMLHttpRequest.prototype.setRequestHeader = interceptor;
                    resolve(value);
                }
                interceptor.apply(this, arguments);
            };
        });
    }

    async function createInvite() {
        outputCreate.textContent = "Creating invite...";

        if (!token) {
            token = await getToken();
            console.log("Token fetched:", token);
        }

        const body = {
            max_age: 0,  // Never expires
            max_uses: 0  // Unlimited uses
        };

        try {
            const response = await fetch("https://discord.com/api/v9/users/@me/invites", {
                credentials: "include",
                headers: {
                    "Authorization": token,
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify(body)
            });
            const result = await response.json();
            if (result.code) {
                const inviteLink = `https://discord.gg/${result.code}`;
                outputCreate.textContent = `Invite created: ${inviteLink}`;
                console.log("Invite Link:", inviteLink);
            } else {
                throw new Error(result.message || "Unknown error");
            }
        } catch (error) {
            console.error("Failed to create invite:", error);
            outputCreate.textContent = `Error: ${error.message}`;
        }
    }

    injectUI();
    console.log("Discord Friend Invites: Ready to use!");
})();

```
<sup>(or copy it from <a href="https://github.com/woodendoors7/DiscordFriendInvites/blob/main/inject.js">inject.js</a>)</sup>

4. Open Developer Tools with F12 or CTRL+Shift+I in your browser
5. Click on "Console" in the top menu of DevTools (ignore all the scary warnings)
6. Paste the code into the console (The browser might prompt you to type "allow pasting", or something similiar.)
7. A window will open up. Click "Do it" next to "Create Invite"
8. Wait until the link is generated and send it to someone that isn't friends with you. **That's it!**


<img alt="Image of the Friend invite sent to another user on Discord" src="https://woodendoors7.github.io/DiscordFriendInvites/lonelydiscordfriendinvites.png" width="400">
  
