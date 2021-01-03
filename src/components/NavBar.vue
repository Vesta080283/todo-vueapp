<template>
    <nav>
        <div class="nav-wrapper">
            <!-- <a href="#" class="brand-logo">Logo</a> -->
            <router-link to="/" class="brand-logo" tag="a">Заметки</router-link>

            <ul id="nav-mobile" class="right">
                 <li v-show="user">
                    <router-link to="/todo">Список заметок</router-link>
                </li>
                <li v-show="!user">
                    <router-link to="/login">Вход</router-link>
                </li>
                <li v-show="user">
                    <router-link to="/profile">Профиль</router-link>
                </li>
                <li v-show="user">
                    <a @click="signoutButtonPressed">Выход</a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import firebase from "firebase";
export default {
    data() {
        return {
            user: null
        };
    },
    created() {
        firebase.auth().onAuthStateChanged(user => {
            this.user = user;
        });
    },
    methods: {
        signoutButtonPressed(e) {
            e.stopPropagation();
            firebase.auth().signOut();
            this.$router.push({ name: "Login" });
        }
    }
};
</script>

