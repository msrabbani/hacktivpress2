<template lang="html">
  <div class="">
    <div class="panel panel-warning" v-for = "articlez in articles">
      <div class="panel-heading">
        <h3 class="panel-title">{{articlez.title}}</h3>
      </div>
      <div class="panel-body">
        <p>{{articlez}}</p>
      </div>
      <span>
        <p>{{articlez.category}}</p>
        <a class="btn btn-primary btn-xs">Details</a>
      </span>
    </div>
</div>


</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      articles: []
    }
  },
  methods: {
    getAllArticles () {
      axios.get('http://localhost:3000/articles')
      .then(dataArticles => {
        this.articles = dataArticles
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created () {
    this.getAllArticles()
  }
}
</script>

<style lang="css">
</style>
