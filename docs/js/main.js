'use strict';

var app = new Vue({
    el: '#app',
    created: function created() {
        this.todos = JSON.parse(!!localStorage['todos'] ? localStorage['todos'] : '[]');
    },

    data: {
        todos: [
            // {id: 2, text: 'sample 1', isDone: true},
            // {id: 1, text: 'sample 2', isDone: false}
        ],
        filterTxt: 'all'
    },
    computed: {
        todoLeft: function todoLeft() {
            var itemLeft = this.filterTodo(this.todos).filter(function (o) {
                return !o.isDone;
            }).length;
            return itemLeft + ' item' + (itemLeft > 1 ? 's' : '') + ' left';
        }
    },
    methods: {
        setFilterTodo: function setFilterTodo(value) {
            this.filterTxt = value;
            window.location.hash = '#' + value;
        },
        filterTodo: function filterTodo(value, status) {
            // console.log(value);
            var a = value;
            if (!!window.location.hash) this.filterTxt = window.location.hash.slice(1);
            switch (!status ? this.filterTxt : status) {
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
        onAddTodo: function onAddTodo(e) {
            var ids = this.todos.map(function (el) {
                return el.id;
            });
            var maxId = Math.max.apply(Math, !!ids.length ? ids : [0]) + 1;
            this.todos.push({ id: maxId, text: e.target.value, isDone: false });
            e.target.value = '';
            localStorage.setItem('todos', JSON.stringify(this.todos));
        },
        onEditTodo: function onEditTodo(e) {
            e.target.innerHTML = '<input type="text" value="' + e.target.innerText + '" @keyup.enter="onSubmitEditTodo"/>';
            e.target.querySelector('input').focus();
        },
        onSubmitEditTodo: function onSubmitEditTodo(e) {},

        onDeleteTodo: function onDeleteTodo(e) {
            var i = this.todos.findIndex(function (el) {
                return el.id === parseInt(e.target.closest('.todo').querySelector('input[type="checkbox"]').value);
            });
            this.todos.splice(i, 1);
            localStorage.setItem('todos', JSON.stringify(this.todos));
        },
        onCheckTodo: function onCheckTodo(e) {
            var i = this.todos.findIndex(function (el) {
                return el.id === parseInt(e.target.value);
            });
            this.todos[i].isDone = e.target.checked;
            e.target.parentNode.querySelector('i.material-icons').innerHTML = e.target.checked ? 'check_box' : 'check_box_outline_blank';
            localStorage.setItem('todos', JSON.stringify(this.todos));
        },
        onDeleteCompletedTode: function onDeleteCompletedTode(e) {
            this.todos = this.todos.filter(function (el) {
                return !el.isDone;
            });
        }
    }
});