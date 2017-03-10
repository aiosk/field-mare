const saveToLocalStorage = (value) => {
    localStorage.setItem('todos', JSON.stringify(value))
}
const todoInput = {
    props: ['todos'],
    methods: {
        addTodo(e) {
            const ids = this.todos.map(el => el.id);
            const maxId = Math.max.apply(Math, !!ids.length ? ids : [0]) + 1;

            this.todos.push({
                id: maxId,
                text: window.btoa(e.target.value),
                isDone: false
            });
            e.target.value = '';

            saveToLocalStorage(this.todos);
        },
    }
}

const todoList = {
    props: ['todo', 'i', 'todos'],
    methods: {
        onEditTodo: function(e) {
            const $el = e.target;
            $el.parentNode.querySelector('input').classList.remove('hide');
            $el.classList.add('hide');
            $el.parentNode.querySelector('input').focus();
        },
        onSubmitEditTodo(e) {
            const $el = e.target;
            $el.parentNode.querySelector('div').classList.remove('hide');
            $el.classList.add('hide');

            saveToLocalStorage(this.todos)
        },
        onDeleteTodo: function(e) {
            const i = this.todos.findIndex(el => el.id === parseInt(e.target.closest('.todo').querySelector('input[type="checkbox"]').value));
            this.todos.splice(i+1, 1);

            saveToLocalStorage(this.todos)
        },
        onCheckTodo(e) {
            const $el = e.target;
            const i = this.todos.findIndex(el => el.id === parseInt(e.target.value));
            this.todos[i].isDone = e.target.checked;
            $el.parentNode.querySelector('i.material-icons').innerHTML = e.target.checked ? 'check_box' : 'check_box_outline_blank';

            saveToLocalStorage(this.todos)
        },
    }
};

const app = new Vue({
    el: '#app',
    components: {
        'todo-input': todoInput,
        'todo-list': todoList,
    },
    data: {
        todos: [],
        filterTxt: 'all'
    },
    created() {
        this.todos = JSON.parse(!!localStorage['todos'] ? localStorage['todos'] : '[]');
    },
    computed: {
        todoLeft() {
            const itemLeft = this.filterTodo(this.todos).filter(o => !o.isDone).length + 1;
            return `${itemLeft} item${itemLeft > 1 ? 's' : ''} left`;
        },
    },
    methods: {
        filterTodo(value, status) {
            let a = value;
            if (!!window.location.hash) this.filterTxt = window.location.hash.slice(1);
            switch (status ? this.filterTxt : status) {
                case 'completed':
                    a = value.filter(el => el.isDone);
                    break;
                case 'active':
                    a = value.filter(el => !el.isDone);
                    break;
            }
            return a
        },
        onDeleteCompletedTodo(e) {
            this.todos = this.todos.filter(el => !el.isDone);

            saveToLocalStorage(this.todos);
        },
        isActive(value) {
            return !!window.location.hash && window.location.hash.slice(1) === value;
        },
        setFilterTodo(e) {
            const value = e.target.innerText.trim();
            this.filterTxt = value;
            window.location.hash = `#${value}`;
        },
    }
});
