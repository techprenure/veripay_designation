<template>
<div style="background: #e5e5e5" class="mt-10">
    <div class="title_txt">
        <p>Designation</p>
    </div>
    <div class="designation">
        <div class="mb-4 listing_txt">
            <p>Designation - Listing</p>
            <div>
                <v-btn elevation="0" style="font-size: 13px word-spacing: 1px; background-color: #F2F9FF; font-family: Mulish; color:  rgba(23, 81, 126, 1)" class="mx-4" @click="dialog = true">Add New</v-btn>
            </div>
        </div>
<!-- ////////////////////////DELETE -->
  <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card>
                             <div class="label">
                               <h4>Delete Designation Name </h4>
                            </div>
                           
                            <div class="center"> <img src="../../public/error_40px.png" alt=""></div>
                            <v-card-title class="text-h5">Are you sure you want to delete  "{{desigN}}"</v-card-title>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="dialogDelete=false">Cancel</v-btn>
                                <v-btn color="blue darken-1" text @click="deleteDesignation">OK</v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
        <!-- //////////DIALOG FOR EDITING DESIGNATION//////// -->
        <v-dialog v-model="dialogEdit" width="400">
            <v-card class="text-center" style="text-align: center">
                <div class="text-h6 text-center pa-4" style="background-color: #f2f9ff; color: #17517e">
                    Designation
                </div>
                <div class="px-8 pt-3 pb-12">
                    <v-card-text style="font-size: 16px; font-weight: bolder" class="mb-3" densed>
                        Edit Designation
                    </v-card-text>
                    <v-form>
                        <v-text-field block label="Designation Name" v-model="DesignationEd" outlined>
                        </v-text-field>
                        <v-btn block color="#17517E" style="color: #fff" class="pa-6" @click="DesignationEditing">
                            Submit
                        </v-btn>
                    </v-form>
                </div>
            </v-card>
        </v-dialog>

        <!-- ////////DIALOG FOR CREATING DESIGNATION//// -->
        <v-dialog v-model="dialog" transition="dialog-top-transition" max-width="500">

            <v-card>
                <div class="label">
                    <h4> Designation</h4>
                </div>
                <div class="py-8 label2">
                    <h4>Create a new Designation</h4>
                </div>
                <!-- /////////////////////////creating deduction///////////////////////////////////////////////// -->
                <v-card-text>

                    <v-text-field label="Designation" v-model="designation" placeholder="Designation" outlined></v-text-field>

                    <v-btn color="#17517E" style="color: #fff; padding: 1.5rem" block @click="submit" type="submit">Submit</v-btn>

                </v-card-text>

            </v-card>
        </v-dialog>

        <div class="search_input">
            <v-col cols="12" sm="4">
                <v-text-field v-model="filter" label="Search" prepend-inner-icon="mdi-magnify" solo-inverted></v-text-field>
            </v-col>
        </div>
        <div class="table-responsive mt-5">
            <v-data-table :headers="headers" :search="filter" class="table-striped" :items="items">
                <template v-slot:item.more="{ item }">
                    <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn color="primary" style="text-transform: capitalize" text v-bind="attrs" v-on="on">
                                <img src="../../public/Vector.svg" alt="">
                            </v-btn>
                        </template>
                        <v-list>
                            <v-btn text block @click="edit(item)">
                                <v-list-item>Edit</v-list-item>
                            </v-btn>
                            <v-btn text block @click="deleteDn(item)">
                                <v-list-item>Delete</v-list-item>
                            </v-btn>
                        </v-list>
                    </v-menu>
                </template>
            </v-data-table>
        </div>
    </div>
</div>
</template>

