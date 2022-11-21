<template>
<div class="">
    <h4 style="font-weight: bolder" class="pa-5">Deduction Exclusion</h4>
    <v-card>
        <v-row>
            <v-col cols="12">
                <div class="_header px-10 pt-5">
                    <h4 style="font-size: 18px">
                        Deduction Exclusion - Approved List
                    </h4>
                    <div>
                        <v-btn style="font-size: 13px; background-color: #17517e; color: #fff" elevation="0" @click="dialog2 = true">Add New</v-btn>
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
                                    <div class="py-3 px-7 _flex-space-btw rounded" style="
                        background: #fee9e9;
                        color: #dd5f5f;
                        font-size: 13px;
                      ">
                                        <span>
                                            <img src="../assets/alert.png" class="mr-3" alt="" />
                                            Info! Action done here might not take effect until a next level approval is enabled for this institution.
                                        </span>
                                        <span>
                                            <a href="#">
                                                <img src="../assets/close.png" alt="" />
                                            </a>
                                        </span>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-card-title>
                        <v-data-table :headers="headers" class="table-striped" :items="items">

                            <template v-slot:item.status="{ item }">
                                <v-btn style="color: red; font-size:10px; text-transform: capitalize" text v-if="item.status = false" @click="status(item)">Dactivate</v-btn>
                                <v-btn v-else style="color:green;  font-size:10px; text-transform: capitalize" text @click="status(item)">Activate</v-btn>
                            </template>
                            <template v-slot:item.views="{item}">
                                <v-btn style="color:green;  font-size:10px; text-transform: capitalize" text @click="viewz(item)"><img src="../../public/view.svg" alt=""></v-btn>
                            </template>
                            <v-dialog transition="dialog-top-transition" max-width="600">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn color="primary" v-bind="attrs" v-on="on">From the top</v-btn>
                                </template>
                                <template v-slot:default="dialog">
                                    <v-card>
                                        <v-toolbar color="primary" dark>Opening from the top</v-toolbar>
                                        <v-card-text>
                                            <div class="text-h2 pa-12">Hello world!</div>
                                        </v-card-text>
                                        <v-card-actions class="justify-end">
                                            <v-btn text @click="dialog.value = false">Close</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </template>
                            </v-dialog>
                            <v-dialog v-model="viewdialog" width="500">
                              
                            </v-dialog>

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
                                        <v-btn text block @click="deleteN(item)">
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
    <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card class="text-center" style="text-align: center">
                                    <div class="text-h6 text-center pa-4" style="background-color: #f2f9ff; color: #17517e">
                                        view Exclusions
                                        <span style="margin-left:30px">
                                            <a href="#">
                                                <img src="../assets/close.png" alt="" @click="dialog=false" />
                                            </a>
                                        </span>
                                    </div>
                                    <div class="px-8 pt-3 pb-12 py-0 m-0 text-left">
                                        <v-row>

                                            <v-col cols="4" class="">Regime</v-col>
                                            <v-col cols="8">{{addAllowanceExclusionItem.regime}}</v-col>
                                            <v-col cols="4" style="background:#F8F8F8">Allowance Name</v-col>
                                            <v-col cols="8" style="background:#F8F8F8">{{addAllowanceExclusionItem.alowance_name}}</v-col>
                                            <v-col cols="4">Application Type</v-col>
                                            <v-col cols="8">{{addAllowanceExclusionItem.appliication_level}}</v-col>
                                            <v-col cols="4" style="background:#F8F8F8">Applies To</v-col>
                                            <v-col cols="8" style="background:#F8F8F8">{{addAllowanceExclusionItem.appliication_level}}</v-col>
                                            <v-col cols="4">Active Status</v-col>
                                            <v-col cols="8">{{addAllowanceExclusionItem.status}}</v-col>
                                            <v-col cols="4" style="background:#F8F8F8">Entered By</v-col>
                                            <v-col cols="8" style="background:#F8F8F8">{{addAllowanceExclusionItem.enterby}}</v-col>
                                            <v-col cols="4">Entered On</v-col>
                                            <v-col cols="8">{{addAllowanceExclusionItem.enteron}}</v-col>
                                        </v-row>

                                    </div>
                                </v-card>
    </v-dialog>
    <v-dialog v-model="dialog2" width="500">
        <v-card class="text-center" style="text-align: center">
            <div class="text-h6 text-center pa-4" style="background-color: #f2f9ff; color: #17517e">
               Deduction
            </div>
            <div class="px-8 pt-3 pb-12">
                <v-card-text style="font-size: 16px; font-weight: bolder" class="mb-3" densed>
                    Add Deduction Exclusion
                </v-card-text>
                <v-form>
                    <!-- <v-select v-model="salary_regime" :items="Salaryitems" label="" outlined></v-select>
                    <v-select v-model="deduction_name
                    " :items="Allowanceitems" label="Allowance Name*" outlined></v-select>

                    <v-select v-model="value_type" :items="Allowanceitems" label="Value Type" outlined></v-select>
                    <v-text-field label="Fixed Amount percentage Basic" type="number" outlined></v-text-field>
                    -->
                    <div>
                        <!-- <v-select v-model="value" :items="items" chips label="Chips" multiple solo></v-select> -->
                        <div>
                            <div class='d-flex flex-column input-holder py-2 my-4'>
                                <span class='input-title'>Salary Scale Regime
                                    <span>*</span>
                                </span>
                                <v-row>
                                    <v-col class="col-10"> <select v-model="salary_scale_regime" placeholder="Salary Scale Regime" style="width:100%">
                                            <option v-for="item in SalaryRegime" :key="item.value" v-bind:value="item.value">{{item.text}}</option>
                                        </select></v-col>
                                    <v-col class="col-2"> <img src="../../public/select.svg" alt=""></v-col>
                                </v-row>

                            </div>
                            <div class='d-flex flex-column input-holder py-2 my-4'>
                                <span class='input-title'>Deduction Name
                                    <span>*</span>
                                </span>
                                <v-row>
                                    <v-col class="col-10"> <select v-model="deduction_name
                                    " placeholder="Allowance Name" style="width:100%">
                                            <option v-for="item in deductionitems" :key="item.value" v-bind:value="item.value">{{item.text}}</option>
                                        </select></v-col>
                                    <v-col class="col-2"> <img src="../../public/select.svg" alt=""></v-col>
                                </v-row>

                            </div>

                            <div class='d-flex flex-column input-holder py-2 my-4'>
                                <span class='input-title'>Application Level
                                    <span>*</span>
                                </span>
                                <v-row>
                                    <v-col class="col-10"><select v-model="applicationCode" style="width:100%">

                                            <option v-for="item in applicationLevel" :key="item.text" v-bind:value="{value: item.value, text: item.text}">
                                                {{item.text}}
                                            </option>
                                        </select>
                                    </v-col>
                                    <v-col class="col-2"> <img src="../../public/select.svg" alt=""></v-col>
                                </v-row>
                            </div>
                            <div>
                                <div class='d-flex flex-column input-holder py-2 my-4' v-if="showStep">
                                    <span class='input-title'>Step
                                        <span>*</span>
                                    </span>
                                    <v-row>
                                        <v-col class="col-10"><input type="search" v-model="step_input"></v-col>
                                        <v-col class="col-2"> <img src="../../public/select.svg" alt=""></v-col>
                                    </v-row>
                                </div>
                                <div class='d-flex flex-column input-holder py-2 my-4' v-if="showGrade">
                                    <span class='input-title'>Grade
                                        <span>*</span>
                                    </span>
                                    <v-row>
                                        <v-col class="col-10"><input v-model="grade_input" type="search"></v-col>
                                        <v-col class="col-2"> <img src="../../public/select.svg" alt=""></v-col>
                                    </v-row>
                                </div>
                                <div class='d-flex flex-column input-holder py-2 my-4' v-if="showStructure">
                                    <span class='input-title'>Structure
                                        <span>*</span>
                                    </span>
                                    <v-row>
                                        <v-col class="col-10"><input v-model="structure_input" type="search"></v-col>
                                        <v-col class="col-2"> <img src="../../public/select.svg" alt=""></v-col>
                                    </v-row>
                                </div>
                                <div class='d-flex flex-column input-holder py-2 my-4' v-if="showMinistry">
                                    <span class='input-title'>Ministry
                                        <span>*</span>
                                    </span>
                                    <v-row>
                                        <v-col class="col-10"><select v-model="ministry_input" style="width:100%" placeholder="Value Type">

                                                <option v-for="item in allMinistry" :key="item.text" v-bind:value="{value: item.value}">
                                                    {{item.text}}
                                                </option>
                                            </select></v-col>
                                        <v-col class="col-2"> <img src="../../public/select.svg" alt=""></v-col>
                                    </v-row>
                                </div>

                                <div class='d-flex flex-column input-holder py-2 my-4' v-if="showDepartment">
                                    <span class='input-title'>Department
                                        <span>*</span>
                                    </span>
                                    <v-row>
                                        <v-col class="col-10"><select v-model="department_input" style="width:100%" placeholder="Value Type">

                                                <option v-for="item in allDepartment" :key="item.text" v-bind:value="{value: item.value, text: item.text}">
                                                    {{item.text}}
                                                </option>
                                            </select></v-col>
                                        <v-col class="col-2"> <img src="../../public/select.svg" alt=""></v-col>
                                    </v-row>
                                </div>
                                <div class='d-flex flex-column input-holder py-2 my-4' v-if="showDesignation">
                                    <span class='input-title'>Designation
                                        <span>*</span>
                                    </span>
                                    <v-row>
                                        <v-col class="col-10"><select v-model="designation_input" style="width:100%" placeholder="Value Type">

                                                <option v-for="item in allDesignation" :key="item.text" v-bind:value="{value: item.value, text: item.text}">
                                                    {{item.text}}
                                                </option>
                                            </select></v-col>
                                        <v-col class="col-2"> <img src="../../public/select.svg" alt=""></v-col>
                                    </v-row>
                                </div>
                                <div class='d-flex flex-column input-holder py-2 my-4' v-if="showCategory">
                                    <span class='input-title'>Category
                                        <span>*</span>
                                    </span>
                                    <v-row>
                                        <v-col class="col-10"><input v-model="category_input" type="search"></v-col>
                                        <v-col class="col-2"> <img src="../../public/select.svg" alt=""></v-col>
                                    </v-row>
                                </div>
                            </div>
                            <div class='d-flex p-0 flex-column input-holder  my-4' v-if="showEmployee">
                                <span class='input-title'>Search
                                    <span>*</span>
                                </span>
                                <div class='d-flex justify-content-between' style="width:100%;"><input v-model="employeeSarch_input" type="search">
                                    <b-button class='p-2' squared style="background:#009688;  height:100%; color:#fff;   border: 2px solid rgb(0, 150,136);" @click="employeeSearch">Search</b-button>
                                </div>

                            </div>
                            <div class='d-flex flex-column input-holder py-2 my-4' v-if="showSearchedEmployee">
                                <span class='input-title'>Select Employee From The Result Set
                                    <span>*</span>
                                </span>
                                <v-row>
                                    <v-col class="col-10"><select v-model="mainEmployee_input" placeholder="Value Type" style="width:100%">
                                            <option v-for="item in allEmployee" :key="item.text">
                                                {{item.text}}</option>
                                        </select></v-col>
                                    <v-col class="col-2"> <img src="../../public/select.svg" alt=""></v-col>
                                </v-row>
                            </div>

                        </div>

                        <div>

                        </div>
                        <div></div>
                    </div>
                    <v-btn block color="#17517E" style="color: #fff" class="pa-6" @click="createUnitAllowance">
                        Add/Update
                    </v-btn>
                </v-form>
            </div>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import {
    mapGetters
} from "vuex";
//import designationVue from './designation.vue';

