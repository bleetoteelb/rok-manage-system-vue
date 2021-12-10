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
                <v-text-field v-model="editedItem.nickname">
                  <template v-slot:label>
                    닉네임 <strong style="color:orangered;">*</strong>
                  </template>
                </v-text-field>
              </v-col>
              <v-col xs12 sm6 md4> 
                <v-text-field v-model="editedItem.key">
                  <template v-slot:label>
                    전투력key <strong style="color:orangered;">*</strong>
                  </template>
                </v-text-field>
              </v-col>
              <v-col xs12 sm6 md4> 
                <v-text-field v-model="editedItem.power">
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
      <template v-slot:item.group="{ item }">
          <tr>
        <td>
        <span v-if="item.group">{{ item.group }} </span>
        <v-icon v-if="item.group" @click="deleteMemberGroup(item)">mdi-delete</v-icon>
        </td>
          </tr>
      </template>
      <!--
      <template v-slot:item.edit="{ item }">
        <v-icon @click="editMember(item)">mdi-pencil</v-icon>
        /
        <v-icon @click="deleteMember(item)">mdi-delete</v-icon>
      </template>
      -->
      </v-data-table>
    </v-container>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    userList: [],
    headers: [
      { text: '_id', align: 'end', sortable: true, value: '_id',width:"170px" },
      { text: '고유번호', align: 'end', sortable: true, value: 'accountNumber',width:"170px" },
      {
        text: '닉네임',
        sortable: true,
        value: 'nickname',
        width:"200px"
      },
      { text: '오시그룹', align: 'end', sortable: true, value: 'group',width:"170px" },
      { text: '12.04', align: 'end', sortable: true, value: 'power[0].value',width:"170px" },
      { text: '편집/삭제', sortable: true, value: 'edit',width:"170px" },
    ],
    editedItem: {
      nickname: "",
      key: "",
      power: ""
    },
    editedIndex: -1,
    defaultItem: {},
    checkAdmin: false,
    dialog: false,

  }),
  created() {
    this.getInformation()
  },
  computed: {
    test: (a,b) => {
      return b-a;
    }
  },
  methods: {
    getInformation() {
      this.$http.get("api/member/").then(response => {
        this.userList = response.data.data;
      });
      this.$http.get("api/showlist/").then(response => {
        this.userList = response.data.data;
      });
    },
    save() {
      this.$http.post("api/member/", this.editedItem).then(response => {
        console.log(response.data.data);
        this.userList.push(this.editeItem);
        this.dialog=false;
      }, error => {
        console.log(error);
      });
    },
    close() {
      this.dialog = false;
    },
    deleteMemberGroup(item) {
      this.$http({url:"api/osiris/member", method: 'DELETE', data: {_id: item._id}}).then(response => {
        this.dialog=false;
      }, error => {
        console.log(error);
      });
    },
    deleteMember(item) {
      this.$http({url:"api/member", method: 'DELETE', data: {_id: item._id}}).then(response => {
        this.dialog=false;
      }, error => {
        console.log(error);
      });
    },
    editMember(item) {
      patchMember()
    },
    patchMember() {
      this.$http({url:"api/member", method: 'PATCH', data: {_id: item._id}}).then(response => {
        this.dialog=false;
      }, error => {
        console.log(error);
      });
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
