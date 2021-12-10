<template>
  <div class="about">
    <h1>제재 내역 안내 페이지</h1>
    <v-card>
      <v-card-text>
        <div>
          <h3>각종 이벤트 위반 사항을 확인할 수 있습니다.</h3>
        </div>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="success" dark class="mb-2" v-on="on">등록하기</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headlin">제재 등록</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                    <v-overflow-btn
                      class="my-2"
                      v-model="selectedMember"
                      :items="dropdownMember"
                      label="닉네임"
                      editable
                      >
                    </v-overflow-btn>
                </v-row>
                <v-row>
                    <v-overflow-btn
                      class="my-2"
                      v-model="selectedReason"
                      :items="dropdownReason"
                      label="사유"
                      editable
                      >
                    </v-overflow-btn>
                </v-row>
                <v-row v-if="selectedReason==='기타'">
                  <v-text-field v-model="etcReason">
                    <template v-slot:label>
                      사유를 적어주세요.
                    </template>
                  </v-text-field>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-btn color="success" dark class="mb-2" text @click="register">등록</v-btn>  
            </v-card-actions>
          </v-card>
        </v-dialog>
        <br>
        <br>
        <div>
          <h3>현재 제재 내역</h3>
          <v-row v-if="v_members.length > 0">
            <v-data-table
              dense
              :headers="headers"
              :items="v_members"
              disable-pagination
              :hide-default-footer="true"
              class="elevation-1">
              <template v-slot:item.delete="{item}">
                <v-icon @click="deleteViolateMember(item)">mdi-delete</v-icon>
              </template>
            </v-data-table>
            </v-for>
          </v-row>
          <v-row v-else>
            <p>현재 제재 인원 없음</p>
          </v-row>
        </div>
        </v-card-text>
        </v-card>
  </div>
</template>
<script>
export default {
  data: () => ({
    groups: [],
    members: [],
    v_members: [],
    dialog: false,
    selectedMember: "",
    selectedGroup: "",
    selectedReason: "",
    etcReason: "",
    dropdownReason:[
      "오시리스 경기 불참",
      "오시리스 디스코드 불참",
      "기타"
      ],
    headers: [
      { text: "닉네임", sortable: true, value: 'nickname'},
      { text: "사유", sortable: true, value: 'reason'},
      { text: "세부사유", sortable: true, value: 'etcReason'},
      { text: "생성일", sortable: true, value: 'createdAt'},
      { text: "삭제", value: 'delete'},
      ],
    msgColor: "",
    isOver: false,
    msg: ""
  }),
  created() {
    this.getInformation();
    this.getViolate();
  },
  methods: {
    getInformation() {
      this.$http.get("api/member/").then(response => {
        this.members = response.data.data;
        console.log(response.data.data);
      });
    },
    getViolate(){
      this.$http.get("api/violate/").then(response => {
        this.v_members = response.data.data;
        console.log(response.data.data);
      });
    },
    deleteViolateMember(item){
      console.log(item._id);
      this.$http({url:"api/violate/",method:'DELETE', data:{_id:item._id}}).then(response => {
        this.getViolate();
      });
    },
    register() {
      if(this.dropdownMember.indexOf(this.selectedMember) == -1) {
        alert(`${this.selectedMember} 는 등록되어있지 않습니다. 맴매에게 문의해주세요`)
        return;
      }
      if(this.selectedReason == ""){
        alert('사유를 선택해주세요.');
        return;
      }
      if(this.selectedReason === '기타' && this.etcReason === ""){
        alert('사유를 적어주세요');
        return;
      }
      let an = this.members.find(e=>e.nickname===this.selectedMember);
      const data = { 
        nickname: this.selectedMember,
        accountNumber: an.accountNumber,
        reason: this.selectedReason
      };
      if (this.selectedReason === "기타"){
        data["etcReason"] = this.etcReason;
      }
      this.$http.post("api/violate/", data).then(response => {
        this.dialog = false;
        this.getViolate();
      }, error => {
        console.log(error);
        alert(error);
      }
      );
    }
  },
  computed: {
    dropdownMember() {
      return this.members.map(member=>member.nickname);
    }
  }
}
</script>
