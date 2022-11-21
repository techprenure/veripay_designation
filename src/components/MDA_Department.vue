<template>
<div class="">

    <div>
        <h4 style="font-weight: bolder" class="pa-5">MDA</h4>
        <v-card>
            <v-row>
                <v-col cols="12">
                    <div class="_header px-10 pt-5">
                        <h4 style="font-size: 18px">Department - Listing</h4>
                        <div>
                            <v-btn elevation="0" style="font-size: 13px word-spacing: 1px; background-color: #F2F9FF; color:  rgba(23, 81, 126, 1)" class="mx-4" @click="dialogDepartment = true">Add New</v-btn>
                        </div>
                    </div>
                </v-col>
                <v-col cols="12">
                    <div>
                        <v-card elevation="0">
                            <v-data-table :headers="headers" class="table-striped" :items="items">
                                <template v-slot:item.more="{ item }">
                                    <v-menu offset-y>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn color="primary" text v-bind="attrs" v-on="on">
                                                <img src="../../public/Vector.svg" alt="">
                                            </v-btn>
                                        </template>
                                        <v-list>
                                            <v-btn text block @click=" edit(item)">
                                                <v-list-item>Edit</v-list-item>
                                            </v-btn>
                                            <v-btn text block @click="deleteDepartment(item)">
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
    </div>
    <!-- ///////////////////////////CREATE -->
    <v-dialog v-model="dialogDepartment" transition="dialog-top-transition" max-width="500">

        <v-card>
            <div class="label">
                <h4>Department</h4>
            </div>
            <div class="py-8 label2">
                <h4>Create a new department</h4>
            </div>
            <v-card-text>
                <v-text-field label="Department" v-model="department" outlined></v-text-field>
                <v-select :items="options" v-model="select" label="Ministry" outlined></v-select>
                <v-btn color="#17517E" style="color: #fff; padding: 1.5rem" block @click="submit">Submit</v-btn>
            </v-card-text>
        </v-card>
    </v-dialog>

    <!-- /////////////////////////////////EDIT -->
    <v-dialog v-model="dialogDepartmentEdit" transition="dialog-top-transition" max-width="500">
        <v-card>
            <div class="label">
                <h4> Department</h4>
            </div>
            <div class="py-8 label2">
                <h4>Edit Department</h4>
            </div>
            <v-card-text>
                <v-text-field label="Department" v-model="departmentEdit" outlined></v-text-field>
                <v-select :items="options" v-model="selectMinistry" label="Ministry" outlined></v-select>
                <v-btn color="#17517E" style="color: #fff; padding: 1.5rem" block @click=" departmentEditing">Submit</v-btn>
            </v-card-text>
        </v-card>
    </v-dialog>
    <!-- ///////////////////////////////DELETE -->
    <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
            <div class="label">
                <h4>Delete Department </h4>
            </div>

            <div class="center"> <img src="../../public/error_40px.png" alt=""></div>
            <v-card-title class="text-h5">Are you sure you want to delete "{{departmentN}}"</v-card-title>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialogDelete=false">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteDepartment">OK</v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";

