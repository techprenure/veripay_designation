<template>
<div class="">
    <!-- /////////////CREATE -->
      <v-dialog v-model="dialogMinistry" transition="dialog-top-transition" max-width="500">

        <v-card>
            <div class="label">
                <h4>Create Ministry</h4>
            </div>
            <div class="py-8 label2">
                <h4>Create a new  to Ministry</h4>
            </div>
            <!-- /////////////////////////creating deduction///////////////////////////////////////////////// -->
            <v-card-text>

                <v-text-field label="Ministry" v-model="ministry" outlined></v-text-field>
                <v-btn @click="submit" style="height: 60px; background: #17517E; font-family: Mulish;font-size: 18px; line-height: 21px; color: #FFFFFF;" block>Submit</v-btn>

                <!-- <button block style="color: #17517E; padding: 1.5rem" @click="" type="submit">Submit</button> -->
                <!-- <v-btn color="#17517E" style="color: #fff; padding: 1.5rem" block @click="Submit">Submit</v-btn> -->

            </v-card-text>

        </v-card>
    </v-dialog>
<!-- /////////////////////////EDIT -->
         <v-dialog v-model="dialogMinistryedit" transition="dialog-top-transition" max-width="500">

        <v-card>
            <div class="label">
                <h4>Create Ministry</h4>
            </div>
            <div class="py-8 label2">
                <h4>Create a new  to Ministry</h4>
            </div>
            <!-- /////////////////////////creating deduction///////////////////////////////////////////////// -->
            <v-card-text>

                <v-text-field label="Ministry" v-model="ministryEdit" outlined></v-text-field>
                <v-btn @click="ministryEditing" style="height: 60px; background: #17517E; font-family: Mulish;font-size: 18px; line-height: 21px; color: #FFFFFF;" block>Submit</v-btn>

                <!-- <button block style="color: #17517E; padding: 1.5rem" @click="" type="submit">Submit</button> -->
                <!-- <v-btn color="#17517E" style="color: #fff; padding: 1.5rem" block @click="Submit">Submit</v-btn> -->

            </v-card-text>

        </v-card>
    </v-dialog>
    <!-- ///////////////DELETE -->
      <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card>
                             <div class="label">
                               <h4>Delete Ministry Name </h4>
                            </div>
                           
                            <div class="center"> <img src="../../public/error_40px.png" alt=""></div>
                            <v-card-title class="text-h5">Are you sure you want to delete  "{{ministryNd}}"</v-card-title>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="dialogDelete=false">Cancel</v-btn>
                                <v-btn color="blue darken-1" text @click="deleteMinistry">OK</v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
    <div>
        <h4 style="font-weight: bolder" class="pa-5">MDA</h4>
        <v-card>
            <v-row>
                <v-col cols="12">
                    <div class="_header px-10 pt-5">
                        <h4 style="font-size: 18px">Ministry - Listing</h4>
                        <div>
                            <v-btn elevation="0" style="font-size: 13px word-spacing: 1px; background-color: #F2F9FF; font-family: Mulish; color:  rgba(23, 81, 126, 1)" class="mx-4" @click="dialogMinistry = true">Add New</v-btn>
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
                                            <v-btn text block  @click="edit(item)">
                                                <v-list-item >Edit</v-list-item>
                                            </v-btn>
                                            <v-btn text block @click="deleteMd(item)">
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
            ministryEdit: '',
            dialogDelete:false,
            ministryNd:"",
            ministry: "",
            dialogMinistryedit:false,
            dialogMinistry: false,
            Allowanceitems: ["Allowance Name one", "Allowance one"],
            Salaryitems: ["Salary Scale One", "Salary Scale two"],
            headers: [{
                    text: "Action",
                    value: "more",
                },
                {
                    text: "Ministry",
                    value: "ministry",
                },

                {
                    text: "Institution",
                    value: "institu",
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
                    value:"ministry_code",
                    align: ' d-none'
                }

            ],
            items: [],
        };
    },
    computed: {
        ...mapGetters({
            jwt: "getJwt",
            instu_code: "getInstuCode",
             baseURL:"baseURL"
        }),
    },
    beforeMount() {
        this.populateMinistry();
        // this.populateSalarayRegime();

    },

    methods: {
         deleteMd(item) {
            this.dialogDelete = true;
            this.ministryNd = item.ministry;
            this.ministryItems = item;
        },
         async deleteMinistry() {
            try {
                console.log('start1');
                const res = await axios({
                    headers: {
                        Authorization: `Bearer ${this.jwt}`,
                    },
                    // - {‘institution_code’:’’, ‘allowance_code’:’’}
                    method: "delete",
                    url: `${this.baseURL}/ministry`,
                    data: {
                        institution_code: this.instu_code,
                        ministry_code: this.ministryItems.ministry_code,
                       
                    },
                });
                
                console.log(res);
                if (res.data.response.code == "00") {
                  this.dialogDelete=false
                    const row = this.items.findIndex(
                        (el) => el.ministry_code === this.ministryItems.ministry_code
                    );
                    this.items.splice(row, 1);

                    return Swal.fire({
                        icon: "success",
                        text: "Ministry deleted successfully!",
                        title: "Successful",
                        width: 400,
                    });
                } else {
                    return Swal.fire({
                        icon: "error",
                        title: "Ministry not deleted successfully!",
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
        //to pop up edit dialog
            edit(item) {
            this.dialogMinistryedit = true;
            this.ministryEdit = item.ministry;
            this.ministryItems = item;
        },

        //Edit Allowance Name
        async ministryEditing() {
       
            try {
                console.log(this.ministryItems);
                const res = await axios({
                    headers: {
                        Authorization: `Bearer ${this.jwt}`,
                    },
                    method: "put",

                    url: `${this.baseURL}/ministry`,
                    data: {
                        institution_code: this.instu_code,
                        ministry_name:this.ministryItems.ministry,
                        entered_by: this.ministryItems.enterby,
                        ministry_code: this.ministryItems.ministry_code

                    },
                });
                console.log('Result',res);
                if (res.data.response.code == "00") {
                    const row = this.items.findIndex(
                        (el) => el.ministry_code === this.ministryItems.ministry_code
                    );

                    this.items[row].ministry_name = this.ministryEdit;

                    this.dialogEdit = false;
                    return Swal.fire({
                        icon: "success",
                        text: "Edited Successfully",
                        title: "Successful",
                        width: 400,
                    });
                } else if (res.data.response.code == "E300") {
                    Swal.fire({
                        icon: "error",
                        text: "Ministry Name Already Exist",
                        title: "Oops..",
                        width: 400,
                    });
                } else if (res.data.response.code == "E301") {
                    Swal.fire({
                        icon: "error",
                        text: "Ministry name didn’t update successfully!",
                        title: "Oops..",
                        width: 400,
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        text: "Error Occured while Editing Ministry Name",
                        title: "Oops..",
                        width: 400,
                    });
                }
                console.log("Edit Ministry", res);
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
        async populateMinistry() {
            try {
                console.log('INSTITUTION CODE', this.instu_code);
                const res = await axios({
                    headers: {
                        Authorization: `Bearer ${this.jwt}`,
                    },
                    method: "get",
                    url: `${this.baseURL}/ministry?institution_code=${this.instu_code}`,
                });
                console.log('check_res', res);
                if (res.data.response.code == "00") {
                    res.data.response.message.all_ministries.forEach((el) => {
                        this.items.push({
                            ministry: el.ministry_name,
                            institu: el.institution,
                            ministry_code:el.ministry_code,
                            enterby: el.entered_by,
                            enteron: el.date.split("T")[0],
                        });
                    });
               
               
               
               }
                console.log(res);
            } catch (err) {
                console.log(err);
            }
        },
        // async populateMinistry() {
        //     try {

        //         const res = await axios({
        //             headers: {
        //                 Authorization: `Bearer ${this.jwt}`,
        //             },
        //             method: "get",
        //             url: `http://192.168.88.143:2120/ministry?institution_code=${this.instu_code}`,
        //         });
        //         //  console.log('INSTITUTION CODE', this.instu_code);
        //       console.log(res);
        //         if (res.data.response.code == "00") {
        //             res.data.response.message.ministrys.forEach((el) => {
        //                 this.items.push({
        //                     designation: el.ministry_name,
        //                     entered_by: el.entered_by,
        //                     entered_on: el.date.split("T")[0],
        //                 });
        //             });
        //         }
        //         console.log(res);
        //     } catch (err) {
        //         console.log(err);
        //     }
        // },
        SubmitDepartment() {
            this.show = false;
        },
        async submit() {
            try {
                console.log('start1')
                if (this.ministry == "") {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Key in your ministry",
                        width: 400,
                    });
                } else {
                    console.log('start2')

                    const res = await axios({

                        headers: {
                            Authorization: `Bearer ${this.jwt}`,
                        },
                        method: "post",
                        url: `${this.baseURL}/ministry`,
                        data: {
                            institution_code: this.instu_code,
                            entered_by: "Appmart Integrated",
                            ministry_name: this.ministry,
                        },
                    });
                    console.log("RESPONSE ministry", res);
                    console.log(res.data.response.code);
                    if (res.data.response.code == "00") {
                        console.log('Here');

                        const el = res.data.response.message.data;
                        this.items.push({
                            ministry: el.ministry_name,
                            institu: el.institution,
                            enterby: el.entered_by,
                            enteron: el.date.split("T")[0],
                        });

                        // console.log('New check', id);
                        // const response2 = await this.$http.get('/list-institution', )
                        // const row = this.items.findIndex(
                        //     (el) => el.id === id
                        // );
                        // this.items[row].institution_name = this.editedItem.institution_name,
                        //     this.items[row].institution_code = this.editedItem.institution_code,
                        //     this.items[row].status = this.editedItem.status,

                        Swal.fire({
                            icon: "success",
                            title: " Created",
                            text: "ministry name created",
                            width: 400,
                        });
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
