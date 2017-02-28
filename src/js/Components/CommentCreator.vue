<style lang="scss">
  .comments{
    padding: 5px;

    .comment-box{
      display: flex;
      flex-wrap: wrap;
      overflow-x: hidden;
      padding: 2px;
    }
    .show-enter{
      transform: translateX(24px);
      opacity: 0;
    }
    .show-enter-to{
      transform: translateX(0);
      opacity: 1;
    }
    .show-leave{
      opacity: 1;
    }
    .show-leave-to{
      opacity: 0;
    }
    .show-enter-active, .show-leave-active{
      transition: .2s transform, .3s opacity;
    }
    button.add{
      background: #3c9;
      border-radius: 50%;
      border: 0;
      color: #fff;
      display: block;
      float: left;
      height: 28px;
      line-height: 8px;
      margin: auto 5px;
      transition: .3s background, .2s transform, .3s opacity;
      vertical-align: middle;
      width: 28px;
    }
    button.add:focus{
      outline: 0;
      background: #0a7;
    }
    h1{
      font-size: 1.4em;
      margin: 0;
    }
    textarea{
      border: 1px solid #ccc;
      border-radius: 5px;
      flex-grow: 2;
      float: left;
      margin: 2px;
      margin-left: 0;
      max-width: 500px;
      resize: none;
      width: 85%;
      vertical-align: middle;
    }
  }
</style>
<template>
  <div class="comments">
    <h1>{{title}}</h1>
    <div class="comment-box">
      <textarea v-for="(comment, index) in comments"
                :value="comment"
                @input="updateValue($event.target.value, index)"
                @keydown.delete="deleteIfEmpty(index)"
                v-autosize
                v-focus="index !== 0">
      </textarea>
      <transition name="show">
        <button class="add"
                @click="addComment"
                v-show="showAddButton">+</button>
      </transition>
    </div>
  </div>
</template>
<script>
import autosize from 'autosize';
import Vue from 'vue';

Vue.directive('autosize', {
  inserted(el){
    autosize(el);
  }
});

Vue.directive('focus', {
  inserted(el, {value}){
    if(value) el.focus();
  }
});

export default {
  computed: {
    showAddButton(){
      const i = this.comments.length - 1;
      if(this.comments[i].trim() !== '') return true;
      return false;
    }
  },
  data(){
    return {
      comments: ['']
    }
  },
  methods: {
    addComment(){
      this.comments.push('');
    },
    deleteIfEmpty(index){
      if(index !== 0 && this.comments[index].trim() === '')
        this.comments.splice(index, 1);
    },
    updateValue(value, index){
      //this.comments[index] = value won't trigger update detection
      this.$set(this.comments, index, value);
      this.$emit('input', this.comments);
    }
  },
  props: ['title', 'value']
}
</script>
