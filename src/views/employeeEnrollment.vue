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
                    <div>
                        <b-card no-body>
                            <b-tabs  justified >

                                <b-tab active >
                                    <template #title style="background:green">
                                      <strong style="font-size:16px;">Personal Information</strong><br /><span style="font-size:10px;"> Register Employee Information </span>
                                    </template>
                                    <b-card>
                                        <PersonalInfo/>
                                    </b-card>
                                </b-tab>
                                <b-tab> <template #title>
                                       <strong style="font-size:16px;">Next Of Kin</strong><br /><span style="font-size:10px;"> Next of kin Information </span>
                                    </template>
                                    <b-card><NextOfKin/></b-card>
                                </b-tab>
                                <b-tab> <template #title>
                                      <strong style="font-size:16px;">Education</strong><br /><span style="font-size:10px;"> Employee Education Qualification </span>
                                    </template>
                                    <b-card-text><Education/></b-card-text>
                                </b-tab>
                                <b-tab> <template #title>
                                      <strong style="font-size:16px;">Employment Status</strong><br /><span style="font-size:10px;"> Employment Details </span>
                                    </template>
                                    <b-card-text><EmployeeStatus/></b-card-text>
                                </b-tab>
                                <b-tab> <template #title>
                                      <strong style="font-size:16px;">Employee Bank Information</strong><br /><span style="font-size:10px;"> Employee Fund Details </span>
                                    </template>
                                    <b-card-text>Tab contents 2</b-card-text>
                                </b-tab>
                                 <b-tab> <template #title>
                                      <strong style="font-size:16px;">Registration Complete</strong><br /><span style="font-size:10px;">Completed </span>
                                    </template>
                                    <b-card-text>Tab contents 2</b-card-text>
                                </b-tab>

                            </b-tabs>
                        </b-card>
                    </div>
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
                Allowance
            </div>
            <div class="px-8 pt-3 pb-12">
                <v-card-text style="font-size: 16px; font-weight: bolder" class="mb-3" densed>
                    Add Unit Allowance
                </v-card-text>
                <v-form>
                    <v-select v-model="salary_regime" :items="Salaryitems" label="Salary Scale Regime" outlined></v-select>
                    <v-select v-model="allowance_name" :items="Allowanceitems" label="Allowance Name*" outlined></v-select>

                    <v-select v-model="value_type" :items="Allowanceitems" label="Value Type" outlined></v-select>
                    <v-text-field label="Fixed Amount percentage Basic" type="number" outlined></v-text-field>
                    <div>
                        <v-select v-model="Appplication_level" :items="Allowanceitems" label="Application Level" outlined></v-select>

                        <div>
                            <v-text-field v-model="search" class="mb-6" append-icon="mdi-magnify" label="Search" single-line hide-details outlined></v-text-field>
                            <v-select v-model="Appplication_level" :items="Allowanceitems" label="Department" outlined></v-select>
                            
                            <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="from" transition="scale-transition" offset-y min-width="auto">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field label="Start Date:" v-model="from" class="date" append-outer-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" outlined></v-text-field>

                                </template>
                                <v-date-picker v-model="from" no-title scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="menu = false">
                                        Cancel
                                    </v-btn>
                                    <v-btn text color="primary" @click="$refs.menu.save(from)">
                                        OK
                                    </v-btn>
                                </v-date-picker>
                            </v-menu>
                            <v-menu ref="menuu" v-model="menuu" :close-on-content-click="false" :return-value.sync="to" transition="scale-transition" offset-y min-width="auto">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field v-model="to" class="date" label="End Date:" append-outer-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                                </template>
                                <v-date-picker v-model="to" no-title scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary pt-6" @click="menuu = false">
                                        Cancel
                                    </v-btn>
                                    <v-btn text color="primary" @click="$refs.menuu.save(to)">
                                        OK
                                    </v-btn>
                                </v-date-picker>
                            </v-menu>
                        </div>
                        <div></div>
                    </div>
                    <v-btn block color="#17517E" style="color: #fff" class="pa-6" @click="createAllowance">
                        Add/Update
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
import EmployeeStatus from "../components/EmploymentStatus.vue";
import Education from "../components/Education.vue";
import PersonalInfo from "../components/personalInfo.vue";
import NextOfKin from "../components/nextOfKin.vue";

import {
    mapGetters
} from "vuex";

export default {
    components: {
        EmployeeStatus,
        Education,
        PersonalInfo,
        NextOfKin,
    },
    data() {
        return {
            allowance_name: "",
            salary_regime: "",
            allowance: "",
            department1: false,
            dialog: false,
            dialog2: false,
            Allowanceitems: [],
            Salaryitems: [],
            headers: [{
                    text: "Action",
                    value: "more",
                },
                {
                    text: "Regime",
                    value: "regime",
                },
                {
                    text: "Allowance Name",
                    value: "alowance_name",
                },
                {
                    text: "Amount Percentage",
                    value: "amount_percentage",
                },
                {
                    text: "Application Level",
                    value: "application_level",
                },
                {
                    text: "Value Type",
                    value: "value_type",
                },
                {
                    text: "Applies To",
                    value: "applies_to",
                },
                {
                    text: " Life Line",
                    value: "life_line",
                },
                {
                    text: " Active Status",
                    value: "status",
                },
                {
                    text: "Added By",
                    value: "added_by",
                },
                {
                    text: " Added on",
                    value: "added_on",
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