<script>
import {
    mapGetters
} from "vuex";
import axios from "axios";
import Swal from "sweetalert2";
export default {
    data() {
        return {
            designation: "",
            dialogDelete:false,
            filter:"",
            desigN:'',
            DesignationEd: "",
            dialogEdit: false,
            dialog: false,

            headers: [{
                    text: "Action",
                    value: "more",
                },
                {
                    text: "Designation",
                    value: "designation",
                },
                {
                    text: "Entered By",
                    value: "entered_by",
                },
                {
                    text: "Entered On",
                    value: "entered_on",
                },
                {
                    value: "designation_code",
                    align: ' d-none'
                }

            ],
            items: [],
        };
    },
    beforeMount() {
        this.populateTable();
    },

    computed: {
        ...mapGetters({
            jwt: "getJwt",
            instu_code: "getInstuCode",
              baseURL:"baseURL"
        }),
    },

    methods: {
         deleteDn(item) {
            this.dialogDelete = true;
            this.designItems = item;
            this.desigN = this.designItems.designation;

        },
        //TO DELETE A DESIGNATION NAME
        async deleteDesignation() {
            try {
                console.log('start1');
                const res = await axios({
                    headers: {
                        Authorization: `Bearer ${this.jwt}`,
                    },
                    method: "delete",
                    url: `${this.baseURL}/designation`,
                    data: {
                        institution_code: this.instu_code,
                        designation_code: this.designItems.designation_code,

                    },
                });

                console.log(res);
                if (res.data.response.code == "00") {
                  this.dialogDelete=false
                    const row = this.items.findIndex(
                        (el) => el.designation_code === this.designItems.designation_code
                    );

                    this.items.splice(row, 1);

                    return Swal.fire({
                        icon: "success",
                        text: "Designation deleted successfully!",
                        title: "Successful",
                        width: 400,
                    });
                } else {
                    return Swal.fire({
                        icon: "error",
                        title: "Designation not deleted successfully!",
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
        //To popup edit dialog
        edit(item) {
            this.dialogEdit = true;
            this.DesignationEd = item.designation;
            this.designationItem = item;
        },

        //TO Edit Designation Name
        async DesignationEditing() {
            console.log(this.deductItem);
            try {
                const res = await axios({
                    headers: {
                        Authorization: `Bearer ${this.jwt}`,
                    },
                    method: "put",
                    url: `${this.baseURL}/designation`,
                    data: {
                        institution_code: this.instu_code,
                        designation_name: this.DesignationEd,
                        designation_code: this.designationItem.designation_code,
                        entered_by: this.designationItem.entered_by
                    },
                });
                console.log(res);
                if (res.data.response.code == "00") {
                    const row = this.items.findIndex(
                        (el) => el.designation_code === this.designationItem.designation_code
                    );

                    this.items[row].designation = this.DesignationEd;

                    this.dialogEdit = false;
                    return Swal.fire({
                        icon: "success",
                        text: "Edited Designation Successfully",
                        title: "Successful",
                        width: 400,
                    });
                } else if (res.data.response.code == "E300") {
                    Swal.fire({
                        icon: "error",
                        text: "Designation Name Already Exist",
                        title: "Oops..",
                        width: 400,
                    });
                } else if (res.data.response.code == "E301") {
                    Swal.fire({
                        icon: "error",
                        text: "Designation name didn’t update successfully!",
                        title: "Oops..",
                        width: 400,
                    });
                } else {
                    console.log('look here', res);
                    Swal.fire({
                        icon: "error",
                        text: "Error Occured while Editing designation Name",
                        title: "Oops..",
                        width: 400,
                    });
                }
                console.log("Edit designation", res);
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
        ///////TO CREATE A DEDUCTION NAME
        async submit() {
            try {
                console.log('start1')
                if (this.designation == "") {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Key in your Designation",
                        width: 400,
                    });
                } else {
                    console.log('start2')

                    const res = await axios({
                        headers: {
                            Authorization: `Bearer ${this.jwt}`,
                        },
                        method: "post",
                        url: `${this.baseURL}/designation`,
                        data: {
                            institution_code: this.instu_code,
                            entered_by: "Appmart Integrated",
                            designation_name: this.designation,
                        },
                    });
                    console.log('start3')
                    if (res.data.response.code == "00") {
                        console.log('start3')
                        console.log(res);
                        const el = res.data.response.message.data;
                        console.log('start3', el)
                        this.items.push({
                                designation: el.designation_name,
                                entered_by: el.entered_by,
                                entered_on: el.date.split("T")[0],

                            }),
                            Swal.fire({
                                icon: "success",
                                title: " Created",
                                text: "Designation name create",
                                width: 400,
                            });
                        this.dialog = false
                    } else if (res.data.response.code == "E202") {
                        Swal.fire({
                            icon: "info",
                            title: "Not Created",
                            text: "Designation name already exists",
                            width: 400,
                        });
                    } else if (res.data.reponse.code == "E203") {
                        Swal.fire({
                            icon: "info",
                            title: "Not Created",
                            text: "Designation name not created!",
                            width: 400,
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Not Created",
                            text: "Error occured while creating designation",
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
        ////TO POPULATE FOR THE TABLE///
        async populateTable() {
            try {
                console.log('INSTITUTION CODE', this.instu_code);
                const res = await axios({
                    headers: {
                        Authorization: `Bearer ${this.jwt}`,
                    },
                    method: "get",
                    url: `${this.baseURL}/designation?institution_code=${this.instu_code}`,
                });
                console.log(res);
                if (res.data.response.code == "00") {
                    res.data.response.message.designations.forEach((el) => {
                        this.items.push({
                            designation: el.designation_name,
                            entered_by: el.entered_by,
                            designation_code: el.designation_code,
                            entered_on: el.date.split("T")[0],
                        });
                    });
                }
                console.log(res);
            } catch (err) {
                console.log(err);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Mulish:wght@600&family=Poppins:wght@500&display=swap");
@import url("https://fonts.googleapis.com/css?family=Proxima+Nova");

tr:nth-child(even) {
    background-color: #f8f8f8;
}

thead {
    background-color: #e6e6e6;

    th {
        font-family: Proxima Nova;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 114%;
        color: #4f4f4f;
    }
}

tbody {
    font-family: Proxima Nova;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 14px;
    color: #4f4f4f;
}

tbody>tr {
    line-height: 25px;
    min-height: 25px;
    height: 50px;
}

@media (max-width: 700px) {
    tbody>tr {
        line-height: 25px;
        min-height: 25px;
        height: 20px;
    }
}

a {
    text-decoration: none;
    font-family: Proxima Nova;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 14px;
    color: #1a82c6;

    &:hover {
        color: #279eee;
    }
}

.usericon input {
    padding-left: 25px;
}

.usericon:before {
    height: 100%;
    width: 25px;
    display: -webkit-box;
    -webkit-box-pack: center;
    -webkit-box-align: center;
    position: absolute;
    content: "\e008";
    font-family: "Glyphicons Halflings";
    pointer-events: none;
}

.title_txt {
    p {
        font-family: Mulish;
        font-size: 20px;
        line-height: 28px;
        color: #4f4f4f;
    }
}

.listing_txt {
    display: flex;
    justify-content: space-between;

    p {
        font-family: Mulish;
        font-size: 18px;
        line-height: 21px;
        color: #4f4f4f;
    }

    button {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 10px 15px;
        background: #f2f9ff;
        border-radius: 5px;
        font-family: Mulish;
        font-size: 14px;
        line-height: 16px;
        color: #17517e;
        flex: none;
        order: 0;
        flex-grow: 0;
        margin: 0px 6px;

        &:hover {
            background: #f2f5f8;
        }
    }
}

.add_button {
    font-size: 13px;
    word-spacing: 1px;
    align-items: center;
    justify-content: center;
    background-color: #609cd0;
    color: rgba(23, 81, 126, 1);
}

.designation {
    background-color: #fff;
    padding: 30px;
    margin-top: 30px;
    border-radius: 5px;
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

.search_input {
    input {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        padding: 10px;
        width: 20%;
        height: 50px;
        background: #f2f2f2;
        border: 0.5px solid #d9d9d9;
        box-sizing: border-box;
        border-radius: 4px;
    }

    @media (max-width: 700px) {
        input {
            width: 50%;
            height: 38px;
        }
    }

}
</style>
