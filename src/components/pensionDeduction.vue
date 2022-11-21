<template>
<div class="">
    <h4 style="font-weight: bolder" class="pa-5">Pension Deduction Configuration</h4>
    <v-card>
        <v-row>
            <v-col cols="12">
                <div class="_header px-10 pt-5">
                    <h4 style="font-size: 18px">
                        Pensionable Deduction
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

                                </v-col>
                            </v-row>
                        </v-card-title>
                        <v-data-table :headers="headers" class="table-striped" :items="items">
                           

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
    
    <v-dialog v-model="dialog2" width="400">
        <v-card class="text-center" style="text-align: center">
            <div class="text-h6 text-center pa-4" style="background-color: #f2f9ff; color: #17517e">
                Select Pensionable Deduction
            </div>
            <div class="px-8 pt-3 pb-12">
                <v-card-text class="mb-3" densed>
                    <span style="font-size: 10px; font-weight: bolder"> Click to select pensionable deduction(multiple):</span> <br />
                    <span style="font-size: 10px; ">(if none, scroll down and select none or leave empty)</span>
                </v-card-text>
                <v-form>
                    <v-select v-model="allowance" :items="allowanceNames" label="Allowance Name" multiple outlined></v-select>
                    <v-text-field label="Percentage of Basic" type="number" v-model="percentage" outlined></v-text-field>
                    <v-btn block color="#17517E" style="color: #fff" class="pa-6" @click="createPensionDeduction">
                        Submit
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

