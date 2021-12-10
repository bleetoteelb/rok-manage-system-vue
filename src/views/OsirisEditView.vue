<template>
  <v-container fluid >
    <p> 본 페이지는 오시리스를 관리하는 페이지입니다. </p>
    <v-switch 
      :label="`- 오시리스 명단 ${openOsiris?'공개':'비공개'}`"
      v-model="openOsiris"
      @change="changeOpenOsiris()">
    </v-switch>
    <v-switch 
      :label="`- 오시리스 등록 ${openOsirisRegister?'가능':'불가능'}`"
      v-model="openOsirisRegister" @change="changeOsirisRegister()"></v-switch>
    <v-btn color="error" dark class="mb-2" @click="deleteAll">모든 신청정보 초기화</v-btn>
    <v-dialog v-model="dialog" max-width="500px">
      <template v-slot:activator="{ on }">
        <v-btn color="success" dark class="mb-2" v-on="on"> 오시 연맹 추가</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headlin"> 오시리스 추가 </span>
        </v-card-title>
        <v-card-text>
          <strong style="color:orangered;">*</strong> : 필수항목
          <v-contianer>
            <v-row>
              <v-col xs12 sm6 md4> 
                <v-text-field v-model="editedItem.name">
                  <template v-slot:label>
                    연맹명 <strong style="color:orangered;">*</strong>
                  </template>
                </v-text-field>
              </v-col>
              <v-col xs12 sm6 md4> 
                <v-text-field v-model="editedItem.time">
                  <template v-slot:label>
                    오시리스 시간 <strong style="color:orangered;">*</strong>
                  </template>
                </v-text-field>
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
    <v-container fluid>
    <v-data-table 
                   dense 
                   :headers="headers"
                   :items="groups"
                   disable-pagination
                   :hide-default-footer="true"
                   class="elevation-1">
      <template v-slot:item.delete="{ item }">
          <v-icon @click="editItem(item)">mdi-pencil</v-icon>
          /
          <v-icon @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
    </v-container>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    _id: "",
    groups: [],
    headers: [
      { text: '연맹명', value: 'name', width:"200px" },
      { text: '오시리스 시간', value: 'time',width:"100px" },
      { text: '삭제', value: 'delete',width:"100px" }
    ],
    editedItem: {},
    editedIndex: -1,
    defaultItem: {},
    openOsiris: false,
    openOsirisRegister: false,
    osirisPower: "",
    powerList: "",
    checkAdmin: false,
    dialog: false,

  }),
  created() {
    this.getInformation()
  },
  methods: {
    getInformation() {
      console.log("done");
      this.$http.get("api/osiris/group").then(response => {
        this.groups = response.data.data;
        console.log(response.data.data);
      });
      this.$http.get("api/config").then(response => {
        this._id = response.data.data._id;
        this.osirisPower = response.data.data.osirisPower;
        this.openOsiris = response.data.data.openOsiris;
        this.openOsirisRegister = response.data.data.openOsirisRegister;
        console.log(response.data.data);
      });
      this.$http.get("api/showlist/power").then(response => {
        this.powerList = response.data.data.list;
      });
    },
    editItem(item) {
      this.editedIndex = this.groups.indexOf(item);
      this.editedItem = Object.assign({},this.groups[this.editedIndex]);
      this.dialog = true;
    },
    deleteItem(item) {
      const data = { _id: item._id };
      console.log(data);
      this.$http({url: "api/osiris/group", method: 'DELETE', data:  data}).then(response => {
        const index = this.groups.indexOf(item);
        this.groups.splice(index, 1);
      }, error => {
        console.log(error);
      });
    },
    changeOsirisRegister(){
      const data = {openOsirisRegister: this.openOsirisRegister,_id:this._id};
      this.$http.patch("api/config", data).then(response => {
        console.log(response.data.data);
      }, error => {
        console.log(error);
      });
    },
    changeOpenOsiris(){
      const data = {openOsiris: this.openOsiris,_id:this._id};
      this.$http.patch("api/config", data).then(response => {
        console.log(response.data.data);
      }, error => {
        console.log(error);
      });
    },
    deleteAll(){
      this.$http.get("api/osiris/member/init").then(response => {
        console.log(response.data.data);
      }, error => {
        console.log(error);
      });
    },

    save() {
      if(this.editedIndex > -1 ) {
        this.$http.patch("api/osiris/group", this.editedItem).then(response => {
          console.log(response.data.data);
          Object.assign(this.groups[this.editedIndex],this.editedItem);
          this.close();
        }, error => {
          console.log(error);
        });
      } else {
        this.$http.post("api/osiris/group", this.editedItem).then(response => {
          console.log(response.data.data);
          this.groups.push(response.data.data);
          this.close();
        }, error => {
          console.log(error);
        });
      }

    },
    close() {
      this.dialog = false;
      this.editedItem = Object.assign({}, this.defaultItem); 
      this.editedIndex = -1;
    },
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
