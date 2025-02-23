
let users = [
    {
        email: "caio@gmail.com",
        tel: "999999999",
        ref: 212,
        refBy: null
    }, {
        email: "maria@gmail.com",
        tel: "999999999",
        ref: 100,
        refBy: 212
    }
];

const updateImageLinks = () => {
    document.querySelectorAll('img').forEach((img) => {
        const src = img.getAttribute("src");
        if (src && !src.startsWith("http")) {
            img.src = `https://raw.githubusercontent.com/maykbrito/my-public-files/main/nlw-19/${src}`;
        }
    });
};

const getRef = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const ref = urlParams.get('ref');
    return ref ? ref : null;
}


let saveUser = (userData) => {
    let newUser = {
        email: userData.email,
        tel: userData.tel,
        ref: Math.floor(Math.random() * 1000),
        refBy: 212//getRef()
    }
    users.push(newUser);
    return newUser;
}

const getTotalSubscribers = (userData) => {
    let user = users.filter(user => user.refBy === userData.ref);
    return user.length;
}

const getUserName = (userData) => {
    let user = users.find(user => user.email === userData.email);
    return user;
}

let showInvite = (userData) => {
    return (
        `<main>
            <h3>Inscrição confirmada!</h3>

            <p>
                Convide mais pessoas e concorra a prêmios! <br/>
                Compartilhe o link e acompanhe as inscrições:
            </p>

            <div class="input-group">
                <label for="link">
                <img src="link.svg" alt="Link icon">
                </label>
                <input type="text" id="link" value="https://evento.com?ref=${userData.ref}" disabled>

            </div>
            </main>

            <section class="stats">
                <h4>
                ${getTotalSubscribers(userData)}
                </h4>

                <p>
                    Inscrições feitas!
                </p>
          </section>`
    )
}

let formComponet = () => {
    return (
        `<main>
            <section class="about">
                <div class="section-header">
                    <h2>
                    Sobre o evento
                    </h2>
                    <span class="badge">AO VIVO</span>
                </div>

                <p>
                    Um evento feito por e para pessoas desenvolvedoras apaixonadas por criar soluções inovadoras e compartilhar conhecimento. Vamos mergulhar nas tendências mais recentes em desenvolvimento de software, arquitetura de sistemas e tecnologias emergentes, com palestras, workshops e hackathons.
                    <br/><br/>Dias 15 a 17 de março | Das 18h às 21h | Online & Gratuito 
                </p>
            </section>

            <section class="registration">
                <h2>Inscrição</h2>

                <form id="form">
                    <div class="input-wrapper">
                    <div class="input-group">
                        <label for="email">
                        <img src="mail.svg" alt="Email icon">
                        </label>
                        <input type="email" id="email" name="email" placeholder="E-mail">
                    </div>

                    <div class="input-group">
                        <label for="phone">
                        <img src="phone.svg" alt="Phone icon">
                        </label>
                        <input type="text" id="phone" name="phone" placeholder="Telefone">
                    </div>
                    </div>

                    <button>
                    Confirmar
                    <img src="arrow.svg" alt="Arrow right">
                    </button>
                </form>
            </section>
        </main>`
    )
}

let activeForm = () => {
    const contener = document.getElementById('app');
    contener.innerHTML = formComponet();
    updateImageLinks();
    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const data = new FormData(form);
        let userData = {
            email: data.get('email'),
            tel: data.get('tel')
        }

        const user = getUserName(userData);
        console.log(user);
        if (user) {
            console.log('Usuário já cadastrado');
            contener.innerHTML = showInvite(user);
            updateImageLinks();
        } else {
            console.log('Usuário não cadastrado');
            let newUser = saveUser(userData);
            contener.innerHTML = showInvite(newUser);
            updateImageLinks();
        }

    });
}

updateImageLinks();
activeForm();

const logo = document.getElementById("logo");

logo.addEventListener("click", () => {
    activeForm();
})



