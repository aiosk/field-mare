const app = new Vue({
    el: '#app',
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
        }
    },
    methods: {
        filterTodo(value, status){
            // console.log(value);
            let a = value;
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
        },
        onEditTodo(e){
            e.target.innerHTML = `<input type="text" value="${e.target.innerText}" @keyup.enter="onSubmitEditTodo"/>`;
            e.target.querySelector('input').focus();
        },
        onSubmitEditTodo(e){

        },
        onDeleteTodo: function (e) {
            const i = this.todos.findIndex(el => el.id === parseInt(e.target.closest('.todo').querySelector('input[type="checkbox"]').value));
            this.todos.splice(i, 1);
        },
        onCheckTodo(e){
            const i = this.todos.findIndex(el=> el.id === parseInt(e.target.value));
            this.todos[i].isDone = e.target.checked;
            e.target.parentNode.querySelector('i.material-icons').innerHTML = e.target.checked ? 'check_box' : 'check_box_outline_blank';
        },
        onDeleteCompletedTode(e){
            this.todos = this.todos.filter(el => !el.isDone);
        }
    }
});
