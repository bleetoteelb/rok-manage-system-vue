<template>
  <v-container fluid v-if="openOsiris">
    <p> 본 페이지는 오시리스를 확인하는 페이지입니다. </p>
    <div>현재 임시 디자인입니다.</div>
    <v-data-iterator
      :items="groups"
      hide-default-footer
    >
      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="group in props.items"
            :key="group.name"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card>
              <v-card-title class="subheading font-weight-bold">{{ `${group.name} - ${group.time} - ${group.members.length}명`}}</v-card-title>

              <v-divider></v-divider>

              <v-list dense >
                <v-list-item class="my-tile" v-for="member in group.members" :key="member.nickname">
                  <v-list-item-content inline> 
                    <div>
                    {{ member.nickname }} <span style="color:#BFBFBF"> - {{ addComma(member.power) }} </span>
                    </div>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
  <v-container v-else>
    <p> 본 페이지는 오시리스를 확인하는 페이지입니다. </p>
    <div class="red--text">현재 인원을 조회할 수 없습니다.. 임원에게 문의해 주세요!</div>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    groups: [],
    openOsiris: false,
  }),
  created() {
    this.getInformation()
  },
  methods: {
    getInformation() {
      this.$http.get("api/osiris/member").then(response => {
        this.groups = response.data.data;
        console.log(response.data.data);
      });
      this.$http.get("api/config").then(response => {
        this.openOsiris = response.data.data.openOsiris;
        console.log(response.data.data);
      });
    },
    editItem(item) {
      this.editedIndex = this.groups.indexOf(item);
    },
    deleteItem(item) {

    },
    save() {
          
    },
    addComma(power) {
      const newone = (power.find(e => e.key === "(9.7)전투력"));
      if (newone) {
        const num = newone.value;
        var reg = /\B(?=(\d{3})+(?!\d))/g;
        return num.toString().replace(reg,',');
      } else {
        return "NaN";
      }
    },
    close() {
      this.dialog = false;
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

.my-tile {
}
</style>
