<template>
  <div class="about">
    <h1>개인 정보 업데이트</h1>
    <v-card>
      <v-card-text class="j-center">
        <!--
          보병 : 제노비아, 카를 마르텔, 콘스탄티누스 1세, 하랄 3세, 관우, 알렉산더 대왕, 레오니다스 1세, 스키피오프라임, 아에티우스 플라비우스, 척준경
기병 : 항우, 야드비가,  찬드라굽타. 윌리엄, 아틸라, 다케다 신겐, 살라딘, 알렉산드르 넵스키, 얀지슈카, 베르트랑 뒤 게클랭
궁병 : 이성계 네부카드네자르 2세, 아르테미시스. 람세스 2세, 부디카 프라임, 헨리 5세
리더쉽 : 트라야누스, 이순신, 테오도라. 측천무후, 화목란, 혼다 타다카ㅏ
        -->
        <div justify="center">
          <p align="center" style="color:blue;">검색되는 닉네임만 등록가능 (등록문의:그럴줄알고맴매챙겨따)</p>
          <p align="center" style="color:blue;">띄어쓰기에 유의해주세요!!</p>
        </div>
        <br>
        <v-container>
            <v-row justify="center">
                <v-flex xs12 sm6 md4>
                        <v-overflow-btn
                          class="my-2"
                          v-model="selectedMember"
                          :items="dropdownMember"
                          @change="changeMember()"
                          label="닉네임"
                          editable
                        >
                        </v-overflow-btn>
                      </v-flex>
            </v-row>
            <v-row justify="center">
              <v-col cols="6" md="4">
                <v-row>
                  <v-text-field
                    label="닉네임"
                    v-model="memberInfo.nickname"
                    :rules="rule_nickname"
                    ></v-text-field>
                </v-row>
                <v-row>
                  <v-text-field
                    label="투력"
                    v-model="memberInfo.power"
                    :rules="rule_number"
                    ></v-text-field>
                </v-row>
              </v-col>
            </v-row>
            <hr>
            <!-- <p align="center" ><b>★  ☆  ★  ☆  ★  ☆  ★  ☆  ★  ☆  ★</b></p>-->
            <p align="center" ><b> </b></p>
            <p align="center" ><b>다음 중 각성한 사령관에 체크해 주세요!</b></p>
            <v-container fluid fill-height class="all-border">
              <v-row justify="center">
              <b>보병 사령관</b>
              </v-row>
              <v-row>
                <v-flex v-for="c in i_commanders"
                        :key="c.image">
                  <v-checkbox v-model="c.selected" >
                    <template v-slot:label>
                      <v-col>
                        <v-row justify="center">
                          <v-img :src="getImage(c.image)"
                               max-height="50"
                               max-width="50"
                               />
                        </v-row>
                    <v-row justify="center">
                      {{ c.name }}
                    </v-row>
                      </v-col>
                    </template>
                  </v-checkbox>
                </v-flex>
              </v-row>
            </v-container>
            <v-container fluid fill-height class="all-border">
              <v-row justify="center">
              <b>기병 사령관</b>
              </v-row>
              <v-row>
                <v-flex v-for="c in c_commanders"
                        :key="c.image">
                  <v-checkbox v-model="c.selected" >
                    <template v-slot:label>
                      <v-col>
                        <v-row justify="center">
                          <v-img :src="getImage(c.image)"
                               max-height="50"
                               max-width="50"
                               />
                        </v-row>
                    <v-row justify="center">
                      {{ c.name }}
                    </v-row>
                      </v-col>
                    </template>
                  </v-checkbox>
                </v-flex>
              </v-row>
            </v-container>
            <v-container fluid fill-height class="all-border">
              <v-row justify="center">
              <b>궁병 사령관</b>
              </v-row>
              <v-row>
                <v-flex v-for="c in a_commanders"
                        :key="c.image">
                  <v-checkbox v-model="c.selected" >
                    <template v-slot:label>
                      <v-col>
                        <v-row justify="center">
                          <v-img :src="getImage(c.image)"
                               max-height="50"
                               max-width="50"
                               />
                        </v-row>
                    <v-row justify="center">
                      {{ c.name }}
                    </v-row>
                      </v-col>
                    </template>
                  </v-checkbox>
                </v-flex>
              </v-row>
            </v-container>
            <v-container fluid fill-height class="all-border">
              <v-row justify="center">
              <b>리더십 사령관</b>
              </v-row>
              <v-row>
                <v-flex v-for="c in l_commanders"
                        :key="c.image">
                  <v-checkbox v-model="c.selected" >
                    <template v-slot:label>
                      <v-col>
                        <v-row justify="center">
                          <v-img :src="getImage(c.image)"
                               max-height="50"
                               max-width="50"
                               />
                        </v-row>
                    <v-row justify="center">
                      {{ c.name }}
                    </v-row>
                      </v-col>
                    </template>
                  </v-checkbox>
                </v-flex>
              </v-row>
            </v-container>
        </v-container>
        </v-card-text>
      <v-card-actions class="j-center">
        <v-btn color="success" class="mb-2" @click="updateMember" large block >업데이트!</v-btn>  
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
export default {
  data: () => ({
    groups: [],
    members: [],
    memberInfo: {},
    selectedGroup: "",
    selectedMember: "",
    selectedCommander: "",
    msgColor: "",
    isOver: false,
    msg: "",
    rule_number: [
      value => !!value || '필수정보.',
      value => (value && Number(value) >= 1 && Number(value) <=1000000000),
      ],
    rule_nickname: [
      value => !!value || '필수정보.'
      ],
    i_commanders:[
      { "image":"alexander", "name":"알렉산더 대왕", "selected":false },
      { "image":"constantine", "name":"콘스탄티누스 1세", "selected":false },
      { "image":"guanyu", "name":"관우", "selected":false },
      { "image":"harald", "name":"하랄 3세", "selected":false },
      { "image":"leonidas", "name":"레오니다스 1세", "selected":false },
      { "image":"martel", "name":"카를 마르텔", "selected":false },
      { "image":"zenobia", "name":"제노비아", "selected":false },
      { "image":"pacal", "name":"파칼 2세", "selected":false },
      { "image":"scipio", "name":"스키피오 프라임", "selected":false },
      { "image":"flavius", "name":"아에티우스 플라비우스", "selected":false },
      { "image":"cheok", "name":"척준경", "selected":false },
      ],
    c_commanders:[
      { "image":"attila", "name":"아틸라", "selected":false },
      { "image":"chandra", "name":"찬드라굽타", "selected":false },
      { "image":"jadwiga", "name":"야드비가", "selected":false },
      { "image":"khan", "name":"칭기즈칸", "selected":false },
      { "image":"saladin", "name":"살라딘", "selected":false },
      { "image":"takeda", "name":"다케다 신겐", "selected":false },
      { "image":"william", "name":"윌리엄 1세", "selected":false },
      { "image":"xiangyu", "name":"항우", "selected":false },
      { "image":"nevsky", "name":"알렉산드르 넵스키", "selected":false },
      { "image":"zizka", "name":"얀 지슈카", "selected":false },
      { "image":"bertrand", "name":"베르트랑 뒤 게클랭", "selected":false },
      ],
    a_commanders:[
      { "image":"artemisia", "name":"아르테미시아", "selected":false },
      { "image":"nebu", "name":"네부카드네자르 2세", "selected":false },
      { "image":"ramesses", "name":"람세스 2세", "selected":false },
      { "image":"ysg", "name":"이성계", "selected":false },
      { "image":"gilgamesh", "name":"길가메시", "selected":false },
      { "image":"amanitore", "name":"아마니토레", "selected":false },
      { "image":"boudica", "name":"부디카 프라임", "selected":false },
      { "image":"henry", "name":"헨리 5세", "selected":false },
      ],
    l_commanders:[
      { "image":"mulan", "name":"화목란", "selected":false },
      { "image":"theodora", "name":"테오도라", "selected":false },
      { "image":"trajan", "name":"트라야누스", "selected":false },
      { "image":"wuzetain", "name":"측천무후", "selected":false },
      { "image":"yisunsin", "name":"이순신", "selected":false },
      { "image":"honda", "name":"혼다 타다카츠", "selected":false },
      ],
  }),
  created() {
    this.getInformation()
  },
  methods: {
    getInformation() {
      this.$http.get("api/member/").then(response => {
        this.members = response.data.data;
        console.log(response.data.data);
      });
    },
    changeMember() {
      for (var i=0; i < this.members.length; i++) {
        if (this.selectedMember === this.members[i].nickname){
          this.memberInfo = Object.assign({},this.members[i])
          var commanders = [];
          if (this.memberInfo.commanders){
            commanders = this.memberInfo.commanders.split(',');
          }
          var c_lists = ["i_commanders","c_commanders","a_commanders","l_commanders"]
          for (var k=0;k<4;k++){
            for (var j=0;j<this[c_lists[k]].length;j++){
              if (commanders.indexOf(this[c_lists[k]][j].image) != -1){
                this[c_lists[k]][j].selected = true;
              }else {
                this[c_lists[k]][j].selected = false;
              }
            }
          }
        }
      };
    },
    updateMember(){
      var c_lists = ["i_commanders","c_commanders","a_commanders","l_commanders"]
      var coms = []
      for (var k=0;k<4;k++){
        for (var j=0;j<this[c_lists[k]].length;j++){
          if (this[c_lists[k]][j].selected){
            coms.push(this[c_lists[k]][j].image)
          }
        }
      }

      const data = 
        { accountNumber:this.memberInfo.accountNumber,
          power: this.memberInfo.power,
          nickname: this.memberInfo.nickname,
          commanders: coms.join(',')
        }

      this.$http.patch("api/member/",data).then(response => {
        for (var i=0; i < this.members.length; i++) {
          if (response.accountNumber === this.members[i].accountNumber){
            this.members[i] = response;
          }
        } 
      })
    },
    register() {
      if(this.dropdownMember.indexOf(this.selectedMember) == -1) {
        this.msg = `${this.selectedMember} 는 등록되어있지 않습니다. 맴매에게 문의해주세요`
        return;
      }
      const data = { nickname: this.selectedMember, group: this.selectedGroup };
      this.$http.post("api/osiris/member", data).then(response => {
        if(response.data.msg === "OVER"){
          this.msg = '신청인원이 초과되었습니다.';
          this.isOver=true;
          alert(this.msg);
        } else if (response.data.msg === "BANALL"){
          this.msg = `${this.selectedMember}님은 이번 오시리스관에 참여하실 수 없습니다.`;
          this.isOver=true;
          alert(this.msg);
        } else if (response.data.msg === "BANLS"){
          this.msg = `${this.selectedMember}님은 LS에 신청 하실 수 없습니다.`;
          this.isOver=true;
          alert(this.msg);
        }else {
          this.msg = `${this.selectedMember} 이 ${this.selectedGroup}에 등록되었습니다.`
          this.isOver=false;
        } 
      }, error => {
        console.log(error);
      }
      );
    },
    getImage(name){
      return require("@/assets/commanders/"+name+".png") ;
    },
  },
  computed: {
    dropdownGroup() {
      return this.groups.map(group=>group.name);
    },
    dropdownMember() {
      return this.members.map(member=>member.nickname);
    }
  }
}
</script>
<style>
.all-border {
  border: 3px solid black;
}

.l-border {
  border-left: 1px dashed black;
}

.mw {
  min-width: 200px;
}
.j-center {
  justify-content: center;
}

</style>
