let profile;

const mainBtnSend = document.querySelector('#main-comment-container-btnsend');
const main = document.querySelector('.section');
const mainTextArea = document.querySelector('#main-textarea');
const mainImage = document.querySelector('#main-image');
const ps = document.querySelector('.profile-select');
const section = document.querySelector('.section');
const btnReturn = document.querySelector('.btn-return');

mainBtnSend.addEventListener('click', createMainComment);
btnReturn.addEventListener('click', hideProfile);

let commentCounter = 0;
let userName;
var today = new Date();
var now = today.toLocaleString();


function createMainComment() {
    if (mainTextArea.value.trim() != '') {
        commentCounter++;

        const commit = document.createElement('div');
        commit.classList.add('posted-parent-comment-container');
        commit.setAttribute("id", commentCounter);

        commit.innerHTML =
        `<div class="commit">
            <div class="avatar">
                <img src="${mainImage.src}" alt="img">
            </div>
            <div class="commit-characteristics">
                <h4>${userName}</h4>
                <ul>
                    <li>${now}</li>
                </ul>
            </div>
        </div>
        <p>${mainTextArea.value}</p>
        <button id="btn${commentCounter}" class="btn-comment" onclick="btnMainComment_Click(this)">
            Comentar
        </button>`;

        main.appendChild(commit);

        mainTextArea.value = '';
    }
}


function btnMainComment_Click(btn) {
    let containerParent = document.getElementById(btn.id).parentNode

    const createCommit = document.createElement('div');
    createCommit.classList.add('posted-parent-comment-container');
    createCommit.setAttribute("id", `createCommit${containerParent.id}`);

    createCommit.innerHTML =
    `<div class="create-commit">
        <div class="avatar">
        <img src="${mainImage.src}" alt="img">
        </div>
        <div id="commit${containerParent.id}" class="comment">
            <input id="input${containerParent.id}" type="text" placeholder="">
            <button id="btnCommit${containerParent.id}" class="btn-send" onclick="btnComment_Click(this)">></button>
        </div>
    </div>
    `;

    containerParent.appendChild(createCommit);
}


function btnComment_Click(btn) {
    
    let containerParent = document.getElementById(btn.id).parentNode;
    let inp = document.getElementById(`input${containerParent.id.replace('commit', '')}`);

    if (inp.value.trim() != '') {
        const commit = document.createElement('div');
        commit.classList.add('create-commit');
        commit.setAttribute("id", containerParent.id);

        commit.innerHTML =
        `<div class="user-comment">
            <div class="avatar">
                <img src="${mainImage.src}" alt="img">
            </div>
            <div class="commit-characteristics">
                <h4>${userName}</h4>
                <ul>
                    <li>${now}</li>
                </ul>
            </div>
        </div>
        <p>${inp.value}</p>`;

        let superContainerParent = document.getElementById(containerParent.id.replace('commit', ''));

        superContainerParent.appendChild(commit);
        removeElement(`createCommit${superContainerParent.id}`);
    }
}


function removeElement(id){
	element = document.getElementById(id);	
	elementFather = element.parentNode;
	elementFather.removeChild(element);
}


function hideProfile(btnViewProfile) {
    if (btnViewProfile.id) {
        profile = btnViewProfile.id.replace('btnViewProfile', '');
        mainImage.src = document.getElementById(`profile${profile}`).src;
        
        if(profile == '4')
            userName = document.getElementById('guest').value;
        else
            userName = document.getElementById(`name${profile}`).innerText;
    }

    if (userName.trim() == '') {
        alert('Ingrese nombre')
        return;
    }

    ps.classList.toggle('hide');
    section.classList.toggle('show-commment');
    
}