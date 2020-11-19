<template>
  <div class="about">
    <h1>오시리스 신청 페이지</h1>
    <div>현재 임시 디자인입니다.</div>
    <v-card v-if="openOsirisRegister">
      <v-card-text>
        <div class="display-1 text--primary">
          <p>오시리스 관</p>
        </div>
        <div>
          <p style="color:red;">LS는 고정멤버만 신청 가능</p>
          <p>-------[ 65LS : 일 (11/22) 23시 ]-------</p>
          <p>-------[ 65MH : 일 (11/22) 21시 ]-------</p>
          <p>-------[ 65AP : 토 (11/21) 22시 ]-------</p>
          <p>-------[ 65NH : 토 (11/21) 23시 ]-------</p>
        </div>
        <br>
        <br>
        <div>
          <p style="color:blue;">검색되는 닉네임만 등록가능 (등록문의:그럴줄알고맴매챙겨따)</p>
          <p style="color:blue;">띄어쓰기에 유의해주세요!!</p>
          <p style="color:red;">등록을 취소하려면, 연맹을 선택하지 않고 등록버튼을 눌러주세요!</p>
        </div>
        <br>
        <v-container>
            <v-row>
                <v-flex xs12 sm6 md4>
                        <v-overflow-btn
                          class="my-2"
                          v-model="selectedMember"
                          :items="dropdownMember"
                          label="닉네임"
                          editable
                        >
                        </v-overflow-btn>
                      </v-flex>
            </v-row>
            <v-row>
                <v-flex xs12 sm6 md4>
                        <v-overflow-btn
                          class="my-2"
                          v-model="selectedGroup"
                          :items="dropdownGroup"
                          label="연맹 선택"
                          editable
                        >
                        </v-overflow-btn>
                      </v-flex>
            </v-row>
          </v-container>
        </v-card-text>
      <v-card-actions>
        <v-btn color="success" dark class="mb-2" text @click="register">등록</v-btn>  
      </v-card-actions>
      <div v-if="isOver" class="red lighten-3 white--text">
       {{ msg }}
      </div>
      <div v-else class="green lighten-3 white--text">
       {{ msg }}
      </div>
    </v-card>
    <v-card v-else>
      <v-card-title>
          <span class="headlin"> 오시리스 등록기간이 아닙니다.</span>
      </v-card-title>
    </v-card>
  </div>
</template>
<script>
export default {
  data: () => ({
    groups: [],
    members: [],
    selectedGroup: "",
    selectedMember: "",
    openOsirisRegister: false,
    msgColor: "",
    isOver: false,
    msg: ""
  }),
  created() {
    this.getInformation()
  },
  methods: {
    getInformation() {
      this.$http.get("api/osiris/group").then(response => {
        this.groups = response.data.data;
        console.log(response.data.data);
      });
      this.$http.get("api/member/").then(response => {
        this.members = response.data.data;
        console.log(response.data.data);
      });
      this.$http.get("api/config").then(response => {
        this.openOsirisRegister = response.data.data.openOsirisRegister;
        console.log(response.data.data);
      });
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
          alert('신청인원이 초과되었습니다.');
        } else {
          this.msg = `${this.selectedMember} 이 ${this.selectedGroup}에 등록되었습니다.`
          this.isOver=false;
        } 
      }, error => {
        console.log(error);
      }
      );
    }
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
