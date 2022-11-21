<template>
<div style="background: #f5f5f5;" class="mt-10 container">
    <div class="py-6">
        <h4>Manage Deductions</h4>
    </div>
    <div class="">
        <v-data-table :headers="headers" :items="items" :search="search" sort-by="calories" class="elevation-1">
            <template v-slot:item.status="{ item }">
                <v-btn style="color: red;  font-size:10px; text-transform: capitalize" text v-if="item.status" @click="status(item)">Deactivate</v-btn>
                <v-btn v-else style="color:green; font-size:10px;  text-transform: capitalize" text @click="status(item)">Activate</v-btn>
            </template>
            <template v-slot:item.more="{ item }">
                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn style="text-transform: capitalize" color="primary" text v-bind="attrs" v-on="on">
                            <img src="../../public/Vector.svg" alt="">
                        </v-btn>
                    </template>
                    <v-list>
                        <v-btn text block @click="deleteItem(item)">
                            <v-list-item>Delete</v-list-item>
                        </v-btn>
                        <v-btn text block @click="editItem(item)">
                            <v-list-item>Edit</v-list-item>
                        </v-btn>
                    </v-list>
                </v-menu>
            </template>
            <template v-slot:top>
                <v-toolbar flat>
                    <h6>Manage Dedution Regime  - Approved Listing</h6>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" transition="dialog-top-transition" max-width="450">

                        <v-card>
                            <div class="label">
                                <h4>Add Deduction Name</h4>
                            </div>
                            <div class="py-8 label2">
                                <h4>Create a new deduction name</h4>
                            </div>
                            <!-- ///////////////////////////////////////////////deduction////////////////////////////////////////////// -->
                            <v-card-text>

                                <v-text-field v-model="deduction" label="Deduction Name" outlined></v-text-field>
                                <div class="mx-7 pb-10">
                                    <v-btn @click="create" style="height: 60px; background: #17517E; font-family: Mulish;font-size: 18px; line-height: 21px; color: #FFFFFF;" block>Submit</v-btn>
                                </div>
                            </v-card-text>

                        </v-card>
                    </v-dialog>

                    <!-- Below is the Dialoge for creating  -->
                    <v-dialog v-model="dialogTwo" transition="dialog-top-transition" max-width="450">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn style="font-family: Mulish; font-size: 14px; line-height: 16px; color: #F2F9FF;background: #17517E; border-radius: 5px;" class="deductionName mx-2" v-bind="attrs" v-on="on">
                                Manage Deduction
                            </v-btn>
                        </template>
                        <v-card>
                            <div class="label">
                                <h4>Create Deduction</h4>
                            </div>
                            <div class="py-8 label2">
                                <h4>Create a new deduction to a regime</h4>
                            </div>
                            <!-- /////////////////////////creating deduction///////////////////////////////////////////////// -->
                            <v-card-text>
                                <v-select :items="deductionitems" v-model="deduction" label="Deduction Name" outlined></v-select>
                                <v-select :items="regimeitems" v-model="regime" label="Salary Scale Regime" outlined></v-select>
                            </v-card-text>
                            <div class="mx-7 pb-10">
                                <v-btn @click="createDeduction" style="height: 60px; background: #17517E; font-family: Mulish;font-size: 18px; line-height: 21px; color: #FFFFFF;" block>Submit</v-btn>
                            </div>
                        </v-card>
                    </v-dialog>

                    <!-- This is the Dialog for Editing -->
                    <v-dialog v-model="dialogEdit" transition="dialog-top-transition" max-width="600">

                        <v-card>
                            <div class="label">
                                <h4>Manage Deduction</h4>
                            </div>
                            <div class="py-8 label2">
                                <h4>Edit Regime Deduction </h4>
                            </div>
                            <!-- /////////////////////////creating deduction///////////////////////////////////////////////// -->
                            <v-card-text>
                                <v-select :items="deductionitems" v-model="deductionEd" :item-value="deductionEd" label="Deduction Name" outlined></v-select>
                                <v-select :items="regimeitems" v-model="regimeEd" :item-value="regimeEd" label="Salary Scale Regime" outlined></v-select>
                            </v-card-text>
                            <div class="mx-7 pb-10">
                                <v-btn @click="deductionItem" style="height: 60px; background: #17517E; font-family: Mulish;font-size: 18px; line-height: 21px; color: #FFFFFF;" block>Submit</v-btn>
                            </div>
                        </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogDelete" max-width="600px">
                        <v-card>
                               <div class="label">
                                <h4>Delete Regime Deduction </h4>
                            </div>
                           
                            <div class="center" style="text-align:center"> <img src="../../public/error_40px.png" alt=""></div>
                            <v-card-title class="text-h5">Are you sure you want to delete this salary regime<strong>"{{deleteName}}"</strong> with the deduction name <strong>"{{deductionName}}"</strong> </v-card-title>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="dialogDelete=false">Cancel</v-btn>
                                <v-btn color="blue darken-1" text @click="deleteManageDeduction">OK</v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
        </v-data-table>
    </div>
