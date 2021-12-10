<template>
  <div class="about">
    <h1>오시리스 신청 페이지</h1>
    <v-card v-if="openOsirisRegister">
      <v-card-text>
        <div class="display-1 text--primary">
          <p>오시리스 고정팀 지원</p>
        </div>
        <div>
          <p style="color:red;">고정팀 멤버 선발은 전투력을 기준으로 총 35명(30+5)을 선발합니다</p>
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
              <p> 다음 내용은 역할 배분에 참고하기 위한 정보입니다. </p>
            <v-row>
              <p> * 다음 중 각성 혹은 각성 예정 사령관만 기입해주세요.</p>
              <p> 보병 - 콘스, 마르텔, 관우, 알렉, 레오</p>
              <p> 기병 - 아틸라, 신겐, 살라딘, 칸 </p>
              <p> 궁병 - 에드, 토미</p>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    label="사령관 정보"
                    placeholder="예> 콘스(예정), 마르텔, 관우(예정), 에드, 토미"
                    outlined
                  ></v-text-filed>
                </v-flex>
            </v-row>
            <p> 각 병종별 보유 숫자를 기입해주세요.</p>
            <v-row>
              <v-col>
                <v-text-filed
                  label="보병 - 4T"
                  label="예> 110만 / 1442550"
                ></v-text-filed>
              </v-col>
              <v-col>
                <v-text-filed
                  label="보병 - 5T"
                  label="예> 110만 / 1442550"
                ></v-text-filed>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-filed
                  label="기병 - 4T"
                  label="예> 110만 / 1442550"
                ></v-text-filed>
              </v-col>
              <v-col>
                <v-text-filed
                  label="기병 - 5T"
                  label="예> 110만 / 1442550"
                ></v-text-filed>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-filed
                  label="궁병 - 4T"
                  label="예> 110만 / 1442550"
                ></v-text-filed>
              </v-col>
              <v-col>
                <v-text-filed
                  label="궁병 - 5T"
                  label="예> 110만 / 1442550"
                ></v-text-filed>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      <v-card-actions>
        <v-btn color="success" dark class="mb-2" text @click="register">등록</v-btn>  
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
export default {
  data: () => ({
    members: [],
    selectedMember: "",
    msg: ""
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
    register() {
      if(this.dropdownMember.indexOf(this.selectedMember) == -1) {
        this.msg = `${this.selectedMember} 는 등록되어있지 않습니다. 맴매에게 문의해주세요`
        return;
      }
      const data = { nickname: this.selectedMember, group: this.selectedGroup };
      this.$http.post("api/osiris/member", data).then(response => {
          alert("고정팀 신청 완료!");
      }, error => {
        console.log(error);
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