export default {
    data() {
        return {
            dialog2: false,

            headers: [{
                    text: "Action",
                    value: "more",
                },
                {
                    text: "Allowance Name",
                    value: "allowance_name",
                },
                {
                    text: "Percentage%",
                    value: "amount_percentage",
                },
             
                {
                    text: "Entered By",
                    value: "entered_by",
                },
                {
                    text: "Entered On",
                    value: "date",
                },
               
            ],
            items: [],
            allowance:[],         
            
            percentage:"",
            allowanceNames: [],
        };
    },

    beforeMount() {
        this.listPensionDeduction();
        this.populateAllowanceNames();
    },

    watch: {
        //Track Allowance Code
        // allowance_name(val) {
        //   console.log(this.allowances);
        //   const allowance = this.allowances.find((el) => el.allowance_name === val);
        //   this.allowanceCode = allowance.allowance_code;
        // },
        //Track Salary Code
        // salary_regime(val) {
        //   const regime = this.regimes.find((el) => el.regime_name === val);
        //   this.regimeCode = regime.regime_code;
        // },
    },
    computed: {
        ...mapGetters({
            jwt: "getJwt",
            instu_code: "getInstuCode",
            baseURL: "baseURL"
        }),
    },
    methods: {
        // edit(item) {
        //   this.dialog2 = true;
        //   this.allowance_edit = item.allowance_name;
        //   this.salary_edit = item.salreg;
        //   this.allowanceItem = item;
        // },


        createValue() {         
            this.createVal = this.items           
        },

        //Create Allowance Name

        async createPensionDeduction() {
            
            
            if (this.allowance == "" || this.percentage == "") {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Empty Field!",
                    width: 400,
                });
                
            } else {
                try {
                
                    //Create pension deduction
                    const res = await axios({
                        headers: {
                            Authorization: `Bearer ${this.jwt}`,
                        },
                        method: "post",
                        url: `${this.baseURL}/pension_deduction`,
                        data: {
                            institution_code: this.instu_code,
                            allowances: this.allowance,
                            percentage: this.percentage,
                            entered_by: "9b2b233117",
                        },
                    });

                    console.log("Pension Deduction", res);
                    const currentDate = new Date().toISOString().split("T")[0]
                    const entered = "Tester"

                    //check for success
                    const message = res.data.response.message.message;
                    if (res.data.response.code == "00") {
                       this.dialog2 = false;
                    this.allowance.forEach((val) =>{   
                        console.log('CON',val);                       
                       const allowanceValue = this.allowanceNames.find(el => el.value === val);
                        this.items.push({
                            amount_percentage: this.percentage,
                           allowance_name: allowanceValue.text,                           
                            entered_by: this.entered,
                            date: currentDate,
                           
                        });
                    })                     
                        this.allowance = "" ,
                        this.percentage = ""
                       
                        return Swal.fire({
                            icon: "success",
                            title: "Created",
                            text: message,
                            width: 400,
                        });
                        //Check if Not created
                    } else  {
                        Swal.fire({
                            icon: "error",
                            title: "Not Created",
                            text: message,
                            width: 400,
                        });
                        //Check Error
                    } 
                } catch (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Pension Deduction Not Created",
                        width: 400,
                    });
                    console.log(error);
                }
            }
        },

        //Populate allowance Table
        async populateAllowanceNames() {

            try {
                // console.log("HERE");
                console.log("MAGIC 111");
                const res = await axios({
                    headers: {
                        Authorization: `Bearer ${this.jwt}`,
                    },
                    method: "GET",
                    url: `${this.baseURL}/allowance?institution_code=${this.instu_code}`,
                });
                console.log("MAGIC 1");
                console.log("MAGIC", res);
                console.log("MAGIC 2");

                if (res.data.response.code == "00") {
                    res.data.response.message.allowances.forEach((el) => {
                        this.allowanceNames.push({
                            value: el.allowance_code,
                            text: el.allowance_name
                        });
                    });
                }
            } catch (err) {
                console.log(err);
            }
        },

        async listPensionDeduction() {
            console.log("mask1");
            try {
                // console.log("HERE");
                const res = await axios({
                    headers: {
                        Authorization: `Bearer ${this.jwt}`,
                    },
                    method: "GET",
                    url: `${this.baseURL}/pension_deduction?institution_code=${this.instu_code}`,
                });
                console.log("mask2");
                console.log("List Pension Deduction", res);

                if (res.data.response.code == "00") {
                  res.data.response.message.data.forEach((el) => {
                    this.items.push({
                            amount_percentage: el.percentage,
                            allowance_code: el.allowance_code,
                            allowance_name: el.allowance_name,
                            approved:el.approved,
                            date: el.entered_on.split("T")[0],
                            entered_by: el.entered_by_name,                           
                    });
                  });
                }
            } catch (err) {
                console.log(err);
            }
        },

        //Fetch Populate PensionDeduction Name and Salary Regime Select Field
        // async PensionDeduction() {
        //   try {
        //     const res = await axios({
        //       headers: {
        //         Authorization: `Bearer ${this.jwt}`,
        //       },
        //       method: "GET",
        //       url: `${this.baseURL}/allowance?institution_code=${this.instu_code}`,
        //     });
        //     // console.log("Allowance Name", res);
        //     this.allowances = res.data.response.message.allowances;
        //     this.regimes = res.data.response.message.regimes;
        //     // console.log("TEST HERE", this.allowances, this.regimes);
        //     res.data.response.message.regimes.forEach((el) => {
        //       this.Salaryitems.push(el.regime_name);
        //     });

        //     res.data.response.message.allowances.forEach((el) => {
        //       this.Allowanceitems.push(el.allowance_name);
        //     });
        //   } catch (error) {
        //     console.log(error);
        //   }
        // },

     ///   Create pension deduction(- Link Allowances to Regimes - )
       
        //Edit Allowance
        // async editAllowance() {
        //   // console.log(this.allowanceItem);
        //   try {
        //     const res = await axios({
        //       headers: {
        //         Authorization: `Bearer ${this.jwt}`,
        //       },
        //       method: "put",
        //       url: `${this.baseURL}/allowance_regime`,

        //       data: {
        //         institution_code: this.instu_code,
        //         entered_by: this.allowanceItem.enterby,
        //         regime_code: this.allowanceItem.regime_code,
        //         allowance_regime_code: this.allowanceItem.allow_regime_code,
        //         allowance_name: this.allowance_edit,
        //         allowance_code: this.allowanceItem.allow_code,
        //       },
        //     });

        //     if (res.data.response.code == "00") {
        //       const row = this.items.findIndex(
        //         (el) => el.allow_code === this.allowanceItem.allow_code
        //       );

        //       this.items[row].allowance_name = this.allowance_edit;
        //       this.items[row].salreg = this.salary_edit;

        //       this.dialogEdit = false;
        //       return Swal.fire({
        //         icon: "success",
        //         text: "Edited Successfully",
        //         title: "Successful",
        //         width: 400,
        //       });
        //     } else if (res.data.response.code == "E300") {
        //       Swal.fire({
        //         icon: "error",
        //         text: "Allowance Name Already Exist",
        //         title: "Oops..",
        //         width: 400,
        //       });
        //     } else if (res.data.response.code == "E301") {
        //       Swal.fire({
        //         icon: "error",
        //         text: "Allowance name didn’t update!",
        //         title: "Oops..",
        //         width: 400,
        //       });
        //     } else {
        //       Swal.fire({
        //         icon: "error",
        //         text: "Error Occured while Editing Allowance Name",
        //         title: "Oops..",
        //         width: 400,
        //       });
        //     }
        //     // console.log("Edit Allowance", res);
        //   } catch (error) {
        //     console.log(error);
        //     Swal.fire({
        //       icon: "error",
        //       text: "Something went wrong",
        //       title: "Oops!!",
        //       width: 400,
        //     });
        //   }
        // },

        //Delete Allowance
        // async deleteAllowance(item) {
        //   try {
        //     const res = await axios({
        //       headers: {
        //         Authorization: `Bearer ${this.jwt}`,
        //       },
        //       // - {‘institution_code’:’’, ‘allowance_code’:’’}
        //       method: "delete",
        //       url: `${this.baseURL}/allowance_regime`,
        //       data: {
        //         institution_code: this.instu_code,
        //         allowance_regime_code: item.allow_regime_code,
        //       },
        //     });
        //     // console.log(res);
        //     if (res.data.response.code == "00") {
        //       const row = this.items.findIndex(
        //         (el) => el.allow_code === item.allow_code
        //       );

        //       this.items.splice(row, 1);

        //       return Swal.fire({
        //         icon: "success",
        //         text: "Allowance deleted successfully!",
        //         title: "Successful",
        //         width: 400,
        //       });
        //     } else {
        //       return Swal.fire({
        //         icon: "error",
        //         title: "Allowance not deleted successfully!",
        //         width: 400,
        //       });
        //     }
        //   } catch (error) {
        //     console.log(error);
        //     Swal.fire({
        //       icon: "error",
        //       text: "Something went wrong",
        //       title: "Oops!!",
        //     });
        //   }
        // },
    },
};
</script>

<style>
._header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

/* .theme--light.v-data-table thead tr th {
  color: white;
} */
</style>