import {
    mapGetters
} from "vuex";
export default {
    data() {
        return {
            dialog: false,
            departmentEdit: '',
            items: [],
            department: "",
            selectMinistry: '',
            dialogDelete: false,
            departmentN: '',
            select: "",
            dialogDepartment: false,
            dialogDepartmentEdit: false,
            options: [],
            Allowanceitems: ["Allowance Name one", "Allowance one"],
            Salaryitems: ["Salary Scale One", "Salary Scale two"],
            headers: [{
                    text: "",
                    value: "more",
                },
                {
                    text: "Department",
                    value: "department",
                },

                {
                    text: "Ministry",
                    value: "ministry",
                },
                {
                    text: "Entered By",
                    value: "enterby",
                },
                {
                    text: "Entered On",
                    value: "enteron",
                },
                {
                    value: "department_code",
                    align: ' d-none'
                }

            ],

        };
    },
    computed: {
        ...mapGetters({
            jwt: "getJwt",
            instu_code: "getInstuCode",
            baseURL: "baseURL"
        }),
    },
    beforeMount() {
        this.populateDepartment();
        this.findMinistry();
        // this.populateSalarayRegime();

    },
    methods: {
        deleteMd(item) {
            this.dialogDelete = true;
            this.departmentItems = item;
            this.departmentN = this.departmentItems.ministry;

        },

        async deleteDepartment() {
            try {
                console.log('start1');
                const res = await axios({
                    headers: {
                        Authorization: `Bearer ${this.jwt}`,
                    },
                    // - {‘institution_code’:’’, ‘allowance_code’:’’}
                    method: "delete",
                    url: `${this.baseURL}/department`,
                    data: {
                        institution_code: this.instu_code,
                        department_code: this.departmentItems.department_code,

                    },
                });

                console.log(res);
                if (res.data.response.code == "00") {
                    this.dialogDelete = false
                    const row = this.items.findIndex(
                        (el) => el.department_code === this.departmentItems.department_code
                    );

                    this.items.splice(row, 1);

                    return Swal.fire({
                        icon: "success",
                        text: "Department deleted successfully!",
                        title: "Successful",
                        width: 400,
                    });
                } else {
                    return Swal.fire({
                        icon: "error",
                        title: "Department not deleted successfully!",
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
        edit(item) {
            this.dialogDepartmentEdit = true;
            this.departmentEdit = item.department;
            this.ministry_name = item.ministry;
            this.selectMinistry = item.ministry_code;
            this.departmentItem = item;
        },

        //Edit Allowance Name
        async departmentEditing() {
            console.log('INSTITUTION CODE', this.instu_code);
            console.log('edit', this.departmentItem);
            try {
                const res = await axios({
                    headers: {
                        Authorization: `Bearer ${this.jwt}`,
                    },
                    method: "put",
                    url: `${this.baseURL}/department`,
                    data: {
                        institution_code: this.instu_code,
                        department_name: this.departmentItem.department,
                        department_code: this.departmentItem.department_code,
                        ministry_code: this.selectMinistry,
                        entered_by: this.departmentItem.enterby
                    },
                });
                console.log('department', res);
                if (res.data.response.code == "00") {

                    const row = this.items.findIndex(
                        (el) => el.department_code === this.departmentItem.department_code
                    );
                    this.items[row].department = this.departmentEdit;
                    this.items[row].ministry = this.ministry_name;
                

                    this.dialogDepartmentEdit = false;
                    return Swal.fire({
                        icon: "success",
                        text: "Edited Successfully",
                        title: "Successful",
                        width: 400,
                    });

                } else if (res.data.response.code == "E300") {
                    Swal.fire({
                        icon: "error",
                        text: "Allowance Name Already Exist",
                        title: "Oops..",
                        width: 400,
                    });
                } else if (res.data.response.code == "E301") {
                    Swal.fire({
                        icon: "error",
                        text: "Allowance name didn’t update successfully!",
                        title: "Oops..",
                        width: 400,
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        text: "Error Occured while Editing Allowance Name",
                        title: "Oops..",
                        width: 400,
                    });
                }
                console.log("Edit Allowance", res);
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
        async findMinistry() {
            const res = await axios({
                headers: {
                    Authorization: `Bearer ${this.jwt}`,
                },
                method: "get",
                url: `${this.baseURL}/ministry?institution_code=${this.instu_code}`,
            });
            res.data.response.message.all_ministries.forEach(el => {
                this.options.push({
                        value: el.ministry_code,
                        text: el.ministry_name

                    }

                )

            });

        },

        async populateDepartment() {
            try {

                const res = await axios({
                    headers: {
                        Authorization: `Bearer ${this.jwt}`,
                    },
                    method: "get",
                    url: `${this.baseURL}department?institution_code=${this.instu_code}`,
                });
                console.log('INSTITUTION CODE', this.instu_code);
                // console.log('check_res', res);
                if (res.data.response.code == "00") {
                    res.data.response.message.all_departments.forEach((el) => {
                        this.items.push({
                            department: el.department_name,
                            ministry: el.ministry_name,
                            ministry_code: el.ministry_code,
                            enterby: el.entered_by,
                            enteron: el.date.split("T")[0],
                            department_code: el.department_code
                        });
                    });
                }
                console.log(res);
            } catch (err) {
                console.log(err);
            }
        },
        SubmitDepartment() {
            this.show = true;
        },
        async submit() {
            try {
                console.log('start1')
                if (this.department == "" || this.select == "") {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Key in your department",
                        width: 400,
                    });
                } else {
                    console.log('start2')

                    const res = await axios({

                        headers: {
                            Authorization: `Bearer ${this.jwt}`,
                        },
                        method: "post",
                        url: `${this.baseURL}/department`,
                        data: {

                            institution_code: this.instu_code,
                            entered_by: "Appmart Integrated",
                            department_name: this.department,
                            ministry_code: this.select
                        },
                    });
                    console.log("RESPONSE department", res);
                    console.log(res.data.response.code);
                    if (res.data.response.code == "00") {
                        console.log('Here');

                      
                        Swal.fire({
                            icon: "success",
                            title: " Created",
                            text: "ministry name created",
                            width: 400,
                        });
                        this.department == '', this.select == ''
                        // SubmitDepartment()
                    } else if (res.data.response.code == "E202") {
                        Swal.fire({
                            icon: "info",
                            title: "Not Created",
                            text: "ministry name already exists",
                            width: 400,
                        });
                    } else if (res.data.reponse.code == "E203") {
                        Swal.fire({
                            icon: "info",
                            title: "Not Created",
                            text: "ministry name not created!",
                            width: 400,
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Not Created",
                            text: "Error occured while creating ministry",
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
    }
};
</script>

<style lang="scss" scoped>
._header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

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
