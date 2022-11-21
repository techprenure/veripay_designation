<template>
<div class="">
    <h4 style="font-weight: bolder" class="pa-5">Employee Registration</h4>
    <v-card>
        <v-row>
            <v-col cols="12">
                <div class="_header px-10 pt-5">
                    <h4 style="font-size: 18px">
                        Employee Information
                    </h4>

                    <div>
                         <v-btn style="font-size: 13px; background-color: #F2F9FF; color: #17517e" elevation="0" @click="dialog2 = true">Setup Next Level Approval</v-btn>
                    </div>
                </div>
            </v-col>
            <v-col cols="12">
                <div>
                    <v-card elevation="0">
                        <v-card-title class="px-10">
                            <v-row>
                                <v-col cols="12">
                                    <!-- <v-text-field
                      v-model="search"
                      append-icon="mdi-magnify"
                      label="Search"
                      single-line
                      hide-details
                      outlined
                    ></v-text-field> -->

                                </v-col>
                            </v-row>
                        </v-card-title>
                        <v-data-table :headers="headers" class="table-striped" :items="items">
                            <template v-slot:item.status="{ item }">
                                <v-btn style="color: red;  font-size:10px;text-transform: capitalize" text v-if="item.status" @click="allowance_status(item)"></v-btn>
                                <v-btn v-else style="color: green;  font-size:10px;text-transform: capitalize" text @click="allowance_status(item)">Activate</v-btn>
                            </template>

                            <template v-slot:item.more="{ item }">
                                <v-menu offset-y>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn color="primary" text v-bind="attrs" v-on="on">
                                            <img src="../../public/Vector.svg" alt="">
                                        </v-btn>
                                    </template>
                                    <v-list>
                                        <v-btn text block @click="edit(item)">
                                            <v-list-item>Edit</v-list-item>
                                        </v-btn>
                                        <v-btn text block @click="deleteAllowance(item)">
                                            <v-list-item>Delete</v-list-item>
                                        </v-btn>
                                    </v-list>
                                </v-menu>
                            </template>
                        </v-data-table>
                    </v-card>
                </div>
            </v-col>
        </v-row>
    </v-card>
    <!-- <v-dialog v-model="dialog" width="400" persistent>
      <v-card class="text-center" style="text-align: center">
        <div
          class="text-h6 text-center pa-4"
          style="
            display: flex;
            justify-content: space-between;
            background-color: #f2f9ff;
            color: #17517e;
          "
        >
          <h4>Add Allowance Name</h4>
          <v-btn
            @click="dialog = false"
            text
            style="color: red; font-size: 12px; font-weight: 600"
            >Close</v-btn
          >
        </div>
        <div class="px-8 pt-3 pb-12">
          <v-card-text
            style="font-size: 16px; font-weight: bolder"
            class="mb-3"
            densed
          >
            Create a new allowance name
          </v-card-text>
          <v-form>
            <v-text-field
              block
              label="Allowance Name"
              v-model="allowance"
              outlined
            >
            </v-text-field>
            <v-btn
              block
              color="#17517E"
              style="color: #fff"
              class="pa-6"
              @click="createAllowanceName"
            >
              Submit
            </v-btn>
          </v-form>
        </div>
      </v-card>
    </v-dialog> -->
    <v-dialog v-model="dialog2" width="500">
        <v-card class="text-center" style="text-align: center">
            <div class="text-h6 text-center pa-4" style="background-color: #f2f9ff; color: #17517e">
                Next Level Setting Approval Limit
                <span style="margin-left:30px">
                    <a href="#">
                        <img src="../assets/close.png" alt="" @click="dialog2=false" />
                    </a>
                </span>
            </div>
            <div class="px-8 pt-3 pb-12">

                <v-form>
                    <v-select v-model="salary_regime" :items="Salaryitems" label="Institution" outlined></v-select>
                    <v-select v-model="allowance_name" :items="Allowanceitems" label="Next Level Settings Approval" outlined></v-select>
                    <v-select v-model="allowance_name" :items="Allowanceitems" label="No.of Approvers" outlined></v-select>
