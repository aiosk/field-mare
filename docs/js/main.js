'use strict';

var saveToLocalStorage = function saveToLocalStorage(value) {
    localStorage.setItem('todos', JSON.stringify(value));
};
var todoInput = {
    props: ['todos'],
    methods: {
        addTodo: function addTodo(e) {
            var ids = this.todos.map(function (el) {
                return el.id;
            });
            var maxId = Math.max.apply(Math, !!ids.length ? ids : [0]) + 1;

            this.todos.push({
                id: maxId,
                text: window.btoa(e.target.value),
                isDone: false
            });
            e.target.value = '';

            saveToLocalStorage(this.todos);
        }
    }
};

var todoList = {
    props: ['todo', 'i', 'todos'],
    methods: {
        onEditTodo: function onEditTodo(e) {
            var $el = e.target;
            $el.parentNode.querySelector('input').classList.remove('hide');
            $el.classList.add('hide');
            $el.parentNode.querySelector('input').focus();
        },
        onSubmitEditTodo: function onSubmitEditTodo(e) {
            var $el = e.target;
            $el.parentNode.querySelector('div').classList.remove('hide');
            $el.classList.add('hide');

            saveToLocalStorage(this.todos);
        },

        onDeleteTodo: function onDeleteTodo(e) {
            var i = this.todos.findIndex(function (el) {
                return el.id === parseInt(e.target.closest('.todo').querySelector('input[type="checkbox"]').value);
            });
            this.todos.splice(i + 1, 1);

            saveToLocalStorage(this.todos);
        },
        onCheckTodo: function onCheckTodo(e) {
            var $el = e.target;
            var i = this.todos.findIndex(function (el) {
                return el.id === parseInt(e.target.value);
            });
            this.todos[i].isDone = e.target.checked;
            $el.parentNode.querySelector('i.material-icons').innerHTML = e.target.checked ? 'check_box' : 'check_box_outline_blank';

            saveToLocalStorage(this.todos);
        }
    }
};

var app = new Vue({
    el: '#app',
    components: {
        'todo-input': todoInput,
        'todo-list': todoList
    },
    data: {
        todos: [],
        filterTxt: 'all'
    },
    created: function created() {
        this.todos = JSON.parse(!!localStorage['todos'] ? localStorage['todos'] : '[]');
    },

    computed: {
        todoLeft: function todoLeft() {
            var itemLeft = this.filterTodo(this.todos).filter(function (o) {
                return !o.isDone;
            }).length + 1;
            return itemLeft + ' item' + (itemLeft > 1 ? 's' : '') + ' left';
        }
    },
    methods: {
        buttonActive: function buttonActive(value) {
            return !!window.location.hash && window.location.hash.slice(1) === value;
        },
        setFilterTodo: function setFilterTodo(value) {
            this.filterTxt = value;
            window.location.hash = '#' + value;
        },
        filterTodo: function filterTodo(value, status) {
            var a = value;
            if (!!window.location.hash) this.filterTxt = window.location.hash.slice(1);
            switch (status ? this.filterTxt : status) {
                case 'completed':
                    a = value.filter(function (el) {
                        return el.isDone;
                    });
                    break;
                case 'active':
                    a = value.filter(function (el) {
                        return !el.isDone;
                    });
                    break;
            }
            return a;
        },
        onDeleteCompletedTodo: function onDeleteCompletedTodo(e) {
            this.todos = this.todos.filter(function (el) {
                return !el.isDone;
            });

            saveToLocalStorage(this.todos);
        },
        isActive: function isActive(value) {
            return !!window.location.hash && window.location.hash.slice(1) === value;
        },
        setFilterTodo: function setFilterTodo(e) {
            var value = e.target.innerText.trim();
            this.filterTxt = value;
            window.location.hash = '#' + value;
        }
    }
});