</div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";

import {
    mapGetters
} from "vuex";

export default {
    data: () => ({
        search: '',
        deductionName:'',
        dialog: false,
        deleteName:'',
        regimeEd:'',
        deductionEd:'',
        deduction: '',
        deductItem:[],
        dialogTwo: false,
        dialogEdit: false,
        deduction:'',
        regime:'',
        dialogDelete: false,
        program: '',
        headers: [{
                text: '',
                value: 'more',
                sortable: false,
                class: 'grey lighten-4'
            },
            {
                text: 'Salary Scale Regime',
                align: 'start',
                sortable: false,
                value: 'salaryregime',
                class: 'grey lighten-4'

            },
            {
                text: 'Deduction Name',
                value: 'deduction_name',
                class: 'grey lighten-4'
            },
            {
                text: 'Institution',
                value: 'institution',
                class: 'grey lighten-4'
            },
            {
                text: 'Status',
                value: 'status',
                class: 'grey lighten-4'
            },

            {
                text: 'Entered By',
                value: 'enteredby',
                class: 'grey lighten-4'
            },
            {
                text: 'Entered On',
                value: 'enteredon',
                class: 'grey lighten-4'
            },
           

        ],
        items: [],
        deductionitems: [],
        regimeitems: [],
        desserts: [],
        editedIndex: -1,
        editedItem: {
            program: '',
            programcode: 0,
            status: 0,
            datecreated: 0,
            createdby: '',
        },
        defaultItem: {
            program: '',
            programcode: 0,
            status: 0,
            datecreated: 0,
            createdby: '',
        },
    }),

    watch: {
       
    },
    beforeMount() {
        //this.populate_deduction()
        this.findDeduction();
        this.findRegime();
        this.populateDeductions();
    },
    computed: {
        ...mapGetters({
             jwt: "getJwt",
            instu_code: "getInstuCode",
              baseURL:"baseURL"
        }),
    },

    methods: {
      deleteItem(item) {
           this.deductItem = item;
            this.dialogDelete = true;
            this.deleteName = this.deductItem.salaryregime;
            this.deductionName = this.deductItem.deduction_name;
        },
        ///////delete for the Manage deduction/////
           async deleteManageDeduction() {
            try {
                console.log('start1', this.deductItem);
                const res = await axios({
                    headers: {
                        Authorization: `Bearer ${this.jwt}`,
                    },
                    // - {‘institution_code’:’’, ‘allowance_code’:’’}
                    method: "delete",
                    url: `${this.baseURL}/deduction_regime`,
                    data: {
                        institution_code: this.instu_code,
                        deduction_regime_code: this.deductItem.deduction_regime_code,

                    },
                });

                console.log(res);
                if (res.data.response.code == "00") {
                    console.log('am here');
                    this.dialogDelete = false;
                    const row = this.items.findIndex(
                        (el) => el.deduction_regime_code === this.deductItem.deduction_regime_code
                    );

                    this.items.splice(row, 1);

                    return Swal.fire({
                        icon: "success",
                        text: "Deduction  deleted successfully!",
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
        ///////to show dialog for editing
        editItem(item) {
            // console.log(item);
            this.dialogEdit = true;
            this.deduction_edit = item.deduction_regime_code;
            this.deductItem = item;
            this.deductionEd = item.deduction_name;
            this.regimeEd = `${item.salaryregime}`;
            // console.log({de: this.deductionEd}, {rd: this.regimeEd});
        },

        //Edit Deduction Name
        async deductionItem() {
        // console.log('DE', this.deductionEd);
            // console.log('RE', this.regimeEd);
            // console.log(this.deductItem);
            try {
                const res = await axios({
                    headers: {
                        Authorization: `Bearer ${this.jwt}`,
                    },
                    method: "put",
                    url: `${this.baseURL}/deduction_regime`,
                    data: {
                        institution_code: this.instu_code,
                        regime_code: this.deductItem.regime_code,
                        entered_by: this.deductItem.enteredby,
                        deduction_code: this.deductItem.deduction_code,
                        deduction_regime_code: this.deductItem.deduction_regime_code
                    },
                });
                if (res.data.response.code == "00") {
                    const row = this.items.findIndex(
                        (el) => el.allow_code === this.allowanceItem.allow_code
                    );

                    this.items[row].allowance_name = this.allowance_edit;

                    this.dialogEdit = false
                    return Swal.fire({
                        icon: "success",
                        text: "Edited Successfully",
                        title: "Successful",
                        width: 400,
                    });
                } else if (res.data.response.code == "E300") {
                    Swal.fire({
                        icon: "error",
                        text: "Manage deduction Name Already Exist",
                        title: "Oops..",
                        width: 400,
                    });
                } else if (res.data.response.code == "E301") {
                    Swal.fire({
                        icon: "error",
                        text: "Manage deduction name didn’t update successfully!",
                        title: "Oops..",
                        width: 400,
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        text: "Error Occured while Editing Manage deduction Name",
                        title: "Oops..",
                        width: 400,
                    });
                }
                console.log("Edit Manage deduction", res);
            } catch (error) {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    text: "Something went wrong",
                    title: "Oops!!",
                    width: 400,
                });
            }
        },
        async status(item) {
            // console.log(item);
            try {
                const res = await axios({
                    headers: {
                        Authorization: `Bearer ${this.jwt}`,
                    },
                    method: "patch",
                    url: `${this.baseURL}/deduction_regime`,

                    data: {
                        institution_code: this.instu_code,
                        deduction_regime_code: item.deduction_regime_code,
                        active: !item.status,
                    },
                });
                console.log('good to go', res);
                //Check status
                if (res.data.response.code == "00") {
                    const row = this.items.findIndex(
                        (el) => el.deduction_regime_code === item.deduction_regime_code
                    );

                    this.items[row].status = !item.status;

                    Swal.fire({
                        icon: "success",
                        title: "Successful",
                        width: 400,
                    });
                } else if (res.data.response.code == "E400") {

                    Swal.fire({
                        icon: "error",
                        title: "Deduction Name not Deactivated",
                        width: 400,
                    });
                } else if (res.data.response.code == "E401") {
                    Swal.fire({
                        icon: "error",
                        title: "Deduction Name not Activated",
                        width: 400,
                    });
                }
                console.log(res);
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error Encounted",
                    width: 400,
                });
                console.log(error);
            }
        },
        //Populate deduction Table
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
        //find regim
        async findRegime() {
            const res = await axios({
                headers: {
                    Authorization: `Bearer ${this.jwt}`,
                },
                method: "get",
                url: `${this.baseURL}/salary_regime?institution_code=${this.instu_code}`,
            });
            console.log('test regime', res);
            res.data.response.message.regimes.forEach(el => {
                console.log(el);
                this.regimeitems.push({
                        value: el.regime_code,
                        text: el.regime_name

                    }

                )

            });

        },
        // Create Deduction
        async create() {
            try {
                console.log('start1')
                if (this.deduction == "") {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Enter in your deduction name",
                        width: 400,
                    });
                } else {
                    console.log('start2')

                    const res = await axios({

                        headers: {
                            Authorization: `Bearer ${this.jwt}`,
                        },
                        method: "post",
                        url: `${this.baseURL}/deduction`,
                        data: {
                            institution_code: this.instu_code,
                            entered_by: "Appmart Integrated",
                            deduction_name: this.deduction,
                        },
                    });
                    console.log("RESPONSE  deduction", res);
                    console.log(res.data.response.code);
                    if (res.data.response.code == "00") {
                        this.dialog = false

                        const el = res.data.response.message.data;
                        this.deductionitems.push({
                                value: el.deduction_code,
                                text: el.deduction_name

                            }),
                            Swal.fire({
                                icon: "success",
                                title: " Created",
                                text: "New deduction name has been created",
                                width: 400,
                            })
                        return this.deduction = ''

                        // SubmitDepartment()
                    } else if (res.data.response.code == "E202") {
                        Swal.fire({
                            icon: "info",
                            title: "Not Created",
                            text: "deduction name already exists",
                            width: 400,
                        });
                    } else if (res.data.reponse.code == "E203") {
                        Swal.fire({
                            icon: "info",
                            title: "Not Created",
                            text: "deduction name not created!",
                            width: 400,
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Not Created",
                            text: "Error occured while creating deduction",
                            width: 400,
                        });
                    }
                }
            } catch (err) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Something went wrong",
                    width: 400,
                });
                console.log("ERRORS", err);
            }
        },
        async createDeduction() {
            try {
                console.log('start1')
                if (this.deduction == "" || this.regime == "") {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Select from your ",
                        width: 400,
                    });
                } else {
                    console.log('start2')

                    const res = await axios({

                        headers: {
                            Authorization: `Bearer ${this.jwt}`,
                        },
                        method: "post",
                        url: `${this.baseURL}/deduction_regime`,
                        data: {
                            institution_code: this.instu_code,
                            entered_by: "Appmart Integrated",
                            deduction_code: this.deduction,
                            regime_code: this.regime
                        },
                    });
                    console.log("RESPONSE  deduction", res);
                    console.log(res.data.response.code);
                    if (res.data.response.code == "00") {
                        console.log('After creating new  ', res);
                        this.dialogTwo = false;

                        const el = res.data.response.message.data;
                        this.items.push({
                            salaryregime: el.regime_name,
                            institu: el.institution,
                            enteredby: el.entered_by,
                            deduction_name: el.deduction_name,
                            institution: el.institution,
                            status: el.active,
                            enteredon: el.date.split("T")[0],
                        });

                        // console.log('New check', id);
                        // const response2 = await this.$http.get('/list-institution', )
                        // const row = this.items.findIndex(
                        //     (el) => el.id === id
                        // );
                        // this.items[row].institution_name = this.editedItem.institution_name,
                        //     this.items[row].institution_code = this.editedItem.institution_code,
                        //     this.items[row].status = this.editedItem.status,
                        if (Swal.fire({
                                icon: "success",
                                title: " Created",
                                text: "New deduction name has been created",
                                width: 400,
                            })) {
                            return this.deduction == '', this.regime == '';

                        }

                        // SubmitDepartment()
                    } else if (res.data.response.code == "E202") {
                        Swal.fire({
                            icon: "info",
                            title: "Not Created",
                            text: "deduction name already exists",
                            width: 400,
                        });
                    } else if (res.data.reponse.code == "E203") {
                        Swal.fire({
                            icon: "info",
                            title: "Not Created",
                            text: "deduction name not created!",
                            width: 400,
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Not Created",
                            text: "Error occured while creating deduction",
                            width: 400,
                        });
                    }
                }
            } catch (err) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Something went wrong",
                    width: 400,
                });
                console.log("ERRORS", err);
            }
        },
        async populateDeductions() {
            try {
                console.log('INSTITUTION CODE', this.instu_code);
                const res = await axios({
                    headers: {
                        Authorization: `Bearer ${this.jwt}`,
                    },
                    method: "get",
                    url: `${this.baseURL}/deduction_regime?institution_code=${this.instu_code}`,
                });
                console.log('check_res', res);
                if (res.data.response.code == "00") {

                    res.data.response.message.data.forEach((el) => {

                        this.items.push({
                            salaryregime: el.regime_data.regime_name,
                            deduction_code: el.deduction_code,
                            institu: el.institution,
                            deduction_regime_code: el.deduction_regime_code,
                            enteredby: el.entered_by,
                            deduction_name: el.deduction_data.deduction_name,
                            institution: el.institution,
                            regime_code: el.regime_code,
                            status: el.active,

                            enteredon: el.date.split("T")[0],
                        });
                    });
                }
                console.log(res);
            } catch (err) {
                console.log(err);
            }
        },

    },
}
</script>

<style lang="scss" scoped>
.label {
    width: 100%;
    height: 55px;
    background: #F2F9FF;
    border-radius: 4px;
    text-align: center;

    h4 {
        padding-top: 10px;
        font-family: Mulish;
        font-size: 24px;
        line-height: 28px;
        color: #17517E;
    }
}

.label2 {
    text-align: center;

    h4 {
        font-family: Mulish;
        font-size: 18px;
        line-height: 21px;
        color: #4F4F4F;
    }
}
</style>
