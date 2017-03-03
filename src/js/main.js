const app = new Vue({
    el: '#app',
    created(){
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
        todoLeft() {
            const itemLeft = this.filterTodo(this.todos).filter(o=> !o.isDone).length;
            return `${itemLeft} item${itemLeft > 1 ? 's' : ''} left`;
        },
    },
    methods: {
        buttonActive(value){
            return !!window.location.hash && window.location.hash.slice(1) === value;
        },
        setFilterTodo(value){
            this.filterTxt = value;
            window.location.hash = `#${value}`;
        },
        filterTodo(value, status){
            // console.log(value);
            let a = value;
            if (!!window.location.hash) this.filterTxt = window.location.hash.slice(1);
            switch (!status ? this.filterTxt : status) {
                case 'completed':
                    a = value.filter(el=> el.isDone);
                    break;
                case 'active':
                    a = value.filter(el=> !el.isDone);
                    break;
            }
            return a
        },
        onAddTodo(e) {
            const ids = this.todos.map(el=>el.id);
            const maxId = Math.max.apply(Math, !!ids.length ? ids : [0]) + 1;
            this.todos.push({id: maxId, text: e.target.value, isDone: false});
            e.target.value = '';
            localStorage.setItem('todos', JSON.stringify(this.todos))
        },
        onEditTodo: function (e) {
            e.target.parentNode.querySelector('input').classList.remove('hide');
            e.target.classList.add('hide');
            e.target.parentNode.querySelector('input').focus();
        },
        onSubmitEditTodo(e){
            e.target.parentNode.querySelector('div').classList.remove('hide');
            e.target.classList.add('hide');
            localStorage.setItem('todos', JSON.stringify(this.todos))
        },
        onDeleteTodo: function (e) {
            const i = this.todos.findIndex(el => el.id === parseInt(e.target.closest('.todo').querySelector('input[type="checkbox"]').value));
            this.todos.splice(i, 1);
            localStorage.setItem('todos', JSON.stringify(this.todos))
        },
        onCheckTodo(e){
            const i = this.todos.findIndex(el=> el.id === parseInt(e.target.value));
            this.todos[i].isDone = e.target.checked;
            e.target.parentNode.querySelector('i.material-icons').innerHTML = e.target.checked ? 'check_box' : 'check_box_outline_blank';
            localStorage.setItem('todos', JSON.stringify(this.todos))
        },
        onDeleteCompletedTodo(e){
            this.todos = this.todos.filter(el => !el.isDone);
            localStorage.setItem('todos', JSON.stringify(this.todos))
        }
    }
});
