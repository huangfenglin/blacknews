<template>
      <div>
        <div @click="addFollow(1)">添加关注用户1</div>
        <div @click="addFollow(2)">添加关注用户2</div>
        <div @click="addFollow(3)">添加关注用户3</div>
        <div @click="addFollow(4)">添加关注用户4</div>
        <div @click="addFollow(5)">添加关注用户5</div>
    </div>
</template>

<script>
export default {
    methods: {
        addFollow(id) {
            if (id != localStorage.getItem('user_id')) {
                this.$axios({
                    url: '/user_follows/' + id,
                    method: 'get'
                }).then(res=> {
                    console.log(res.data);
                    
                })
            }
        }
    }

}
</script>

<style>

</style>