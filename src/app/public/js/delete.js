let table = document.querySelector('#users');
table.addEventListener('click', (ev) => {
    let elementClicked = ev.target;

    if (elementClicked.dataset.type == 'delete') {
        let id = elementClicked.dataset.ref;
        fetch(`http://localhost:3000/users/${id}`, { method: 'DELETE' })
            .then(resp => {
                let tr = elementClicked.closest(`#user_${id}`);
                tr.remove();

            })
            .catch(erro => console.log(erro));
    }
});