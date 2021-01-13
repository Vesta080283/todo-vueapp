<template>
    <section>
        <navigation>
        </navigation>
        <h5 class="center-align"> Список заметок </h5>
        <ul class="collection with-header">
            <li class="collection-header">
                <div class="column">                    
                    <div class="row">                    
                        <div class="input-field col s8">
                            <span>Название</span>
                            <input 
                                id="new_todo" 
                                type="text" 
                                class="validate" 
                                v-model="todo.title"
                            />                        
                        </div>
                        <div class="input-field col s4">
                            <button class="btn" @click="addTodo">
                                <i class="material-icons md24">add</i>
                            </button>
                        </div>
                    </div>
                     <div class="input-field col s12">
                        <span>Описание</span>
                        <input 
                            id="new_todo_info" 
                            type="text" 
                            class="validate" 
                            v-model="todo.info"
                        />                        
                    </div>
                </div>
            </li>
             <li 
                class="collection-item" 
                v-for="todo in todos" 
                :key="todo.id" 
                :class="{ fade: todo.isCompleted }"
                >
                <div class="column">                     
                    <div class="row">
                         <span class="deleteIcon" @click="deleteToDo(todo.id)">
                             <i class='material-icons md18'>delete_forever</i>
                             </span> 
                            <span>{{formattedDate(todo.createdAt)}}</span>
                            <!-- <span>{{formattedDate(todo.timeLeft)}}</span> -->
                        <span class="secondary-content">
                            <label>
                                <input 
                                    type="checkbox"
                                    class="filled-in" 
                                    :checked="todo.isCompleted"
                                    @change="completedPressed(todo.id, $event)"
                                />
                                <span></span>                                
                            </label>
                        </span>
                    </div>                    
                    <h5>
                        {{todo.title}} 
                    </h5>
                    <p>
                        {{todo.info}}
                    </p>
                </div>
            </li>   
        </ul>
    </section>
</template>

<script>
import navigation from "@/components/NavBar.vue";
import firebase from "firebase";
export default {
    data() {
        return {            
            todos: [],
            todo: {
                title: ''
            }
        };
    },
    created() {
        this.getTodos();
    },   
    components: { navigation },
    methods: {        
        formattedDate(inDate) {
            return (new Date(inDate).toLocaleTimeString("ru-RU").toString() +
          " " + new Date(inDate).toLocaleDateString("ru-RU").toString());
        },
        addTodo() {
            firebase
                .firestore()
                .collection("users")
                .doc(firebase.auth().currentUser.uid)
                .collection("todos")
                .add({
                    title: this.todo.title,
                    createdAt: new Date(),
                    isCompleted: false
                });
        },
        async getTodos() {
            let todosRef = await firebase
                .firestore()
                .collection("users")
                .doc(firebase.auth().currentUser.uid)
                .collection("todos");
            todosRef.onSnapshot(snap => {
                let timeServer = firebase.firestore.Timestamp.now();
                this.todos = [];
                snap.forEach(doc => {
                    let todo = doc.data();
                    todo.id = doc.id;
                    todo.createdAt = doc.data().createdAt.seconds * 1000;   
                    // todo.timeLeft = (timeServer.seconds - doc.data().createdAt.seconds) * 1000;
                    this.todos.push(todo);
                });
            });
        },
        updateTodoItem(docId, e) {
            var isChecked = e.target.checked;
            firebase
                .firestore()
                .collection("users")
                .doc(firebase.auth().currentUser.uid)
                .collection("todos")
                .doc(docId)
                .update({
                    isCompleted: isChecked
                });
        },
        deleteToDo(docId) {
            firebase
                .firestore()
                .collection("users")
                .doc(firebase.auth().currentUser.uid)
                .collection("todos")
                .doc(docId)
                .delete();
        }
    }
};
</script>

<style>
.fade {
    opacity: 0.4 !important;
}
li {
    font-size: 1.1em;
}
.collection.with-header {
    max-width: 500px;
    margin: 0 auto;
}
.deleteIcon {
    margin-right: 10px;
    cursor: pointer;
}
.deleteIcon:hover {
    opacity: 0.5;
}

</style>