<v-select></v-select>
                    <v-select v-model="value_type" :items="Allowanceitems" label="Sub Admin" outlined></v-select>

                    <v-btn block color="#17517E" style="color: #fff" class="pa-6" @click="addSettings">
                        Add Setting
                    </v-btn>
                </v-form>
            </div>
        </v-card>
    </v-dialog>
    <v-dialog v-model="dialog3" width="500">
        <v-card class="text-center" style="text-align: center">
            <div class="text-h6 text-center pa-4" style="background-color: #f2f9ff; color: #17517e">
                Next Level Setting Approval Limit
                <span style="margin-left:30px">
                    <a href="#">
                        <img src="../assets/close.png" alt="" @click="dialog3=false" />
                    </a>
                </span>
            </div>
            <div class="px-8 pt-3 pb-12">
                 <v-form>
                    <v-select v-model="salary_regime" :items="Salaryitems" label="Next Level Approval Limit" outlined></v-select>
                    <v-select v-model="allowance_name" :items="Allowanceitems" label="No.of Approvers" outlined></v-select>
                    <v-select v-model="allowance_name" :items="Allowanceitems" label="Sub Admin" outlined></v-select>

                    <v-btn block color="#17517E" style="color: #fff" class="pa-6" @click="dialog3=false">
                        Add Setting2
                    </v-btn>
                </v-form>
            </div>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
// import axios from "axios";
// import Swal from "sweetalert2";
import {
    mapGetters
} from "vuex";

export default {
    data() {
        return {
            allowance_name: "",
            salary_regime: "",
            allowance: "",
            department1: false,
            dialog3:false,
            dialog: false,
            dialog2: false,
            Allowanceitems: [],
            Salaryitems: [],
            headers: [{
                    text: "Action",
                    value: "more",
                },
                {
                    text: "Institution",
                    value: "regime",
                },
                {
                    text: "No.of Approvers",
                    value: "alowance_name",
                },
                {
                    text: "No.of Recruitment Approvers",
                    value: "amount_percentage",
                },

            ],
            items: [{
                    regime: "south 01",
                    alowance_name: "Transport",
                    amount_percentage: "10",
                    application_level: "Structure",
                    value_type: "Percentage of basic",
                    applies_to: "cto",
                    life_line: "Unlimited",
                    added_by: "Big Tee",
                    added_on: "2nd march 2022",
                },
                {
                    regime: "south 01",
                    alowance_name: "Transport",
                    amount_percentage: "10",
                    application_level: "Structure",
                    value_type: "Percentage of basic",
                    applies_to: "cto",
                    life_line: "Unlimited",
                    added_by: "Big Tee",
                    added_on: "2nd march 2022",
                },
                {
                    regime: "south 01",
                    alowance_name: "Transport",
                    amount_percentage: "10",
                    application_level: "Structure",
                    value_type: "Percentage of basic",
                    applies_to: "cto",
                    life_line: "Unlimited",
                    added_by: "Big Tee",
                    added_on: "2nd march 2022",
                }, {
                    regime: "south 01",
                    alowance_name: "Transport",
                    amount_percentage: "10",
                    application_level: "Structure",
                    value_type: "Percentage of basic",
                    applies_to: "cto",
                    life_line: "Unlimited",
                    added_by: "Big Tee",
                    added_on: "2nd march 2022",
                },
            ],
            allowances: null,
            regimes: null,
            allowanceItem: [],
        };
    },

    beforeMount() {
        // this.populateAllowanceName();
        // this.populateSalarayRegime();
        // this.populateAlowance();
    },

    watch: {

    },
    computed: {
        ...mapGetters({
            jwt: "getJwt",
            instu_code: "getInstuCode",
            baseURL: "baseURL"
        }),
    },
    methods: {
    addSettings(){
        this.dialog2 = false;
        this.dialog3 = true;
      
    }

    },
};
</script>

<style>
._header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>