export default {
    data() {
        return {
            dialogDelete: false,
            viewdialog: false,
            mainEmployee_input: "",
            ministry_input: "",
            employeeSarch_input: "",
            department_input: "",
            designation_input: "",
            category_input: "",
            addAllowanceExclusionItem:'',
            structure_input: "",
            grade_input: "",
            showLimited: false,
            showLSE: false,
            showStructure: false,
            showStep: false,
            showGrade: false,
            showCategory: false,
            showEmployee: false,
            showDesignation: false,
            showDepartment: false,
            showMinistry: false,
            allMinistry: [],
            allDepartment: [],
            allGradelevel: [],
            allStep: [],
            allDesignation: [],
            allEmployee: [],
            allCategory: [],
            allowance: "",
            department1: false,
            dialog: false,
            dialog2: false,
            applicationLevel: [],
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
                    text: "Application Level",
                    value: "appliication_level",
                },

                {
                    text: " Active Status",
                    value: "status",
                },
                {
                    text: "Added By",
                    value: "enterby",
                },
                {
                    text: " Added on",
                    value: "enteron",
                },
                {
                    text: "",
                    value: "views",
                },

            ],
            items: [],
            allowances: null,
            deductionitems:[],
            SalaryRegime: [],
            regimes: null,
            salary_scale_regime: '',
            level_name: '',
            deduction_name: '',
            value_type: '',
            fixed_percentage: '',
            applicationCode: '',
            life_line: '',
            start_date: '',
            end_date: '',

            search: true,
            application_level_code: '',
            application_level_name: '',
            application_name_code: [],
            endpoints: [],
            employeeFetch: [],
            allowanceItem: [],
            applicationLevelArr: [],
            allowanceArr: [],
            showSearchedEmployee: false

        };
    },

    beforeMount() {
        //console.log(this.applicationLevel());
        this.populateApplication();
        //this.employeeSearch();
        this.findRegime();
       this.findDeduction()
        this.populateUnitAllowance();
    },
    afterMount() {

    },

    watch: {
        //Track application code

        applicationCode(val) {
            // console.log('VAlue', val);
            this.checkApllicationLevel(val);

        },
        life_line(val) {
            console.log(val);
            this.checkLifeInput(val);
        }
    },
    computed: {
        ...mapGetters({
            jwt: "getJwt",
            instu_code: "getInstuCode",
            baseURL: "baseURL"
        }),
    },

    methods: {

        async status(item) {
            console.log(item);
            try {
                const res = await axios({
                    headers: {
                        Authorization: `Bearer ${this.jwt}`,
                    },
                    method: "patch",
                    url: `${this.baseURL}/unit_allowance`,

                    data: {
                        institution_code: this.instu_code,
                        unit_allowance_code: item.unit_allowance_code,
                        active_status: item.status,
                    },
                });
                console.log('good to go', res);
                //Check status
                const message = res.data.response.message.message;
                if (res.data.response.code == "00") {
                    const row = this.items.findIndex(
                        (el) => el.unit_allowance_code === item.unit_allowance_code
                    );

                    this.items[row].status = !item.status;

                    Swal.fire({
                        icon: "success",
                        title: message,
                        width: 400,
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: message,
                        width: 400,
                    });
                }
                console.log(res);
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error Encounted Go The Code ",
                    width: 400,
                });
                console.log(error);
            }
        },
        viewz(item) {
             console.log("MAIN ITEM", item);
             this.dialogDelete = true;
            this.deleteName = item.appliication_level;
            this.addAllowanceExclusionItem = item;

        },
        deleteN(item) {
           
            this.dialogDelete = true;
            this.deleteName = item.appliication_level;
            this.addAllowanceItem = item;
        },
        async deleteDeductionName() {
            try {
                console.log('start1');
                const res = await axios({
                    headers: {
                        Authorization: `Bearer ${this.jwt}`,
                    },
                    // - {‘institution_code’:’’, ‘allowance_code’:’’}
                    method: "delete",
                    url: `${this.baseURL}/deduction`,
                    data: {
                        institution_code: this.instu_code,
                        entered_by: this.unitAllowanceItem.enterby,
                        unit_allowance_code: this.unitAllowanceItem.unit_allowance_code,

                    },
                });

                console.log(res);
                if (res.data.response.code == "00") {
                    console.log('am here');
                    const row = this.items.findIndex(
                        (el) => el.deduction_code === this.deductItem.deduction_code
                    );

                    this.items.splice(row, 1);

                    return Swal.fire({
                        icon: "success",
                        text: "Deduction name deleted successfully!",
                        title: "Successful",
                        width: 400,
                    });
                } else {
                    return Swal.fire({
                        icon: "error",
                        title: "Deduction not deleted successfully!",
                        width: 400,
                    });
                }
            } catch (error) {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    text: "Something went wrong",
                    title: "Oops!!",
                });
            }
        },
        //Populate the Unit Allowance Table
        async populateUnitAllowance() {
            const res = await axios({
                headers: {
                    Authorization: `Bearer ${this.jwt}`,
                },
                method: "get",
                url: `${this.baseURL}/deduction_exclusion?institution_code=${this.instu_code}`,
            });
            console.log('Result For deduction_exclusion', res);
            res.data.response.message.data.forEach((el) => {
                //console.log("List unit Alllowance",el);
                this.items.push({
                    appliication_level: el.application_level_name,
                    approved: el.approved,
                    institu: el.institution,
                    enterby: el.entered_by_name,
                    enteron: el.entered_on.split("T")[0],
                    status: el.active_status,
                    deduction_name: el.deduction_name,
                    regime: el.regime_name,
                   deduction_exclusion_code: el.deduction_exclusion_code,
                    allow_regime_code: el.allowance_regime_code,
                });
                //  console.log("Allow array", this.allowanceArr);

            });

        },
          //populate Deduction
      async findDeduction() {
            const res = await axios({
                headers: {
                    Authorization: `Bearer ${this.jwt}`,
                },
                method: "get",
                url: `${this.baseURL}/deduction?institution_code=${this.instu_code}`,
            });
            console.log('find deductions', res);
            res.data.response.message.deductions.forEach(el => {
                this.deductionitems.push({
                        value: el.deduction_code,
                        text: el.deduction_name

                    }

                )

            });

        },
        //populate allowance
        async findAllowance() {
            const res = await axios({
                headers: {
                    Authorization: `Bearer ${this.jwt}`,
                },
                method: "get",
                url: `${this.baseURL}/allowance?institution_code=${this.instu_code}`,
            });
            // console.log('Test Allowance', res);
            res.data.response.message.allowances.forEach((el) => {
                //  console.log("El",el);
                this.allowanceArr.push({
                    text: el.allowance_name,
                    value: el.allowance_code,
                });
                //  console.log("Allow array", this.allowanceArr);

            });

        },
         // populating Regime
        async findRegime() {
            const res = await axios({
                headers: {
                    Authorization: `Bearer ${this.jwt}`,
                },
                method: "get",
                url: `${this.baseURL}/salary_regime?institution_code=${this.instu_code}`,
            });
            // console.log('Test Regime', res);
            res.data.response.message.regimes.forEach(el => {
                // console.log(el);
                this.SalaryRegime.push({
                    value: el.regime_code,
                    text: el.regime_name
                })
            });
        },
        //To get value,if is limited and unlimited not limited to know which input to display
        checkLifeInput(val) {
            //console.log(val);
            if (val == "Limited") {
                this.showLimited = true
            } else {
                this.showLimited = false
            }
        },
        ////////TO SEARCH AN EMPLOYEE//////
        async employeeSearch() {
            this.allEmployee = []
            console.log("INSTITU", this.employeeSarch_input);
            try {
                const res = await axios({
                    headers: {
                        Authorization: `Bearer ${this.jwt}`,
                    },

                    method: "",
                    url: `${this.baseURL}/employee_info_operation?institution_code=${this.instu_code}&search=${this.search}&value=${this.employeeSarch_input}`,

                });

                // Check for Status Code
                console.log("FOR EMPLOYEE SEARCH", res);
                this.showSearchedEmployee = true
                const message = res.data.response.message.message;
                if (res.data.response.code === "00") {
                    res.data.response.message.data.forEach((el) => {
                        this.allEmployee.push({
                            text: `${el.surname} ${el.firstname} ${el.middlename} - Employee Code = ${el.employee_code}`,
                            value: el.employee_code,

                        });
                        this.showSearchedEmployee = true
                    })

                    Swal.fire({
                        icon: "success",
                        title: "Successful",
                        text: "Update needed, returning success for any search",
                        width: 400,
                    });

                } else {
                    Swal.fire({
                        icon: "info",
                        title: "Oops...",
                        text: "Empolyee not found",
                        width: 400,
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Unit Allowance Not Created",
                    width: 400,
                });
                console.log(error);
            }

        },

        async finalCreationCreateUnitAllowance(category) {
            const currentDate = new Date().toISOString().split("T")[0];
            console.log("MAIN CATEGORY", category);
            try {
                const res = await axios({
                    headers: {
                        Authorization: `Bearer ${this.jwt}`,
                    },
                    method: "post",
                    url: `${this.baseURL}/deduction_exclusion`,
                    data: {
                        institution_code: this.instu_code,
                        regime_code: this.salary_scale_regime,
                       deduction_code: this.deduction_name,
                        entered_by: "9b2b233117",
                        application_level_code: this.applicationCode.value,
                        applied_to: category

                    },
                });

                // Check for Status Code
                console.log("monk");
                const message = res.data.response.message.message;
                if (res.data.response.code === "00") {
                    console.log("deduction_exclusion", res);
                    const data = res.data.response.message.data;
                    this.items.push({
                        appliication_level: data.appliication_level,
                        institu: data.institution,
                        enterby: data.entered_by_name,
                        enteron: currentDate.split("T")[0],
                        status: data.active_status,
                       deduction_name: data.deduction_name,
                        regime: data.regime_name,
                       deduction_exclusion_code: data.deduction_exclusion_code,
                    });

                    Swal.fire({
                        icon: "success",
                        title: "Created",
                        text: message,
                        width: 400,
                    });
                    this.dialog2 = false;
                    this.salary_scale_regime = '',
                        this.allowance_name = '',
                        this.applicationCode = ''

                } else {
                    Swal.fire({
                        icon: "info",
                        title: "Oops...",
                        text: message,
                        width: 400,
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Unit Allowance Not Created",
                    width: 400,
                });
                console.log(error);
            }

        },
        /////create unit allowance
        createUnitAllowance() {

            const category = {}
            console.log("TEST HERE1");

            if (this.salary_scale_regime == "" || this.deduction_name
             == "" ||
                this.applicationCode == "") {

                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Fill All The Compulsory Feilds!",
                    width: 400,
                });
            } else {

                ///TO CHECK THE APPLICATION LEVEL THAT IS SELECTED
                //if Application level selected is ministry 

                if (this.showMinistry == true) {
                    if (this.ministry_input == "") {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Fill All The Compulsory Feilds!",
                            width: 400,
                        });
                    } else {
                        category.ministry_code = this.ministry_input.value
                        this.finalCreationCreateUnitAllowance(category)

                    }

                }
                //if Application level selected is department
                if (this.showDepartment == true) {
                    if (this.department_input == "") {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Enter An Application Level",
                            width: 400,
                        });
                    } else {
                        category.department_code = this.department_input.value
                        this.finalCreationCreateUnitAllowance(category)
                    }
                }
                //if application level selected is Employee
                if (this.showEmployee == true) {
                    if (this.mainEmployee_input == "") {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Enter An Application Level",
                            width: 400,
                        });
                    } else {
                        console.log(" BIKO", this.mainEmployee_input);
                        category.employee_code = this.mainEmployee_input
                        this.finalCreationCreateUnitAllowance(category)

                    }
                }
                //if application level selected is designation
                if (this.showDesignation == true) {
                    if (this.designation_input == "") {
                        Swal.fire({
                            icon: "error",
                            title: "Select A Designation ",
                            text: "Enter an Application",
                            width: 400

                        });
                    } else {
                        category.designation_code = this.designation_input.value
                        this.finalCreationCreateUnitAllowance(category)
                    }
                }
                //if application level selected is grade
                if (this.showGrade == true) {
                    if (this.grade_input == "") {
                        Swal.fire({
                            icon: "error",
                            title: "Select a grade"
                        })

                    } else {
                        category.grade_code = grade_input.value
                    }
                }
                //if application level selected is step
                if (this.step == true) {
                    if (this.step_input == "") {
                        Swal.fire({
                            icon: "error",
                            title: ""

                        })
                    }
                }

            }
        },

        //Api call for populating all selected appllication level/endpoint and displaying then inside their select input   
        async callBack(endpoint) {
            console.log("FOR ENDPOINT start1");
            try {
                const res = await axios({
                    headers: {
                        Authorization: `Bearer ${this.jwt}`,
                    },
                    method: "GET",
                    url: `${this.baseURL}/${endpoint}?institution_code=${this.instu_code}`,
                });
                console.log("Start2", endpoint);

                /////////////IF AN APPLICATION LEVEL IS SELECTED SUCCESSFUL
                if (res.data.response.code == "00") {
                    ///////FOR MINISTRY 
                    if (endpoint === 'ministry') {
                        this.showMinistry = true
                        this.showStructure = false
                        this.showStep = false
                        this.showGrade = false
                        this.showCategory = false
                        this.showEmployee = false
                        this.showDesignation = false
                        this.showDepartment = false

                        res.data.response.message.all_ministries.forEach((el) => {
                            this.allMinistry.push({
                                text: el.ministry_name,
                                value: el.ministry_code,
                            });
                        });
                    }
                    //////FOR EMPLOYEE

                    //////FOR SALARY CATEGORY
                    if (endpoint === 'salary_category') {
                        this.showCategory = true
                        res.data.response.message.salary_structure.forEach((el) => {
                            this.cate.push({
                                text: el.ministry_name,
                                value: el.ministry_code,
                            });
                        });
                    }
                    /////FOR DEPARTMENT
                    if (endpoint === 'department') {
                        this.showDepartment = true
                        this.showStructure = false
                        this.showStep = false
                        this.showGrade = false
                        this.showCategory = false
                        this.showEmployee = false
                        this.showDesignation = false

                        this.showMinistry = false
                        res.data.response.message.all_departments.forEach((el) => {
                            this.allDepartment.push({
                                text: el.department_name,
                                value: el.department_code,
                            });
                        });
                    }
                    ///////FOR DESIGNATION
                    if (endpoint === 'designation') {
                        this.showDesignation = true
                        this.showDepartment = false
                        this.showStructure = false
                        this.showStep = false
                        this.showGrade = false
                        this.showCategory = false
                        this.showEmployee = false
                        console.log('DESIGNATION', res);
                        res.data.response.message.designations.forEach((el) => {
                            this.allDesignation.push({
                                text: el.designation_name,
                                value: el.designation_code,
                            });
                        });
                    }

                }
            } catch (err) {
                console.log(err);
            }

        },

        checkApllicationLevel(val) {
            //console.log("Top view", val);
            this.showStructure = false,
                this.showStep = false,
                this.showGrade = false,
                this.showCategory = false,
                this.showEmployee = false,
                this.showDesignation = false,
                this.showDepartment = false,
                this.showMinistry = false

            // const selectedValue = val.text
            // console.log("LOG",this.selectedValue);
            //Get application level that matches (val) and assign to endpoints varriable
            const selectedLevel = this.applicationLevelArr.find(app_level => app_level.application_level_name === val.text);
            //use endpoints to make call          
            selectedLevel.endpoint.forEach(endpoint => {
                //Foreach endpoints make an api call
                if (endpoint == 'ministry' && this.allMinistry.length == 0) {
                    //console.log("start1");
                    this.callBack(endpoint)
                } else if (endpoint == 'ministry') {
                    console.log("start1 Failed");
                    this.showMinistry = true
                    this.showStructure = false
                    this.showStep = false
                    this.showGrade = false
                    this.showCategory = false
                    this.showEmployee = false
                    this.showDesignation = false
                    this.showDepartment = false

                }
                //////FOR EMPLOYEE 
                if (endpoint == 'employee_info' && this.allEmployee.length == 0) {
                    console.log("EMPLOYEE");
                    this.showMinistry = false
                    this.showStructure = false
                    this.showStep = false
                    this.showGrade = false
                    this.showCategory = false
                    this.showEmployee = true
                    this.showDesignation = false
                    this.showDepartment = false
                    this.callBack(endpoint)
                } else if (endpoint == 'employee_info') {
                    console.log("start1 Failed");
                    this.showMinistry = false
                    this.showStructure = false
                    this.showStep = false
                    this.showGrade = false
                    this.showCategory = false
                    this.showEmployee = true
                    this.showDesignation = false
                    this.showDepartment = false

                }
                /////FOR DEPARTMENT
                if (endpoint == 'department' && this.allDepartment.length == 0) {
                    //console.log("start2");
                    this.callBack(endpoint)
                } else if (endpoint == 'department') {
                    //console.log("stat2 Failed");
                    this.showDepartment = true
                    this.showStructure = false
                    this.showStep = false
                    this.showGrade = false
                    this.showCategory = false
                    this.showEmployee = false
                    this.showDesignation = false
                    this.showMinistry = false

                }
                if (endpoint == 'designation' && this.allDesignation.length == 0) {
                    //console.log("start3");
                    this.callBack(endpoint)
                } else if (endpoint == 'designation') {
                    console.log("start 3 Failed");
                    this.showDepartment = false
                    this.showStructure = false
                    this.showStep = false
                    this.showGrade = false
                    this.showCategory = false
                    this.showEmployee = false
                    this.showDesignation = true
                    this.showMinistry = false

                }
                if (endpoint == 'grade' && this.allGradelevel.length == 0) {
                    console.log("start4");
                    this.callBack(endpoint)
                } else if (endpoint == 'grade') {
                    console.log("start4 Failed");
                    this.showDepartment = false
                    this.showStructure = false
                    this.showStep = false
                    this.showGrade = true
                    this.showCategory = false
                    this.showEmployee = false
                    this.showDesignation = false
                    this.showMinistry = false

                }
                if (endpoint == 'salary_category' && this.allCategory.length == 0) {
                    console.log("start5");
                    this.callBack(endpoint)
                } else if (endpoint == 'salary_category') {
                    console.log("start5 failed");
                    this.showDepartment = false
                    this.showStructure = false
                    this.showStep = false
                    this.showGrade = false
                    this.showCategory = true
                    this.showEmployee = false
                    this.showDesignation = false
                    this.showMinistry = false

                }

            });
        },
        //////////TO POPULATE THE INPUT FILED FOR THE APPLICATION LEVEL//////////////////
        async populateApplication() {
            try {
                // console.log("HERE");
                const res = await axios({
                    headers: {
                        Authorization: `Bearer ${this.jwt}`,
                    },
                    method: "GET",
                    url: `${this.baseURL}/application_level?institution_code=${this.instu_code}`,
                });
                // console.log("qualification type", res);
                if (res.data.response.code == "00") {
                    this.applicationLevelArr = res.data.response.message.data;
                    // console.log("POP", this.applicationLevelArr);
                    res.data.response.message.data.forEach((el) => {
                        console.log("An EL", el);
                        this.applicationLevel.push({
                            value: el.application_level_code,
                            text: el.application_level_name,
                        });
                        //  console.log("ARRAy", this.applicationLevel);
                    });

                }
            } catch (err) {
                console.log(err);
            }
        },

    },
};
</script>

<style>
.label1_text {
    font-size: 20px;
}

.label {
    width: 100%;
    margin-top: 10px;
    padding-top: 15px;
    height: 55px;
    background: #FFF1F1;
    border-radius: 4px;
    text-align: center;

}

._header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.input-holder {
    border: 1px solid grey !important;
    position: relative;
    border-radius: 4px;
    padding: 10px
}

.input-holder .input-title {
    position: absolute;
    left: 10px;
    background-color: white;
    top: -12px;
    padding: 0 4px;
}

.input-holder .input-title span {
    color: #D66214;
}

.input-holder input {
    outline: none;
}

.input-holder select {
    outline: none;
}
</style>
