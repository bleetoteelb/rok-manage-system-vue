<template>
  <v-container fluid >
    <div class="red--text"> 원하는 프로필 사진 아래쪽의 버튼을 눌러 이미지를 다운로드 받으세요! </div>
    <v-container>
      <template v-for="il in imageList">
        <v-row>
          <v-img :src="requireURL(il.total)"></v-img>
        </v-row>
        <v-row>
          <v-col
            v-for="ils in il.each"
            :key="ils"
            align="center"
            >
              <v-btn
              color="secondary"
              elevation="1"
              @click="downloadImage(ils)"
              >{{ ils }}
              </v-btn>
          </v-col>
        </v-row>
      </template>
    </v-container>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  data: () => ({
    imageList: [{ 'total':'모음1','each':
      [
      '그럴줄알고맴매챙겨따',
      '엄마가너랑놀지말래따',
      '귀엽고이쁘고머시따',
      '져주는게어른이래따',
      '라고귀요미가말해따',
      '아무도관심이업따',
      '충성을다하게따',
      '나주먹꽉쥐어따',
      '나가조씀조케따',
      '그동안즐거워따',
      '고양이가보내따',
      '나는다알고이따',
      '심장이뛰고이따',
      '귀요미가게따',
      '나는모르게따',
      '들어는보게따',
      '내가젤귀엽따',
      '너무멀리가따',
      '와너무재미따',
      '혼자있고십따',
      '나는자야게따',
      '물어본적없따',
      '내가쫌멋잇따',
      '누워있고십따',
      '쟤가괴롭혀따'
      ]},{'total':'모음2','each':
      [
      '돈쭐내야게따',
      '지켜보고이따',
      '기다리고이따',
      '할말이없따',
      '잘못들어따',
      '텅텅비어따',
      '이미늦어따',
      '씻고오게따',
      '빈말이어따',
      '당황스럽따',
      '진짜조케따',
      '깜짝놀라따',
      '자랑스럽따',
      '믿을수업따',
      '답장요기따',
      '안된다해따',
      '집가고십따',
      '부탁하게따',
      '상처바다따',
      '보고시퍼따',
      '시작되어따',
      '잡아먹게따',
      '그럴수업따',
      '그럴수이따',
      '뽈록해져따'
      ]},{'total':'모음3','each':
      [
      '영혼이업따',
      '받아주게따',
      '답장이업따',
      '눈치도업따',
      '경고주게따',
      '귀요미와따',
      '멍청이가따',
      '꼬르륵해따',
      '마따마따',
      '부자돼따',
      '가고이따',
      '일어나따',
      '그냥이따',
      '시끄럽따',
      '필요업따',
      '너무해따',
      '부질업따',
      '부끄럽따',
      '눈물나따',
      '웅성웅성',
      '힘드러따',
      '못하게따',
      '할수이따',
      '맛있게따',
      '안타깝따'
      ]},{'total':'모음4','each':[
      '어림없따',
      '잘못해따',
      '나요기따',
      '요기이따',
      '혼나게따',
      '고맙따',
      '무섭따',
      '다해따',
      '미쵸따',
      '쫌이따',
      '잘해따',
      '나빠따',
      '아라따',
      '화나따',
      '신나따',
      '흐앙',
      '딘따',
      '불편',
      '쭈굴',
      '헷',
        '안우러따']}
    ],
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
      return require("@/assets/seals/"+url+".jpg")
    },
  }
}
</script>

<style>

</style>
