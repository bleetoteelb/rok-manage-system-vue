<template>
  <v-container fluid >
    <v-container>
      <template v-for="il in imageList">
        <v-row>
          <v-img :src="requireURL(il)"></v-img>
        </v-row>
      </template>
    </v-container>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  data: () => ({
    imageList: 
      [
        'kvk_1',
        'kvk_2',
        'kvk_3',
        'kvk_4',
        'kvk_5',
        'kvk_6',
        'kvk_7',
        'kvk_8',
      ]
  }),
  created() {
  },
  methods: {
    downloadImage(imageUrl) {
      let url = this.requireURL(imageUrl)
      console.log(url);
      axios({
        method:'get',
        url,
        responseType:'arraybuffer',
      }).then((response) => {
        var fileUrl = window.URL.createObjectURL(new Blob([response.data]))
        var fileLink = document.createElement('a')
        fileLink.href = fileUrl

        fileLink.setAttribute('download',`${imageUrl}.jpg`)
        document.body.appendChild(fileLink)

        fileLink.click()
      });
    },
    requireURL(url){
      return require("@/assets/kvk/"+url+".jpg")
    },
  }
}
</script>

<style>

</style>
