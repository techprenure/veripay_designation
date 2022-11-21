<template>
<div class="">
    <h4 style="font-weight: bolder" class="pa-5">Non Taxable Deduction</h4>
    <v-card>
        <v-row>
            <v-col cols="12">
                <div class="_header px-10 pt-5">
                    <h4 style="font-size: 18px">
                        Non Taxable Deduction - Approved Listing
                    </h4>
                    <div>

                        <v-btn style="font-size: 13px; background-color: #f2f9ff; color: #17517E" elevation="0" @click="dialog2 = true"> Add Non Taxable Deductions</v-btn>
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
                            <template v-slot:item.approved="{ item }">
                                <v-btn style="color: red;  font-size:10px;text-transform: capitalize" text v-if="item.approved == 0">Not Approved</v-btn>
                                <v-btn v-else style="color: green;  font-size:10px;text-transform: capitalize" text>Approved</v-btn>
                            </template>

                            <template v-slot:item.more="{ item }">
                                <v-menu offset-y >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn color="primary" text v-bind="attrs" v-on="on" :disabled="item.approved == 0">
                                            <img src="../../public/Vector.svg" alt="">
                                        </v-btn>
                                    </template>
                                    <v-list>
                                        <v-btn text block :disabled="item.approved == 0" @click="edit(item)">
                                            <v-list-item>Edit</v-list-item>
                                        </v-btn>
                                        <v-btn text block :disabled="item.approved == 0" @click="deleteAllowance(item)">
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
  
       
    <!-- popup for non taxable deduction -->
    <v-dialog v-model="dialog2" width="400">
        <v-card class="text-center" style="text-align: center">
            <div class="text-h6 text-center pa-4" style="background-color: #f2f9ff; color: #17517e">
                Add Non Taxable Deductions
            </div>
            <div class="px-8 pt-3 pb-12">
                <v-card-text class="mb-3" densed>

                </v-card-text>
                <v-form>
                    <v-select v-model="salaryRegime" :items="SalaryRegime" label="Salary Scale Regime" required outlined></v-select>
                    <v-select v-model="deductionName" :items="Deductionitems" label="Deduction Name" required outlined></v-select>
                    <v-btn block color="#17517E" style="color: #fff" class="pa-6" @click="createTaxableDeduction">
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
                    text: "Regime",
                    value: "regime_name",
                },
                {
                    text: "Deduction Name",
                    value: "deduction_name",
                },
                {
                    text: "Entered By",
                    value: "entered_by_name",
                },
                {
                    text: "Entered On",
                    value: "entered_on",
                },
        
            ],
            items: [],
            allowances: null,
            salaryRegime: "",
            deductionName: "",
            regimes: null,
          
            allowance: "",
            Deductionitems: [],
            SalaryRegime: [],
        };
    },

    beforeMount() {
        // this.populateAllowanceName();
        this.populateTaxableDeduction();
        this.findDeduction();
        this.findRegime();
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
        // populating Regime
        async findRegime() {
            const res = await axios({
                headers: {
                    Authorization: `Bearer ${this.jwt}`,
                },
                method: "get",
                url: `${this.baseURL}/salary_regime?institution_code=${this.instu_code}`,
            });
            console.log('Test Regime', res);
            res.data.response.message.regimes.forEach(el => {
                console.log(el);
                this.SalaryRegime.push({
                        value: el.regime_code,
                        text: el.regime_name

                    }

                )

            });

        },
        // populating deduction 
        async findDeduction() {

            const res = await axios({
                headers: {
                    Authorization: `Bearer ${this.jwt}`,
                },
                method: "get",
                url: `${this.baseURL}/deduction?institution_code=${this.instu_code}`,
            });
            console.log("network");
            console.log('Find Deductions', res);
            res.data.response.message.deductions.forEach(el => {
                this.Deductionitems.push({
                        value: el.deduction_code,
                        text: el.deduction_name

                    }

                )

            });

        },
        // edit(item) {
        //   this.dialog2 = true;
        //   this.allowance_edit = item.allowance_name;
        //   this.salary_edit = item.salreg;
        //   this.allowanceItem = item;
        // },

        //Create Allowance Name
        async createTaxableDeduction() {
            if (this.salaryRegime == "" || this.deductionName == "") {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Empty Field!",
                    width: 400,
                });
                this.dialog = true;
            } else {
                try {
                    //Create non taxable deduction
                    const res = await axios({
                        headers: {
                            Authorization: `Bearer ${this.jwt}`,
                        },
                        method: "post",
                        url: `${this.baseURL}/non_taxable_deduction`,
                        data: {
                            institution_code: this.instu_code,
                            regime_code: this.salaryRegime,
                            deduction_code: this.deductionName,
                            entered_by: "9b2b233117",
                        },
                    });

                    console.log("ALLOWANCE RESPONSE", res);
                    const message = res.data.response.message.message;

                    //check for success
                    if (res.data.response.code == "00") {
                        const el = res.data.response.message.data;
                        this.items.push({
                            active: el.active,
                            regime_name: el.regime_name,
                            deduction_name: el.deduction_name,
                            entered_by_name: el.entered_by_name,
                            entered_on: el.entered_on.split("T")[0],
                            approved: el.approved,

                        });
                      this.salaryRegime = "", this.deductionName = ""
                        this.dialog2 = false;
                        return Swal.fire({
                            icon: "success",
                            title: "Created",
                            text: message,
                            width: 400,
                        });
                        //Check if Not created
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Not Created",
                            text: message,
                            width: 400,
                        });
                       
                    } 
                } catch (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Non Taxable Deduction Not Created",
                        width: 400,
                    });
                    console.log(error);
                }
            }
        },

        // Activate Dactivate Allowance
        // async allowance_status(item) {
        //   console.log(item);
        //   try {
        //     const res = await axios({
        //       headers: {
        //         Authorization: `Bearer ${this.jwt}`,
        //       },
        //       method: "patch",
        //       url:`${this.baseURL}/allowance_regime`,

        //       data: {
        //         institution_code: this.instu_code,
        //         allowance_regime_code: item.allow_regime_code,
        //         active: !item.status,
        //       },
        //     });
        //     console.log(res);
        //     // console.log("STATUS", item.status, !item.status);
        //     //Check status
        //     if (res.data.response.code == "00") {
        //       const row = this.items.findIndex(
        //         (el) => el.allow_code === item.allow_code
        //       );

        //       this.items[row].status = !item.status;

        //       Swal.fire({
        //         icon: "success",
        //         title: "Successful",
        //         width: 400,
        //       });
        //     } else if (res.data.response.code == "E400") {
        //       Swal.fire({
        //         icon: "error",
        //         title: "Allowance Name not Deactivated",
        //         width: 400,
        //       });
        //     } else if (res.data.response.code == "E401") {
        //       Swal.fire({
        //         icon: "error",
        //         title: "Allowance Name not Activated",
        //         width: 400,
        //       });
        //     }
        //     // console.log(res);
        //   } catch (error) {
        //     Swal.fire({
        //       icon: "error",
        //       title: "Error Encounted",
        //       width: 400,
        //     });
        //     console.log(error);
        //   }
        // },

        //Populate NON TAXABLE DEDUCTION
        async populateTaxableDeduction() {
            try {
                // console.log("HERE");
                const res = await axios({
                    headers: {
                        Authorization: `Bearer ${this.jwt}`,
                    },
                    method: "GET",
                    url: `${this.baseURL}/non_taxable_deduction?institution_code=${this.instu_code}`,
                });

                console.log("NON TAXABLE DEDUCTION", res);

                if (res.data.response.code == "00") {
                    res.data.response.message.data.forEach((el) => {
                        this.items.push({
                            active: el.active,
                            regime_name: el.regime_name,
                            deduction_name: el.deduction_name,
                            entered_by_name: el.entered_by_name,
                            entered_on: el.entered_on.split("T")[0],
                            approved: el.approved,
                        });
                    });
                }
            } catch (err) {
                console.log(err);
            }
        },

        // Fetch Populate Allowance Name and Salary Regime Select Field

        //     res.data.response.message.allowances.forEach((el) => {
        //       this.Allowanceitems.push(el.allowance_name);
        //     });
        //   } catch (error) {
        //     console.log(error);
        //   }
        // },

        //Create Allowance(- Link Allowances to Regimes - )
        // async createAllowance() {
        //   // console.log("HERE");
        //   // console.log("TEST HERE", this.allowanceCode, this.regimeCode);
        //   if (this.allowance_name == "" || this.salary_regime == "") {
        //     Swal.fire({
        //       icon: "error",
        //       title: "Oops...",
        //       text: "Something went wrong!",
        //       width: 400,
        //     });
        //   } else {
        //     try {
        //       const res = await axios({
        //         headers: {
        //           Authorization: `Bearer ${this.jwt}`,
        //         },
        //         method: "post",
        //         url: `${this.baseURL}/allowance_regime`,
        //         data: {
        //           institution_code: this.instu_code,
        //           regime_code: this.regimeCode,
        //           allowance_code: this.allowanceCode,
        //           entered_by: "Veripay Integrated",
        //         },
        //       });

        //       // Check for Status Code
        //       console.log(res);
        //       if (res.data.response.code === "00") {
        //         this.allowance_name = "";
        //         this.salary_regime = "";
        //         const data = res.data.response.message.data;
        //         this.items.push({
        //           allowance_name: data.allowance_name,
        //           salreg: data.regime_name,
        //           institu: data.institution,
        //           enterby: data.entered_by,
        //           enteron: data.date.split("T")[0],
        //           status: data.active,
        //           allow_code: data.allowance_code,
        //           regime_code: data.regime_code,
        //           allow_regime_code: data.allowance_regime_code,
        //         });

        //         this.dialog2 = false;

        //         Swal.fire({
        //           icon: "success",
        //           title: "Created",
        //           text: "Allowance Name Created",
        //           width: 400,
        //         });
        //       } else if (res.data.response.code == "E202") {
        //         Swal.fire({
        //           icon: "info",
        //           title: "Oops...",
        //           text: "Allowance is already assigned to Salary regime",
        //           width: 400,
        //         });
        //       } else if (res.data.response.code == "E203") {
        //         Swal.fire({
        //           icon: "info",
        //           title: "Oops...",
        //           text: "Allowance allocation not successfu",
        //           width: 400,
        //         });
        //       } else {
        //         Swal.fire({
        //           icon: "error",
        //           title: "Oops...",
        //           text: "Allowance Not Created",
        //           width: 400,
        //         });
        //       }
        //     } catch (error) {
        //       console.log(error);
        //       Swal.fire({
        //         icon: "error",
        //         title: "Oops...",
        //         text: "Allowance Not Created",
        //         width: 400,
        //       });
        //     }
        //   }
        //   this.dialog = false;
        // },
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
