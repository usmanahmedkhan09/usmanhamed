<template>
  <div class="hello">
    <!--<select class="form-control" v-model="engArr" @change="onChange()">
      <option v-for="val in keyValue" v-bind:key="val.ke" :value="val.ke">{{val.title}}</option>
       <option value="2">APP 2</option> 
    </select>-->
    <select v-model="lang">
      <option
        v-for="(lang, i) in languageArray"
        :key="`lang${i}`"
        :value="lang"
      >
        {{ lang }}
      </option>
    </select>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { languages } from "../plugins/i18n.js";
export default {
  name: "Translation",
  data() {
    return {
      engArr: "0",
      keyValue: [
        { ke: "1", title: "English" },
        { ke: "0", title: "Arabic" },
      ],
      languageArray: languages,
    };
  },
  computed: {
    ...mapGetters(["getLanguage"]),
    lang: {
      get: function() {
        return this.$store.state.locale;
      },
      set: function(newVal) {
        this.$store.dispatch("changeLocale", newVal);
        this.$store.dispatch("SET_LANGUAGE", newVal);
      },
    },
  },
  watch: {
    getLanguage() {
      this.engArr = this.$store.getters.getEngArr;
    },
  },
  methods: {
    onChange() {
      this.$store.dispatch("SET_LANGUAGE", this.engArr);
    },
  },
  mounted() {
    this.getLanguage();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
