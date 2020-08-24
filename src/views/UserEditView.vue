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
          <v-contianer>
            <v-row>
              <v-col xs12 sm6 md4> 
                <v-text-field v-model="editedItem.id">
                  <template v-slot:label>
                    아이디 <strong style="color:orangered;">*</strong>
                  </template>
                </v-text-field>
              </v-col>
              <v-col xs12 sm6 md4> 
                <v-text-field v-model="editedItem.pw">
                  <template v-slot:label>
                    비밀번호 <strong style="color:orangered;">*</strong>
                  </template>
                </v-text-field>
              </v-col>
              <v-col xs12 sm6 md4> 
                <v-checkbox v-model="checkAdmin" label="관리자"></v-checkbox>
              </v-col>
            </v-row>
          </v-contianer>
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
        <template slot="items" slot-scope="props">
          <td>{{ props.item._id }}</td>
          <td>{{ props.item.id }} </td>
          <td> <p>getAdmin(props.item.role) </p></td>
          <td>{{ props.item.member }} </td>
        </template>
      </v-data-table>
    </v-container>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    userList: [],
    headers: [
      { text: '_id', value: '_id', width:"150px" },
      {
        text: '아이디',
        sortable: true,
        value: 'id',
        width:"200px"
      },
      { text: '관리자', value: 'admin',width:"100px" },
      { text: '계정', value: 'member',width:"500px" },
    ],
    editedItem: [],
    checkAdmin: false,
    dialog: false,

  }),
  created() {
    this.getInformation()
  },
  methods: {
    getInformation() {
      console.log("done");
      this.$http.get("api/user/").then(response => {
        this.userList = response.data.data;
        console.log(this.userList);
      });
    },
    save() {
    
    },
    close() {
      this.dialog = false;
    },
    getAdmin(item) {
      console.log("asdf");
      if(item && item === "admin") return "Yes";
      return "No";
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
