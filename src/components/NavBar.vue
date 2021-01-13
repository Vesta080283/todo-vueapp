<template>
    <nav>
        <div class="nav-wrapper">
            <!-- <a href="#" class="brand-logo">Logo</a> -->
            <router-link to="/" class="brand-logo left" tag="a">
             
            <span class='material-icons'>list_alt</span>
            </router-link>

            <ul id="nav-mobile" class="right">
                 <li v-show="user">
                    <router-link to="/todo">Список</router-link>
                </li>
                <li v-show="!user">
                    <router-link to="/login">
                    <i class='material-icons md24'>login</i>
                    </router-link>
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

