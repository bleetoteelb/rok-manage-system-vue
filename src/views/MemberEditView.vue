<template>
  <v-container fluid >
    <p> 본 페이지는 사람(계정)을 관리하는 페이지입니다. </p>
    <v-dialog v-model="dialog" max-width="500px">
      <template v-slot:activator="{ on }">
        <v-btn color="success" dark class="mb-2" v-on="on"> 새 계정</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headlin"> 계정 추가</span>
        </v-card-title>
        <v-card-text>
          <strong style="color:orangered;">*</strong> : 필수항목
          <v-container>
            <v-row>
              <v-col xs12 sm6 md4> 
                <v-text-field v-model="editedItem.id">
                  <template v-slot:label>
                    닉네임 <strong style="color:orangered;">*</strong>
                  </template>
                </v-text-field>
              </v-col>
              <v-col xs12 sm6 md4> 
                <v-text-field v-model="editedItem.pw">
                  <template v-slot:label>
                    전투력 <strong style="color:orangered;">*</strong>
                  </template>
                </v-text-field>
              </v-col>
              <v-col xs12 sm6 md4> 
                <v-checkbox v-model="checkAdmin" label="관리자"></v-checkbox>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
            <v-btn color="error" @click="close">Cancel</v-btn>
            <v-btn color="primary" @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-container fluid >
      <v-data-table 
                 dense 
                 :headers="headers"
                 :items="userList"
                 disable-pagination
                 :hide-default-footer="true"
                 class="elevation-1">
      </v-data-table>
    </v-container>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    userList: [],
    headers: [
      {
        text: '닉네임',
        sortable: true,
        value: 'nickname',
        width:"200px"
      },
      { text: '(8.9)전투력', align: 'end', sortable: true, value: 'power[0].value',width:"170px" },
      { text: '(8.9)4티처치', align: 'end', sortable: true, value: 'kill[0].value',width:"170px" },
      { text: '(8.9)5티처치', align: 'end', sortable: true, value: 'kill[1].value',width:"170px" },
      { text: '(8.13)4티처치', align: 'end', sortable: true, value: 'kill[2].value',width:"170px" },
      { text: '(8.13)5티처치', align: 'end', sortable: true, value: 'kill[3].value',width:"170px" },
      { text: '(8.17)4티처치', align: 'end', sortable: true, value: 'kill[4].value',width:"170px" },
      { text: '(8.17)5티처치', align: 'end', sortable: true, value: 'kill[5].value',width:"170px" },
      { text: '(8.24)4티처치', align: 'end', sortable: true, value: 'kill[6].value',width:"170px" },
      { text: '(8.24)5티처치', align: 'end', sortable: true, value: 'kill[7].value',width:"170px" },
      { text: '4티처치변동', align: 'end', sortable: true, value: 'test(kill[6].value,kill[0].value)',width:"170px" },
      { text: '5티처치변동', align: 'end', sortable: true, value: 'kill[7].value-kill[1].value',width:"170px" },
      { text: '(8.9)전사', align: 'end', sortable: true, value: 'death[0].value',width:"170px" },
      { text: '(8.13)전사', align: 'end', sortable: true, value: 'death[1].value',width:"170px" },
      { text: '(8.17)전사', align: 'end', sortable: true, value: 'death[2].value',width:"170px" },
      { text: '(8.24)전사', align: 'end', sortable: true, value: 'death[3].value',width:"170px" },
      { text: '전사변동', align: 'end', sortable: true, value: 'death[3].value-death[0].value',width:"170px" },
      { text: '(8.9)원조', align: 'end', sortable: true, value: 'give[0].value',width:"170px" },
      { text: '(8.13)원조', align: 'end', sortable: true, value: 'give[1].value',width:"170px" },
      { text: '(8.24)원조', align: 'end', sortable: true, value: 'give[2].value',width:"170px" },
      { text: '원조변동', align: 'end', sortable: true, value: 'give[2].value-give[0].value',width:"170px" },
    ],
    editedItem: [],
    checkAdmin: false,
    dialog: false,

  }),
  created() {
    this.getInformation()
    String.prototype.format = function() {
      return this+",,,,,";
    }
  },
  computed: {
    test: (a,b) => {
      console.log('asdf');
      return b-a;
    }
  },
  methods: {
    getInformation() {
      this.$http.get("api/member/").then(response => {
        this.userList = response.data.data;
      });
    },
    save() {
      console.log(this.userList[0].nickname);
      console.log(this.userList[1].power['(8.9)전투력']);
      console.log(this.userList[2]);
    },
    close() {
      this.dialog = false;
    },
    numFormat(val) {
      if(val==0) return 0;
      var reg = /(^[+-]?\d+)(\d{3})/;
      var n = (val + '');
      while (reg.test(n)) n = n.replace(reg,'$1'+','+'$2');
      return n;
    },
    stringFormat(val) {
      var num = parseFloaat(val);
      if(isNaN(num)) return "0";
      return numFormat(num);
    }
  }
}
</script>

<style>
th {
  font-size: 20px !important;
  color: rgba(237,243,247,1.0) !important;
  background-color: rgba(35,119,184,0.8) !important;
}
td {
  font-size: 15px !important;
  background-color: rgba(84,162,222,0.2) !important;
}
table th + th { border-left:1px solid #dddddd; }
table td + td { border-left:1px solid rgba(35,119,184,0.4); }
</style>
